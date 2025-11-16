import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { PacienteListComponent } from './paciente-list.component';
import { PacienteApiService } from '../../services/paciente-api.service';
import { Paciente } from '../../models/paciente.model';
import { ConfirmationService } from 'primeng/api';

// mocks
const pacienteApiMock = jasmine.createSpyObj<PacienteApiService>(
  'PacienteApiService',
  ['listar', 'remover']
);

describe('PacienteListComponent', () => {
  let component: PacienteListComponent;
  let fixture: ComponentFixture<PacienteListComponent>;
  let router: Router;

  beforeEach(async () => {
    // limpa chamadas entre os testes
    pacienteApiMock.listar.calls.reset();
    pacienteApiMock.remover.calls.reset();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PacienteListComponent // standalone
      ],
      providers: [
        { provide: PacienteApiService, useValue: pacienteApiMock },
        // usa o serviço REAL do PrimeNG, não um spy
        ConfirmationService
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(PacienteListComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    pacienteApiMock.listar.and.returnValue(of([]));
    fixture.detectChanges(); // dispara ngOnInit
    expect(component).toBeTruthy();
  });

  it('deve carregar pacientes com sucesso e limpar erro', () => {
    const lista: Paciente[] = [
      { id: '1', nome: 'Fulano' } as Paciente
    ];

    pacienteApiMock.listar.and.returnValue(of(lista));

    fixture.detectChanges(); // ngOnInit -> carregarPacientes

    expect(pacienteApiMock.listar).toHaveBeenCalled();
    expect(component.pacientes).toEqual(lista);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('deve setar mensagem de erro quando carregarPacientes falhar', () => {
    pacienteApiMock.listar.and.returnValue(
      throwError(() => new Error('falha'))
    );

    fixture.detectChanges(); // ngOnInit -> carregarPacientes

    expect(pacienteApiMock.listar).toHaveBeenCalled();
    expect(component.error).toBe('Erro ao carregar pacientes.');
    expect(component.loading).toBeFalse();
  });

  it('deve navegar para /pacientes/novo ao chamar novoPaciente()', () => {
    pacienteApiMock.listar.and.returnValue(of([]));
    fixture.detectChanges();

    component.novoPaciente();

    expect(router.navigate).toHaveBeenCalledWith(['/pacientes/novo']);
  });

  it('deve navegar para edição do paciente ao chamar editarPaciente()', () => {
    pacienteApiMock.listar.and.returnValue(of([]));
    fixture.detectChanges();

    const paciente = { id: '123', nome: 'Fulano' } as Paciente;

    component.editarPaciente(paciente);

    expect(router.navigate).toHaveBeenCalledWith(
      ['/pacientes', '123', 'editar']
    );
  });

  it('não deve remover paciente se o usuário cancelar na confirmação', () => {
    pacienteApiMock.listar.and.returnValue(of([]));
    fixture.detectChanges();

    const paciente = { id: '123', nome: 'Fulano', sobrenome: 'Silva' } as Paciente;

    spyOn(window, 'confirm').and.returnValue(false);

    component.excluirPaciente(paciente);

    expect(window.confirm).toHaveBeenCalled();
    expect(pacienteApiMock.remover).not.toHaveBeenCalled();
  });

  it('deve remover paciente e recarregar lista quando confirmação for aceita', () => {
    pacienteApiMock.listar.and.returnValue(of([]));
    fixture.detectChanges();

    const paciente = { id: '123', nome: 'Fulano', sobrenome: 'Silva' } as Paciente;

    spyOn(window, 'confirm').and.returnValue(true);
    pacienteApiMock.remover.and.returnValue(of(void 0));
    const carregarSpy = spyOn(component as any, 'carregarPacientes');

    component.excluirPaciente(paciente);

    expect(pacienteApiMock.remover).toHaveBeenCalledWith('123');
    expect(carregarSpy).toHaveBeenCalled();
  });

  // --------- formatCpf --------- //

  it('formatCpf deve formatar CPF válido com 11 dígitos', () => {
    const formatted = component.formatCpf('12345678901');
    expect(formatted).toBe('123.456.789-01');
  });

  it('formatCpf deve retornar string vazia quando cpf for null', () => {
    const formatted = component.formatCpf(null);
    expect(formatted).toBe('');
  });

  it('formatCpf deve retornar valor original quando não tiver 11 dígitos', () => {
    const formatted = component.formatCpf('12345');
    expect(formatted).toBe('12345');
  });

  // --------- formatTelefone --------- //

  it('formatTelefone deve retornar string vazia quando não houver números', () => {
    const formatted = component.formatTelefone('', '');
    expect(formatted).toBe('');
  });

  it('formatTelefone deve formatar telefone de 10 dígitos', () => {
    const formatted = component.formatTelefone('1198765432', '');
    expect(formatted).toBe('(11) 9876-5432');
  });

  it('formatTelefone deve formatar telefone de 11 dígitos', () => {
    const formatted = component.formatTelefone('11987654321', '');
    expect(formatted).toBe('(11) 98765-4321');
  });

  it('formatTelefone deve retornar raw quando tamanho não for 10 nem 11', () => {
    const formatted = component.formatTelefone('1234', '');
    expect(formatted).toBe('1234');
  });
});

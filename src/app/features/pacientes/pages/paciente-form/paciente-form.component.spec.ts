import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { PacienteFormComponent } from './paciente-form.component';
import { PacienteApiService } from '../../services/paciente-api.service';
import { ConvenioApiService } from '../../services/convenio-api.service';
import { Paciente } from '../../models/paciente.model';

// Spies dos serviços
const pacienteApiMock = jasmine.createSpyObj<PacienteApiService>('PacienteApiService', [
  'obterPorId',
  'criar',
  'atualizar'
]);

const convenioApiMock = jasmine.createSpyObj<ConvenioApiService>('ConvenioApiService', [
  'listar'
]);

// ActivatedRoute sem id (caso "novo paciente")
const activatedRouteMock: Partial<ActivatedRoute> = {
  snapshot: {
    paramMap: {
      get: (_: string) => null
    } as any
  } as any
};

describe('PacienteFormComponent', () => {
  let component: PacienteFormComponent;
  let fixture: ComponentFixture<PacienteFormComponent>;
  let router: Router;

  beforeEach(async () => {
    convenioApiMock.listar.and.returnValue(
      of([{ id: 1, nome: 'Convenio Alpha' }])
    );

    pacienteApiMock.obterPorId.and.returnValue(
      of({} as Paciente)
    );

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PacienteFormComponent
      ],
      providers: [
        { provide: PacienteApiService, useValue: pacienteApiMock },
        { provide: ConvenioApiService, useValue: convenioApiMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(PacienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // zera chamadas por segurança a cada teste
    pacienteApiMock.criar.calls.reset();
    pacienteApiMock.atualizar.calls.reset();
  });

  // ---------- TESTES BÁSICOS ----------

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir mensagem de validação se não houver celular nem telefone fixo', () => {
    component.form.patchValue({
      nome: 'Lívia',
      sobrenome: 'Monteiro',
      dataNascimento: '1994-11-13',
      genero: 2,
      cpf: '57048379804',
      rg: '298064509',
      ufRg: 'SP',
      email: 'teste@example.com',
      celular: '',
      telefoneFixo: '',
      convenioId: 1,
      numeroCarteirinha: '123',
      validadeCarteirinhaMes: 10,
      validadeCarteirinhaAno: 2028
    });

    expect(component.form.valid).toBeTrue();

    component.salvar();

    expect(pacienteApiMock.criar).not.toHaveBeenCalled();
    expect(pacienteApiMock.atualizar).not.toHaveBeenCalled();

    expect(component.messages[0].detail)
      .toBe('Informe pelo menos um telefone (celular ou telefone fixo).');
    expect(component.messages[0].severity).toBe('warn');
  });

  it('não deve salvar quando o formulário estiver inválido', () => {
    // deixa celular ok para não cair na regra de telefone,
    // mas quebra um obrigatório (nome vazio)
    component.form.patchValue({
      nome: '',
      sobrenome: 'Monteiro',
      dataNascimento: '1994-11-13',
      genero: 2,
      cpf: '57048379804',
      rg: '298064509',
      ufRg: 'SP',
      email: 'teste@example.com',
      celular: '11999999999',
      telefoneFixo: '',
      convenioId: 1
    });

    expect(component.form.invalid).toBeTrue();

    component.salvar();

    expect(pacienteApiMock.criar).not.toHaveBeenCalled();
    expect(pacienteApiMock.atualizar).not.toHaveBeenCalled();
  });

  it('deve chamar criar() quando o formulário for válido e for novo paciente', () => {
    pacienteApiMock.criar.and.returnValue(of({} as Paciente));

    component.form.patchValue({
      nome: 'Lívia',
      sobrenome: 'Monteiro',
      dataNascimento: '1994-11-13',
      genero: 2,
      cpf: '57048379804',
      rg: '298064509',
      ufRg: 'SP',
      email: 'teste@example.com',
      celular: '11999999999',
      telefoneFixo: '',
      convenioId: 1,
      numeroCarteirinha: '123',
      validadeCarteirinhaMes: 10,
      validadeCarteirinhaAno: 2028
    });

    component.salvar();

    expect(pacienteApiMock.criar).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
  });

  it('deve setar mensagem de erro quando criar() retornar erro', () => {
    pacienteApiMock.criar.and.returnValue(
      throwError(() => new Error('Erro qualquer'))
    );

    component.form.patchValue({
      nome: 'Lívia',
      sobrenome: 'Monteiro',
      dataNascimento: '1994-11-13',
      genero: 2,
      cpf: '57048379804',
      rg: '298064509',
      ufRg: 'SP',
      email: 'teste@example.com',
      celular: '11999999999',
      telefoneFixo: '',
      convenioId: 1
    });

    component.salvar();

    expect(component.messages[0].detail).toBe('Erro ao salvar paciente.');
    expect(component.messages[0].severity).toBe('error');
  });

  it('deve navegar para /pacientes ao cancelar', () => {
    component.cancelar();
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
  });

  // ---------- TESTES EXTRA: EDIÇÃO & CARREGAR PACIENTE ----------

  it('deve chamar atualizar() quando houver pacienteId', () => {
    (component as any).pacienteId = 'abc123';

    pacienteApiMock.atualizar.and.returnValue(of(void 0));

    component.form.patchValue({
      nome: 'Lívia',
      sobrenome: 'Monteiro',
      dataNascimento: '1994-11-13',
      genero: 2,
      cpf: '57048379804',
      rg: '298064509',
      ufRg: 'SP',
      email: 'teste@example.com',
      celular: '11999999999',
      telefoneFixo: '',
      convenioId: 1
    });

    component.salvar();

    expect(pacienteApiMock.atualizar)
      .toHaveBeenCalledWith('abc123', jasmine.any(Object));
    expect(pacienteApiMock.criar).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
  });

  it('deve setar mensagem de erro quando atualizar() retornar erro', () => {
    (component as any).pacienteId = 'abc123';

    pacienteApiMock.atualizar.and.returnValue(
      throwError(() => new Error('Erro qualquer'))
    );

    component.form.patchValue({
      nome: 'Lívia',
      sobrenome: 'Monteiro',
      dataNascimento: '1994-11-13',
      genero: 2,
      cpf: '57048379804',
      rg: '298064509',
      ufRg: 'SP',
      email: 'teste@example.com',
      celular: '11999999999',
      telefoneFixo: '',
      convenioId: 1
    });

    component.salvar();

    expect(component.messages[0].detail).toBe('Erro ao salvar paciente.');
    expect(component.messages[0].severity).toBe('error');
  });

  it('deve popular o formulário ao carregarPaciente com sucesso', () => {
    const pacienteMock: Paciente = {
      id: '1',
      nome: 'Ana',
      sobrenome: 'Silva',
      dataNascimento: '1990-01-01T00:00:00',
      genero: 1,
      cpf: '12345678900',
      rg: '111222333',
      ufRg: 'SP',
      email: 'ana@test.com',
      celular: '11911111111',
      telefoneFixo: '',
      convenioId: 1,
      numeroCarteirinha: '999',
      validadeCarteirinhaMes: 12,
      validadeCarteirinhaAno: 2030
    } as any;

    pacienteApiMock.obterPorId.and.returnValue(of(pacienteMock));

    (component as any).carregarPaciente('1');

    expect(component.form.get('nome')?.value).toBe('Ana');
    expect(component.form.get('dataNascimento')?.value)
      .toBe('1990-01-01');
  });

  it('deve setar mensagem de erro quando carregarPaciente falhar', () => {
    pacienteApiMock.obterPorId.and.returnValue(
      throwError(() => new Error('Erro qualquer'))
    );

    (component as any).carregarPaciente('1');

    expect(component.messages[0].detail).toBe('Erro ao carregar paciente.');
    expect(component.messages[0].severity).toBe('error');
  });
});

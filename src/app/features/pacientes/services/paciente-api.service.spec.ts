import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PacienteApiService } from './paciente-api.service';
import { Paciente } from '../models/paciente.model';

describe('PacienteApiService', () => {
  let service: PacienteApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PacienteApiService]
    });

    service = TestBed.inject(PacienteApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // garante que não ficou requisição pendente
    httpMock.verify();
  });

  it('deve listar pacientes (GET /api/pacientes)', () => {
    const mockResponse: Paciente[] = [
      { id: '1', nome: 'Fulano' } as Paciente
    ];

    let result: Paciente[] | undefined;

    service.listar().subscribe(res => (result = res));

    const req = httpMock.expectOne(r =>
      r.method === 'GET' && r.url.endsWith('/api/pacientes')
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    expect(result).toEqual(mockResponse);
  });

  it('deve obter paciente por id (GET /api/pacientes/:id)', () => {
    const id = '123';
    const mockPaciente: Paciente = {
      id,
      nome: 'Fulano'
    } as Paciente;

    let result: Paciente | undefined;

    service.obterPorId(id).subscribe(res => (result = res));

    const req = httpMock.expectOne(r =>
      r.method === 'GET' && r.url.endsWith(`/api/pacientes/${id}`)
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPaciente);

    expect(result).toEqual(mockPaciente);
  });

  it('deve criar paciente (POST /api/pacientes)', () => {
    const payload = {
      nome: 'Novo Paciente'
    } as Partial<Paciente>;

    const mockResponse: Paciente = {
      id: 'abc',
      ...payload
    } as Paciente;

    let result: Paciente | undefined;

    service.criar(payload as Paciente).subscribe(res => (result = res));

    const req = httpMock.expectOne(r =>
      r.method === 'POST' && r.url.endsWith('/api/pacientes')
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockResponse);

    expect(result).toEqual(mockResponse);
  });

  it('deve atualizar paciente (PUT /api/pacientes/:id)', () => {
    const id = '123';
    const payload = {
      nome: 'Paciente Editado'
    } as Partial<Paciente>;

    // não vamos nos apegar ao valor de retorno, só se a requisição foi certa
    service.atualizar(id, payload as Paciente).subscribe();

    const req = httpMock.expectOne(r =>
      r.method === 'PUT' && r.url.endsWith(`/api/pacientes/${id}`)
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);

    // pode ser null, '', {}, tanto faz – o importante é fechar a requisição
    req.flush(null);
  });

  it('deve remover paciente (DELETE /api/pacientes/:id)', () => {
    const id = '123';

    service.remover(id).subscribe();

    const req = httpMock.expectOne(r =>
      r.method === 'DELETE' && r.url.endsWith(`/api/pacientes/${id}`)
    );

    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});

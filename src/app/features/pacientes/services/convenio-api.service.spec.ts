import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ConvenioApiService } from './convenio-api.service';

describe('ConvenioApiService', () => {
  let service: ConvenioApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConvenioApiService]
    });

    service = TestBed.inject(ConvenioApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve listar convênios', () => {
    const mock = [{ id: 1, nome: 'Convenio Alpha' }];

    (service as any).listar().subscribe((res: any) => {
      expect(res).toEqual(mock);
    });

    const req = httpMock.expectOne(r => r.method === 'GET');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});

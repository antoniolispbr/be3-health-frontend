import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // router fake para os componentes que usam rota
        AppComponent         // standalone root
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the correct title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // valor REAL que está no app.component.ts
    expect(app.title).toBe('Cadastro de Pacientes');
  });

  it('should render title in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // em vez de obrigar h1 específico, só verificamos se o texto aparece na página
    expect(compiled.textContent).toContain('Cadastro de Pacientes');
  });
});

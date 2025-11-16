import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteApiService } from '../../services/paciente-api.service';
import { Paciente, PacienteSave } from '../../models/paciente.model';
import { PrimeNgModule } from '../../../../shared/primeng/primeng.module';
import { ConvenioApiService } from '../../services/convenio-api.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimeNgModule],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss'
})
export class PacienteFormComponent implements OnInit {
  form!: FormGroup;
  titulo = 'Novo paciente';
  pacienteId: string | null = null;
  submitted = false;

  convenios: { id: number; nome: string }[] = [];
  messages: Message[] = [];

  generos = [
    { value: 0, label: 'Não informado' },
    { value: 1, label: 'Masculino' },
    { value: 2, label: 'Feminino' },
    { value: 3, label: 'Outro' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteApi: PacienteApiService,
    private convenioApi: ConvenioApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: [0, Validators.required],
      cpf: [''],
      rg: ['', Validators.required],
      ufRg: ['', [Validators.required, Validators.maxLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      celular: [''],
      telefoneFixo: [''],
      convenioId: [1, Validators.required],
      numeroCarteirinha: [''],
      validadeCarteirinhaMes: [null],
      validadeCarteirinhaAno: [null]
    });

    this.pacienteId = this.route.snapshot.paramMap.get('id');

    if (this.pacienteId) {
      this.titulo = 'Editar paciente';
      this.carregarPaciente(this.pacienteId);
    }

    this.convenioApi.listar().subscribe({
      next: (data) => (this.convenios = data)
    });
  }

  private carregarPaciente(id: string): void {
    this.pacienteApi.obterPorId(id).subscribe({
      next: (paciente: Paciente) => {
        this.form.patchValue({
          ...paciente,
          dataNascimento: paciente.dataNascimento.substring(0, 10)
        });
      },
      error: () => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar paciente.'
          }
        ];
      }
    });
  }

  salvar(): void {
    this.submitted = true;
    this.messages = [];

    const raw = this.form.value;

    // regra: pelo menos um telefone
    const celular = raw.celular;
    const telefoneFixo = raw.telefoneFixo;

    if (!celular && !telefoneFixo) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Validação',
          detail: 'Informe pelo menos um telefone (celular ou telefone fixo).'
        }
      ];
      return;
    }

    if (this.form.invalid) {
      return;
    }

    // Conversão segura para DateOnly (yyyy-MM-dd)
    let dataNascimento: string;

    if (raw.dataNascimento instanceof Date) {
      dataNascimento = raw.dataNascimento.toISOString().substring(0, 10);
    } else if (typeof raw.dataNascimento === 'string') {
      dataNascimento = raw.dataNascimento.substring(0, 10);
    } else {
      dataNascimento = '';
    }

    const dto: PacienteSave = {
      ...raw,
      dataNascimento
    };

    if (this.pacienteId) {
      // edição
      this.pacienteApi.atualizar(this.pacienteId, dto).subscribe({
        next: () => this.router.navigate(['/pacientes']),
        error: () => {
          this.messages = [
            {
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao salvar paciente.'
            }
          ];
        }
      });
    } else {
      // criação
      this.pacienteApi.criar(dto).subscribe({
        next: () => this.router.navigate(['/pacientes']),
        error: () => {
          this.messages = [
            {
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao salvar paciente.'
            }
          ];
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/pacientes']);
  }
}

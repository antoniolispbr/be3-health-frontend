import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PacienteApiService } from '../../services/paciente-api.service';
import { Paciente } from '../../models/paciente.model';
import { PrimeNgModule } from '../../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PrimeNgModule],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.scss'
})
export class PacienteListComponent implements OnInit {
  pacientes: Paciente[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private pacienteApi: PacienteApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPacientes();
  }

  carregarPacientes(): void {
    this.loading = true;
    this.error = null;

    this.pacienteApi.listar().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar pacientes.';
        this.loading = false;
      }
    });
  }

  novoPaciente(): void {
    this.router.navigate(['/pacientes/novo']);
  }

  editarPaciente(paciente: Paciente): void {
    this.router.navigate(['/pacientes', paciente.id, 'editar']);
  }

  excluirPaciente(paciente: Paciente): void {
    if (!confirm(`Remover o paciente "${paciente.nome} ${paciente.sobrenome}"?`)) {
      return;
    }

    this.pacienteApi.remover(paciente.id).subscribe({
      next: () => this.carregarPacientes(),
      error: () => alert('Erro ao remover paciente.')
    });
  }

  // ======================
  // Helpers de formatação
  // ======================

  formatCpf(cpf?: string | null): string {
    if (!cpf) return '';

    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11) return cpf; // fallback se vier zoado

    return (
      digits.substring(0, 3) +
      '.' +
      digits.substring(3, 6) +
      '.' +
      digits.substring(6, 9) +
      '-' +
      digits.substring(9)
    );
  }

  formatTelefone(celular?: string | null, telefoneFixo?: string | null): string {
    const raw = (celular || telefoneFixo || '').replace(/\D/g, '');
    if (!raw) return '';

    const ddd = raw.substring(0, 2);

    if (raw.length === 10) {
      // (11) 2345-6789
      const parte1 = raw.substring(2, 6);
      const parte2 = raw.substring(6);
      return `(${ddd}) ${parte1}-${parte2}`;
    }

    if (raw.length === 11) {
      // (11) 92345-6789
      const parte1 = raw.substring(2, 7);
      const parte2 = raw.substring(7);
      return `(${ddd}) ${parte1}-${parte2}`;
    }

    // fallback se vier em outro formato
    return raw;
  }
}

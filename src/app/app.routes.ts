import { Routes } from '@angular/router';
import { PacienteListComponent } from './features/pacientes/pages/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './features/pacientes/pages/paciente-form/paciente-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },

  { path: 'pacientes', component: PacienteListComponent },

  { path: 'pacientes/novo', component: PacienteFormComponent },

  { path: 'pacientes/:id/editar', component: PacienteFormComponent },

  { path: '**', redirectTo: 'pacientes' }
];

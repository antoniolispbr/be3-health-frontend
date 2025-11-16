export interface Paciente {
  id: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;   // ISO vindo da API
  genero: number;           // 0..3
  cpf?: string | null;
  rg: string;
  ufRg: string;
  email: string;
  celular?: string | null;
  telefoneFixo?: string | null;
  convenioId: number;
  numeroCarteirinha?: string | null;
  validadeCarteirinhaMes?: number | null;
  validadeCarteirinhaAno?: number | null;
  isActive?: boolean;
  criadoEm?: string;
  atualizadoEm?: string | null;
}

// DTO de criação/edição (mesma coisa, sem id)
export type PacienteSave = Omit<Paciente, 'id' | 'criadoEm' | 'atualizadoEm' | 'isActive'>;

export * from './types/base';

export interface ApiResponse<T> {
  dados: T;
  mensagem?: string;
  status: 'sucesso' | 'erro';
  data_hora: string;
}

export interface LoginRequest {
  matricula: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    matricula: string;
    name: string;
    email: string;
  };
}

export interface ApiError {
  mensagem: string;
  status: 'erro';
  data_hora: string;
  codigo: number;
  errors?: Record<string, string[]>;
}

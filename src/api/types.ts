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

// Tipos comuns para respostas
export interface RespostaDados<T> {
  dados: T;
  mensagem: string;
}

export interface RespostaLista<T> {
  dados: T[];
  mensagem: string;
}

export interface RespostaPaginada<T> {
  dados: T[];
  paginacao: {
    total: number;
    pagina: number;
    tamanho: number;
    total_paginas: number;
  };
  mensagem: string;
}

// Tipos comuns para filtros
export interface FiltrosBase {
  pagina?: number;
  tamanho?: number;
}

export interface FiltrosBusca extends FiltrosBase {
  busca?: string;
}

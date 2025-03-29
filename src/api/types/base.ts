export interface BaseResponse {
  status: 'sucesso' | 'erro';
  mensagem?: string;
  data_hora: string;
}

export interface DataResponse<T> extends BaseResponse {
  dados: T;
}

export interface PaginationParams {
  pagina: number;
  tamanho: number;
  ordenar_por: string;
  ordenacao: 'asc' | 'desc';
}

export interface PaginationInfo {
  total: number;
  pagina: number;
  tamanho: number;
  total_paginas: number;
  proxima: boolean;
  anterior: boolean;
}

export interface PaginatedResponse<T> extends BaseResponse {
  dados: T[];
  paginacao: PaginationInfo;
}

export interface ListResponse<T> extends BaseResponse {
  dados: T[];
}

export interface ApiError extends BaseResponse {
  codigo: number;
  status: 'erro';
} 
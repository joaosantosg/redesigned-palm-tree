import type { FiltrosBase, RespostaDados, RespostaLista, RespostaPaginada } from 'src/api/types';

export interface ISala {
  id: string;
  bloco_id: string;
  identificacao_sala: string;
  capacidade_maxima: number;
  recursos: string[];
  uso_restrito: boolean;
  curso_restrito?: string;
  criado_em: string;
  atualizado_em: string;
}

export interface ISalaCreate {
  bloco_id: string;
  identificacao_sala: string;
  capacidade_maxima: number;
  recursos: string[];
  uso_restrito: boolean;
  curso_restrito?: string;
}

export interface ISalaUpdate {
  identificacao_sala?: string;
  capacidade_maxima?: number;
  recursos?: string[];
  uso_restrito?: boolean;
  curso_restrito?: string;
}

export interface ISalaFiltros extends FiltrosBase {
  bloco_id?: string;
  identificacao_sala?: string;
  capacidade_minima?: number;
  uso_restrito?: boolean;
  curso_restrito?: string;
}

export type SalaResponse = RespostaDados<ISala>;
export type SalaListResponse = RespostaLista<ISala>;
export type SalaResponsePaginada = RespostaPaginada<ISala>; 
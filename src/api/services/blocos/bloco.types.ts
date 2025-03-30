import type { FiltrosBase, RespostaDados, RespostaLista, RespostaPaginada } from 'src/api/types';

export interface IBloco {
  id: string;
  nome: string;
  identificador: string;
}

export interface IBlocoCreate {
  nome: string;
  identificacao: string;
}

export interface IBlocoFiltros extends FiltrosBase {
  nome?: string;
}

export type BlocoResponse = RespostaDados<IBloco>;
export type BlocoListResponse = RespostaLista<IBloco>;
export type BlocoResponsePaginada = RespostaPaginada<IBloco>;
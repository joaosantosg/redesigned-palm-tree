import type { FiltrosBase, RespostaDados, RespostaLista, RespostaPaginada } from 'src/api/types';

export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  curso?: string;
  ativo: boolean;
  super_user: boolean;
}

export interface IUsuarioCreate {
  nome: string;
  email: string;
  matricula: string;
  senha: string;
  curso?: string;
  ativo?: boolean;
  super_user?: boolean;
}

export interface IUsuarioUpdate {
  nome?: string;
  email?: string;
  matricula?: string;
  senha?: string;
  curso?: string;
  ativo?: boolean;
  super_user?: boolean;
}

export interface IUsuarioFiltros extends FiltrosBase {
  nome?: string;
  email?: string;
  matricula?: string;
  curso?: string;
  ativo?: boolean;
  super_user?: boolean;
}

export type UsuarioResponse = RespostaDados<IUsuario>;
export type UsuarioListResponse = RespostaLista<IUsuario>;
export type UsuarioResponsePaginada = RespostaPaginada<IUsuario>;

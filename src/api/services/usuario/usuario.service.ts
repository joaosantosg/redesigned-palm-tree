

import { api } from 'src/api/api';

import type {
  IUsuario,
  IUsuarioCreate,
  IUsuarioUpdate,
  IRespostaDados,
  IUsuarioFiltros,
  IRespostaPaginada,
} from './types';

export class UsuarioService {
  private static readonly BASE_URL = '/v1/usuario';

  static async listarUsuarios(filtros: IUsuarioFiltros): Promise<IRespostaPaginada<IUsuario>> {
    const params = new URLSearchParams();
    
    if (filtros.nome) params.append('nome', filtros.nome);
    if (filtros.email) params.append('email', filtros.email);
    if (filtros.matricula) params.append('matricula', filtros.matricula);
    if (filtros.curso) params.append('curso', filtros.curso);
    if (filtros.ativo !== undefined) params.append('ativo', String(filtros.ativo));
    if (filtros.super_user !== undefined) params.append('super_user', String(filtros.super_user));
    if (filtros.pagina) params.append('pagina', String(filtros.pagina));
    if (filtros.itens_por_pagina) params.append('itens_por_pagina', String(filtros.itens_por_pagina));

    const response = await api.get<IRespostaPaginada<IUsuario>>(
      `${this.BASE_URL}?${params.toString()}`
    );
    return response.data;
  }

  static async obterUsuario(id: string): Promise<IRespostaDados<IUsuario>> {
    const response = await api.get<IRespostaDados<IUsuario>>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  static async criarUsuario(usuario: IUsuarioCreate): Promise<IRespostaDados<IUsuario>> {
    const response = await api.post<IRespostaDados<IUsuario>>(this.BASE_URL, usuario);
    return response.data;
  }

  static async atualizarUsuario(
    id: string,
    usuario: IUsuarioUpdate
  ): Promise<IRespostaDados<IUsuario>> {
    const response = await api.patch<IRespostaDados<IUsuario>>(
      `${this.BASE_URL}/${id}`,
      usuario
    );
    return response.data;
  }

  static async removerUsuario(id: string): Promise<IRespostaDados<IUsuario>> {
    const response = await api.delete<IRespostaDados<IUsuario>>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}

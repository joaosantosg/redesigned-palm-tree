import { api } from 'src/api/api';

import type {
  IUsuarioCreate,
  IUsuarioUpdate,
  IUsuarioFiltros,
  UsuarioResponse,
  UsuarioResponsePaginada,
} from './usuario.types';

export class UsuarioService {
  private static readonly BASE_URL = '/v1/usuario';

  static async listarUsuarios(filtros: IUsuarioFiltros): Promise<UsuarioResponsePaginada> {
    const params = new URLSearchParams();
    
    if (filtros.nome) params.append('nome', filtros.nome);
    if (filtros.email) params.append('email', filtros.email);
    if (filtros.matricula) params.append('matricula', filtros.matricula);
    if (filtros.curso) params.append('curso', filtros.curso);
    if (filtros.ativo !== undefined) params.append('ativo', String(filtros.ativo));
    if (filtros.pagina) params.append('pagina', String(filtros.pagina));
    if (filtros.tamanho) params.append('tamanho', String(filtros.tamanho));

    const response = await api.get<UsuarioResponsePaginada>(
      `${this.BASE_URL}?${params.toString()}`
    );
    return response.data;
  }

  static async obterUsuario(id: string): Promise<UsuarioResponse> {
    const response = await api.get<UsuarioResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  static async criarUsuario(usuario: IUsuarioCreate): Promise<UsuarioResponse> {
    const response = await api.post<UsuarioResponse>(this.BASE_URL, usuario);
    return response.data;
  }

  static async atualizarUsuario(
    id: string,
    usuario: IUsuarioUpdate
  ): Promise<UsuarioResponse> {
    const response = await api.patch<UsuarioResponse>(
      `${this.BASE_URL}/${id}`,
      usuario
    );
    return response.data;
  }

  static async removerUsuario(id: string): Promise<UsuarioResponse> {
    const response = await api.delete<UsuarioResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}

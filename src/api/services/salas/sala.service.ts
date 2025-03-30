import { api } from 'src/api/api';

import type {
  ISalaCreate,
  ISalaUpdate,
  SalaResponse,
  ISalaFiltros,
  SalaListResponse,
  SalaResponsePaginada,
} from './sala.types';

export class SalaService {
  private static readonly BASE_URL = '/v1/sala';

  static async listarSalas(filtros: ISalaFiltros): Promise<SalaResponsePaginada> {
    const response = await api.get<SalaResponsePaginada>(this.BASE_URL, { params: filtros });
    return response.data;
  }

  static async obterSala(id: string): Promise<SalaResponse> {
    const response = await api.get<SalaResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  static async listarSalasPorBloco(blocoId: string): Promise<SalaListResponse> {
    const response = await api.get<SalaListResponse>(`${this.BASE_URL}/bloco/${blocoId}`);
    return response.data;
  }

  static async criarSala(sala: ISalaCreate): Promise<SalaResponse> {
    const response = await api.post<SalaResponse>(this.BASE_URL, sala);
    return response.data;
  }

  static async atualizarSala(id: string, sala: ISalaUpdate): Promise<SalaResponse> {
    const response = await api.patch<SalaResponse>(`${this.BASE_URL}/${id}`, sala);
    return response.data;
  }

  static async removerSala(id: string): Promise<SalaResponse> {
    const response = await api.delete<SalaResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
} 
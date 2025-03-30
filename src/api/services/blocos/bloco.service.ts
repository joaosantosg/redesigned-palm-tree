import { api } from 'src/api/api';

import type {
  IBlocoCreate,
  BlocoResponse,
  IBlocoFiltros,
  BlocoResponsePaginada,
} from './bloco.types';

export class BlocoService {
  private static readonly BASE_URL = '/v1/bloco';

  static async listarBlocos(filtros: IBlocoFiltros): Promise<BlocoResponsePaginada> {
    const response = await api.get<BlocoResponsePaginada>(this.BASE_URL, { params: filtros });
    return response.data;
  }

  static async criarBloco(bloco: IBlocoCreate): Promise<BlocoResponse> {
    const response = await api.post<BlocoResponse>(this.BASE_URL, bloco);
    return response.data;
  }
}

import { api } from 'src/api/api';

import type {
  ISemestreCreate,
  SemestreResponse,
  SemestreListResponse,
} from './semestre.types';

export class SemestreService {
  private static readonly BASE_URL = '/v1/semestre';

  static async listarSemestres(): Promise<SemestreListResponse> {
    const response = await api.get<SemestreListResponse>(this.BASE_URL);
    return response.data;
  }

  static async criarSemestre(semestre: ISemestreCreate): Promise<SemestreResponse> {
    const response = await api.post<SemestreResponse>(this.BASE_URL, semestre);
    return response.data;
  }
}

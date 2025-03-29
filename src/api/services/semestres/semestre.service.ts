import { api } from 'src/api/api';

import type {
  ISemestre,
  IRespostaDados,
  IRespostaLista,
  ISemestreCreate,
} from './semestre.types';

export class SemestreService {
  private static readonly BASE_URL = '/v1/semestre';

  static async listarSemestres(): Promise<IRespostaLista<ISemestre>> {
    const response = await api.get<IRespostaLista<ISemestre>>(this.BASE_URL);
    return response.data;
  }

  static async criarSemestre(semestre: ISemestreCreate): Promise<IRespostaDados<ISemestre>> {
    const response = await api.post<IRespostaDados<ISemestre>>(this.BASE_URL, semestre);
    return response.data;
  }
}

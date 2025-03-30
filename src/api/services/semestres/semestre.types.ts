import type { RespostaDados, RespostaLista } from 'src/api/types';

export interface ISemestre {
  id: string;
  identificador: string;
  data_inicio: string;
  data_fim: string;
  ativo: boolean;
}

export interface ISemestreCreate {
  identificador: string;
  data_inicio: string;
  data_fim: string;
  ativo?: boolean;
}

export type SemestreResponse = RespostaDados<ISemestre>;
export type SemestreListResponse = RespostaLista<ISemestre>;

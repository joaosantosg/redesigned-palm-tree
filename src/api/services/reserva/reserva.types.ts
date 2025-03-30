import type { FiltrosBase, RespostaDados, RespostaPaginada } from 'src/api/types';

export enum FrequenciaRecorrencia {
  DIARIO = 'DIARIO',
  SEMANAL = 'SEMANAL',
  MENSAL = 'MENSAL',
}

export enum TipoReservaRecorrente {
  REGULAR = 'REGULAR',
  SEMESTRE = 'SEMESTRE',
}

export interface IReserva {
  id: string;
  sala_id: string;
  inicio: string;
  fim: string;
  usuario_id: string;
  motivo: string;
  criado_em: string;
  atualizado_em: string;
  sala: {
    id: string;
    identificacao_sala: string;
  };
  usuario: {
    id: string;
    nome: string;
  };
}

export interface IReservaCreate {
  sala_id: string;
  inicio: string;
  fim: string;
  motivo: string;
}

export interface IReservaUpdate {
  inicio?: string;
  fim?: string;
  motivo?: string;
}

export interface IReservaFiltros extends FiltrosBase {
  sala_id?: string;
  usuario_id?: string;
  data_inicio?: string;
  data_fim?: string;
}

export interface IReservaRecorrente {
  id: string;
  motivo: string;
  identificacao: string;
  sala_id: string;
  usuario_id: string;
  frequencia: FrequenciaRecorrencia;
  dia_da_semana?: number[];
  dia_do_mes?: number;
  hora_inicio: string;
  hora_fim: string;
  excecoes: string[];
  tipo: TipoReservaRecorrente;
  criado_em: string;
  atualizado_em: string;
}

export interface IReservaRecorrenteRegularCreate {
  motivo: string;
  identificacao?: string;
  sala_id: string;
  frequencia: FrequenciaRecorrencia;
  dia_da_semana?: number[];
  dia_do_mes?: number;
  hora_inicio: string;
  hora_fim: string;
  data_inicio: string;
  data_fim: string;
  tipo: TipoReservaRecorrente;
}

export interface IReservaRecorrenteSemestreCreate {
  motivo: string;
  identificacao?: string;
  sala_id: string;
  frequencia: FrequenciaRecorrencia;
  dia_da_semana?: number[];
  dia_do_mes?: number;
  hora_inicio: string;
  hora_fim: string;
  semestre: string;
  tipo: TipoReservaRecorrente;
}

export interface IReservaRecorrenteUpdate {
  motivo?: string;
  frequencia?: FrequenciaRecorrencia;
  dia_da_semana?: number[];
  data_inicio?: string;
  hora_inicio?: string;
  hora_fim?: string;
  data_fim?: string;
  excecoes?: string[];
  semestre?: string;
}

export interface IReservaRecorrenteFiltros extends FiltrosBase {
  sala_id?: string;
  usuario_id?: string;
  frequencia?: FrequenciaRecorrencia;
  data_inicio?: string;
  data_fim?: string;
}

export type ReservaResponse = RespostaDados<IReserva>;
export type ReservaListResponse = RespostaPaginada<IReserva>;
export type ReservaRecorrenteResponse = RespostaDados<IReservaRecorrente>;
export type ReservaRecorrenteListResponse = RespostaPaginada<IReservaRecorrente>; 
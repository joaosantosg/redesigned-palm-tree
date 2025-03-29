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

export interface IRespostaDados<T> {
  dados: T;
  mensagem: string;
}

export interface IRespostaLista<T> {
  dados: T[];
  mensagem: string;
}

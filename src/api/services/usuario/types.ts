export interface IUsuario {
    id: string;
    nome: string;
    email: string;
    matricula: string;
    curso: string;
    ativo: boolean;
    super_user: boolean;
    ultimo_login: string | null;
    criado_em: string;
    atualizado_em: string;
}

export interface IUsuarioCreate {
    nome: string;
    email: string;
    matricula: string;
    curso: string;
    ativo?: boolean;
    super_user?: boolean;
    senha: string;
}

export interface IUsuarioUpdate {
    nome?: string;
    email?: string;
    matricula?: string;
    curso?: string;
    ativo?: boolean;
    senha?: string;
}

export interface IUsuarioFiltros {
    nome?: string;
    email?: string;
    matricula?: string;
    curso?: string;
    ativo?: boolean;
    super_user?: boolean;
    pagina?: number;
    itens_por_pagina?: number;
}

export interface IPaginacao {
    total: number;
    pagina: number;
    tamanho: number;
    total_paginas: number;
    proxima: boolean;
    anterior: boolean;
}

export interface IRespostaPaginada<T> {
    status: string;
    mensagem: string | null;
    data_hora: string;
    dados: T[];
    paginacao: IPaginacao;
}

export interface IRespostaDados<T> {
    status: string;
    mensagem: string | null;
    data_hora: string;
    dados: T;
}

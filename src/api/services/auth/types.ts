import type { IUsuario } from '../usuario/types';


export interface LoginRequest {
  matricula: string;
  senha: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  usuario: IUsuario;
}

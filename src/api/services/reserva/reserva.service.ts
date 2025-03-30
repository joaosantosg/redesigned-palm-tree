import { api } from 'src/api/api';

import type {
  IReservaCreate,
  IReservaUpdate,
  IReservaFiltros,
  ReservaResponse,
  ReservaListResponse,
  IReservaRecorrenteUpdate,
  IReservaRecorrenteFiltros,
  ReservaRecorrenteResponse,
  ReservaRecorrenteListResponse,
  IReservaRecorrenteRegularCreate,
  IReservaRecorrenteSemestreCreate,
} from './reserva.types';

const BASE_URL = '/v1/reserva';

export class ReservaService {
  // Reservas regulares
  static async listarReservas(filtros: IReservaFiltros): Promise<ReservaListResponse> {
    const response = await api.get<ReservaListResponse>(`${BASE_URL}`, { params: filtros });
    return response.data;
  }

  static async obterReserva(id: string): Promise<ReservaResponse> {
    const response = await api.get<ReservaResponse>(`${BASE_URL}/${id}`);
    return response.data;
  }

  static async criarReserva(reserva: IReservaCreate): Promise<ReservaResponse> {
    const response = await api.post<ReservaResponse>(`${BASE_URL}`, reserva);
    return response.data;
  }

  static async atualizarReserva(id: string, reserva: IReservaUpdate): Promise<ReservaResponse> {
    const response = await api.patch<ReservaResponse>(`${BASE_URL}/${id}`, reserva);
    return response.data;
  }

  static async removerReserva(id: string): Promise<ReservaResponse> {
    const response = await api.delete<ReservaResponse>(`${BASE_URL}/${id}`);
    return response.data;
  }

  // Reservas recorrentes
  static async listarReservasRecorrentes(
    filtros: IReservaRecorrenteFiltros
  ): Promise<ReservaRecorrenteListResponse> {
    const response = await api.get<ReservaRecorrenteListResponse>(`${BASE_URL}/recorrente`, {
      params: filtros,
    });
    return response.data;
  }

  static async obterReservaRecorrente(id: string): Promise<ReservaRecorrenteResponse> {
    const response = await api.get<ReservaRecorrenteResponse>(`${BASE_URL}/recorrente/${id}`);
    return response.data;
  }

  static async criarReservaRecorrenteRegular(
    reserva: IReservaRecorrenteRegularCreate
  ): Promise<ReservaRecorrenteResponse> {
    const response = await api.post<ReservaRecorrenteResponse>(
      `${BASE_URL}/recorrente/regular`,
      reserva
    );
    return response.data;
  }

  static async criarReservaRecorrenteSemestre(
    reserva: IReservaRecorrenteSemestreCreate
  ): Promise<ReservaRecorrenteResponse> {
    const response = await api.post<ReservaRecorrenteResponse>(
      `${BASE_URL}/recorrente/semestre`,
      reserva
    );
    return response.data;
  }

  static async atualizarReservaRecorrente(
    id: string,
    reserva: IReservaRecorrenteUpdate
  ): Promise<ReservaRecorrenteResponse> {
    const response = await api.patch<ReservaRecorrenteResponse>(
      `${BASE_URL}/recorrente/${id}`,
      reserva
    );
    return response.data;
  }

  static async removerReservaRecorrente(id: string): Promise<ReservaRecorrenteResponse> {
    const response = await api.delete<ReservaRecorrenteResponse>(`${BASE_URL}/recorrente/${id}`);
    return response.data;
  }

  static async recriarReservasRecorrentes(id: string): Promise<ReservaRecorrenteResponse> {
    const response = await api.post<ReservaRecorrenteResponse>(
      `${BASE_URL}/recorrente/${id}/recriar`
    );
    return response.data;
  }
} 
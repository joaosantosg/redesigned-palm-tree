import type { DataResponse, ListResponse, PaginatedResponse } from '../../types/base';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  available: boolean;
}

export type RoomApiResponse = DataResponse<Room>;
export type RoomListApiResponse = ListResponse<Room>;
export type RoomPaginatedApiResponse = PaginatedResponse<Room>; 
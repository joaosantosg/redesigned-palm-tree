import { privateApi } from '../../axios';

import type { Room, RoomApiResponse, RoomListApiResponse} from './types';

export const roomService = {
  getAll: async (): Promise<RoomListApiResponse> => {
    const response = await privateApi.get<RoomListApiResponse>('/rooms');
    return response.data;
  },

  getById: async (id: string): Promise<RoomApiResponse> => {
    const response = await privateApi.get<RoomApiResponse>(`/rooms/${id}`);
    return response.data;
  },

  create: async (room: Omit<Room, 'id'>): Promise<RoomApiResponse> => {
    const response = await privateApi.post<RoomApiResponse>('/rooms', room);
    return response.data;
  },

  update: async (id: string, room: Partial<Room>): Promise<RoomApiResponse> => {
    const response = await privateApi.put<RoomApiResponse>(`/rooms/${id}`, room);
    return response.data;
  },

  delete: async (id: string): Promise<RoomApiResponse> => {
    const response = await privateApi.delete<RoomApiResponse>(`/rooms/${id}`);
    return response.data;
  }
}; 
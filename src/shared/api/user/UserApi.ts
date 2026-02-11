import { IUserCreateData, IUserData } from '@/entities';
import { api } from '@/shared';

class UserApi {
  private path = '/users';

  async getUsers(page: number, limit: number): Promise<IUserData[]> {
    const response = await api.get<IUserData[]>(this.path, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  }

  async addUser(newUser: IUserCreateData): Promise<IUserData> {
    const response = await api.post<IUserData>(this.path, newUser);
    return response.data;
  }

  async editUser(id: string, user: IUserCreateData): Promise<IUserData> {
    const response = await api.put<IUserData>(`${this.path}/${id}`, user);
    return response.data;
  }

  async deleteUser(id: string): Promise<IUserData> {
    const response = await api.delete<IUserData>(`${this.path}/${id}`);
    return response.data;
  }
}

export const userApi = new UserApi();

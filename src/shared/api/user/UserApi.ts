import {IUserCreateData, IUserData} from "../../../entities";
import {api} from "../clients/AxiosClient";

class UserApi {
  private path = '/users'

  async getUsers(page: number, limit: number): Promise<IUserData[]> {
    const response = await api.get<IUserData[]>(this.path, {
      params: {
        page,
        limit
      }
    })
    return response.data
  }

  async addUser(newUser: IUserCreateData): Promise<IUserData> {
    const response = await api.post<IUserData>(this.path, newUser)
    return response.data
  }
}

export const userApi = new UserApi()
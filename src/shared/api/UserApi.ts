import {IUserData} from "../../entities";
import {api} from "./AxiosClient";
import {IStatusMessage} from "./types";

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

  async addUser(newUser: IUserData): Promise<IStatusMessage> {
    const response = await api.post<IStatusMessage>(this.path, newUser)
    return response.data
  }
}

export const userApi = new UserApi()
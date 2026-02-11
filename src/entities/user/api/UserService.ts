import {useMutation, useQuery} from "@tanstack/react-query";
import {queryClient, userApi} from "../../../shared";
import {IUserCreateData, IUserEditData} from "../model/types";

export const useUsers =
  (page: number = 1, limit: number) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userApi.getUsers(page, limit),
    keepPreviousData: true,
  })
}

export const useAddUser = () => {
  return useMutation({
    mutationFn: (newUser:IUserCreateData) => userApi.addUser(newUser),
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['users']}),
    onError: (error) => {
      console.error('Ошибка при создании пользователя', error)
    }
  })
}

export const useEditUser = () => {
  return useMutation({
    mutationFn: ({id, user}: {id: string, user: IUserEditData}) => userApi.editUser(id, user),
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['users']}),
    onError: (error) => {
      console.error('Ошибка при редактировании пользователя', error)
    }
  })
}
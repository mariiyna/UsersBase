import {useMutation, useQuery} from "@tanstack/react-query";
import {queryClient, userApi} from "../../../shared";
import {IUserCreateData} from "../model/types";

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
      console.log('Ошибка при создании пользователя', error)
    }
  })
}
import {useMutation, useQuery} from "@tanstack/react-query";
import {queryClient, userApi} from "../../../shared";
import {IUserData} from "../model/types";

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
    mutationFn: (newUser:IUserData) => userApi.addUser(newUser),
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['users']}),
  })
}

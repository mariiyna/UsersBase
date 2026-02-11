import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, userApi } from '@/shared';
import { IUserCreateData } from '@/entities';

export const useUsers = (page: number = 1, limit: number) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userApi.getUsers(page, limit),
    keepPreviousData: true,
  });
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: (newUser: IUserCreateData) => userApi.addUser(newUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (error) => {
      console.error('Ошибка при создании пользователя', error);
    },
  });
};

export const useEditUser = () => {
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: IUserCreateData }) => userApi.editUser(id, user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (error) => {
      console.error('Ошибка при редактировании пользователя', error);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (error) => {
      console.error('Ошибка при удалении пользователя', error);
    },
  });
};

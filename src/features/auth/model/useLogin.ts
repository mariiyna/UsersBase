import { useMutation } from '@tanstack/react-query';
import { IUserFields } from '@/entities';
import { login } from '@/features/auth/api/auth';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd/lib';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUserFields) => login(user.login, user.password),
    onSuccess: (token: string) => {
      localStorage.setItem('token', token);
      navigate('/users', { replace: true });
      notification.success({
        message: 'Успешный вход!',
      });
    },
    onError: (error) => {
      const messageError = error instanceof Error ? error.message : 'Ошибка при авторизации';
      notification.error({
        message: messageError,
      });
    },
    retry: false,
  });
};

import { useMutation } from '@tanstack/react-query';
import { IUserFields } from '@/entities';
import { login } from '@/features/auth/api/auth';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUserFields) => login(user.login, user.password),
    onSuccess: (token: string) => {
      localStorage.setItem('token', token);
      navigate('/users', { replace: true });
      message.success('Успешный вход!');
    },
    retry: false,
  });
};

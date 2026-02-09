import {useMutation} from "@tanstack/react-query";
import {IUser} from "../../../entities/user/model/IUser";
import {login} from '../api/login';
import {message} from "antd";
import {useNavigate} from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => login(user.login, user.password),
    onSuccess: (token: string) => {
      localStorage.setItem('token', token)
      navigate('/users', {replace: true})
      message.success('Успешный вход!')
    },
    retry: false,
  })
}
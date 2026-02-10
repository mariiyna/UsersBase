import {useMutation} from "@tanstack/react-query";
import {logout} from "../api/auth";
import {message} from "antd";
import {useNavigate} from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('token')
      navigate('/login', {replace: true})
      message.success('Успешный выход!')
    },
    retry: false
  })
}
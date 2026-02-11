import React from 'react';
import { IUserFields } from '@/entities';
import { Input } from 'antd';
import type { FormProps } from 'antd';
import { SubmitButton } from 'src/shared/ui/SubmitButton';
import { useLogin } from '@/features/auth';
import { Form } from '@/features/auth/ui/loginForm.style';

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const onFinish: FormProps<IUserFields>['onFinish'] = (user: IUserFields) => login(user);

  return (
    <Form name="loginForm" onFinish={onFinish} autoComplete="off">
      <Form.Item<IUserFields>
        name="login"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите логин!',
          },
          {
            min: 3,
            message: 'Логин должен содержать минимум 3 символа!',
          },
        ]}
      >
        <Input placeholder={'Логин'} />
      </Form.Item>
      <Form.Item<IUserFields>
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль!',
          },
          {
            min: 5,
            message: 'Пароль должен содержать минимум 5 символов!',
          },
        ]}
        hasFeedback
      >
        <Input.Password autoComplete="username" placeholder={'Пароль'} minLength={5} />
      </Form.Item>
      <Form.Item label={null}>
        <SubmitButton text={'Войти'} isLoading={isPending} htmlType={'submit'} />
      </Form.Item>
    </Form>
  );
};

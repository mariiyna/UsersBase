import React, {useEffect} from "react";
import {IUserFields} from "../../../entities";
import {Form as AntdForm, Input, message} from 'antd';
import type { FormProps } from 'antd';
import {SubmitButton} from 'src/shared/ui/SubmitButton'
import styled from 'styled-components';
import {formStyles} from "./loginForm.style";
import {useLogin} from "../model/useLogin";

const Form = styled(AntdForm)<FormProps<IUserFields>>`${formStyles}`

export const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin()

  const onFinish: FormProps<IUserFields>['onFinish'] = (user: IUserFields) => login(user);

  const onFinishFailed: FormProps<IUserFields>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (error) {
      message.error('Ошибка авторизации')
    }
  }, [error]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<IUserFields>
        name="login"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите логин!'
          },
          {
          min: 3,
          message: 'Логин должен содержать минимум 3 символа!'
        }]}
      >
        <Input placeholder={'Логин'}/>
      </Form.Item>
      <Form.Item<IUserFields>
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль!'
          },
          {
            min: 5,
            message: 'Пароль должен содержать минимум 5 символов!'
          }
        ]}
        hasFeedback
      >
        <Input.Password
          autoComplete="username"
          placeholder={'Пароль'}
          minLength={5}
        />
      </Form.Item>
      <Form.Item label={null}>
        <SubmitButton
          text={'Войти'}
          isLoading={isPending}
          htmlType={'submit'}
        />
      </Form.Item>
    </Form>
  )
}
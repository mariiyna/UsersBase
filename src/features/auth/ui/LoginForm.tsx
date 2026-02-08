import React from "react";
import {IFormFields} from "../model/types";
import {Form as AntdForm, Input} from 'antd';
import type { FormProps } from 'antd';
import {SubmitButton} from 'src/shared/ui/SubmitButton'
import styled from 'styled-components';

interface StyledFormProps extends FormProps<IFormFields> {}

const Form = styled(AntdForm)<StyledFormProps>`
    margin: 0 auto;
    
    .ant-form-item {
        margin-bottom: 25px !important;
        width: 100% !important;
        
        &:last-child {
            margin-bottom: 0;
            .ant-form-item-control {
                text-align: right;
            }
        }
    }

    .ant-form-item-control {
        max-width: 100% !important;
        width: 100% !important;
    }
`

const onFinish: FormProps<IFormFields>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<IFormFields>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const LoginForm: React.FC = () => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<IFormFields>
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
      >
        <Input placeholder={'Логин'}/>
      </Form.Item>
      <Form.Item<IFormFields>
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]} hasFeedback
      >
        <Input.Password placeholder={'Пароль'}/>
      </Form.Item>
      <Form.Item label={null}>
        <SubmitButton
          text={'Войти'}
          onClick={() => console.log('click auth btn')}
        />
      </Form.Item>
    </Form>
  )
}
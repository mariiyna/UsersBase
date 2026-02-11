import styled from 'styled-components';
import { Form as AntdForm, type FormProps } from 'antd';
import { IUserModalFields } from '@/features/user-management/model/types';
import { CloseOutlined } from '@ant-design/icons';

export const Form = styled(AntdForm)<FormProps<IUserModalFields>>`
  position: relative;

  .ant-form-item {
    margin-bottom: 0.5rem;
  }

  .ant-form-item .ant-form-item-label {
    padding: 0;
  }
`;

export const FormAction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;

  div {
    display: flex;
    gap: 5px;
  }
`;

export const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

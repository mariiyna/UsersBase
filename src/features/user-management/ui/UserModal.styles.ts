import styled from "styled-components";
import {IUserFields} from "../../../entities";
import {Form as AntdForm, type FormProps} from 'antd';

export const Form = styled(AntdForm)<FormProps<IUserFields>>`
  .ant-form-item {
    margin-bottom: 0.5rem;
  }

  .ant-form-item .ant-form-item-label {
      padding: 0;
  }
`

export const FormAction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  
  div {
    display: flex;
    gap: 5px;
  }
`
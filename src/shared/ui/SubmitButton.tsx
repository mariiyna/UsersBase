import { Button as AntdButton} from 'antd';
import React from "react";
import styled from 'styled-components';

const Button = styled(AntdButton)`
   &.ant-btn {
     background-color: #1554ad;
   }
`

interface ButtonProps {
  isLoading?: boolean;
  text: string;
  onClick: () => void;
}

export const SubmitButton: React.FC<ButtonProps> = ({isLoading = false, text, onClick}) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      loading={isLoading}
      htmlType="submit"
    >
      {text}
    </Button>
  )
}
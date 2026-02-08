import React from 'react';
import {LoginForm} from "../../features/auth";
import styled from "styled-components";

const Wrapper = styled.h1`
  max-width: 450px !important;
  margin: 15vh auto 0 auto;
    
   h1 {
       text-align: left;
       margin: 0;
       font-weight: 500;
       font-size: 20px;
       margin-bottom: 25px;
   }
`

export const LoginPage: React.FC = () => {
  return (
    <Wrapper>
      <h1>Авторизация</h1>
      <LoginForm/>
    </Wrapper>
  )
}
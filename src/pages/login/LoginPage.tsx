import React from 'react';
import { LoginForm } from '@/features/auth';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 450px !important;
  margin: 15vh auto 0 auto;
  padding: 0 30px;

  h1 {
    text-align: left;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 25px;
  }
`;

export const LoginPage = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/users" replace />;
  }

  return (
    <Wrapper>
      <h1>Авторизация</h1>
      <LoginForm />
    </Wrapper>
  );
};

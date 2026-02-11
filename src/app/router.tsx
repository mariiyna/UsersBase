import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login/LoginPage';
import UsersPage from '@/pages/users/UsersPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';
import { ProtectedRoute } from '@/app/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  // const token: string | null = localStorage.getItem('token');
  //
  // if (!token) {
  //   return <Navigate to='/login' replace/>
  // }
  return <Outlet/>
}
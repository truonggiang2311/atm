import React from 'react';
import MainLayout from '../pages/MainLayout';
import Login from '../pages/Login';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'atm',
    element: <MainLayout />,
  },
]);

export default routes;

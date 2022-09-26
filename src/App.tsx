import './App.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import routes from './routes';

function App() {
  return <RouterProvider router={routes} />;
}

export default App;

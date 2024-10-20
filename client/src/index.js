import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashbaord';
import Demo from './components/Demo';
import cors from 'cors'
import SalesData from './components/SalesData';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Registration from './components/Registration';
const router = createBrowserRouter([
{
  path:'/dashboard',
  element:<Dashboard/>
},
{
 path:'/login',
 element:<Login/>
},
{
  path:'/',
  element:<LandingPage/>
},
{
  path:'/Demo',
  element:<Demo/>
},
{
  path:'/Register',
  element:<Registration/>
},
{
  path:'/Sales/:id',
  element:<SalesData/>
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
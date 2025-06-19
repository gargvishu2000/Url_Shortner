import React from 'react'
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm';


const App = () => {
  return (
    <>
    <Navbar />
   <Outlet />
    </>
  )
}

export default App

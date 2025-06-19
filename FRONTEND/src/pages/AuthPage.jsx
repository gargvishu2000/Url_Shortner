import React from 'react'
import LoginForm from '../components/loginForm'
import { useState } from 'react'
import RegisterForm from '../components/registerForm';

const AuthPage = () => {

    const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">URL Shortener</h1>
      {
        login ? <LoginForm state = {setLogin} /> : <RegisterForm state={setLogin} />
      }
    </div>
  )
}

export default AuthPage
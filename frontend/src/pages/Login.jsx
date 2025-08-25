import React, { useState } from 'react'
import LoginPage from '../components/LoginPage'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default Login

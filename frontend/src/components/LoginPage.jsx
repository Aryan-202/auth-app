import React from 'react'
import LoginNavbar from './LoginNavbar'
import LoginHero from './LoginHero'
import LoginBackgroundElements from './LoginBackgroundElements'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <LoginNavbar />
      <LoginHero />
      <LoginBackgroundElements />
    </div>
  )
}

export default LoginPage
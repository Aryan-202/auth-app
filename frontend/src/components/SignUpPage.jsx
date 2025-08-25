import React from 'react'
import SignUpNavbar from './SignUpNavbar'
import SignUpHero from './SignUpHero'
import SignUpBackgroundElements from './SignUpBackgroundElements'

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <SignUpNavbar />
      <SignUpHero />
      <SignUpBackgroundElements />
    </div>
  )
}

export default SignUpPage
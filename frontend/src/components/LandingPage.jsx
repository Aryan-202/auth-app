import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import BackgroundElements from './BackgroundElements'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <Navbar />
      <HeroSection />
      <BackgroundElements />
    </div>
  )
}

export default LandingPage
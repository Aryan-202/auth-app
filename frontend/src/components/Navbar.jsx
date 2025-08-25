import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100'>
      {/* Logo Section */}
      <div className='flex items-center gap-3'>
        <img src={assets.logo} alt="Logo" className='w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-md'/>
        <span className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          BrandName
        </span>
      </div>

      {/* Desktop Navigation Menu */}
      <div className='hidden md:flex items-center space-x-8'>
        <a href="#home" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'>
          Home
          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href="#about" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'>
          About
          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href="#services" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'>
          Services
          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href="#portfolio" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'>
          Portfolio
          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href="#contact" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'>
          Contact
          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
        </a>
      </div>

      {/* Right Section - Search, Theme Toggle, Login */}
      <div className='flex items-center gap-4'>
        {/* Search Icon */}
        <button className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300'>
          <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </button>

        {/* Theme Toggle */}
        <button className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300'>
          <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
          </svg>
        </button>

        {/* Login Button */}
        <button className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
          Login 
          <img src={assets.arrow_icon} alt="Arrow" className='w-4 h-4' />
        </button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300'
        >
          <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 md:hidden'>
          <div className='flex flex-col space-y-4 p-6'>
            <a href="#home" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300'>Home</a>
            <a href="#about" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300'>About</a>
            <a href="#services" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300'>Services</a>
            <a href="#portfolio" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300'>Portfolio</a>
            <a href="#contact" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300'>Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
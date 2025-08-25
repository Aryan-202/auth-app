import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <header className='relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 pt-24'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          
          {/* Left Content */}
          <div className='text-center md:text-left space-y-8'>
            <div className='inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium'>
              <span className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
              Welcome to the Future
            </div>

            <div className='space-y-6'>
              <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight'>
                <span className='bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent'>
                  Create Amazing
                </span>
                <br />
                <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Experiences
                </span>
                <div className='inline-flex items-center ml-4'>
                  <img className='w-12 h-12 sm:w-16 sm:h-16 animate-bounce' src={assets.hand_wave} alt="Wave" />
                </div>
              </h1>

              <p className='text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed'>
                Transform your ideas into stunning digital experiences with our cutting-edge solutions. 
                Join thousands of satisfied customers who trust our innovative approach.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-purple-700'>
                Get Started Free
              </button>
              <button className='border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:shadow-lg'>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-8 pt-8 border-t border-gray-200'>
              <div className='text-center'>
                <div className='text-2xl sm:text-3xl font-bold text-gray-900'>50K+</div>
                <div className='text-gray-600 font-medium'>Happy Users</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl sm:text-3xl font-bold text-gray-900'>99.9%</div>
                <div className='text-gray-600 font-medium'>Uptime</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl sm:text-3xl font-bold text-gray-900'>24/7</div>
                <div className='text-gray-600 font-medium'>Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className='relative'>
            <div className='relative'>
              {/* Main Image Container */}
              <div className='relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500'>
                <img 
                  src={assets.header_img} 
                  alt="Hero" 
                  className='w-full h-auto rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500'
                />
                
                {/* Floating Elements */}
                <div className='absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce'>
                  🚀 New!
                </div>
                
                <div className='absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg'>
                  ✓ Verified
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className='absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10'></div>
            </div>

            {/* Floating Cards */}
            <div className='absolute top-0 right-0 bg-white rounded-xl shadow-xl p-4 transform translate-x-4 -translate-y-4 hidden lg:block'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                  <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>Success Rate</div>
                  <div className='text-green-600 font-bold'>98.5%</div>
                </div>
              </div>
            </div>

            <div className='absolute bottom-0 left-0 bg-white rounded-xl shadow-xl p-4 transform -translate-x-4 translate-y-4 hidden lg:block'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                  <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>Active Users</div>
                  <div className='text-blue-600 font-bold'>12.5K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </header>
  )
}

export default Header
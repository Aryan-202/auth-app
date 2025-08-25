import React from 'react'
import SignUpForm from './SignUpForm'

const SignUpHero = () => {
  return (
    <div className="relative z-10 px-6 pt-20 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Welcome text */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Join the
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Future</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Create your secure account today and experience next-generation 
              authentication with complete privacy protection.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/70">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Free account with premium security</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Multi-platform synchronization</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>

          {/* Right side - Sign up form */}
          <div className="flex justify-center lg:justify-end">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpHero
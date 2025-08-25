import React from 'react'
import LoginForm from './LoginForm'

const LoginHero = () => {
  return (
    <div className="relative z-10 px-6 pt-20 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Welcome text */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Secure
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Access</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Your gateway to secure, seamless authentication. 
              Protecting what matters most with enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <div className="flex items-center space-x-2 text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Multi-factor authentication</span>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginHero
import React from 'react'
import { Lock, ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="relative z-10 px-6 pt-20 pb-32">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-pulse mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full mb-6">
            <Lock className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Secure Your
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> Digital Life</span>
        </h1>
        
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience next-generation authentication with military-grade security, 
          seamless user experience, and complete privacy protection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
export default HeroSection
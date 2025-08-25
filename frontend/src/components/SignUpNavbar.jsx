import React from 'react'
import { Shield, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SignUpNavbar = () => {

  const navigate = useNavigate();
  return (
    <nav className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">SecureAuth</span>
        </div>

        <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </nav>
  )
}

export default SignUpNavbar
import React, { use } from 'react'
import { Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <nav className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">SecureAuth</span>
        </div>
        <button onClick={() => navigate('/login')} className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
          Login
        </button>
      </div>
    </nav>
  )
}

export default Navbar
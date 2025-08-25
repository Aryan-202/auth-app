import React from 'react'

const LoginBackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-indigo-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  )
}

export default LoginBackgroundElements
import React from 'react'

const SignUpBackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 animate-pulse delay-500"></div>
      <div className="absolute top-1/2 -right-20 w-60 h-60 bg-blue-500 rounded-full opacity-10 animate-pulse delay-1500"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500 rounded-full opacity-10 animate-pulse delay-2500"></div>
      
      {/* Different grid pattern for variation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
    </div>
  )
}

export default SignUpBackgroundElements
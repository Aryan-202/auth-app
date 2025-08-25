import React from 'react'

const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-cyan-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
    </div>
  )
}

export default BackgroundElements

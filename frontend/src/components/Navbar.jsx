import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32'/>
      <button className='flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-full px-6 py-2 hover:bg-blue-500 hover:text-white transition-all duration-300'>
        Login <img src={assets.arrow_icon} alt="Login Icon" />
      </button>
    </div>


  )
}

export default Navbar


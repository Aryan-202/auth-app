import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32'/>
      <button>Login</button>
    </div>


  )
}

export default Navbar


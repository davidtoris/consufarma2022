import React from 'react'
import Image from 'next/image'
import logo from '../..//assets/logo.png'

const NavBar = () => {
  return (
    <>
    <header className="text-center mt-6">
      <Image src={logo} />
    </header>
    <nav className="flex text-blueDark justify-center py-3">
      <div className="px-2">item</div>
      <div className="px-2">item</div>
      <div className="px-2">item</div>
      <div className="px-2">item</div>
      <div className="px-2">item</div>
    </nav>
    </>
  )
}

export default NavBar

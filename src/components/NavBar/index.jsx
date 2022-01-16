import React from 'react'
import Image from 'next/image'
import logo from '../..//assets/logo.png'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className='bg-white'>
    <header className="text-center mt-6">
      <Link href="/">
        <Image src={logo} className='cursor-pointer' />
      </Link>
    </header>
    <nav className="flex text-blueDark justify-center py-3">
      <div className="px-2">item</div>
      <div className="px-2">item</div>
      <div className="px-2">item</div>
      <div className="px-2">item</div>
      <div className="px-2">item</div>
    </nav>
    </div>
  )
}

export default NavBar

import React from 'react'
import Image from 'next/image'
import logo from '../..//assets/logo.png'
import Link from 'next/link'
import SocialContact from '../../containers/SocialContact'

const NavBar = () => {
  return (
    <>
    <div className='bg-white'>

    <SocialContact />
    
    <header className="text-center mt-3">
      <Link href="/">
        <a>
          <Image src={logo} className='cursor-pointer' />
        </a>
      </Link>
    </header>
    <nav className="flex text-gray-700 justify-center py-3 font-semibold">
      <Link href="/">
        <div className="px-2 cursor-pointer hover:border-b-2 border-blueLightCustom">Cursos</div>
      </Link>
      <Link href="/nosotros">
        <div className="px-2 cursor-pointer hover:border-b-2 border-blueLightCustom">Nosotros</div>
      </Link>
      <Link href="/servicios">
        <div className="px-2 cursor-pointer hover:border-b-2 border-blueLightCustom">Servicios</div>
      </Link>
      <Link href="/calendario">
        <div className="px-2 cursor-pointer hover:border-b-2 border-blueLightCustom">Calendario</div>
      </Link>
    </nav>
    </div>
    </>
  )
}

export default NavBar

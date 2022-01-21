import React from 'react'
import Image from 'next/image'
import logo from '../..//assets/logo.png'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className='bg-white'>
    <header className="text-center mt-6">
      <Link href="/">
        <a>
          <Image src={logo} className='cursor-pointer' />
        </a>
      </Link>
    </header>
    <nav className="flex text-blueDarkCustom justify-center py-3">
      <Link href="/cursos">
        <div className="px-2 cursor-pointer">Cursos</div>
      </Link>
      <Link href="/nosotros">
        <div className="px-2 cursor-pointer">Nosotros</div>
      </Link>
      <Link href="/servicios">
        <div className="px-2 cursor-pointer">Servicios</div>
      </Link>
      <Link href="/calendario">
        <div className="px-2 cursor-pointer">Calendario</div>
      </Link>
      <Link href="/contacto">
        <div className="px-2 cursor-pointer">Contacto</div>
      </Link>
    </nav>
    </div>
  )
}

export default NavBar

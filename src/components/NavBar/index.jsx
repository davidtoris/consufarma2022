import React from 'react'
import Image from 'next/image'
import logo from '../..//assets/logo.png'
import Link from 'next/link'
import SocialContact from '../../containers/SocialContact';
import Head from 'next/head'

const NavBar = () => {
  return (
    <div className='header-content no-print'>
      <Head>
          <title>Consufarma</title>
      </Head>
      <div className='bg-white'>

        <SocialContact />
      
        <header className="text-center mt-3">
          <Link href="/" passHref>
            <a>
              <Image src={logo} className='cursor-pointer' alt="logo-consufarma"/>
            </a>
          </Link>
        </header>
        <nav className="flex text-white justify-center py-3 font-semibold text-lg bg-redConsufarma">
          <Link href="/" passHref>
            <div className="px-2 cursor-pointer">Cursos</div>
          </Link>
          <Link href="/nosotros" passHref>
            <div className="px-2 cursor-pointer">Nosotros</div>
          </Link>
          <Link href="/servicios" passHref>
            <div className="px-2 cursor-pointer">Servicios</div>
          </Link>
          <Link href="/cursos/calendario" passHref>
            <div className="px-2 cursor-pointer">Calendario</div>
          </Link>
          <Link href="/contacto" passHref>
            <div className="px-2 cursor-pointer">Contacto</div>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default NavBar

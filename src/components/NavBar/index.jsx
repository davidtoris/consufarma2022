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
          <link rel="icon" href="https://res.cloudinary.com/drq8o9k36/image/upload/v1674500063/favicon_belpvv.ico" type="image/x-icon" />
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
            <div className="px-4 cursor-pointer">Cursos</div>
          </Link>
          {/* <Link href="/reto" passHref>
            <div className="px-2 cursor-pointer bg-blueLightCustom rounded-md text-center">Reto Consufarma</div>
          </Link> */}
          <Link href="/nosotros" passHref>
            <div className="px-4 cursor-pointer hidden md:inline">Nosotros</div>
          </Link>
          <Link href="/servicios" passHref>
            <div className="px-4 cursor-pointer">Servicios</div>
          </Link>
          <a href="../calendario-cursos-2023.pdf">
            <div className="px-4 cursor-pointer hidden md:inline">
              Calendario
            </div>
          </a>
          <Link href="/contacto" passHref>
            <div className="px-4 cursor-pointer hidden md:inline">Contacto</div>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default NavBar

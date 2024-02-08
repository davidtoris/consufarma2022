import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../..//assets/logo.png'
import Link from 'next/link'
import SocialContact from '../../containers/SocialContact';
import Head from 'next/head'
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../store/slices/basketSlice';
import Cookies from "js-cookie"
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from 'next/router';


const NavBar = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [userName, setUserName] = useState('')
  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const user = JSON.parse(userCookie)
      setUserName(user.nombre)
    }
  }, [])

  const { allBasket } = useSelector((state) => state.basket);

  useEffect(() => {
    if ( localStorage.getItem('cart') ) {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        dispatch(addItem(storedCart.length))
      }
    }
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const showMenuToogle = () => {
    setShowMenu(!showMenu);
  }

  const logOut = () => {
    router.push("/login")
    Cookies.remove('tokenUser');
    Cookies.remove('user');
  }

  console.log(showMenu)
  return (
    <div className='header-content no-print'>
      <Head>
        <title>Consufarma</title>
        <link rel="icon" href="https://res.cloudinary.com/drq8o9k36/image/upload/v1674500063/favicon_belpvv.ico" type="image/x-icon" />
      </Head>
      <div className='bg-white'>
        <SocialContact />
        <header className="text-center mt-3 flex items-center justify-center">
          <div className="relative">
          <Link href="/" passHref>
            <a className="">
              <Image src={logo} className='cursor-pointer' alt="logo-consufarma"/>
            </a>
          </Link>
          </div>
          <div className="text-3xl flex absolute right-20 ">
            <Link href="/carrito">
              <div className="relative hover:scale-105 transition hidden md:flex">
                <FaShoppingCart className="text-blueConsufarma cursor-pointer"/>
                {allBasket > 0 && (
                  <div className="bg-red-600 text-white font-semibold rounded-full text-sm absolute h-5 w-5 left-5 bottom-6">
                    {allBasket}
                  </div>
                )}
              </div>
            </Link>
            
            {userName ? (
              
                <div className="items-center cursor-pointer hover:scale-105 transition relative hidden md:flex" onClick={showMenuToogle}>
                  <FaUserCircle className="text-blueConsufarma ml-3"/>
                  <div className="ml-2 text-sm flex">
                    {userName} <span className='ml-2'> <FaChevronDown /> </span>
                  </div>
                  {showMenu && (
                    <div className='absolute text-xs top-10 bg-gray-200 py-3 px-5 left-1 rounded-md hover:bg-gray-300 w-full' 
                    onClick={logOut}>
                      Cerrar Sesión
                    </div>
                  )}
                </div>
              
            ) : (
              <Link href="/login" className="">
                <div className="items-center cursor-pointer hover:scale-105 transition relative hidden md:flex" onClick={showMenuToogle}>
                  <div className="flex items-center">
                    <FaUserCircle className="text-blueConsufarma ml-3"/>
                    <div className="ml-2 text-sm">Iniciar Sesión</div>
                  </div>
                </div>
              </Link>
            )}

          </div>
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
            <div className="px-4 cursor-pointer hidden md:inline">Servicios</div>
          </Link>

          
          
            <Link href="/carrito">
              <div className="hover:scale-105 transition flex md:hidden items-center mx-3 relative">
                <FaShoppingCart className="text-white cursor-pointer"/>
                {allBasket > 0 && (
                  <div className="bg-blueConsufarma text-white font-semibold rounded-full text-sm absolute h-7 w-7 left-3 bottom-4 z-10 text-center">
                    {allBasket}
                  </div>
                )}
              </div>
            </Link>

            {/* ONLY SHOWS IN MOBILE */}
              {userName ? (
                  <div className="flex items-center cursor-pointer hover:scale-105 transition relative md:hidden" onClick={showMenuToogle}>
                    <FaUserCircle className="text-white ml-3"/>
                    <div className="ml-2 text-sm flex">
                      {userName} <span className='ml-2'> <FaChevronDown /> </span>
                    </div>
                    {showMenu && (
                      <div className='absolute text-xs top-10 bg-blueConsufarma py-3 px-5 left-1 rounded-md hover:bg-gray-300 w-[121px] z-10' 
                      onClick={logOut}>
                        Cerrar Sesión
                      </div>
                    )}
                  </div>
                
              ) : (
                <Link href="/login" className="">
                  <div className="flex items-center cursor-pointer hover:scale-105 transition relative md:hidden" onClick={showMenuToogle}>
                    <div className="flex items-center">
                      <FaUserCircle className="text-white ml-3"/>
                      <div className="ml-2 text-sm">Iniciar Sesión</div>
                    </div>
                  </div>
                </Link>
              )}
            {/* ************** */}
          
          
          <a href="../calendario-2024.pdf">
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

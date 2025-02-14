import Link from 'next/link'
import React, { useState } from 'react'
import { IoMenu } from 'react-icons/io5'

const Menu = () => {

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='fixed top-0 left-0 p-4 z-10'>
      <div onClick={() => setShowMenu(!showMenu)} className='relative cursor-pointer z-10'>
        <IoMenu />
      </div>
      {showMenu && (
        <div className='relative -left-4 -top-8 h-screen bg-blueLightCustom text-white p-5 shadow-md z-5 pt-14 '>
          <Link href="/examen/consAdmTes">
            <div className='cursor-pointer font-bold hover:underline hover:scale-105 transform duration-500 ease-out'>Exámenes</div>
          </Link>
          <Link href="/examen/consAdmTes/calificaciones">
            <div className='cursor-pointer font-bold hover:underline my-2 hover:scale-105 transform duration-500 ease-out'>Calificaciones/Constancia Individuales</div>
          </Link>
          <Link href="/examen/consAdmTes/calificacionesCursos">
            <div className='cursor-pointer font-bold hover:underline hover:scale-105 transform duration-500 ease-out'>Calificaciones/Constancia Grupales</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Menu
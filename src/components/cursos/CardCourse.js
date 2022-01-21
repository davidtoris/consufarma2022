import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const CardCourse = ({link, nombre, img, label, ponente}) => {
  return (
    <Link href={link}>
      <a>
      <div className='hover:scale-105 transition transform duration-200 ease-out p-2 font-body shadow-lg bg-white rounded-md w-[300px] shrink-0 cursor-pointer h-[285px]'>
        <div className=''>
            <div className='absolute z-10 right-0 mt-5 bg-greenCustom p-1 pl-2 text-white rounded-l-lg uppercase font-semibold'>
              {label}
            </div>
            <div className='relative w-100 h-24'>
              <Image src={`https://www.consufarma.com/vistas/img/${img}`} layout='fill' priority="false"/>
            </div>
        </div>
        <div className='info p-3'>
          <div className='name-course font-semibold text-gray-700'>
            {nombre}
          </div>
          <div className='instructor flex my-2 items-center'>
            <UserCircleIcon className='w-6 h-6 text-gray-600' />
            <div className='name-instructor text-sm ml-2 text-gray-600'>
              {ponente}
            </div>
          </div>
          <div className='rating text-yellow-500'>
            Rating
          </div>
        </div>
      </div>
      </a>
    </Link>
    
  )
}

export default CardCourse;
import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const CardCourse = ({link}) => {
  return (
    <Link href={`${link}`}>
      <div className='hover:scale-105 transition transform duration-200 ease-out p-2 font-body shadow-lg bg-white rounded-md w-[300px] shrink-0 cursor-pointer'>
        <div className=''>
            <div className='absolute z-10 right-0 mt-5 bg-greenCustom p-1 pl-2 text-white rounded-l-lg uppercase font-semibold'>
              Promoción
            </div>
            <div className='relative w-100 h-24'>
              <Image src="/courses-img/validacion.jpg" layout='fill'/>
            </div>
        </div>
        <div className='info p-3'>
          <div className='name-course font-semibold text-gray-700'>
            Excursiones” - Estudios de estabilidad para soporte regulatorio
          </div>
          <div className='instructor flex my-2 items-center'>
            <UserCircleIcon className='w-6 h-6 text-gray-600' />
            <div className='name-instructor text-sm ml-2 text-gray-600'>
              Pedro Valadez
            </div>
          </div>
          <div className='rating text-yellow-500'>
            Rating
          </div>
        </div>
      </div>
    </Link>
    
  )
}

export default CardCourse;
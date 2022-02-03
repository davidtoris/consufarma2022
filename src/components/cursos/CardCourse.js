import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Label from './Label'

const CardCourse = ({link, nombre, img, label, ponente, fecha}) => {
  return (
    <Link href={link}>
      <a>
      <div className='hover:scale-105 transition transform duration-200 ease-out p-2 font-body shadow-lg bg-white rounded-md w-[300px] shrink-0 cursor-pointer h-[285px]'>
        <div className=''>
              <Label 
              label={label} />
            <div className='relative w-100 h-24'>
              <Image src={`https://www.consufarma.com/vistas/img/${img}`} layout='fill' priority="false" alt={nombre}/>
            </div>
            {fecha != '' && (
              <div className='text-center bg-blueDarkCustom text-white py-1'>
                {fecha}
              </div>
            )}
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
          {/* <div className='rating text-yellowCustom'>
            Rating
          </div> */}
        </div>
      </div>
      </a>
    </Link>
    
  )
}

export default CardCourse;
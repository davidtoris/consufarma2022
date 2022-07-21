import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Label from './Label'
import moment from 'moment'

const CardCourse = ({link, nombre, img, label, ponente, fecha, fechaText, duracion}) => {
  return (
    <Link href={link}>
      <a>
      <div className='hover:scale-105 transition transform duration-200 ease-out p-2 font-body shadow-lg bg-white rounded-md w-[300px] shrink-0 cursor-pointer h-[350px]'>
        <div className=''>
          {label && (
            <Label 
            label={label} />
          )}
          <div className='relative w-100 h-24'>
            <Image src={img} layout='fill' priority="false" alt={nombre}/>
          </div>
          <div className='text-center bg-blueConsufarma text-white py-1 text-sm'>
              {fechaText}
            <div className='font-bold mt-1'>
              {duracion}
            </div>
          </div>
        </div>
        <div className='info p-3 flex justify-between flex-col h-[60%]'>
          <div className='name-course font-semibold text-gray-700 text-center'>
            {nombre}
          </div>
          <div className='flex justify-center'>
            <div className='bg-blueLightCustom text-center text-white font-bold w-8/12 rounded-md py-1'>
              ONLINE
            </div>
          </div>
          <div className='instructor flex my-2 items-center'>
            <UserCircleIcon className='w-6 h-6 text-gray-600' />
            <div className='name-instructor text-sm ml-2 text-gray-600'>
              {ponente}
            </div>
          </div>
        </div>
      </div>
      </a>
    </Link>
    
  )
}

export default CardCourse;
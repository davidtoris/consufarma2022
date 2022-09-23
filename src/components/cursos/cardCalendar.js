import React from 'react'
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const CardCalendar = ({ nombre, fecha, duracion, horario}) => {
  return (
    <>
      <div className='hover:scale-105 transition transform duration-200 ease-out px-0 py-3 font-body
      shadow-xl bg-white rounded-md w-[320px] shrink-0 cursor-pointer mb-4 h-[280px] flex align-middle justify-center card-calendar border-solid border-2 border-gray-200'>

        <div className=''>
          <div className='name-course font-semibold text-gray-700 text-center text-base p-2'>
            {nombre}
          </div>
          <div className='name-course font-semibold text-center w-full m-auto mt-4 pt-1 pb-3 text-blueConsufarma text-sm'>
          <div className='font-bold mt-1 flex justify-center items-center'>
                <FaCalendarAlt className='w-4 h-4 ml-3 mr-1'/>
                {fecha}
              </div>
              <div className='font-bold mt-1 flex justify-center items-center'>
                <FaClock className='w-4 h-4 ml-1 mr-1'/>
                {duracion} {horario}
              </div>
          </div>
          <div className='bg-blueLightCustom text-white text-center font-bold p-2 text-sm m-3 rounded-md'>
            ONLINE
          </div>
        </div>
        
      </div>
    </>
  )
}

export default CardCalendar;

import React from 'react'

const CardCalendar = ({ nombre, fecha, duracion}) => {
  return (
    <>
      <div className='hover:scale-105 transition transform duration-200 ease-out p-5 pt-3 font-body
      shadow-lg bg-white rounded-md w-[320px] shrink-0 cursor-pointer mb-7 h-[180px] flex align-middle justify-center card-calendar'>

        <div>
          <div className='name-course font-semibold text-gray-700 text-center'>
            {nombre}
          </div>
          <div className='name-course font-semibold text-center bg-blueLightCustom w-8/12 m-auto mt-2 text-white rounded-md'>
            {fecha}
          </div>
          {/* <div className='name-course font-semibold text-gray-700 text-center'>
            {duracion}
          </div> */}
        </div>
        
      </div>
    </>
  )
}

export default CardCalendar;

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCalendarAlt, FaClock, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link'
import Label from './Label'
import moment from 'moment'
import Cookies from 'js-cookie'



const CardCourse = ({link, nombre, img, label, ponente, ponenteDos, horario, fechaText, duracion, lugar}) => {

  const courseSelected = {
    link, nombre, img, label, ponente, ponenteDos, horario, fechaText, duracion, lugar
  }

  // const [listLastCourses, setListLastCourses] = useState(
  //   JSON.parse(localStorage.getItem('lastCourses')) || []
  // );

  // // 🗂️ Cargar datos desde localStorage al montar el componente
  // useEffect(() => {
  //   const lastCourses = JSON.parse(localStorage.getItem('lastCourses'));
  //   if (lastCourses && lastCourses.length > 0) {
  //     setListLastCourses(lastCourses);
  //   }
  // }, []);

  // // 💾 Guardar en localStorage cada vez que listLastCourses cambie
  // useEffect(() => {
  //   localStorage.setItem('lastCourses', JSON.stringify(listLastCourses));
  // }, [listLastCourses]);
  
  // // ➕ Agregar curso al listado y guardar en localStorage
  // const setListCourses = () => {
  //   setListLastCourses((prevCourses) => {
  //     const exists = prevCourses.some(course => course.link === courseSelected.link);
  //     if (!exists) {
  //       const updatedCourses = [...prevCourses, courseSelected];
  //       localStorage.setItem('lastCourses', JSON.stringify(updatedCourses));
  //       return updatedCourses;
  //     }
  //     return prevCourses;
  //   });
  // };
  

  return (
    <Link href={link}>
      <a>
        <div className='hover:scale-105 transition transform duration-200 ease-out p-2 font-body shadow-lg bg-white rounded-md w-[300px] shrink-0 cursor-pointer h-[370px]'>
          <div className=''>
            {label && (
              <Label 
              label={label} />
            )}
            <div className='relative w-100 h-24'>
              <Image src={img} layout='fill' priority="false" alt={nombre}/>
            </div>
            <div className='text-center bg-blueConsufarma text-white py-1 text-sm'>
              <div className='font-bold mt-1 flex justify-center items-center'>
                <FaCalendarAlt className='w-4 h-4 ml-3 mr-1'/>
                {fechaText === 'Programar' ? (
                  <div>Por programar: <span className='text-blueLightCustom'>“Inscríbete”</span></div>
                ) : fechaText }
              </div>
              <div className='font-bold mt-1 flex justify-center items-center'>
                <FaClock className='w-4 h-4 ml-1 mr-1'/>
                {duracion}h {horario}
              </div>
            </div>
          </div>
          <div className='info p-3 flex justify-between flex-col h-[60%]'>
            <div className='name-course font-semibold text-gray-700 text-center'>
              {nombre}
            </div>
            <div className='flex justify-center'>
              {lugar === 'ONLINE' && (
                <div className='bg-blueLightCustom text-center text-white font-bold w-8/12 rounded-md py-1'>
                  ONLINE
                </div>
              )}
              {lugar === 'PRESENCIAL' && (
                <div className='bg-pinkCustom text-center text-white font-bold w-8/12 rounded-md py-1'>
                  PRESENCIAL
                </div>
              )}
            </div>
            <div className='instructor flex my-2 items-center flex-col'>
              <div className='flex'>
                <FaUserCircle className='w-6 h-6 text-gray-600' />
                <div className='name-instructor text-sm ml-2 text-gray-600'>
                  {ponente}
                </div>
              </div>

              {ponenteDos !== 'ninguno' && (
                <div className='flex mt-2'>
                  <FaUserCircle className='w-6 h-6 text-gray-600' />
                  <div className='name-instructor text-sm ml-2 text-gray-600'>
                    {ponenteDos}
                  </div>
                </div>                  
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardCourse;
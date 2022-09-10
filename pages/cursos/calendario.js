import Image from 'next/image';
import React from 'react';
import CardCalendar from '../../src/components/cursos/cardCalendar';

import NavBar from '../../src/components/NavBar';
import { API_BASE_URL } from '../../src/constants';
import Footer from '../../src/containers/Footer';

const Calendar = ({cursosDate}) => {

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  console.log(cursosDate.filter(f => f.fecha_text.includes('Octubre')))


  return (
    <>
      <NavBar />
      <div className='w-6/12 m-auto'>
        <img src='../logo.png' alt='' />
      </div>
      <div className='w-12/12'>
        <Image src="/calendario/banner1.png" objectFit='content' width={2200} height={150} />
      </div>

      <div className='container m-auto px-2 md:px-2 mt-10 cont-cols-calendar'>

        <div>
          <h2 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center mb-8'>Septiembre</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 cols-calendar'>
            {cursosDate.filter(f => f.fecha_text.includes('Septiembre')).map(c => (
              <CardCalendar
                nombre={c.nombre}
                fecha={c.fecha_text}
                duracion={c.duracion}
               />
            ))}
          </div>
        </div>
      </div>

      <div className='w-12/12'>
        <Image src="/calendario/banner1.png" objectFit='content' width={2200} height={150} />
      </div>

      <div className='container m-auto px-2 md:px-2 mt-10 cont-cols-calendar'>
        
        <div>
          <h2 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center mb-8'>Octubre</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {cursosDate.filter(f => f.fecha_text.includes('Octubre')).map(c => (
              <CardCalendar
                nombre={c.nombre}
                fecha={c.fecha_text}
                duracion={c.duracion}
               />
            ))}
          </div>
        </div>
       
        <div>
          <h2 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center mb-8'>Noviembre</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {cursosDate.filter(f => f.fecha_text.includes('Noviembre')).map(c => (
              <CardCalendar
                nombre={c.nombre}
                fecha={c.fecha_text}
                duracion={c.duracion}
               />
            ))}
          </div>
        </div>
       
        <div>
          <h2 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center mb-8'>Diciembre</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {cursosDate.filter(f => f.fecha_text.includes('Diciembre')).map(c => (
              <CardCalendar
                nombre={c.nombre}
                fecha={c.fecha_text}
                duracion={c.duracion}
               />
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
};

export default Calendar;

export const getServerSideProps = async () => {
  const res = await fetch(`${API_BASE_URL}/courses?sortBy=fecha`);
  const data = await res.json()
  console.log(data);
  const cursosDate = data.courses

  return { props : { cursosDate } }
}
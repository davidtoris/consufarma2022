import Link from 'next/link';
import React from 'react';
import Carousel from '../src/components/carousel';
import CardCourse from '../src/components/cursos/CardCourse';
import NavBar from '../src/components/NavBar';
import { API_BASE_URL } from '../src/constants';
import Footer from '../src/containers/Footer';

const Calendario = ({cursosDate}) => {
  return (
    <>
      <NavBar />
      <Carousel />

      <div className="max-w-7xl mx-auto">
        <section className='my-5 mt-10 flex items-center justify-between'>
          <div className='flex xl:w-12/12 lg:w-12/12'>
            <Link href="/">
            <div className='border-blueConsufarma border-2 text-blueConsufarma hover:bg-blueConsufarma hover:text-white text-center cursor-pointer rounded-lg font-bold p-3 mr-3'>
              Cursos por Especialidad
            </div>
            </Link>
            <Link href="/calendario">
            <div className='bg-blueConsufarma text-white text-center cursor-pointer rounded-lg font-bold p-3'>
              Cursos por fecha
            </div>
            </Link>
          </div>
        </section>
      </div>

      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {cursosDate.map(c => (

            <div className='mb-7 m-auto' key={c.id}>
              <CardCourse  
                link={`/cursos/${c.ruta}`}
                nombre={c.nombre}
                img={c.imagen}
                label='nuevo'
                ponente={c.ponente}
                fecha={c.fecha_text}
              />
            </div>

          ))}
        </div>
      </div>
      <Footer />
    </>
  )
};

export default Calendario;

export const getServerSideProps = async () => {
  const res = await fetch(`${API_BASE_URL}/courses-date`);
  const data = await res.json()
  const cursosDate = data.detalle

  return { props : { cursosDate } }
}
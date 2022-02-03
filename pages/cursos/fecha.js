import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addCoursesDate } from '../../slices/CoursesSlice'

import Carousel from '../../src/components/carousel';
import CardCourse from '../../src/components/cursos/CardCourse';
import NavBar from '../../src/components/NavBar';
import { API_BASE_URL } from '../../src/constants';
import Footer from '../../src/containers/Footer';
import Filter from '../../src/components/filter'

const Calendario = ({cursosDate}) => {
  const dispatch = useDispatch();
  const { allCoursesDate, statusDate } = useSelector((state) => state.courses);
  const { allSpecialities } = useSelector((state) => state.specialities);
  const { selectSpeciality } = useSelector((state) => state.specialities);

  useEffect(() => {
    dispatch(addCoursesDate(cursosDate));
  }, []);

  return (
    <>
      <NavBar />
      <Carousel />

      <div className="max-w-7xl mx-auto">
        <Filter 
          specialities={allSpecialities}
          active='fecha'
        />
      </div>

      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

          {
            selectSpeciality != '' ? allCoursesDate.filter(e => e.especialidad === selectSpeciality).map(c => (

              <div className='mb-7 m-auto' key={c.id}>
                <CardCourse  
                  link={`/cursos/${c.ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente}
                  fecha={c.fecha_text}
                />
              </div>
            )) : 
            
            allCoursesDate.map(c => (

              <div className='mb-7 m-auto' key={c.id}>
                <CardCourse  
                  link={`/cursos/${c.ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente}
                  fecha={c.fecha_text}
                />
              </div>

            ))
          }
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
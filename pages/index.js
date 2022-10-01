import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoursesDate } from '../slices/CoursesSlice'
import moment from 'moment';

import CardCourse from '../src/components/cursos/CardCourse';
import NavBar from '../src/components/NavBar';
import { API_BASE_URL } from '../src/constants';
import Footer from '../src/containers/Footer';
import Filter from '../src/components/filter'
import Logotipos from '../src/components/logotipos';
import CarouselSection from '../src/containers/Carousel';

const Calendario = ({cursosDate}) => {
  const dispatch = useDispatch();
  const { allCoursesDate, statusDate } = useSelector((state) => state.courses);
  const { allSpecialities } = useSelector((state) => state.specialities);
  const { selectSpeciality } = useSelector((state) => state.specialities);

  console.log(selectSpeciality)

  useEffect(() => {
    dispatch(addCoursesDate(cursosDate));
  });


  console.log(cursosDate)
  
  const today = moment().startOf('day').format()


  return (
    <>
      <NavBar />
      <CarouselSection /> 
      <Logotipos />
      <Filter 
        specialities={allSpecialities}
        active='fecha'
      />
      

      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

          {
            selectSpeciality != '' ? allCoursesDate.filter(e => e.especialidad_id.especialidad === selectSpeciality).map(c => (

              <div className='mb-7 m-auto' key={c._id}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente_uno_id.ponente}
                fecha={c.fecha}
                fechaText={c.fecha_text}
                duracion={c.duracion}
                horario={c.horario}
                />
              </div>
            )) : 
            
            allCoursesDate.filter(course => course.fecha > today).map(c => (
              <div className='mb-7 m-auto' key={c._id}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente_uno_id.ponente}
                fecha={c.fecha}
                fechaText={c.fecha_text}
                duracion={c.duracion}
                horario={c.horario}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className='bg-redConsufarma text-white p-3 text-center font-bold text-2xl'> Cursos por Programar</div>

      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

          {
            allCoursesDate.filter(course => course.fecha < today).map(c => (
              <div className='mb-7 m-auto' key={c._id}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente_uno_id.ponente}
                fecha={'Por programar'}
                fechaText={'Por programar'}
                duracion={c.duracion}
                horario={c.horario}
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
  const res = await fetch(`${API_BASE_URL}/courses?sortBy=fecha`);
  const data = await res.json()
  console.log(data);
  const cursosDate = data.courses

  return { props : { cursosDate } }
}
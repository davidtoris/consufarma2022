import React, { useEffect } from 'react';
import Script from 'next/script'
import { useDispatch, useSelector } from 'react-redux';
import { addCoursesDate } from '../store/slices/Courses/CoursesSlice'
import moment from 'moment';

import CardCourse from '../src/components/cursos/CardCourse';
import NavBar from '../src/components/NavBar';
import { API_BASE_URL } from '../src/constants';
import Footer from '../src/containers/Footer';
import Filter from '../src/components/filter'
import Logotipos from '../src/components/logotipos';
import CarouselSection from '../src/containers/Carousel';
import { addSpecialities } from '../store/slices/Speciality/SpecialitiesSlice';
import Modal from '../src/components/modal';


const Calendario = ({specialities, cursosDate}) => {

  const dispatch = useDispatch();
  const { allCoursesDate, statusDate } = useSelector((state) => state.courses);
  const { allSpecialities } = useSelector((state) => state.specialities);
  const { selectSpeciality } = useSelector((state) => state.specialities);

  useEffect(() => {
    dispatch(addCoursesDate(cursosDate));
    dispatch(addSpecialities(specialities));
  });
  
  const today = moment().startOf('day').format()
  return (
    <>

        <div className="container">
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QV34QL6593"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TH99DJV80J" />
        <Script id="google-analytics-two">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TH99DJV80J');
          `}
        </Script>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=GTM-N3TSTCP" />
        <Script id="google-analytics-three">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'GTM-N3TSTCP');
          `}
        </Script>
      </div>
      <NavBar />
      <CarouselSection /> 
      <Logotipos />
      <Filter 
        specialities={allSpecialities}
        active='fecha'
      />
      
      {/* <Modal /> */}

      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

          {
            selectSpeciality != '' ? allCoursesDate.filter(e => e.especialidad_id.especialidad === selectSpeciality).map(c => (

              <div className='mb-7 m-auto' key={c.nombre}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label={c.label}
                  ponente={c.ponente_uno_id.ponente}
                  ponenteDos={c.ponente_dos_id.ponente}
                  fecha={c.fecha}
                  fechaText={c.fecha > today ? c.fecha_text : 'Por Programar'}
                  duracion={c.duracion}
                  horario={c.horario}
                  lugar={c.lugar}
                />
              </div>
            )) : 
            
            allCoursesDate.filter(course => course.fecha > today).map(c => (
              <div className='mb-7 m-auto' key={c.nombre}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label={c.label}
                  ponente={c.ponente_uno_id.ponente}
                  ponenteDos={c.ponente_dos_id.ponente}
                  fecha={c.fecha}
                  fechaText={c.fecha > today ? c.fecha_text : 'Por Programar'}
                  duracion={c.duracion}
                  horario={c.horario}
                  lugar={c.lugar}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className='bg-redConsufarma text-white p-3 text-center font-bold text-2xl'> 
        Cursos que se programan al llegar al mínimo de participantes. <br></br> 
        <span className='font-normal'>Da click en el curso de tu interés para registrarte y se de seguimiento a la programación del curso</span>
      </div>


      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

          {
            allCoursesDate.filter(course => course.fecha < today).map(c => (
              <div className='mb-7 m-auto' key={c.nombre}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente_uno_id.ponente}
                  ponenteDos={c.ponente_dos_id.ponente}
                  fecha={'Por programar: “Inscríbete”'}
                  fechaText={'Programar'}
                  duracion={c.duracion}
                  horario={c.horario}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className='bg-blueConsufarma text-white p-3 text-center font-bold text-2xl'> 
        Cursos Cerrados para Empresas - Estos cursos se pueden impartir de manera cerrada para su empresa, vía zoom, a partir de 6 participantes.
        <span className='font-normal'>Da click en el curso de tu interés para registrarte y se de seguimiento a la programación del curso</span>
      </div>


      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

          {
            allCoursesDate.filter(course => course.label === 'Cerrado').map(c => (
              <div className='mb-7 m-auto' key={c.nombre}>
                <CardCourse  
                  link={`/cursos/${c.nombre_ruta}`}
                  nombre={c.nombre}
                  img={c.imagen}
                  label=''
                  ponente={c.ponente_uno_id.ponente}
                  ponenteDos={c.ponente_dos_id.ponente}
                  fecha={'CERRADO”'}
                  fechaText={'CERRADO'}
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
  const urlSpecialities = `${API_BASE_URL}/specialities`
  const urlListCoursesByDate = `${API_BASE_URL}/courses?sortBy=fecha`

  const [respSpecialities, respCourses] = await Promise.all([
    fetch(urlSpecialities),
    fetch(urlListCoursesByDate),
  ])
  
  const [specialities, courses] = await Promise.all([
    respSpecialities.json(),
    respCourses.json(),
  ])

  return { props : { 
      specialities : specialities.specialities,
      cursosDate: courses.courses
    } 
  }
}
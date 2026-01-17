import React, { useEffect, useRef, useState } from 'react';
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
import LastCourses from '../src/containers/LastCourses';
import { addSpecialities } from '../store/slices/Speciality/SpecialitiesSlice';
import Modal from '../src/components/modal';
import Router, { useRouter } from 'next/router'
import { TiArrowUpThick } from "react-icons/ti";
import Link from 'next/link';
import CardCourseSmall from '../src/components/cursos/CardCourseSmall';
import Cookies from 'js-cookie'


const Calendario = ({ specialities, cursosDate }) => {

  const dispatch = useDispatch();
  const { allCoursesDate, statusDate } = useSelector((state) => state.courses);
  const { allSpecialities } = useSelector((state) => state.specialities);
  const { selectSpeciality } = useSelector((state) => state.specialities);

  const [showUpArrow, setShowUpArrow] = useState(false);

  const inicioRef = useRef(null);
  const cerradosRef = useRef(null);
  const programarRef = useRef(null);
  const { query: { section } } = useRouter()

  useEffect(() => {
    if (section === "Inicio" && inicioRef.current) {
      window.scrollTo({
        top: inicioRef.current.offsetTop,
        behavior: "smooth",
      });
    }
    if (section === "Cerrados" && cerradosRef.current) {
      window.scrollTo({
        top: cerradosRef.current.offsetTop,
        behavior: "smooth",
      });
    }
    if (section === "Programar" && programarRef.current) {
      window.scrollTo({
        top: programarRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [section]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowUpArrow(true);
      } else {
        setShowUpArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(addCoursesDate(cursosDate));
    dispatch(addSpecialities(specialities));
  });

  // useEffect(() => {
  //   console.log(localStorage.getItem('lastCourses'))
  // }, []);

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

      <NavBar ref={inicioRef} />
      <CarouselSection />

      <LastCourses />

      <Filter
        specialities={allSpecialities}
        active='fecha'
      />

      {showUpArrow && (
        <Link href="/?section=Inicio">
          <div className={`hidden md:inline fixed bottom-10 right-8 bg-blueConsufarma p-2 z-10 cursor-pointer hover:scale-105 transform duration-500 ease-out shadow-lg transition-opacity
          ${showUpArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <TiArrowUpThick className='text-4xl  text-white' />
          </div>
        </Link>
      )}

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

      <div className='bg-redConsufarma text-white p-3 text-center font-bold text-2xl' ref={programarRef}>
        Cursos que se programan al llegar al mínimo de participantes. <br></br>
        <span className='font-normal'>Da click en el curso de tu interés para registrarte y se de seguimiento a la programación del curso</span>
      </div>

      <div className='container m-auto px-2 md:px-2 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {
            allCoursesDate.filter(course => course.fecha < today && course.label !== 'Cerrado').map(c => (
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

      <div className='bg-blueConsufarma text-white p-3 text-center font-bold text-2xl' ref={cerradosRef}>
        Cursos Cerrados para Empresas - Estos cursos se pueden impartir de manera cerrada para su empresa, vía zoom, a partir de 6 participantes.
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
                  fechaText={'Programa tu Fecha'}
                  duracion={c.duracion}
                  horario={c.horario}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className='bg-gray-50 mt-4 mb-10'>
        <div className='container m-auto px-2 md:px-2 pt-2'>
          <LastCourses />
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

  return {
    props: {
      specialities: specialities.specialities,
      cursosDate: courses.courses
    }
  }
}
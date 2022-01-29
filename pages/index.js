import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../src/constants';

import { addCourses } from '../slices/CoursesSlice';
import { addSpecialities } from '../slices/SpecialitiesSlice';

import CarouselSection from '../src/containers/Carousel';
import NavBar from '../src/components/NavBar';
import Cursos from '../src/containers/Cursos';
import Filter from '../src/components/filter';
import Footer from '../src/containers/Footer';



export default function Home({specialities, courses}) {
  const dispatch = useDispatch();
  const { allCourses, status } = useSelector((state) => state.courses);
  const { allSpecialities } = useSelector((state) => state.specialities);

  useEffect(() => {
    dispatch(addCourses(courses.detalle));
    dispatch(addSpecialities(specialities.detalle));
  }, []);
  
  
  return (  
    <>
      <div className='bg-gray-100'>
        <div className='pb-4 bg-white'>
          <NavBar />
        </div>
        <CarouselSection /> 
        <Filter 
          specialities={allSpecialities}
          active='especialidad'
        />
        {!status === 'success' ? 'Cargando...' : (
          <Cursos
            specialities={allSpecialities}
            cursos={allCourses} 
          />
        )}

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const urlSpecialities = `${API_BASE_URL}/specialities`
  const urlListCoursesBySpeciality = `${API_BASE_URL}/courses-speciality`

  const [respSpecialities, respCourses] = await Promise.all([
    fetch(urlSpecialities),
    fetch(urlListCoursesBySpeciality),
  ])
  
  const [specialities, courses] = await Promise.all([
    respSpecialities.json(),
    respCourses.json(),
  ])

  return { props : { 
      specialities,
      courses
    } 
  }
}

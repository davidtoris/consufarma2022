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
import Logotipos from '../src/components/logotipos';

export default function Home({specialities, courses}) {

  const dispatch = useDispatch();
  const { allCourses, status } = useSelector((state) => state.courses);
  const { allSpecialities } = useSelector((state) => state.specialities);

  useEffect(() => {
    dispatch(addCourses(courses));
    dispatch(addSpecialities(specialities));
  });
  
  return (  
    <>
      <NavBar />
      <CarouselSection /> 
      <Logotipos />
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
    </>
  )
}

export const getServerSideProps = async () => {
  const urlSpecialities = `${API_BASE_URL}/specialities`
  const urlListCoursesBySpeciality = `${API_BASE_URL}/courses`

  const [respSpecialities, respCourses] = await Promise.all([
    fetch(urlSpecialities),
    fetch(urlListCoursesBySpeciality),
  ])
  
  const [specialities, courses] = await Promise.all([
    respSpecialities.json(),
    respCourses.json(),
  ])

  return { props : { 
      specialities : specialities.specialities,
      courses: courses.courses
    } 
  }
}

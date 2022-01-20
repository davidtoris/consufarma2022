import NavBar from '../src/components/NavBar';
import CarouselSection from '../src/containers/Carousel';
import Cursos from '../src/containers/Cursos';
import { API_BASE_URL } from '../src/constants';


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

export default function Home({specialities, courses}) {
  return (  
    <>
      <div className='bg-gray-100'>
        <NavBar />
        <CarouselSection /> 
        <Cursos
          specialities={specialities} 
          cursos={courses} 
          />
      </div>
    </>
  )
}

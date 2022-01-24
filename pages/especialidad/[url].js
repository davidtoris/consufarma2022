import { API_BASE_URL } from '../../src/constants';

import CarouselSection from '../../src/containers/Carousel';
import NavBar from '../../src/components/NavBar';
import CursosFilter from '../../src/containers/CursosFilter';
import Filter from '../../src/components/filter';
import Footer from '../../src/containers/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';



export default function HomeSpeciality() {
  const router = useRouter();
  const url = router.query.url;

  const [cursos, setCursos] = useState([]);
  const [especial, setEspecial] = useState([]);

  useEffect(() => {
    const cursos = async () => {
      const res = await fetch(`${API_BASE_URL}/filterCoursesBySpecialities/${url}`);
      const data = await res.json()
      const cursos = data.detalle
      setCursos(data.detalle)
    }

    const special = async () => {
      const resSpec = await fetch(`${API_BASE_URL}/specialities`);
      const dataSpec = await resSpec.json();
      const specialities = dataSpec.detalle;
      setEspecial(dataSpec.detalle);
    }

    
    cursos();
    special();
  }, []);
  
  console.log(cursos);
  console.log(especial);

  return (  
    <>
      <div className='bg-gray-100'>
        <div className='pb-4 bg-white'>
          <NavBar />
        </div>
        <CarouselSection /> 

        {/* {specialities && (
          <Filter 
            specialities={specialities}
          />
        )} */}

        {/* <CursosFilter
          cursos={cursos} 
        /> */}

        <Footer />
      </div>
    </>
  )
}

// export const getServerSideProps = async ({query : {url}}) => {

//   const res = await fetch(`${API_BASE_URL}/filterCoursesBySpecialities/${url}`);
//   const data = await res.json()
//   const cursos = data.detalle
  
//   const resSpec = await fetch(`${API_BASE_URL}/specialities`);
//   const dataSpec = await resSpec.json()
//   const specialities = dataSpec.detalle

//   return { props : { cursos, specialities } }
// }
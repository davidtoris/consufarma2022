import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { API_BASE_URL } from '../../src/constants';
import NavBar from '../../src/components/NavBar';
import CardCourse from '../../src/components/cursos/CardCourse';
import Buscador from '../../src/components/buscador';
import Footer from '../../src/containers/Footer';
import instanceAPI from '../../src/config/axiosConfig';

const Courses = ({curso}) => {

  const [courseFinded, setCourseFinded] = useState([]);
  const [fourCourses, setFourCourses] = useState([]);
  const router = useRouter();
  const value = router.query.find;

  useEffect(() => {
    const findCoursese = async () => {
      const res = await instanceAPI
      .get(`/courses/find?value=${value}`);
      const data = await res.data;
      setCourseFinded(data.coursesFinded);
      console.log(data.coursesFinded);
    }

    findCoursese();
  
  }, [value]);
  
  useEffect(() => {
    const getFourCourses = async () => {
      const res = await instanceAPI
      .get('/courses/');
      const data = await res.data.courses;
      
      setFourCourses([data[0], data[1], data[2], data[3], data[4]]);
    }

    getFourCourses();
  
  }, [value]);



  
  return (
    <div>
      <NavBar />

      <div className="max-w-7xl mx-auto">
        <section className='my-5 mt-10'>
          <Buscador />
          <h3 className='font-extrabold text-2xl text-blueDarkCustom mb-5 text-center mt-5'>
            Se encontraron {courseFinded.length} resultados de la búsqueda: {value} 
          </h3>
          
          {courseFinded.length === 0 && (
            <>
              <p className='text-blueDarkCustom mb-5 text-center'>
              Por favor contáctanos al correo <a href='mailto:pedro.valadez@consufarma.com' className='text-redConsufarma mr-1'>pedro.valadez@consufarma.com</a> 
              y te indicaremos si podemos apoyarte con tu requerimiento.
              </p>
              <p className='font-extrabold text-blueDarkCustom mb-5 text-center'>
                Estos cursos podrían ser de tu interés
              </p>

              <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden my-5'>
                {fourCourses.map(c => (
                  <CardCourse
                    key={c._id}
                    link={`/cursos/${c.nombre_ruta}`}
                    nombre={c.nombre}
                    img={c.imagen}
                    fechaText={c.fecha_text}
                    horario={c.horario}
                    label={c.label}
                    ponente={c.ponente_uno_id.ponente}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden my-5'>
            {courseFinded.map(c => (

              <CardCourse
                key={c._id}
                link={`/cursos/${c.nombre_ruta}`}
                nombre={c.nombre}
                img={c.imagen}
                fechaText={c.fecha_text}
                horario={c.horario}
                label={c.label}
                ponente={c.ponente_uno_id.ponente}
              />
            ))}
          </div>
        </section>
      </div> 

      <Footer />

    </div>
  )
}

export default Courses;
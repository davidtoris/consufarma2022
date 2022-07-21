import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { API_BASE_URL } from '../../src/constants';
import NavBar from '../../src/components/NavBar';
import CardCourse from '../../src/components/cursos/CardCourse';
import Buscador from '../../src/components/buscador';
import Footer from '../../src/containers/Footer';

const Courses = ({curso}) => {

  const [courseFinded, setCourseFinded] = useState([]);
  const router = useRouter();
  const value = router.query.find;

  useEffect(() => {
    const findCoursese = async () => {
      const res = await fetch(`${API_BASE_URL}/courses/find/name?value=${value}`);
      const data = await res.json();
      setCourseFinded(data.coursesFinded);
    }

    findCoursese();
  
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
            </>
          )}
          
          
          <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden my-5'>
            {courseFinded.map(c => (

              <CardCourse
                key={c._id}
                link={`/cursos/${c.temario.nombre_ruta}`}
                nombre={c.temario.nombre}
                img={c.temario.imagen}
                fechaText={c.fecha_text}
                label={c.temario.label}
                ponente={c.temario.maestro_uno}
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
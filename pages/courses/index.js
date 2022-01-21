import { useRouter } from 'next/router'
import { API_BASE_URL } from '../../src/constants';
import NavBar from '../../src/components/NavBar';
import CardCourse from '../../src/components/cursos/CardCourse';
import Buscador from '../../src/components/buscador';

const Courses = ({curso}) => {
  const router = useRouter();
  const termino = router.query.find;
  return (
    <div>
      <NavBar />

      <div className="max-w-7xl mx-auto">
        <section className='my-5 mt-10'>
          <h3 className='font-extrabold text-2xl text-blueDarkCustom mb-5 text-center'>
            Se encontraron {curso.length} resultados de la búsqueda: {termino} 
          </h3>
          <Buscador />
          <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden my-5'>
            {curso.map(c => (

              <CardCourse
                key={c.nombre}
                link={`/cursos/${c.ruta}`}
                nombre={c.nombre}
                img={c.imagen}
                label={'Promoción'}
                ponente={c.ponente}
              />
            
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}

export default Courses


export const getServerSideProps = async ({query: {find}}) => {
  
  const res = await fetch(`${API_BASE_URL}/?find=${find}`);
  const data = await res.json();
  const curso = data.detalle;
  

  return { props : { curso } }
}
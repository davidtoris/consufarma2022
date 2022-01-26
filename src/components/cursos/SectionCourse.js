
import CardCourse from './CardCourse';

const SectionCourse = ({cursos, nombre}) => {

  return (
    <div className="mx-auto">
      <section className='my-5 mt-10'>
        <h2 className='text-blueDarkCustom text-2xl font-extrabold mb-5 font-body underline decoration-red-500 underline-offset-8 decoration-4'>{nombre}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {cursos.map(c => (
            c.especialidad === nombre && (
              <div className='mb-7' key={c.id}>
              <CardCourse 
                link={`/cursos/${c.ruta}`}
                nombre={c.nombre}
                img={c.imagen}
                label={'promocion'}
                ponente={c.ponente}
                fecha=''
              />
              </div>
            ) 
          ))}
        </div>
        {/* </div> */}
      </section>
    </div>
  )
}

export default SectionCourse;

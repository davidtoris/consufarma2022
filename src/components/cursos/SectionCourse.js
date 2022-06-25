
import CardCourse from './CardCourse';

const SectionCourse = ({cursos, nombre}) => {

  return (
    <div className="flex justify-center">
      <section className='my-5 mt-10'>
        <h2 className='text-white text-2xl font-bold mb-5 bg-redConsufarma text-center py-2 rounded-md'>{nombre}</h2>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {cursos.map(c => (
            c.especialidad === nombre && (
              <div className='mb-7' key={c.id}>
              <CardCourse 
                link={`/cursos/${c.ruta}`}
                nombre={c.nombre}
                img={c.imagen}
                label={c.filtro}
                ponente={c.ponente}
                fecha={c.fecha}
                fechaText={c.fecha_text}
                duracion={c.duracion}
              />
              </div>
            ) 
          ))}
        </div>
      </section>
    </div>
  )
}

export default SectionCourse;

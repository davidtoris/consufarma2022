import React from 'react'
import CardCourse from './CardCourse';

const SectionCourseFilter = ({cursos, nombre}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <section className='my-5 mt-10'>
        <h2 className='text-blueDarkCustom text-2xl font-extrabold mb-5 font-body'>{nombre}</h2>
        <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden'>
          {cursos.map(c => (
            <CardCourse 
              key={c.id}
              link={`/cursos/${c.ruta}`}
              nombre={c.nombre}
              img={c.imagen}
              label={'Promoción'}
              ponente={c.ponente}
            />
          ))}
        </div>
        {/* </div> */}
      </section>
    </div>
  )
}

export default SectionCourseFilter;

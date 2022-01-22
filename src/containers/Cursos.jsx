import React from 'react'
import SectionCourse from '../components/cursos/SectionCourse'


const Cursos = ({specialities, cursos}) => {
  return (
    <div className='container m-auto px-2 md:px-0'>
      {specialities.detalle.map(esp => (
        <SectionCourse
        key={esp.id} 
        cursos={cursos.detalle}
        nombre={esp.especialidad}
        />
      ))}
    </div>
  )
}


export default Cursos

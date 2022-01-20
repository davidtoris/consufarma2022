import React from 'react'
import SectionCourse from '../components/cursos/SectionCourse'


const Cursos = ({specialities, cursos}) => {
  return (
    <div>
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

import React from 'react'
import SectionCourse from '../components/cursos/SectionCourse'
import { useSelector } from 'react-redux';

const Cursos = ({specialities, cursos}) => {

  const { selectSpeciality } = useSelector((state) => state.specialities);
  return (
    <div className='container m-auto px-2 md:px-2 max-w-7x'>
      {selectSpeciality != '' ?
      specialities.filter(e => e.especialidad === selectSpeciality).map(esp => (
        <SectionCourse
        key={esp.id} 
        cursos={cursos}
        nombre={esp.especialidad}
        />
      ))
      :
      specialities.map(esp => (
        <SectionCourse
        key={esp.id} 
        cursos={cursos}
        nombre={esp.especialidad}
        />
      ))
    }
    </div>
  )
}


export default Cursos

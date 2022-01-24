import React from 'react'
import SectionCourseFilter from '../components/cursos/SectionCourseFilter'


const CursosFilter = ({ cursos}) => {
  return (
    <div className='container m-auto px-2 md:px-0'>
      
        <SectionCourseFilter
        cursos={cursos}
        nombre='algo'
        />

    </div>
  )
}


export default CursosFilter

import React from 'react'
import CardCourse from '../../src/components/cursos/CardCourse'
import { API_BASE_URL } from '../../src/constants'


const Back = ({cursosDate}) => {
  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className='grid grid-cols-4 gap-10'>
        {cursosDate.map(c => (

          <CardCourse 
          key={c._id}
          link={`back/${c.temario.nombre_ruta}`}
          nombre={c.temario.nombre}
          img={c.temario.imagen}
          label={c.temario.filtro}
          ponente={c.temario.ponente}
          fechaText={c.fecha_text}
          />
        ))}
      </div>
    </div>
  )
}

export default Back

export const getServerSideProps = async () => {
  const res = await fetch(`${API_BASE_URL}/courses?sortby=date`);
  const data = await res.json()
  const cursosDate = data.courses

  return { props : { cursosDate } }
}


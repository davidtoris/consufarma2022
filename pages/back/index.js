import Link from 'next/link'
import React from 'react'
import CardCourse from '../../src/components/cursos/CardCourse'
import { API_BASE_URL } from '../../src/constants'


const Back = ({cursosDate}) => {
  console.log(cursosDate);
  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className='grid grid-cols-4 gap-10'>
        {cursosDate.map(c => (

          <CardCourse 
          link={`back/${c.ruta}`}
          nombre={c.nombre}
          img={c.imagen}
          label={c.filtro}
          ponente={c.ponente}
          fecha={c.fecha_text}
          />
        ))}
      </div>
    </div>
  )
}

export default Back

export const getServerSideProps = async () => {
  const res = await fetch(`${API_BASE_URL}/courses-date`);
  const data = await res.json()
  const cursosDate = data.detalle

  return { props : { cursosDate } }
}


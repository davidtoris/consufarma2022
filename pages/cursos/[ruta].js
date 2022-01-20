import React from 'react'
import NavBar from '../../src/components/NavBar'
import { API_BASE_URL } from '../../src/constants'
import ItemCourse from '../../src/containers/ItemCourse'

const LandingItemCourse = ({curso}) => {
  console.log(curso);
  return (
    <div>
      <NavBar />
      <ItemCourse 
        curso={curso}
      />
    </div>
  )
}

export default LandingItemCourse

export const getServerSideProps = async ({query: {ruta}}) => {
  console.log(ruta);
  const res = await fetch(`${API_BASE_URL}/courses/${ruta}`);
  const data = await res.json()
  const curso = data.detalle

  return { props : { curso } }
}


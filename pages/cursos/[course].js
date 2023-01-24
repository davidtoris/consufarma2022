import React from 'react'
import NavBar from '../../src/components/NavBar'
import { API_BASE_URL } from '../../src/constants'
import Footer from '../../src/containers/Footer'
import ItemCourse from '../../src/containers/ItemCourse'

const LandingItemCourse = ({curso}) => {
  return (
    <div>
      <NavBar />
      <ItemCourse 
        curso={curso}
      />
      <Footer />
    </div>
  )
}

export default LandingItemCourse

export const getServerSideProps = async ({query: {course}}) => {
  const res = await fetch(`${API_BASE_URL}/courses/${course}`);
  const data = await res.json()
  const curso = data.course[0]

  return { props : { curso } }
}


import React from 'react'
import NavBar from '../../src/components/NavBar'
import { API_BASE_URL } from '../../src/constants'
import Footer from '../../src/containers/Footer'
import ItemCourse from '../../src/containers/ItemCourse'

const LandingItemCourse = ({ curso }) => {
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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking' // or true
  }
}

export const getStaticProps = async ({ params: { course } }) => {
  const res = await fetch(`${API_BASE_URL}/courses/${course}`);
  const data = await res.json()
  const curso = data.course

  return {
    props: { curso },
    revalidate: 3600,
  }
}


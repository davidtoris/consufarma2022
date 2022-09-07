import React from 'react'
import PrintTopic from '../../src/components/print'
import { API_BASE_URL } from '../../src/constants';

const Print = ({curso}) => {
  return (
    <PrintTopic 
      curso={curso}
    />
  )
}

export default Print;

export const getServerSideProps = async ({query: {course}}) => {
  const res = await fetch(`${API_BASE_URL}/courses/${course}`);
  const data = await res.json()
  const curso = data.course[0]

  return { props : { curso } }
}
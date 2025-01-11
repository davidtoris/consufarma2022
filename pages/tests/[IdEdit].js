import React from 'react'
import { API_BASE_URL } from '../../src/constants';
import FormEditTest from '../../src/components/tests/FormEditTest';

const newTest = ({speakers, coursesName, tests}) => {
    return (
      <FormEditTest 
      speakers={speakers}
      tests={tests}
      coursesName={coursesName} />
    )
}

export default newTest

export const getServerSideProps = async ({query: {IdEdit}}) => {
  const res = await fetch(`${API_BASE_URL}/speakers/`);
  const data = await res.json()
  const speakers = data.speakers

  const resCourses = await fetch(`${API_BASE_URL}/courses/name`);
  const dataCourses = await resCourses.json()
  const coursesName = dataCourses.courses
  
  const resTest = await fetch(`${API_BASE_URL}/tests/${IdEdit}`);
  const dataTest = await resTest.json()
  const tests = dataTest.test

  return { props : { speakers, coursesName, tests } }
}
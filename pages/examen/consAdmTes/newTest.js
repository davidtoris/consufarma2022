import React from 'react'
import { API_BASE_URL } from '../../../src/constants';
import FormNewTest from '../../../src/components/tests/FormNewTest';

const newTest = ({ coursesName}) => {
    return (
      <FormNewTest 
      coursesName={coursesName} />
    )
}

export default newTest

export const getServerSideProps = async () => {

  const resCourses = await fetch(`${API_BASE_URL}/courses/name`);
  const dataCourses = await resCourses.json()
  const coursesName = dataCourses.courses

  return { props : { coursesName } }
}
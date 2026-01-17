import React from 'react'
import { API_BASE_URL } from '../../../src/constants';
import FormEditTest from '../../../src/components/tests/FormEditTest';

const newTest = ({ coursesName, tests }) => {

  return (
    <FormEditTest
      tests={tests}
      coursesName={coursesName} />
  )
}

export default newTest

export const getServerSideProps = async ({ query: { IdEdit } }) => {
  const resCourses = await fetch(`${API_BASE_URL}/courses/name`);
  const dataCourses = await resCourses.json()
  const coursesName = dataCourses.courses

  const resTest = await fetch(`${API_BASE_URL}/tests/${IdEdit}`);
  const dataTest = await resTest.json()
  const tests = dataTest.test

  return { props: { coursesName, tests } }
}
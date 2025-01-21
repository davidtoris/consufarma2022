import React from 'react'
import FormMakeTest from '../../src/components/tests/FormMakeTest'
import { API_BASE_URL } from '../../src/constants'

const CourseTest = ({Test}) => {
  return (
    <>
      <FormMakeTest 
        Test={Test}
      />
    </>
  )
}

export default CourseTest


export const getServerSideProps = async ({query: {test}}) => {
  const resTest = await fetch(`${API_BASE_URL}/tests/${test}`);
  const dataTest = await resTest.json()
  const Test = dataTest.test

  return { props : { Test } }
}
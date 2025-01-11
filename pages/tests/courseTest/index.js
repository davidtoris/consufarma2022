import React from 'react'
import { API_BASE_URL } from '../../../src/constants'
import FormMakeTest from '../../../src/components/tests/FormMakeTest'

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


export const getServerSideProps = async () => {
  const resTest = await fetch(`${API_BASE_URL}/tests/677c57710992c28b23139c8b`);
  const dataTest = await resTest.json()
  const Test = dataTest.test

  return { props : { Test } }
}
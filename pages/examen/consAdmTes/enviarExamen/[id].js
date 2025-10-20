import React from 'react'
import { API_BASE_URL } from '../../../../src/constants';
import FormSendTest from '../../../../src/components/tests/FormSendTest.';

const newTest = ({tests}) => {
    return (
      <FormSendTest Test={tests} />
    )
}

export default newTest

export const getServerSideProps = async ({query: {id}}) => {
  
  const resTest = await fetch(`${API_BASE_URL}/tests/${id}`);
  const dataTest = await resTest.json()
  const tests = dataTest.test

  return { props : { tests } }
}
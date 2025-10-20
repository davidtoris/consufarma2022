import React, { useEffect } from 'react'
import { API_BASE_URL } from '../../../src/constants'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { OneTestsAnswers } from '../../../store/slices/TestsAnswers/TestsAnswersService';

import FormDiploma from '../../../src/components/tests/FormDiploma';


const CourseDiploma = ({Test}) => {

  const router = useRouter();
  const { query } = router;
  const { student } = query

  const dispatch = useDispatch()
  const { allTestsAnswers, allTestsAnswersTemp } = useSelector((state) => state.testsAnswers);

  const goToHome = () => {
    router.push("/")
  }

  useEffect(() => {
    if (student && student !== ''){
      OneTestsAnswers(dispatch, student)
    }
  }, [student])

  return (
    <>
    <div>
      { allTestsAnswers.length > 0 && (
        // <div>Arriba</div>
        <FormDiploma
          Test={Test} 
          TestAnswer={allTestsAnswers[0]} 
          point={'arriba'}
        />
      )}
      { student === undefined && allTestsAnswersTemp !== '' && (
        // <div>En medio</div>
        <FormDiploma 
          Test={Test}   
          TestAnswer={allTestsAnswersTemp.testsAnswers} 
          point={'abajo'}
        />
      )}
      { student === undefined && allTestsAnswers.length === 0 && allTestsAnswersTemp.length === 0 &&(
        <div onClick={goToHome()}>Vuelve a intentarlo</div>
      )}
      </div>
    </>
  )
}

export default CourseDiploma

export const getServerSideProps = async ({query: {test, student}}) => {
  const resTest = await fetch(`${API_BASE_URL}/tests/${test}`);
  const dataTest = await resTest.json()
  const Test = dataTest.test

  return { props : { Test  } }
}

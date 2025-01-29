import React, { useEffect } from 'react'
import FormScoreTest from '../../../src/components/tests/FormScoreTest'
import { API_BASE_URL } from '../../../src/constants'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { OneTestsAnswers } from '../../../store/slices/TestsAnswers/TestsAnswersService';

const CourseTest = ({Test}) => {

  const router = useRouter();
  const { query } = router;
  const { student } = query

  const dispatch = useDispatch()
  const { allTestsAnswers, allTestsAnswersTemp } = useSelector((state) => state.testsAnswers);

  useEffect(() => {
    if (student && student !== ''){
      OneTestsAnswers(dispatch, student)
    }
  }, [student])

  console.log('student', student);
  console.log('allTestsAnswers', allTestsAnswers);
  console.log('allTestsAnswers.length', allTestsAnswers.length);
  console.log('allTestsAnswersTemp', allTestsAnswersTemp);
  console.log('allTestsAnswersTemp.length', allTestsAnswersTemp.length);

  return (
    <>
    <div>
      { allTestsAnswers.length > 0 && (
        // <div>Arriba</div>
        <FormScoreTest 
          Test={Test} 
          TestAnswer={allTestsAnswers[0]} 
          point={'arriba'}
        />
      )}
      { student === undefined && allTestsAnswersTemp !== '' && (
        // <div>En medio</div>
        <FormScoreTest 
          Test={Test}   
          TestAnswer={allTestsAnswersTemp.testsAnswers} 
          point={'abajo'}
        />
      )}
      { student === undefined && allTestsAnswers.length === 0 && allTestsAnswersTemp.length === 0 &&(
        <div>Vuelve a intentarlo</div>
      )}
      </div>
    </>
  )
}

export default CourseTest

export const getServerSideProps = async ({query: {scoreTest, student}}) => {
  console.log(student);
  const resTest = await fetch(`${API_BASE_URL}/tests/${scoreTest}`);
  const dataTest = await resTest.json()
  const Test = dataTest.test

  return { props : { Test  } }
}
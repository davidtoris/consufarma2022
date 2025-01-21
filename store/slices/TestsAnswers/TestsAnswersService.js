import instanceAPI from "../../../src/config/axiosConfig";
import { addTestsAnswers, addTestsAnswersTemp, testsAnswersDefault, testsAnswersError, testsAnswersLoading } from "./TestsAnswersSlice";

export const ListTestsAnswers = async (dispatch, courseName, date) => {
  dispatch(testsAnswersDefault())
  dispatch(testsAnswersLoading(true))
  await instanceAPI.get(`/testsAnswers?course=${courseName}&date=${date}`)
  .then(resp => {
    dispatch(addTestsAnswers(resp.data.tests));
    dispatch(testsAnswersLoading(false))
  })
  .catch(error => {
    console.log(error);
    if(error !== undefined){
      dispatch(testsAnswersError(error.response.data.errors[0].msg))
    }
  })
};

export const ListTestsAnswersCourseName = async (dispatch, courseName, date) => {
  dispatch(testsAnswersDefault())
  dispatch(testsAnswersLoading(true))
  await instanceAPI.get(`/testsAnswers/testsAnswersName?course=${courseName}&date=${date}`)
  .then(resp => {
    dispatch(addTestsAnswers(resp.data));
    dispatch(testsAnswersLoading(false))
  })
  .catch(error => {
    console.log(error);
    if(error !== undefined){
      dispatch(testsAnswersError(error.response.data.errors[0].msg))
    }
  })
};

export const ListTestsAnswersByCourseAndDate = async (dispatch, testId, date) => {
  dispatch(testsAnswersDefault())
  dispatch(testsAnswersLoading(true))
  await instanceAPI.get(`/testsAnswers/testsAnswersByCourse?test=${testId}&date=${date}`)
  .then(resp => {
    dispatch(addTestsAnswers(resp.data));
    dispatch(testsAnswersLoading(false))
  })
  .catch(error => {
    console.log(error);
    if(error !== undefined){
      dispatch(testsAnswersError(error.response.data.errors[0].msg))
    }
  })
};

export const OneTestsAnswers = async (dispatch, idStudent) => {
  dispatch(testsAnswersDefault())
  dispatch(testsAnswersLoading(true))
  await instanceAPI.get(`/testsAnswers/${idStudent}`)
  .then(resp => {
    dispatch(addTestsAnswers(resp.data.test));
    dispatch(testsAnswersLoading(false))
  })
  .catch(error => {
    console.log(error);
    // if(error !== undefined){
    //   dispatch(testsAnswersError(error.response.data.errors[0].msg))
    // }
  })
};

export const createAnswersTests = async (dispatch, testAnswer) => {
  dispatch(testsAnswersLoading(true))
  await instanceAPI.post(`/testsAnswers`, testAnswer)
  .then(resp => {
    dispatch(addTestsAnswers(resp.data));
    dispatch(addTestsAnswersTemp(resp.data));
  })
  .catch(error => {
    if(error !== undefined){
      dispatch(testsAnswersError(error.response.data.errors[0].msg))
    }
  })
};
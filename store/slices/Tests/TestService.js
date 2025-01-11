import instanceAPI from '../../../src/config/axiosConfig';
import { addTests, testDefault, testError, testLoading } from "./TestSlice";

export const AllTests = async (dispatch, courseName, date) => {
  dispatch(testDefault())
  dispatch(testLoading(true))
  await instanceAPI.get(`/tests?course=${courseName}&date=${date}`)
  .then(resp => {
    dispatch(addTests(resp.data.tests));
  })
  .catch(error => {
    if(error !== undefined){
      dispatch(testError(error.response.data.errors[0].msg))
    }
  })
};

export const createTest = async (dispatch, test) => {
  console.log(test)
  dispatch(testDefault())
  dispatch(testLoading(true))
  await instanceAPI.post(`/tests`, test)
  .then(resp => {
    dispatch(addTests(resp.data));
  })
  .catch(error => {
    if(error !== undefined){
      dispatch(testError(error.response.data.errors[0].msg))
    }
  })
};

export const editTest = async (dispatch, test, id) => {
  console.log(test)
  dispatch(testDefault())
  dispatch(testLoading(true))
  await instanceAPI.put(`/tests/${id}`, test)
  .then(resp => {
    dispatch(addTests(resp.data));
  })
  .catch(error => {
    if(error !== undefined){
      dispatch(testError(error.response.data.errors[0].msg))
    }
  })
};
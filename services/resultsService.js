import axios from 'axios';
import { resultsPending, resultsSuccess, resultsError } from '../slices/resultsSlice';
import { API_BASE_URL } from '../src/constants';

export const getResults = async (dispatch) => {
  dispatch(resultsPending());
  await axios.get(`${API_BASE_URL}/challenge`)
    .then((resp) => {
      const { data } = resp;
      dispatch(resultsSuccess(data));
    })
    .catch((err) => {
      const { data } = err.response;
      dispatch(resultsError(data));
    });
};

export default getResults;
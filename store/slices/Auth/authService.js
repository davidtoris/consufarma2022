import { API_BASE_URL } from '../../../src/constants';
import Cookies from "js-cookie"
import { getUser, userDefault, userErrorFunc, userLoadingFunc, userRegister, userSuccess, userSuccessTokenFunc } from './AuthSlice';
import instanceAPI from '../../../src/config/axiosConfig';

export const authLogin = async(dispatch, user) => {
  dispatch(userDefault())
  dispatch(userLoadingFunc(true))
  await instanceAPI.post(`${API_BASE_URL}/auth/login`, user)
  .then((resp) => {
    Cookies.set('tokenUser', resp.data.token)
    Cookies.set('user', JSON.stringify(resp.data.usuario))
    dispatch(getUser(resp.data));
  })
  .catch((err) => {
    console.log(err.response.data.msg)
    dispatch(userErrorFunc(err.response.data.msg))
  });
}

export const registerUser = async (dispatch, user) => {
  dispatch(userDefault())
  dispatch(userLoadingFunc(true))
  await instanceAPI.post(`/usuarios`, user)
  .then(resp => {
    dispatch(userRegister(resp.data));
  })
  .catch(error => {
    if(error !== undefined){
      console.log(error)
      dispatch(userErrorFunc(error.response.data.errors[0].msg))
    }
  })
};

export const forgotPassword = async(dispatch, email) => {
  dispatch(userDefault())
  dispatch(userLoadingFunc(true))
  try {
    const resp = await instanceAPI.post(`${API_BASE_URL}/auth/forgot`, email)
    dispatch(userSuccess())
  } catch (error) {
    console.log(error.response.data)
    dispatch(userErrorFunc(error.response.data.msg))
  }
}

export const validateToken = async ( dispatch, token ) => {
  dispatch(userDefault())
  dispatch(userLoadingFunc(true))
  try {
    const resp = await instanceAPI.get('/auth/validate', {
      headers: {
        'x-token': token,
      },
    })
    dispatch(userSuccessTokenFunc())
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch(userErrorFunc(error.response.data.msg))
  }
}

export const newPass = async ( dispatch, pass, token) => {
    dispatch(userDefault())
    dispatch(userLoadingFunc(true))
    try {
      const resp = await instanceAPI.post('/auth/newPass', pass, {
        headers: {
          'x-token': token,
        },
      })
      dispatch(userSuccess())
    } catch (error) {
      console.log(error.response)
      dispatch(userErrorFunc(error.response.data.msg))
    }
}

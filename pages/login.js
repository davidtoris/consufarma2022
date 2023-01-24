import React, { useState } from 'react'
import NavBar from '../src/components/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Footer from '../src/containers/Footer';
import axios from 'axios';
import { API_BASE_URL } from '../src/constants';
import Loader from '../src/components/loader';
import Cookies from 'js-cookie'

const Login = () => {
  const loginSchema = Yup.object().shape({
    correo: Yup.string().email('Escribe un email válido').required('Campo requerido'),
    password: Yup.string().min(2, 'La contraseña no es válida').required('Campo requerido').min(6, 'La contraseña debe tener mínimo 6 caractéres'),
  });

  const [errorsData, setErrorsData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className='flex flex-col justify-between'>
    
      <NavBar />
      <div className='bg-login'>
        <div className='mx-auto font-body my-28'>
          <div className='m-auto w-4/12 flex'>
            <div className='col-span-1 md:col-span-2 md:px-0 px-3 text-white bg-blueConsufarma flex-1 rounded-xl'>
              <div className="mt-0 sm:mt-5">
                <Formik
                  initialValues={{
                    correo: '',
                    password: '',
                  }}
                  validationSchema={loginSchema}
                  onSubmit={async (valores) => {
                    console.log(valores)
                    setLoading(true);
                    await axios.post(`${API_BASE_URL}/auth/login`, valores)
                      .then((resp) => {
                        console.log(resp.data)
                        setLoading(false);
                        setErrorsData('');
                        Cookies.set('user', JSON.stringify(resp.data))
                      })
                      .catch((err) => {
                        console.log(err.response.data.msg);
                        setLoading(false);
                        setErrorsData(err.response.data.msg);
                      })

                  }}>
                  {({ errors }) => (
                    <Form className=" p-5 flex justify-center flex-col">
                      <h2 className='text-3xl font-bold mb-5 text-white text-center'>Iniciar sesión</h2>
                      
                      <div className='mb-3 m-auto w-10/12'>
                        <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Correo:</div>
                        <div className="">
                          <Field 
                            type="text" 
                            name="correo" 
                            className="text-lg pl-3 text-gray-600 border-2 border-gray-200 w-full m-auto rounded px-3
                            py-1.5" />
                          <ErrorMessage
                            name="correo"
                            component={() => (
                              <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.correo }</div>)} />
                        </div>
                      </div>

                      <div className='mb-3 m-auto w-10/12'>
                        <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Password:</div>
                        <div className="mb-3 w-100">
                          <Field 
                            type="password" 
                            name="password" 
                            className="text-lg pl-3 text-gray-600 border-2 border-gray-200 w-full rounded px-3
                            py-1.5" />
                          <ErrorMessage
                            name="password"
                            component={() => (
                              <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.password }</div>)} />
                        </div>
                      </div>

                      <div className='mb-3 m-auto w-10/12'>
                          {errorsData !== '' && (
                            <div className="text-yellow-300 text-xs ml-2 mt-2">
                              {errorsData}
                            </div>
                          )}
                        </div>

                      <div className='m-auto w-10/12 text-center'>
                        <button type="submit" className="btn btn-primary bg-redConsufarma border-0 w-4/12 p-2  text-1xl rounded font-bold shadow-xl mt-4 mb-6">
                          {loading ? <Loader /> : 'Iniciar sesión'}
                        </button>
                      </div>
                      
                      <div className='text-center cursor-pointer'>
                        <Link href="/registro">
                          <span className='underline underline-offset-1 hover:text-blueLightCustom'> ¿No tienes cuenta? Regístrate</span>
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
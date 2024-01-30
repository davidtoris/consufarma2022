import React, { useEffect, useState } from 'react'
import NavBar from '../src/components/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Footer from '../src/containers/Footer';
import Loader from '../src/components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { authLogin } from '../store/slices/Auth/authService';
import { userErrorFunc } from '../store/slices/Auth/AuthSlice';

const Login = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const loginSchema = Yup.object().shape({
    correo: Yup.string().email('Escribe un email válido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
  });

  const { userData, userLoading, userSuccess, userErrorMsg } = useSelector((state) => state.auths)

  useEffect(() => {
    if(userData.token){
      router.push("/")
    }
  }, [userData])

  useEffect(() => {
    if(userSuccess){
      dispatch(userDefault())
    }
  }, [])

  const handleRegister = () => {
    router.push("/registro");
    dispatch(userErrorFunc());
  }

  return (
    <div className='flex flex-col justify-between'>
      <NavBar />
      <div className='flex'>
        <div className='w-6/12'>
          <img src='https://res.cloudinary.com/drq8o9k36/image/upload/v1701922237/Captura_de_pantalla_2023-12-06_a_la_s_10.09.27_p.m._oydfzk.png' />
        </div>
        <div className='w-6/12'>
          <div className='font-body my-28'>
            
              <div className=' md:px-0 px-3 flex-1 rounded-xl'>
                <div className="mt-0 sm:mt-5">
                  <Formik
                    initialValues={{
                      correo: '',
                      password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (valores) => {
                      dispatch(authLogin(dispatch, valores))
                    }}>
                    {({ errors }) => (
                      <Form className=" p-5 flex justify-center flex-col">
                        <h2 className='text-3xl font-bold mb-5 text-blueConsufarma text-center'>Inicia sesión</h2>
                        
                        <div className='mb-1 m-auto w-10/12'>
                          <div className='text-left text-blueConsufarma font-bold text-lg ml-2 mt-2 mb-1'>Correo:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="correo" 
                              className="text-lg pl-3 text-gray-600 border-2 border-gray-200 w-full m-auto rounded-lg px-3 
                              py-2 shadow-md" />
                            <ErrorMessage
                              name="correo"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.correo }</div>)} />
                          </div>
                        </div>

                        <div className='mb-1 m-auto w-10/12'>
                          <div className='text-left text-blueConsufarma font-bold text-lg ml-2 mt-2 mb-1'>Password:</div>
                          <div className="mb-3 w-100">
                            <Field 
                              type="password" 
                              name="password" 
                              className="text-lg pl-3 text-gray-600 border-2 border-gray-200 w-full m-auto rounded-lg px-3
                              py-2 shadow-md" />
                            <ErrorMessage
                              name="password"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.password }</div>)} />
                          </div>
                        </div>

                        <div className='mb-1 m-auto w-10/12'>
                          {userErrorMsg && (
                            <div className="text-red-600 text-md ml-2 mt-2">
                              {userErrorMsg}
                            </div>
                          )}
                        </div>

                        <div className='m-auto w-10/12 text-center'>
                          <button type="submit" className="btn btn-primary bg-redConsufarma text-white border-0 w-4/12 p-2  text-1xl rounded font-bold shadow-xl mt-4 mb-6">
                            {userLoading ? <Loader /> : 'Iniciar sesión'}
                          </button>
                        </div>
                        
                        <div className='text-center cursor-pointer'>
                          <div onClick={handleRegister}>
                            <span className='underline underline-offset-1 hover:text-blueLightCustom text-blueConsufarma'> ¿No tienes cuenta? Regístrate</span>
                          </div>
                          <div className='mt-1'>
                            <Link href="/forgot">
                              <span className='underline underline-offset-1 hover:text-blueLightCustom'> Olvidé mi contraseña</span>
                            </Link>
                          </div>
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
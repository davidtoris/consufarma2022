import React, { useEffect, useState } from 'react'
import NavBar from '../src/components/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Footer from '../src/containers/Footer';
import Loader from '../src/components/loader';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { forgotPassword } from '../store/slices/Auth/authService';

const Forgot = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const loginSchema = Yup.object().shape({
    correo: Yup.string().email('Escribe un email válido').required('Campo requerido'),
  });

  const { userData, userLoading, userErrorMsg, userSuccess} = useSelector((state) => state.auths)

  useEffect(() => {
    if(userData.token){
      router.push("/")
    }
  }, [userData])

  return (

    <div className='flex flex-col justify-between'>
      {/* <NavBar /> */}
      <div className='flex max-h-[638px]'>
      <div className='w-6/12 bg-cover' style={{backgroundImage: 'url(https://res.cloudinary.com/drq8o9k36/image/upload/v1701922237/Captura_de_pantalla_2023-12-06_a_la_s_10.09.27_p.m._oydfzk.png)'}}>
          <img src='' />
        </div>
        <div className='w-6/12'>
      
          <div className='font-body my-28'>
            
              <div className=' md:px-0 px-3 flex-1 rounded-xl'>
                <div className="mt-0 sm:mt-5">
                <Formik
                  initialValues={{
                    correo: '',
                  }}
                  validationSchema={loginSchema}
                  onSubmit={async (valores) => {
                    const data = {
                      correo: valores.correo
                    }
                    forgotPassword(dispatch, data)
                  }}>
                  {({ errors }) => (
                    <Form className="p-5 flex justify-center flex-col">
                      <h2 className='text-4xl font-bold text-blueConsufarma text-center mb-2'>¿Olvidaste tu contraseña?</h2>
                      <div className='mb-5 mt-2 text-blueConsufarma text-center w-7/12 m-auto'>
                        Te enviaremos un correo para crear una nueva contraseña, no olvides revisar en tu bandeja de spam
                      </div>
                      
                      <div className='mb-1 m-auto w-8/12'>
                        <div className=' text-blueConsufarma font-semibold text-lg ml-2 mt-2 mb-1'>Correo:</div>
                        <div className="">
                          <Field 
                            type="text" 
                            name="correo"
                            placeholder="Escribe tu correo registrado"
                            className="text-lg pl-3 text-gray-600 border-2 border-gray-200 w-full m-auto rounded-md px-3 py-1 text-center shadow-md" />
                          <ErrorMessage
                            name="correo"
                            component={() => (
                              <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.correo }</div>)} />
                        </div>
                      </div>

                      <div className='mb-3 m-auto w-8/12'>
                        {userErrorMsg !== '' && (
                          <div className="text-red-600 text-sm ml-2 mt-2">
                            {userErrorMsg}
                          </div>
                        )}
                      </div>

                      <div className='mb-3 m-auto w-7/12'>
                        {userSuccess && (
                          <div className="bg-blueLightCustom text-md mt-2 text-center text-white rounded-md p-2">
                            Te hemos enviado un correo para recuperar tu cuenta
                          </div>
                        )}
                      </div>

                      <div className='m-auto w-12/12 font-bold text-center text-blueConsufarma'>
                        {userLoading && (
                          <div>Te estamos enviando el correo, por favor no recargues la página</div>
                        )}
                      </div>

                      <div className='m-auto w-8/12 text-center'>
                        <button type="submit" className="btn btn-primary bg-redConsufarma text-white border-0 w-4/12 p-2 text-1xl rounded font-bold shadow-xl mt-4 mb-2 hover:scale-110 transition">
                          {userLoading ? <Loader /> : 'Recuperar'}
                        </button>
                      </div>
                      
                      <div className='text-center cursor-pointer flex flex-col'>
                        <Link href="/login">
                          <span className='underline underline-offset-1 hover:text-blueLightCustom mt-1'>
                            Regresar al Login
                          </span>
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

export default Forgot;

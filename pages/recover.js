import React, { useEffect, useState } from 'react'
import NavBar from '../src/components/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Footer from '../src/containers/Footer';
import Loader from '../src/components/loader';
import { newPass, validateToken } from '../store/slices/Auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userDefault } from '../store/slices/Auth/AuthSlice';
import logo from '../src/assets/logo.png'
import Image from 'next/image';

const Recover = () => {

  const dispatch = useDispatch();
  const router = useRouter();
 
  const getCharacterValidationError = (str) => {
    return `Debe tener al menos 1 ${str}`;
  };

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .required("Escribe un email de 8 caracteres, 1 número, 1 minúscula y 1 mayúscula")
      .min(6, "El password debe tener al menos 8 caractéres")
      .matches(/[0-9]/, getCharacterValidationError("número"))
      .matches(/[a-z]/, getCharacterValidationError("minúsucla"))
      .matches(/[A-Z]/, getCharacterValidationError("mayúsucula")),
  });

  const { userLoading, userErrorMsg, userSuccess, userToken  } = useSelector((state) => state.auths)

  const { token } = router.query;

  // useEffect(() => {
  //   userSuccess && router.push("/")
  // }, [userSuccess])

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    token && validateToken(dispatch, token)
  }, [token])

  useEffect(() => {
    userToken && setShowForm(true)
  }, [userToken])

  const goToLogin = () => {
    router.push("/login")
    dispatch(userDefault())
  }

  useEffect(() => {
    if (userSuccess) {
      setTimeout(() => {
        router.push("/login")
      }, 2000);
    }
  }, [userSuccess])
  

  return (

    <div className='flex flex-col justify-between'>
      {/* <NavBar /> */}
      <div className='flex max-h-[638px]'>
        <div className='w-6/12 bg-cover hidden md:block' style={{backgroundImage: 'url(https://res.cloudinary.com/drq8o9k36/image/upload/v1701922237/Captura_de_pantalla_2023-12-06_a_la_s_10.09.27_p.m._oydfzk.png)'}} />

        <div className='w-11/12 md:w-6/12 m-auto'>
      
          <div className='font-body my-10 md:my-28'>
            {!showForm ? (
              <div className='flex justify-center'>
                <div className='flex justify-center flex-col text-center mt-20'>
                  <div className='text-4xl font-extrabold text-blueDarkCustom'>Por favor espera</div>
                  <div className='text-2xl font-normal text-blueDarkCustom mt-4'>Validando usuario...</div>
                  <div className='mb-3 m-auto w-8/12'>
                    {userErrorMsg !== '' && (
                      <div className="text-red-600 text-3x ml-2 mt-5">
                        El token expiró, vuelve a mandar el correo para recuperar tu contraseña
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (

              <>

                <div className='text-center '>
                  <Link href="/">
                    <div>
                      <Image src={logo} className='cursor-pointer' alt="logo-consufarma" width={450} height={80} />
                    </div>
                  </Link>
                </div>

                <div className=' md:px-0 px-3 flex-1 rounded-xl'>
                  <div className="mt-0 sm:mt-5">
                  <Formik
                    initialValues={{
                      password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (valores, resetForm) => {
                      newPass(dispatch, valores, token)
                      if ( userSuccess ) {
                        resetForm()
                      }
                    }}>
                    {({ errors }) => (
                      <Form className="p-5 flex justify-center flex-col">
                        <h2 className='text-3xl font-bold text-blueConsufarma text-center mb-5'>Nueva contraseña</h2>
                        <div className='flex justify-center mb-7'>
                          Crea una nueva contraseña
                        </div>
                        
                        <div className='mb-3 m-auto w-12/12 md:w-8/12'>
                          <div className='text-center text-blueConsufarma font-semibold text-lg ml-2 mb-1 '>Contraseña:</div>
                          <div className="w-100">
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

                        <div className='mb-3 m-auto w-12/12 md:w-8/12'>
                          {userErrorMsg !== '' && (
                            <div className="text-red-600 text-xs ml-2 mt-2">
                              El token expiró, vuelve a mandar el correo para recuperar tu contraseña
                            </div>
                          )}
                        </div>

                        <div className='mb-3 m-auto w-7/12'>
                          {userSuccess && (
                            <div className="bg-blueLightCustom text-md mt-2 text-center text-white rounded-md p-2">
                              Tu contraseña se a actualizado correctamente, en un momento serás dirigido al Login
                            </div>
                          )}
                        </div>

                        <div className='m-auto w-8/12 text-center'>
                          <button type="submit" className="btn btn-primary bg-redConsufarma text-white border-0 w-8/12 p-2 text-1xl rounded font-bold shadow-xl mb-2 hover:scale-110 transition">
                            {userLoading ? <Loader /> : 'Guardar'}
                          </button>
                        </div>
                        
                        <div className='text-center cursor-pointer flex flex-col'>
                          <button type='button' onClick={() => goToLogin()}>
                            <span className='underline underline-offset-1 hover:text-blueLightCustom'> Regresar al Login</span>
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      <Footer />
    </div>

  )
}

export default Recover;

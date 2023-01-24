import Image from 'next/image'
import React, { useState } from 'react'
import NavBar from '../src/components/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Footer from '../src/containers/Footer';
import axios from 'axios';
import { API_BASE_URL } from '../src/constants';
import Loader from '../src/components/loader';

const Registro = () => {

  const [type, setType] = useState('p-fisica');
  
  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
    setCheckedTwo(!checkedTwo);
    setType('p-fisica')
  };
  
  const handleChangeTwo = () => {
    setCheckedOne(!checkedOne);
    setCheckedTwo(!checkedTwo);
    setType('p-moral')
  };
  
  const phisicSchema = Yup.object().shape({
    correo: Yup.string().email('Escribe un email válido').required('Campo requerido'),
    password: Yup.string().min(2, 'La contraseña no es válida').required('Campo requerido').min(6, 'La contraseña debe tener mínimo 6 caractéres'),
    nombre: Yup.string().required('Campo requerido'),
  });

  const moralSchema = Yup.object().shape({
    emailMoral: Yup.string().email('Escribe un email válido').required('Campo requerido'),
    passwordMoral: Yup.string().min(2, 'La contraseña no es válida').required('Campo requerido').min(6, 'La contraseña debe tener mínimo 6 caractéres') ,
    razon: Yup.string().required('Campo requerido'),
    rfc: Yup.string().min(10, 'El RFC no es válido').required('Campo requerido'),
  });

  const [errorsData, setErrorsData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className='flex flex-col justify-between'>
    
      <NavBar />
      <div className='bg-login'>
        <div className='mx-auto font-body my-28 mt-16'>
          <div className='m-auto w-4/12 flex flex-col'>
            <div className='mb-3'>
                <input type="checkbox" value={checkedOne} checked={checkedOne} onChange={handleChangeOne} className='ml-4' /> <span className={checkedOne ? 'font-semibold' : '' } > Persona física </span>
                <input type="checkbox" value={checkedTwo} checked={checkedTwo} onChange={handleChangeTwo} className='ml-7' /> <span className={checkedTwo ? 'font-semibold' : '' }> Persona moral </span>
            </div>
            <div className='col-span-1 md:col-span-2 md:px-0 px-3 text-white bg-blueConsufarma flex-1 rounded-xl'>
              <div className="mt-0 sm:mt-5">
                {type === 'p-fisica' && (
                  <Formik
                    initialValues={{
                      correo: '',
                      password: '',
                      nombre: '',
                    }}
                    validationSchema={phisicSchema}
                    onSubmit={async (valores) => {
                      const data = {
                        correo: valores.correo,
                        password: valores.password,
                        nombre: valores.nombre,
                      }
                      setLoading(true);
                      await axios.post(`${API_BASE_URL}/usuarios`, data)
                      .then((resp) => {
                        console.log(resp.data)
                        setLoading(false);
                        setErrorsData([]);
                      })
                      .catch((err) => {
                        console.log(err.response.data.errors);
                        setLoading(false);
                        setErrorsData(err.response.data.errors);
                      })
                    }}>
                    {({ errors }) => (
                      <Form className=" p-5 flex justify-center flex-col">
                        <h2 className='text-3xl font-bold mb-5 text-white text-center'>Regístrate</h2>
                        
                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Correo:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="correo" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="correo"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.correo }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Password:</div>
                          <div className="">
                            <Field 
                              type="password" 
                              name="password" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="password"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.password }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Nombre:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="nombre" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="nombre"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.nombre }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          {errorsData.length > 0 && errorsData.map(e => (
                            <div className="text-yellow-300 text-xs ml-2 mt-2" key={e.msg}>
                              {e.msg}
                            </div>
                          ))}
                        </div>

                        <div className='m-auto w-10/12 text-center'>
                          <button type="submit" className="btn btn-primary bg-redConsufarma border-0 w-4/12 p-2 text-1xl rounded font-bold shadow-xl mt-4 mb-6">
                            {loading ? <Loader /> : 'Crear cuenta'}
                          </button>
                        </div>
                        
                        <div className='text-center cursor-pointer'>
                          <Link href="/login">
                            <span className='underline underline-offset-1 hover:text-blueLightCustom'> ¿Ya tienes cuenta? Inicia sesión</span>
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}

                {type === 'p-moral' && (
                  <Formik
                    initialValues={{
                      emailMoral: '',
                      passwordMoral: '',
                      razon: '',
                      rfc: '',
                    }}
                    validationSchema={moralSchema}
                    onSubmit={async (valores) => {
                      console.log(valores)
                      const data = {
                        correo: valores.emailMoral,
                        password: valores.passwordMoral,
                        nombre: valores.razon,
                        rfc: valores.rfc
                      }
                      setLoading(true);
                      await axios.post(`${API_BASE_URL}/usuarios`, data)
                      .then((resp) => {
                        console.log(resp.data)
                        setLoading(false);
                        setErrorsData([]);
                      })
                      .catch((err) => {
                        console.log(err.response.data.errors);
                        setLoading(false);
                        setErrorsData(err.response.data.errors);
                      })

                    }}>
                    {({ errors }) => (
                      <Form className=" p-5 flex justify-center flex-col">

                        <h2 className='text-3xl font-bold mb-5 text-white text-center'>Regístrate</h2>

                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Correo:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="emailMoral" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="emailMoral"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.emailMoral }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Password:</div>
                          <div className="">
                            <Field 
                              type="password" 
                              name="passwordMoral" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="passwordMoral"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.passwordMoral }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>Razón Social:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="razon" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="razon"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.razon }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          <div className='text-left text-white font-semibold text-lg ml-2 mt-2 mb-1'>RFC / RUC:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="rfc"
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded pt-1 px-3 pb-1.5" />
                            <ErrorMessage
                              name="rfc"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.rfc }</div>)} />
                          </div>
                        </div>

                        <div className='mb-3 m-auto w-10/12'>
                          {errorsData.length > 0 && errorsData.map(e => (
                            <div className="text-yellow-300 text-xs ml-2 mt-2" key={e.msg}>
                              {e.msg}
                            </div>
                          ))}
                        </div>

                        <div className='m-auto w-10/12 text-center'>
                          <button type="submit" className="btn btn-primary bg-redConsufarma border-0 w-4/12 p-2 text-1xl rounded font-bold shadow-xl mt-4 mb-6">
                            {loading ? <Loader /> : 'Crear cuenta'}
                          </button>
                        </div>
                        
                        <div className='text-center cursor-pointer'>
                          <Link href="/login">
                            <span className='underline underline-offset-1 hover:text-blueLightCustom'> ¿Ya tienes cuenta? Inicia sesión</span>
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Registro
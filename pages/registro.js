import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import NavBar from '../src/components/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Loader from '../src/components/loader';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../src/containers/Footer';
import { FaUser } from "react-icons/fa";
import { useRouter } from 'next/router';
import { registerUser } from '../store/slices/Auth/authService';

const Registro = () => {

  const getCharacterValidationError = (str) => {
    return `Debe tener al menos 1 ${str}`;
  };
  const phisicSchema = Yup.object().shape({
    correo: Yup.string().email('Escribe un email válido').required('El campo es obligatorio'),
    password: Yup.string()
      .required("Escribe una contraseña de 8 caracteres, 1 número, 1 minúscula y 1 mayúscula")
      .min(6, "El password debe tener al menos 8 caractéres")
      .matches(/[0-9]/, getCharacterValidationError("número"))
      .matches(/[a-z]/, getCharacterValidationError("minúsucla"))
      .matches(/[A-Z]/, getCharacterValidationError("mayúsucula")),
    empresa: Yup.string().required('El campo es obligatorio'),
    pais: Yup.string().required('El campo es obligatorio').min(4, 'El país no puede ser tan corto'),
    pfisica: Yup.string().required('El campo es obligatorio'),
    nombre: Yup.string()
      .when(["pfisica"], {
        is: (pfisica) => pfisica === "true",
        then: (nombre) => nombre.required('El campo es obligatorio').min(4, 'El nombre no puede ser tan corto'),
      }),
    razonSocial: Yup.string()
      .when(["pfisica"], {
        is: (pfisica) => pfisica === "false",
        then: (razonSocial) => razonSocial.required('El campo es obligatorio'),
      }),
    razonSocial: Yup.string()
      .when(["pfisica"], {
        is: (pfisica) => pfisica === "false",
        then: (razonSocial) => razonSocial.required('El campo es obligatorio').min(8, 'La razón social no puede ser tan corta'),
      }),
    pcontacto: Yup.string()
      .when(["pfisica"], {
        is: (pfisica) => pfisica === "false",
        then: (pcontacto) => pcontacto.required('El campo es obligatorio').min(4, 'La persona de contacto no puede ser tan corta'),
      }),
    empresa: Yup.string()
      .when(["pfisica"], {
        is: (pfisica) => pfisica === "false",
        then: (empresa) => empresa.required('El campo es obligatorio').min(4, 'La empresa no puede ser tan corta'),
      }),
    RFC: Yup.string()
      .when(["pfisica"], {
        is: (pfisica) => pfisica === "false",
        then: (RFC) => RFC.required('El campo es obligatorio').min(8, 'El RFC no puede ser tan corto'),
      }),
  });

  const { userRegister, userLoading, userErrorMsg } = useSelector((state) => state.auths)
  const dispatch = useDispatch()
  const router = useRouter();

  useEffect(() => {
    userRegister && router.push("/login")
  }, [userRegister])

  return (
    <div className='flex flex-col justify-between'>
      {/* <NavBar /> */}
      <div className='flex max-h-[638px]'>
        <div className='w-6/12 bg-cover' style={{backgroundImage: 'url(https://res.cloudinary.com/drq8o9k36/image/upload/v1701922237/Captura_de_pantalla_2023-12-06_a_la_s_10.09.27_p.m._oydfzk.png)'}}>
          <img src='' />
        </div>
        <div className='w-6/12 overflow-scroll pb-2'>  
          <div className='font-body'>
              <div className=' md:px-0 px-3 flex-1 rounded-xl'>
                <div className="mt-0 sm:mt-5">
                <Formik
                    initialValues={{
                      pfisica: 'true',
                      correo: '',
                      password: '',
                      nombre: '',
                      empresa: '',
                      pais: '',
                      razonSocial: '',
                      RFC: '',
                    }}
                    validationSchema={phisicSchema}
                    onSubmit={async (valores) => {
                      registerUser(dispatch, valores)
                    }}>
                      {
                      function ShowForm ({ values, errors }) {

                        const [isPersonaFisica, setIsPersonaFisica] = useState(false)
                        useEffect(() => {
                          if (values.pfisica === 'true' ) {
                            setIsPersonaFisica(true);
                          } else {
                            setIsPersonaFisica(false);
                          }
                        }, [values.pfisica])

                    return (
                      <Form className=" p-5 flex justify-center flex-col">

                      <h2 className='text-4xl font-bold mb-5 text-blueConsufarma text-center'>Regístrate</h2>

                      <div className='flex mb-10 m-auto'>
                        <div className={`${values.pfisica === 'true' ? 'bg-blueConsufarma text-white' : '' } rounded-md border border-nobel py-2 pl-2 pr-5 mr-10 ml-10 cursor-pointer`}>
                          <Field 
                            type="radio"
                            name="pfisica"
                            id="pfisica"
                            className='mr-2 '
                            value="true"
                            default
                          />
                          <label className='cursor-pointer' htmlFor='pfisica'>Persona Física</label>
                        </div>
                        <div className={`${values.pfisica === 'false' ? 'bg-blueConsufarma text-white' : '' } rounded-md border border-nobel py-2 pl-2 pr-5 cursor-pointer`}>
                          <Field 
                            type="radio"
                            name="pfisica"
                            id="pmoral"
                            className='mr-2'
                            value="false"
                          />
                          <label className='cursor-pointer' htmlFor="pmoral">Persona Moral</label>
                        </div>
                      </div>

                      {isPersonaFisica && (
                        <div className='mb-1 m-auto w-8/12'>
                          <div className='text-left text-blueConsufarma font-semibold text-lg ml-2'> 
                            Nombre:
                          </div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="nombre" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                            <ErrorMessage
                              name="nombre"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.nombre }</div>)} />
                          </div>
                        </div>
                      )}

                      {!isPersonaFisica && (
                        <div className='mb-1 m-auto w-8/12'>
                          <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>Persona de Contacto:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="pcontacto" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                            <ErrorMessage
                              name="pcontacto"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.pcontacto }</div>)} />
                          </div>
                        </div>
                      )}
                        
                        <div className='mb-1 m-auto w-8/12'>
                          <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>Correo:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="correo" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                            <ErrorMessage
                              name="correo"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.correo }</div>)} />
                          </div>
                        </div>

                        <div className='mb-1 m-auto w-8/12'>
                          <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>Contraseña:</div>
                          <div className="">
                            <Field 
                              type="password" 
                              name="password" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                            <ErrorMessage
                              name="password"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.password }</div>)} />
                          </div>
                        </div>

                        <div className='mb-1 m-auto w-8/12'>
                          <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>País:</div>
                          <div className="">
                            <Field 
                              type="text" 
                              name="pais" 
                              className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                            <ErrorMessage
                              name="pais"
                              component={() => (
                                <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.pais }</div>)} />
                          </div>
                        </div>

                        {!isPersonaFisica && (
                          <>
                            <div className='mb-1 m-auto w-8/12'>
                              <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>Empresa:</div>
                              <div className="">
                                <Field 
                                  type="text" 
                                  name="empresa" 
                                  className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                                <ErrorMessage
                                  name="empresa"
                                  component={() => (
                                    <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.empresa }</div>)} />
                              </div>
                            </div>

                            <div className='mb-1 m-auto w-8/12'>
                              <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>Razón Social:</div>
                              <div className="">
                                <Field 
                                  type="text" 
                                  name="razonSocial" 
                                  className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                                <ErrorMessage
                                  name="razonSocial"
                                  component={() => (
                                    <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.razonSocial }</div>)} />
                              </div>
                            </div>
    
                            <div className='mb-1 m-auto w-8/12'>
                              <div className='text-left text-blueConsufarma font-semibold text-lg ml-2 mt-2'>RFC / RUC:</div>
                              <div className="">
                                <Field 
                                  type="text" 
                                  name="RFC"
                                  className="text-lg pl-3 text-gray-700 border-2 border-gray-200 w-full rounded-lg pt-1 px-3 pb-1.5 shadow-md" />
                                <ErrorMessage
                                  name="RFC"
                                  component={() => (
                                    <div className="text-orangeCustom text-xs ml-2 mt-2">{ errors.RFC }</div>)} />
                              </div>
                            </div>
                          </>
                        )}

                        <div className='mb-1 m-auto w-8/12'>
                          {userErrorMsg && (
                            <div className="text-red-600 text-md ml-2 mt-2">
                              {userErrorMsg}
                            </div>
                          )}
                        </div>

                        <div className='m-auto w-6/12 text-center'>
                          <button type="submit" className="btn btn-primary bg-redConsufarma text-white border-0 w-10/12 p-2 text-1xl
                           rounded-md font-bold shadow-xl mt-6 mb-6">
                            {userLoading ? <Loader /> : 'Crear cuenta'}
                          </button>
                        </div>
                        
                        <div className='text-center cursor-pointer'>
                          <Link href="/login">
                            <span className='underline underline-offset-1 hover:text-blueLightCustom'> ¿Ya tienes cuenta? Inicia sesión</span>
                          </Link>
                        </div>
                      </Form>
                    )}}
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

export default Registro
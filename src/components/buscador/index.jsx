import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../loader';

const Buscador = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const FindSchema = Yup.object().shape({
    findcourse: Yup.string()
      .min(2, 'Escribe un dato válido')
      .max(20, 'Escribe un curso')
  });

  return (
    <div className="mt-0 sm:mt-5 w-100">

      <Formik
        initialValues={{
          findcourse: '',
        }}
        validationSchema={FindSchema}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          
          const value = valores.findcourse;
          const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          }


          router.push(`/find/?find=${removeAccents(value)}`);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000);
        }}>
        {({ errors }) => (
          <Form className="text-center">
            <div className='flex items-center bg-gray-200 w-80 mx-auto rounded-full p-2 mt-2 sm:mt-5'>
              <Field 
                type="text" 
                name="findcourse" 
                className="bg-gray-200 w-64 border-none outline-none flex-grow pl-2 bg-transparent text-lg"
                placeholder ="Encuentra tu curso"/>

              <button className=''>
                {!success ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>

                ) : (
                  <Loader />
                )}
              </button>
            </div>

            <ErrorMessage
                  name="findcourse"
                  component={() => (
                  <div className="text-white mt-1">{ errors.findcourse }</div>)} />
                  
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Buscador;

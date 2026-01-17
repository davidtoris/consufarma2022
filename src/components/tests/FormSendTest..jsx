import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { SendMailTest } from '../../../store/slices/Mail/MailService';
import ModalSendedLink from './ModalSendedLink';



const FormSendTest = ({ Test }) => {

  const dispatch = useDispatch()

  const { fecha_finalizacion, fecha_texto, img_curso, nombre_curso, nombre_examen,
    ponente_uno, ponente_dos, curso_relacionado_uno, curso_relacionado_dos, curso_relacionado_tres, _id } = Test

  const { mailStatus } = useSelector((state) => state.mail)

  const validationSchema = Yup.object().shape({
    correoEstudiantes: Yup.string().required('El campo es obligatorio'),
  });

  const valuesTest = {
    correoEstudiantes: '',
  }

  const [errorsEmail, setErrorsEmail] = useState([])
  const [goodEmails, setGoodEmails] = useState([])

  const sendEmail = () => {
    const dataEmails = {
      testId: _id,
      fecha_finalizacion,
      fecha_texto,
      img_curso,
      nombre_curso,
      ponente_uno,
      ponente_dos,
      emails: goodEmails.toString(),
      curso_relacionado_uno,
      curso_relacionado_dos,
      curso_relacionado_tres,
    }
    SendMailTest(dispatch, dataEmails)
  }

  useEffect(() => {
    if (mailStatus === 'success') {
      setOpenModal(true)
    }
  }, [mailStatus])

  const [openModal, setOpenModal] = useState(false)


  return (
    <div>

      <ModalSendedLink
        setOpenModal={setOpenModal}
        openModal={openModal}
      />

      <Formik
        initialValues={valuesTest}
        validationSchema={validationSchema}
        onSubmit={async (valores) => {

          const emails = valores.correoEstudiantes.split(/\s+/)

          // const emails = valores.correoEstudiantes.split(", ");
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          let badEmails = []
          let goodEmails = []

          emails.map(email => {
            if (!emailRegex.test(email)) {
              badEmails.push(email)
            } else {
              goodEmails.push(email)
            }
          })
          setErrorsEmail(badEmails)
          setGoodEmails(goodEmails)
        }}>

        {
          function FillInputs() {

            return (

              <Form className="p-0 md:p-5 flex justify-center flex-col w-10/12 m-auto">

                <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='m-auto' />

                <div className='flex flex-col justify-center m-auto'>
                  <h1 className="mt-5 font-bold text-2xl text-blueConsufarma text-center">{nombre_curso}</h1>
                  <h1 className="mb-4 font-light text-lg text-blueConsufarma text-center">Fecha del curso: {fecha_texto} </h1>
                </div>

                <div>
                  <div className='mt-5 flex'>
                    <div className='w-full'>
                      <label className="block text-md font-semibold text-gray-900 dark:text-white">Escribe los correos aquí:</label>
                      <Field
                        as="textarea"
                        type="text"
                        name="correoEstudiantes"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className='flex items-center'>
                    <button
                      type="submit"
                      className="w-2/12 text-white mt-4 bg-blueLightCustom hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Validar Correos
                    </button>

                    <button
                      onClick={() => sendEmail()}
                      type="button"
                      className="ml-5 w-2/12 text-white mt-4 bg-blueConsufarma hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Enviar exámen
                    </button>

                    {mailStatus === 'loading' && (
                      <div className='mt-5 ml-4 flex items-center text-gray-600'>
                        <div className="lds-dual-small-ring"></div>
                        Cargando...
                      </div>
                    )}
                  </div>

                  <div className='grid grid-cols-2'>

                    <div>
                      {goodEmails.length > 0 && (
                        <div className='mt-5 text-sm text-green-600 font-bold'>
                          <div>Correos que se enviarán:</div>
                          {goodEmails.map(email => (
                            <div className='flex' key={email}>
                              <div className='mr-2 text-gray-600 font-normal'>
                                {email}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      {errorsEmail.length > 0 && (
                        <div className='mt-4 text-sm text-red-600 font-bold'>
                          <div>Correos que no son válidos:</div>
                          {errorsEmail.map(email => (
                            <div className='flex' key={email}>
                              <div className='mr-2 text-gray-600 font-normal'>
                                {email}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </Form>
            )
          }}
      </Formik>


    </div>
  )
}

export default FormSendTest
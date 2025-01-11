import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import instanceAPI from '../../config/axiosConfig';

const FormMakeTest = ({ Test }) => {

  console.log(Test)

  const dispatch = useDispatch()
  
    const validationSchema = Yup.object().shape({
      nombre_examen: Yup.string()
        .required('El nombre del examen es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
      nombre_curso: Yup.string()
        .required('El curso es obligatorio'),
      fecha_texto: Yup.date()
        .required('La fecha es obligatoria'),
      fecha_finalizacion: Yup.date()
        .required('La fecha es obligatoria')
        .typeError('Debe ser una fecha válida'),
      ponente: Yup.string()
        .required('El nombre del ponente es obligatorio'),
      preguntas: Yup.array().of(
        Yup.object().shape({
          pregunta: Yup.string()
            .required('La pregunta es obligatoria')
            .min(5, 'La pregunta debe tener al menos 5 caracteres'),
          opcionA: Yup.string()
            .required('La opción A es obligatoria'),
          opcionB: Yup.string()
            .required('La opción B es obligatoria'),
          respuesta: Yup.string()
            .required('La respuesta es obligatoria')
            .oneOf(['A', 'B', 'C'], 'La respuesta debe ser A, B o C'),
          imagen: Yup.string()
            .url('Debe ser una URL válida')
            .nullable(), // Permite que el campo sea null o vacío
        })
      ).min(1, 'Debe haber al menos una pregunta'),
    });
  
    const valuesTest = {
      nombre_examen: '',
      nombre_curso: '',
      img_curso: '',
      fecha_texto: '',
      fecha_finalizacion: '',
      ponente: '',
      estudiante: '',
      correo: '',
      fecha: '',
      ponente: '',
    }
    
    const [answers, setAnswers] = useState([
      {
        pregunta: '1. Qué es la Integridad de Datos:',
        opcionA: 'Definir controles que permitan prevenir errores de comunicación, asegurando así que el personal siga los procedimientos correspondientes',
        opcionB: 'Es la integridad, coherencia y precisión de los datos a lo largo de todo su ciclo de vida. Esto abarca las etapas de creación, modificación, procesamiento, mantenimiento, archivo, recuperación, transmisión y eliminación de los datos.',
        opcionC: 'Todas las anteriores',
        respuesta: 'A',
        respuesta_estudiante: 'A',
        imagen: '',
      },
      {
        pregunta: '1. Qué es la Integridad de Datos:',
        opcionA: 'Definir controles que permitan prevenir errores de comunicación, asegurando así que el personal siga los procedimientos correspondientes',
        opcionB: 'Es la integridad, coherencia y precisión de los datos a lo largo de todo su ciclo de vida. Esto abarca las etapas de creación, modificación, procesamiento, mantenimiento, archivo, recuperación, transmisión y eliminación de los datos.',
        opcionC: 'Todas las anteriores',
        respuesta: 'A',
        respuesta_estudiante: 'B',
        imagen: '',
      }
    ])

    const handlePrint = async (id) => {
      await instanceAPI.get(`testsPDF/downloadPDF`, {responseType: 'blob'})
      .then((resp) => {
        window.open(URL.createObjectURL(resp.data));
      })
      .catch((err) => {
        console.log(err)
      })
    }
  
    return (
      <div>
        <button onClick={handlePrint}>Impriimr</button>
        <Formik
          initialValues={valuesTest}
          // validationSchema={validationSchema}
          onSubmit={async (valores) => {

            const data = {
              estudiante: valores.estudiante,
              correo: valores.correo,
              fecha: Test[0].fecha,
              ponente: Test[0].ponente,
              answers,
              
            }
            console.log(data)

          }}>
          
          {
            function fillInputs ({ values, errors, setFieldValue }) {
  
            return (
            
            <Form className="p-0 md:p-5 flex justify-center flex-col w-10/12 m-auto">
  
            <img src="../logo.png" width="600px" className='my-5 m-auto'/>
            
            <div className='flex flex-col justify-center m-auto'>
              <h1 className="mt-10 font-bold text-3xl text-blueConsufarma text-center">{Test[0].nombre_curso}</h1>
              <h1 className="mb-4 font-light text-xl text-blueConsufarma text-center">EVALUACIÓN DEL CURSO</h1>
              <div className='rounded-full'>
                <img src={Test[0].img_curso} width="500px" className='m-auto rounded-full'/>
              </div>
            </div>
  
            <div className='my-2 mb-3'>
              <label className="block text-md font-light text-gray-900 dark:text-white">Nombre:</label>
              <Field 
                type="text"
                name="estudiante"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="estudiante"
                component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.nombre_examen }</div>)} />
            </div>
            
            <div className='grid grid-cols-3 gap-4'>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Correo</label>
                <Field 
                  type="email"
                  name="correo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="correo"
                  component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.nombre_examen }</div>)} />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Fecha</label>
                <Field 
                  type="text"
                  name="fecha"
                  disabled
                  value={Test[0].fecha}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Ponente</label>
                <Field 
                  type="text"
                  name="ponenete"
                  disabled
                  value={Test[0].ponente}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
  
            {Test[0].preguntas.map( (p,i) => (
              <div className='mt-5'>
                <div className='font-bold'>{i+1}. {p.pregunta}</div>
                <div className='ml-2'>
                  <div className='cursor-pointer hover:bg-gray-200 my-1 p-1 rounded-md'>A) {p.opcionA}</div>
                  <div className='cursor-pointer hover:bg-gray-200 my-1 p-1 rounded-md'>B) {p.opcionB}</div>
                  <div className='cursor-pointer hover:bg-gray-200 my-1 p-1 rounded-md'>C) {p.opcionC}</div>
                </div>
              </div>
            ))}
            
  
  
  
            
            <button type="submit" className="w-3/12 text-white mt-4 bg-blueConsufarma hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Examen</button>
            
          </Form>
        )}}
        </Formik>
  
      </div>
  )
}

export default FormMakeTest
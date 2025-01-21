import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoAddCircle } from "react-icons/io5";
import { editTest } from '../../../store/slices/Tests/TestService';
import * as Yup from 'yup';

const FormEditTest = ({ coursesName, tests }) => {

  console.log(tests);

  const [arrayTest, setArrayTest] = useState([])

  useEffect(() => {
    const arrPreguntasMultString = tests[0].preguntas.map( t => ({
      ...t,
      respuestaMultiple: t.respuestaMultiple.toString()
    }))

    const data = {
      ...tests[0],
      preguntas: arrPreguntasMultString
    }
    setArrayTest(data)
  }, [])


  console.log(arrayTest);
  

  const dispatch = useDispatch()
  const router = useRouter();
  const { testSuccess, testLoading } = useSelector((state) => state.tests);
  
    const validationSchema = Yup.object().shape({
      nombre_examen: Yup.string().required('El nombre del examen es obligatorio'),
      nombre_curso: Yup.string().required('El curso es obligatorio'),
      fecha_texto: Yup.string().required('La fecha es obligatoria'),
      fecha_finalizacion: Yup.date().required('La fecha es obligatoria'),
      preguntas: Yup.array().of(
        Yup.object().shape({
          pregunta: Yup.string().required('La pregunta es obligatoria').min(5, 'La pregunta debe tener al menos 5 caracteres'),
          respuesta: Yup.string(),
          imagen: Yup.string(),
        })
      ).min(1, 'Debe haber al menos una pregunta'),
    });

    const valuesTest = {
      nombre_examen: '',
      nombre_curso: '',
      fecha_texto: '',
      fecha_finalizacion: '',
      ponente_uno: '',
      ponente_dos: '',
      preguntas: ''
    }

    const [courseSelected, setCourseSelected] = useState([])
    
    // Regresar al listado en Success
    useEffect(() => {
      if (testSuccess && testLoading){
        router.push("/examen/consAdmTes")
      }
    }, [testSuccess, testLoading])

  
    return (
      <div>
        <Formik
          initialValues={valuesTest}
          validationSchema={validationSchema}
          onSubmit={async (valores) => {
            
            const data = {
              nombre_examen: valores.nombre_examen,
              nombre_curso: courseSelected ? courseSelected.nombre : valores.nombre_curso,
              fecha_texto: courseSelected ? courseSelected.fecha_text : valores.fecha_texto,
              ponente_uno: courseSelected ? courseSelected.ponente_uno_id : tests.ponente_uno_id,
              ponente_dos: courseSelected ? courseSelected.ponente_dos_id : tests.ponente_dos_id,
              img_curso: courseSelected ? courseSelected.imagen : tests[0].img_curso,
              fecha_finalizacion: valores.fecha_finalizacion,
              preguntas: valores.preguntas
            }

            valores.preguntas.map( p => {
              if (p.tipo === 'multipleOpcion') {
                const arrayRespuestas = p.respuestaMultiple.trim().toUpperCase().split(",")
                p.respuestaMultiple = arrayRespuestas
              }
            })

            const preguntasMult = {
              ...data,
              preguntas: valores.preguntas
            }

            console.log(preguntasMult);
            editTest(dispatch, preguntasMult, tests[0]._id)
          }}>
          
          {
            function fillInputs ({ values, errors, setFieldValue }) {              
                          
              useEffect(() => {
                const course = coursesName.find(c => c.nombre === values.nombre_curso)
                if (course){
                  setCourseSelected(course)
                  setFieldValue('fecha_texto', course.fecha_text)
                  setFieldValue('ponente_uno', course.ponente_uno_id.ponente)
                  setFieldValue('ponente_dos', course.ponente_dos_id.ponente)
                }
              }, [values.nombre_curso])

              useEffect(() => {
                setFieldValue('nombre_examen', arrayTest.nombre_examen || '')
                setFieldValue('nombre_curso', arrayTest.nombre_curso || '')
                setFieldValue('fecha_texto', arrayTest.fecha_texto || '')
                setFieldValue('fecha_finalizacion', arrayTest.fecha_finalizacion || '')
                setFieldValue('preguntas', arrayTest.preguntas || '')
              }, [arrayTest])
  
            return (
            
            <Form className="p-0 md:p-5 flex justify-center flex-col w-10/12 m-auto">
              
              <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='my-5 m-auto'/>
  
            <div className='my-2 mb-3'>
              <label className="block text-md font-light text-gray-900 dark:text-white">Nombre del Exámen</label>
              <Field 
                type="text"
                name="nombre_examen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="nombre_examen"
                component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.nombre_examen }</div>)} />
            </div>
            <div className='mb-3'>
              <label className="block text-md font-light text-gray-900 dark:text-white">Nombre del Curso</label>
              <Field as="select" name="nombre_curso"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Seleccione una respuesta</option>
                {coursesName.map( s => (
                  <option key={s._id} value={s._nombre}>{s.nombre}</option>
                ))}
              </Field>
              <ErrorMessage
                name="nombre_curso"
                component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.nombre_examen }</div>)} />
            </div>
            
            <div className='grid grid-cols-4 gap-4'>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Fecha del Curso</label>
                <Field 
                  type="text"
                  name="fecha_texto"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Fecha de Finalización</label>
                <Field 
                  type="date"
                  name="fecha_finalizacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="fecha_finalizacion"
                  component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.fecha_finalizacion }</div>)} />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Ponente Uno</label>
                <Field name="ponente_uno"
                  disabled
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 dark:text-white">Ponente Dos</label>
                <Field name="ponente_dos"
                  disabled
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            </div>

            {values.preguntas.length > 0 && (
                
            <FieldArray name="preguntas">
              {({ remove, push }) => (
                <div>
                  {values.preguntas.map((pregunta, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
  
                      <div className='bg-gray-50 p-4 rounded-lg my-3'>
                        <h4 className="block text-md mb-1 font-bold text-gray-900 dark:text-white">Pregunta {index + 1}</h4>

                        <div className='my-2 mb-3'>
                          <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Tipo de pregunta</label>
                          <Field as="select" name={`preguntas.${index}.tipo`}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="">Selecciona un tipo</option>
                            <option value="unaOpcion">Una opción</option>
                            <option value="multipleOpcion">Multiple opción</option>
                            <option value="verdaderoFalso">Verdadero/Falso</option>
                          </Field>
                          <ErrorMessage
                            name={`preguntas.${index}.tipo`}
                            component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                        </div>
                        
                        {values.preguntas[index].tipo === '' ? (
                          <></>
                        ) : (
                          <div className='mx-5'>
                            <div className='my-2 mb-3'>
                              <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Pregunta</label>
                              <Field 
                                as="textarea"
                                type="text"
                                name={`preguntas.${index}.pregunta`} placeholder="Texto de la pregunta"
                                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`preguntas.${index}.pregunta`}
                                component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{errors.preguntas[index].pregunta}</div>)} />
                            </div>

                            {values.preguntas[index].tipo !== 'verdaderoFalso' && (
                              <div>
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Opción A</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.A`}
                                    placeholder="* Opción_A"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                  <ErrorMessage
                                    name={`preguntas.${index}.A`}
                                    component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                                </div>
        
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Opción B</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.B`}
                                    placeholder="* Opción_B"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                  <ErrorMessage
                                    name={`preguntas.${index}.B`}
                                    component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                                </div>
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Opción C</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.C`}
                                    placeholder="Opción_C"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                </div>

                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Opción D</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.D`}
                                    placeholder="Opción_D"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                </div>
                              </div>
                            )}

                            <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Respuesta (s)</label>
                            { values.preguntas[index].tipo === 'verdaderoFalso' && ( 
                              
                              <div className='my-2 mb-3'>
                                <Field as="select" name={`preguntas.${index}.respuesta`}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="">Selecciona un tipo</option>
                                  <option value="A">Verdadero</option>
                                  <option value="B">Falso</option>
                                </Field>
                              </div>
                            )}

                            { values.preguntas[index].tipo === 'unaOpcion' && ( 
                              <div className='my-2 mb-3'>
                                <Field as="select" name={`preguntas.${index}.respuesta`}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                <option value="">Seleccione una respuesta</option>
                                <option value="A">Opción A</option>
                                <option value="B">Opción B</option>
                                <option value="C">Opción C</option>
                                <option value="D">Opción D</option>
                                </Field>
                              </div>
                            )}

                            { values.preguntas[index].tipo === 'multipleOpcion' && ( 
                              <div>
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-900">Separa las respuestas por una coma</label>
                                  <Field name={`preguntas.${index}.respuestaMultiple`}
                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                </div>
                                <ErrorMessage
                                  name={`preguntas.${index}.respuestaMultiple`}
                                  component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                              </div>
                            )}

    
                            <div className='my-2 mb-3'>
                              <label className="block text-md font-light text-gray-700 dark:text-white text-sm">Imagen</label>
                              <Field 
                                type="text"
                                name={`preguntas.${index}.imagen`}
                                placeholder="Imagen"
                                className="border-b-2 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                            </div>
                          </div>
                        )}
                        </div>
                      
                      <button className='flex' type="button" onClick={() => remove(index)} style={{ marginTop: '10px', color: 'red' }}>
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ 
                      pregunta: '',
                      opcionA: '',
                      opcionB: '',
                      opcionC: '',
                      respuesta: '',
                      imagen: '',
                      }) }
                    style={{ marginTop: '10px' }}
                  >
                    <div className='flex bg-gray-100 p-3 rounded-lg items-center'>
                      <IoAddCircle className='text-3xl text-green-600 mr-1' />
                      Agregar Pregunta
                    </div>
                  </button>
                </div>
              )}
            </FieldArray>

            )}
            
            <button type="submit" className="w-3/12 text-white mt-4 bg-blueConsufarma hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Examen</button>
            
          </Form>
        )}}
        </Formik>
  
      </div>
  )
}

export default FormEditTest
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoAddCircle } from "react-icons/io5";
import { createTest } from '../../../store/slices/Tests/TestService';
import * as Yup from 'yup';
import { instanceAPIData } from '../../config/axiosConfig';
import { IoIosArrowDown, IoIosArrowUp, IoMdCloseCircle } from 'react-icons/io';


const FormNewTest = ({ coursesName }) => {

  console.log(coursesName);

  const dispatch = useDispatch()
  const router = useRouter();
  
    const validationSchema = Yup.object().shape({
      nombre_examen: Yup.string().required('El nombre del examen es obligatorio'),
      nombre_curso: Yup.string().required('El curso es obligatorio'),
      fecha_texto: Yup.string().required('La fecha es obligatoria'),
      fecha_finalizacion: Yup.date().required('La fecha es obligatoria'),
      presencialVirtual: Yup.string().required('El campo es obligatoria'),
      preguntas: Yup.array().of(
        Yup.object().shape({
          pregunta: Yup.string().required('La pregunta es obligatoria').min(5, 'La pregunta debe tener al menos 5 caracteres'),
          respuesta: Yup.string(),
          imagen: Yup.string(),
        })
      ).min(1, 'Debe haber al menos una pregunta'),
      curso_relacionado_uno: Yup.string().required('El campo es obligatoria'),
      curso_relacionado_dos: Yup.string().required('El campo es obligatoria'),
      curso_relacionado_tres: Yup.string().required('El campo es obligatoria'),
    });
  
    const valuesTest = {
      nombre_examen: '',
      nombre_curso: '',
      fecha_texto: '',
      fecha_finalizacion: '',
      ponente_uno: '',
      ponente_dos: '',
      presencialVirtual: '',
      duracion: '',
      preguntas: [
        {
          tipo: '',
          pregunta: '',
          A: '',
          B: '',
          C: '',
          D: '',
          respuesta: '',
          respuestaMultiple: [],
          imagen: '',
        },
      ],
      curso_relacionado_uno: '',
      curso_relacionado_dos: '',
      curso_relacionado_tres: '',
    }

    const [courseSelected, setCourseSelected] = useState([])
    const [showRelationCourses, setShowRelationCourses] = useState(false)

    // Subir imagen, obtener URL y agregar a la pregunta
    const handlePhoto = async (e, setFieldValue, index) => {     
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      try {
        const {data} = await instanceAPIData.post(`/tests/uploadImage`, formData)
          console.log(data);
          setFieldValue(`preguntas.${index}.imagen`, data.imagen)
      } catch (error) {
        console.log(error);
      }
    }

    // Eliminar imagen de la pregunta
    const removeImage = (setFieldValue, index) => {
      setFieldValue(`preguntas.${index}.imagen`, '')
    }

    return (
      <div>
        <Formik
          initialValues={valuesTest}
          validationSchema={validationSchema}
          onSubmit={ async (valores) => {
            const data = {
              nombre_examen: valores.nombre_examen,
              nombre_curso: courseSelected.nombre,
              fecha_texto: valores.fecha_texto ? valores.fecha_texto : courseSelected.fecha_text,
              fecha_finalizacion: valores.fecha_finalizacion,
              ponente_uno: courseSelected.ponente_uno_id,
              ponente_dos: courseSelected.ponente_dos_id,
              especialidad_id: courseSelected.especialidad_id._id,
              img_curso: courseSelected.imagen,
              preguntas: valores.preguntas,
              presencialVirtual: valores.presencialVirtual,
              duracion: valores.duracion,
              curso_relacionado_uno: valores.curso_relacionado_uno,
              curso_relacionado_dos: valores.curso_relacionado_dos,
              curso_relacionado_tres: valores.curso_relacionado_tres,
            }

            valores.preguntas.map( p => {
              if (p.tipo === 'multipleOpcion') {
                const arrayRespuestas = p.respuestaMultiple.toUpperCase().trim().split(",")
                p.respuestaMultiple = arrayRespuestas
              }
            })

            const preguntasMult = {
              ...data,
              preguntas: valores.preguntas
            }

            createTest(dispatch, preguntasMult, router)
          }}>
          
          {
            function FillInputs ({ values, errors, setFieldValue, handleBlur }) {              
              
              useEffect(() => {
                const course = coursesName.find(c => c._id === values.nombre_curso)
                if (course){
                  setCourseSelected(course)
                  setFieldValue('fecha_texto', course.fecha_text)
                  setFieldValue('ponente_uno', course.ponente_uno_id.ponente)
                  setFieldValue('ponente_dos', course.ponente_dos_id.ponente)
                  setFieldValue('duracion', course.duracion)
                }
              }, [values.nombre_curso])
              
              
            return (
            
            <Form className="p-0 md:p-5 flex justify-center flex-col w-10/12 m-auto">
  
            <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='my-5 m-auto'/>
              
            <div className='my-2 mb-3'>
              <label className="block text-md font-light text-gray-900 ">Nombre del Exámen</label>
              <Field 
                type="text"
                name="nombre_examen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="nombre_examen"
                component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.nombre_examen }</div>)} />
            </div>

            <div className='flex gap-4'>
              <div className='mb-3 w-3/4'>
                <label className="block text-md font-light text-gray-900 ">Nombre del Curso</label>
                <Field as="select" name="nombre_curso"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  <option value="">Seleccione una respuesta</option>
                  {coursesName.map( s => (
                    <option key={s._id} value={s._id}>{s.nombre}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name="nombre_curso"
                  component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.nombre_curso }</div>)} />
              </div>

              <div className='mb-3 w-1/4'>
                <label className="block text-md font-light text-gray-900 ">Presencial / Virtual</label>
                <Field as="select" name="presencialVirtual"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Seleccione una respuesta</option>
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                </Field>
                <ErrorMessage
                  name="presencialVirtual"
                  component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.presencialVirtual }</div>)} />
              </div>
            </div>
            
            <div className='grid grid-cols-4 gap-4'>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 ">Fecha del Curso</label>
                <Field 
                  type="text"
                  name="fecha_texto"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 ">Fecha de Finalización</label>
                <Field 
                  type="date"
                  name="fecha_finalizacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
                <ErrorMessage
                  name="fecha_finalizacion"
                  component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.fecha_finalizacion }</div>)} />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 ">Ponente Uno</label>
                <Field name="ponente_uno"
                  disabled
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 ">Ponente Dos</label>
                <Field name="ponente_dos"
                  disabled
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className='mb-3'>
                <label className="block text-md font-light text-gray-900 ">Duración</label>
                <Field name="duracion"
                  disabled
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
            </div>


            <div className='bg-blue-100 p-4 rounded-md'>
              <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowRelationCourses(!showRelationCourses)}>
                <div className='font-extrabold text-xl text-blueConsufarma mb-2'>Cursos relacionados</div>
                <div>
                { showRelationCourses ? <IoIosArrowUp /> : <IoIosArrowDown />  }
                </div>

              </div>
              {showRelationCourses && (
                <>
                  <div className='mb-3'>
                    <label className="block text-md font-light text-gray-900 ">Curso 1</label>
                    <Field 
                    as="select" name="curso_relacionado_uno"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                      <option value="">Seleccione una respuesta</option>
                      {coursesName.map( s => (
                        <option key={s._id} value={s._id}>{s.nombre}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="curso_relacionado_uno"
                      component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.curso_relacionado_uno }</div>)} />
                  </div>
                  <div className='mb-3'>
                    <label className="block text-md font-light text-gray-900 ">Curso 2</label>
                    <Field 
                      as="select" name="curso_relacionado_dos"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                      <option value="">Seleccione una respuesta</option>
                      {coursesName.map( s => (
                        <option key={s._id} value={s._id}>{s.nombre}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="curso_relacionado_dos"
                      component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.curso_relacionado_dos }</div>)} />
                  </div>
                  <div className='mb-3'>
                    <label className="block text-md font-light text-gray-900 ">Curso 3</label>
                    <Field 
                      as="select" name="curso_relacionado_tres"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                      <option value="">Seleccione una respuesta</option>
                      {coursesName.map( s => (
                        <option key={s._id} value={s._id}>{s.nombre}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="curso_relacionado_tres"
                      component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.curso_relacionado_tres }</div>)} />
                  </div>
                </>
              )}
            </div>

  
            <FieldArray name="preguntas">
              {({ remove, push }) => (
                <div>
                  {values.preguntas.map((pregunta, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
  
                      <div className='bg-gray-50 p-4 rounded-lg my-3'>
                        <h4 className="block text-md mb-1 font-bold text-gray-900 ">Pregunta {index + 1}</h4>

                        <div className='my-2 mb-3'>
                          <label className="block text-md font-light text-gray-700  text-sm">Tipo de pregunta</label>
                          <Field as="select" name={`preguntas.${index}.tipo`}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          >
                            <option value="">Selecciona un tipo</option>
                            <option value="unaOpcion">Una opción</option>
                            <option value="multipleOpcion">Multiple opción</option>
                            <option value="verdaderoFalso">Verdadero/Falso</option>
                          </Field>
                          <ErrorMessage
                            name="tipo"
                            component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                        </div>
                        
                        {values.preguntas[index].tipo === '' ? (
                          <></>
                        ) : (
                          <div className='mx-5'>
                            <div className='my-2 mb-3'>
                              <label className="block text-md font-light text-gray-700  text-sm">Pregunta</label>
                              <Field 
                                as="textarea"
                                type="text"
                                name={`preguntas.${index}.pregunta`} placeholder="Texto de la pregunta"
                                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              />
                              <ErrorMessage
                                name={`preguntas.${index}.pregunta`}
                                component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{errors.preguntas[index].pregunta}</div>)} />
                            </div>

                            {values.preguntas[index].tipo !== 'verdaderoFalso' && (
                              <div>
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700  text-sm">Opción A</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.A`}
                                    placeholder="* Opción_A"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  />
                                  <ErrorMessage
                                    name={`preguntas.${index}.A`}
                                    component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                                </div>
        
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700  text-sm">Opción B</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.B`}
                                    placeholder="* Opción_B"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  />
                                  <ErrorMessage
                                    name={`preguntas.${index}.B`}
                                    component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
                                </div>
                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700  text-sm">Opción C</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.C`}
                                    placeholder="Opción_C"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  />
                                </div>

                                <div className='my-2 mb-3'>
                                  <label className="block text-md font-light text-gray-700  text-sm">Opción D</label>
                                  <Field 
                                    as="textarea"
                                    type="text"
                                    name={`preguntas.${index}.D`}
                                    placeholder="Opción_D"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  />
                                </div>
                              </div>
                            )}

                            <label className="block text-md font-light text-gray-700  text-sm">Respuesta (s)</label>
                            { values.preguntas[index].tipo === 'verdaderoFalso' && ( 
                              
                              <div className='my-2 mb-3'>
                                <Field as="select" name={`preguntas.${index}.respuesta`}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                                  <label className="block text-xs font-semibold text-gray-900 -mt-2">Separa las respuestas por una coma</label>
                                  <Field name={`preguntas.${index}.respuestaMultiple`}
                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  />
                                </div>
                              </div>
                            )}

                            <ErrorMessage
                              name={`preguntas.${index}.respuestaMultiple`}
                              component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">Campo requerido</div>)} />
    
                            {/* IMAGEN */}
                            <div className='my-2 mb-3'>
                              <label className="block text-md font-light text-gray-700  text-sm">Imagen</label>
                              <Field 
                                type="text"
                                name={`preguntas.${index}.imagen`}
                                placeholder="Imagen"
                                className="border-b-2 text-gray-900 text-sm w-full hidden "
                              />

                              {values.preguntas[index].imagen && (
                                <div className='flex my-2' onClick={() => removeImage(setFieldValue, index)}>
                                  <img src={values.preguntas[index].imagen}
                                    alt="Previsualización"
                                    width={150}
                                  />
                                  <div className='cursor-pointer'>
                                    <IoMdCloseCircle className='text-xl ml-2'/>
                                  </div>
                                </div>
                              )}

                              <input type="file" onChange={(e) => handlePhoto(e, setFieldValue, index)} />
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
  
  
  
            
            <button type="submit" className="w-3/12 text-white mt-4 bg-blueConsufarma hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear Examen</button>
            
          </Form>
        )}}
        </Formik>
  
      </div>
  )
}

export default FormNewTest
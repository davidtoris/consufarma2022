import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createAnswersTests, validateUserTryings } from '../../../store/slices/TestsAnswers/TestsAnswersService';
import { addTestsAnswers, SeTerminoExamen } from '../../../store/slices/TestsAnswers/TestsAnswersSlice';
import { useRouter } from 'next/router';
import moment from 'moment';
import * as Yup from 'yup';
import { dateFormat } from '../../helpers/FomateDate';
import ModalTryings from './ModalTryings';



const FormMakeTest = ({ Test }) => {

  console.log(Test);

  const router = useRouter()
  const dispatch = useDispatch()

  const { fecha_finalizacion, fecha_texto, img_curso, nombre_curso, nombre_examen, 
    ponente_uno, ponente_dos, preguntas, _id } = Test[0]

  const { intentosExamen } = useSelector((state) => state.testsAnswers);
  const INTENTOS_PERMITIDOS = 2

  
    const validationSchema = Yup.object().shape({
      estudiante: Yup.string().required('El campo es obligatorio'),
      correo: Yup.string().email("Introduce un correo válido").required('El campo es obligatorio'),
    });
  
    const valuesTest = {
      estudiante: '',
      correo: '',
    }

    // selectOption(tipo, i, 'A')
    const [answersUser, setAnswersUser] = useState([])
    const [score, setScore] = useState(0)

    // Guardar las Respuestas del Usuario
    const selectOption = (tipo, i, Opc) => {
      
      setAnswersUser((prevAnswers) => {
        const updatedAnswers = [...prevAnswers]; // Crea una copia del array actual
        
        if (tipo === 'multipleOpcion') {
          // Asegúrate de que la posición `i` sea un array si no existe
          if (!Array.isArray(updatedAnswers[i])) {
            updatedAnswers[i] = [];
          }
    
          // Agrega el valor de `Opc` al array si no existe ya
          if (!updatedAnswers[i].includes(Opc)) {
            updatedAnswers[i] = [...updatedAnswers[i], Opc];
          } else {
            // Si ya existe, remuévelo (comportamiento de "toggle")
            updatedAnswers[i] = updatedAnswers[i].filter((item) => item !== Opc);
          }
        } else {
          // Para otros tipos, simplemente asigna `Opc`
          updatedAnswers[i] = Opc;
        }
    
        return updatedAnswers; // Devuelve la copia actualizada
      });
    }

    // Crear un array con base a la cantidad de preguntas
    useEffect(() => {
      let ArrayAnswers = []
      preguntas.map( p => {
        ArrayAnswers.push( p.tipo === 'multipleOpcion' ? [] : '')
      })
      setAnswersUser(ArrayAnswers)
    }, [])

    
    // Validar si la respuesta Usuario esta en Array multipleOpciones === Agrega fondo azul
    const answerMultipleOption = (Index, Opc) => {
      if(answersUser.length){
        if(answersUser[Index].includes(Opc)){
          return 'bg-blue-100'
        }
      }
    }

    // CALIFICAR EXAMEN
    const getScore = () => {
      preguntas.map( (p, idxPregunta) => {
        const answersUserTemp =  answersUser[idxPregunta]

        if (p.tipo === 'multipleOpcion') {
          
          // Verificar el largo de los dos arrays sea igual
          if (p.respuestaMultiple.length === answersUserTemp.length) {
            // Verificar si cada elemento de respExamen está en answersUserTemp y viceversa
            if ( p.respuestaMultiple.every(elem => answersUserTemp.includes(elem)) && answersUserTemp.every(elem => p.respuestaMultiple.includes(elem)) ) {
              setScore(prevScore => prevScore + 1);
            } 
          } 
        } else {
          if ( p.respuesta === answersUser[idxPregunta] ) {
            setScore(prevScore => prevScore + 1);
          } else {
          }
        } 
      })

      setSendAnswers(true)
    }

    const [infoUser, setInfoUser] = useState({})
    const [sendAnswers, setSendAnswers] = useState(false)

    useEffect(() => {
      if (sendAnswers) {
        const dataToSend = {
          estudiante: infoUser.estudiante,
          correo: infoUser.correo,
          answersUser,
          score,
          fecha_sistema: moment().format(),
          fecha_finalizacion,
          fecha_texto,
          test_id: _id,
          nombre_curso,
          hizoExamen: 'true'
        }

        createAnswersTests(dispatch, dataToSend)
        dispatch(addTestsAnswers());
        dispatch(SeTerminoExamen(true))

        router.push(`/examen/resultado/${_id}`)
        
        console.log(dataToSend);
      }
    }, [sendAnswers])

    const [ShowTest, setShowTest] = useState(true);
    const [openModalTryings, setOpenModalTryings] = useState(false);

    const howManyTryings = (e) => {
      const nameStudent = e.target.value
      const idTest = _id
      validateUserTryings(dispatch, idTest, nameStudent)
    }

    useEffect(() => {
      console.log(intentosExamen);
      if (intentosExamen > INTENTOS_PERMITIDOS){
        setOpenModalTryings(true)
        setShowTest(false)
      }
    }, [intentosExamen])
    
    
  
    return (
      <div>

        <ModalTryings 
          setOpenModalTryings={setOpenModalTryings}
          openModalTryings={openModalTryings}
        />

        
          <Formik
            initialValues={valuesTest}
            validationSchema={validationSchema}
            onSubmit={async (valores) => {

              const data = {
                estudiante: valores.estudiante,
                correo: valores.correo,
                fecha: fecha_finalizacion,
              }
              setInfoUser(data)
              getScore()

            }}>
            
            {
              function FillInputs ({ values, errors, setFieldValue, handleBlur }) {
    
              return (
              
              <Form className="p-0 md:p-5 flex justify-center flex-col w-10/12 m-auto">
    
              <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='m-auto'/>
              
              <div className='flex flex-col justify-center m-auto'>
                <h1 className="mt-5 font-bold text-2xl text-blueConsufarma text-center">{nombre_curso}</h1>
                <h1 className="mb-4 font-semibold text-lg text-blueConsufarma text-center">Fecha del curso: {fecha_texto} </h1>
                <h1 className="mb-4 font-light text-lg text-blueConsufarma text-center">EVALUACIÓN DEL CURSO</h1>
                <div className='rounded-full'>
                  <img src={img_curso} width="300px" className='m-auto rounded-full'/>
                </div>
              </div>

              {ShowTest && (
              <div>
    
                <div className='mt-5 flex'>
                  <div className='w-2/4'>
                    <label className="block text-md font-light text-gray-900 dark:text-white">Nombre:</label>
                    <Field 
                      onBlur={(e) => {
                        howManyTryings(e)
                        handleBlur(e)
                      }} 
                      type="text"
                      name="estudiante"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    <ErrorMessage
                      name="estudiante"
                      component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.estudiante }</div>)} />
                  </div>
                  <div className='w-2/4 ml-3'>
                    <label className="block text-md font-light text-gray-900 dark:text-white">Correo <span className='font-semibold text-sm'>(Escribe el correo donde se enviarán tus evaluación)</span></label>
                    <Field 
                      type="email"
                      name="correo"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="correo"
                      component={() => ( <div className="text-orangeCustom text-xs ml-2 mt-1">{ errors.correo }</div>)} />
                  </div>
                </div>
                
                <div className='mt-2'>
                  <div><span className='font-bold'>Fecha:</span> {dateFormat()}</div>
                  <div><span className='font-bold'>Ponente:</span> {ponente_uno[0].ponente}</div>
                  {ponente_dos[0].ponente !== 'ninguno' && (
                    <div><span className='font-bold'>Ponente:</span> {ponente_dos[0].ponente}</div>
                  )}
                </div>

                <div className='mt-4'>
                  <div className='font-semibold'>Instrucciones:</div>
                  <div className='font-extralight'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima et eveniet dolorem ipsum numquam omnis doloribus repellat aliquid modi perferendis adipisci nulla velit eos, assumenda quae. Esse dolor saepe expedita.</div>
                </div>

                <div className='mt-8'>
                  <div className='font-extrabold text-xl'>Preguntas:</div>
                </div>
    
                {preguntas.map( (p,i) => (

                  <div className='mt-3' key={p.pregunta}>
                    { p.tipo === 'verdaderoFalso' && (
                      <div className='ml-2'>
                        <div className='font-bold'>{i+1}. {p.pregunta}</div>
                        <div onClick={() => selectOption(p.tipo, i, 'A', p.respuesta)} className={`${answersUser[i] === 'A' && 'bg-blue-100'} cursor-pointer my-1 p-1 px-2 rounded-lg`}>A) Verdadero</div>
                        <div onClick={() => selectOption(p.tipo, i, 'B', p.respuesta)} className={`${answersUser[i] === 'B' && 'bg-blue-100'} cursor-pointer my-1 p-1 px-2 rounded-lg`}>B) Falso</div>
                      </div>
                    )}

                    { p.tipo === 'unaOpcion' && (
                      <div>
                        <div className='font-bold'>{i+1}. {p.pregunta}</div>
                        {p.imagen !== '' && (
                          <div className="w-[170px] mt-2">
                            <img src={p.imagen} className="" alt="imagen" />
                          </div>
                        )}
                        <div className='ml-2'>
                          <div onClick={() => selectOption(p.tipo, i, 'A')} className={`${answersUser[i] === 'A' && 'bg-blue-100'} cursor-pointer my-1 p-1 px-2 rounded-lg`}>A) {p.A}</div>
                          <div onClick={() => selectOption(p.tipo, i, 'B')} className={`${answersUser[i] === 'B' && 'bg-blue-100'} cursor-pointer my-1 p-1 px-2 rounded-lg`}>B) {p.B}</div>
                          {(p.C !== undefined )  && (<div onClick={() => selectOption(p.tipo, i, 'C')} className={`${answersUser[i] === 'C' && 'bg-blue-100'} cursor-pointer my-1 p-1 px-2 rounded-lg`}>C) {p.C}</div>)}
                          {(p.D !== undefined && p.D !== '' ) && (
                            <div onClick={() => selectOption(p.tipo, i, 'D')} className={`${answersUser[i] === 'D' && 'bg-blue-100'} cursor-pointer my-1 p-1 px-2 rounded-lg`}>
                              D) {p.D}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    { p.tipo === 'multipleOpcion' && (
                      <div>
                        <div className='font-bold'>{i+1}. {p.pregunta}</div>
                        <div className='ml-2'>
                          <div onClick={() => selectOption(p.tipo, i, 'A')} className={`${answerMultipleOption(i, 'A')} cursor-pointer my-1 p-1 px-2 rounded-lg`}>A) {p.A}</div>
                          <div onClick={() => selectOption(p.tipo, i, 'B')} className={`${answerMultipleOption(i, 'B')} cursor-pointer my-1 p-1 px-2 rounded-lg`}>B) {p.B}</div>
                          {p.C !== undefined && (<div onClick={() => selectOption(p.tipo, i, 'C')} className={`${answerMultipleOption(i, 'C')} cursor-pointer my-1 p-1 px-2 rounded-lg`}>C) {p.C}</div>)}
                          {p.D !== undefined && (<div onClick={() => selectOption(p.tipo, i, 'D')} className={`${answerMultipleOption(i, 'D')} cursor-pointer my-1 p-1 px-2 rounded-lg`}>D) {p.D}</div>)}
                        </div>
                      </div>
                    )}

                    <hr />

                  </div>
                ))}
              
                <button type="submit" className="w-3/12 text-white mt-4 bg-blueConsufarma hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Calificar Examen</button>


              </div>
              )}
              
            </Form>
            )}}
          </Formik>

  
      </div>
  )
}

export default FormMakeTest
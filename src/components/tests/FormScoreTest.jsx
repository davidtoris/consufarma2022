import React, { useEffect, useState } from 'react'
import instanceAPI from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { BsFillXCircleFill } from "react-icons/bs";
import { FaAward, FaCheckCircle, FaPrint } from 'react-icons/fa';
import { API_BASE_URL } from '../../constants';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';

const FormScoreTest = ({ Test, TestAnswer, point }) => {

  const { terminoExamen } = useSelector((state) => state.testsAnswers);
  const { fecha_texto, nombre_curso, ponente_uno, ponente_dos, preguntas, img_curso } = Test[0]

    console.log(Test[0]);
    console.log(TestAnswer);


    const handlePrint = async () => {
      await instanceAPI.get(`testsPDF/downloadPDF?testId=${TestAnswer.test_id}&scoreId=${TestAnswer._id}`, {responseType: 'blob'})
      .then((resp) => {
        window.open(URL.createObjectURL(resp.data));
      })
      .catch((err) => {
        console.log(err)
      })
    }

    // Validar cuando la respuesta sea correcta agregar fondo verde
    const rateAnswers = (respCorrecta, inciso, respUsuario) => {
      if (respCorrecta === inciso && respCorrecta === respUsuario) {
          return 'bg-green-300'
      }
      // if (inciso === respUsuario) {return 'bg-red-200'}
      // if (inciso === respCorrecta) {return 'bg-green-200'}
    }

    // Validar si respUsuario selecciono el inciso correcto de Opción Multiple y Poner bg-green-300
    const rateMultipleAnswer = (respCorrecta, inciso, respUsuario) => {
      if(respUsuario.includes(inciso)){
        if(respCorrecta.includes(inciso)){
          return 'bg-green-300'
        }
      }
    }

    // Icono verde: Se muestre solo si el inciso está en respUsuario y en respCorrecta.
    // Icono rojo: Se muestre solo si el inciso está en respUsuario pero no está en respCorrecta.    
    const setIconMultipleAnswer = (respCorrecta, inciso, respUsuario) => {
      if( respUsuario.includes(inciso) && respCorrecta.includes(inciso) ) {
        return <FaCheckCircle className='-ml-6 mr-1 text-green-500 w-[20px] h-[20px]' />  
      }

      if( respUsuario.includes(inciso) && !respCorrecta.includes(inciso) ) {
        return <BsFillXCircleFill className='-ml-6 mr-1 text-red-500 w-[20px] h-[20px]' />
      }
    }

    // Validar que icono mostrar en preguntas de Multiple Opción
    const setIconTrueFalse = (respCorrecta, inciso, respUsuario) => {
      if (respCorrecta === inciso && respCorrecta === respUsuario) {
        return <FaCheckCircle className='-ml-6 mr-1 text-green-500 w-[20px] h-[20px]' />
      }
      if (inciso === respUsuario) {
        return <BsFillXCircleFill className='-ml-6 mr-1 text-red-500 w-[20px] h-[20px]' />
      }
    }

    // Validar que icono mostrar en preguntas de Una Opción
    const setIconOneTrueFalse = (respCorrecta, inciso, respUsuario) => {
      if (respCorrecta === inciso && respCorrecta === respUsuario) {
        return <FaCheckCircle className='-ml-6 mr-1 text-green-500 w-[27px] h-[27px]' />
      }
      if (inciso === respUsuario) {
        return <BsFillXCircleFill className='-ml-6 mr-1 text-red-500 w-[20px] h-[20px]' />
      }
    }

    // Validar que la propiedad sea igual a la respuesta
    const proiedadIgualRespuesta = ( pregunta ) => {
      const separarKeyDeValor = Object.entries(pregunta)
      const dondeSonIguales = separarKeyDeValor.find( ( [key, value]) => key === pregunta.respuesta )
      const [key, value] = dondeSonIguales
      return `${key}) ${value}`
    }

    const [hasTest, setHasTest] = useState(false);
    const [emailSended, setEmailSended] = useState('');
    
    // Enviar Correo con Link
    const sendEmailTest = async () => {
      const data = {
        testId: TestAnswer.test_id,
        userId: TestAnswer._id,
        correo: TestAnswer.correo
      }
      console.log(data);
      await axios.post(`${API_BASE_URL}/email/sendTest`, data);
      setEmailSended('Se hizo correcto');
    }
  
    useEffect(() => {
      if (terminoExamen) {
        setHasTest(true)
        sendEmailTest();
      }
    }, [terminoExamen]);
  
    return (
      <>
      
      <div className='container m-auto mt-5'>
        <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='m-auto'/>
            
            <div className='flex flex-col justify-center m-auto'>
              <h1 className="mt-5 font-bold text-2xl text-blueConsufarma text-center">{nombre_curso}</h1>
              <h1 className="mb-4 font-semibold text-lg text-blueConsufarma text-center">Fecha del curso: {fecha_texto}</h1>
              <h1 className="mb-4 font-light text-lg text-blueConsufarma text-center">EVALUACIÓN DEL CURSO</h1>
              <div className='rounded-full'>
                <img src={img_curso} width="300px" className='m-auto rounded-full'/>
              </div>
            </div>
            
            <div className='mt-2'>
              <div className='font-extrabold text-xl'>Nombre: {TestAnswer.estudiante}</div>
              <div><span className='font-bold'>Fecha:</span> {moment(TestAnswer.fecha_finalizacion).format('D MMM YYYY')}</div>
              <div><span className='font-bold'>Ponente:</span> {ponente_uno[0].ponente}</div>
              {ponente_dos[0].ponente !== 'ninguno' && (
                <div><span className='font-bold'>Ponente:</span> {ponente_dos[0].ponente}</div>
              )}
              <div><span className='font-bold'>Calificación:</span> {TestAnswer.score}</div>
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
                  <div>
                    <div className='ml-2'>
                      <div className={`font-bold`}>{i+1}. {p.pregunta}</div>
                      <div className={`${rateAnswers(p.respuesta, 'A', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        { setIconTrueFalse(p.respuesta, 'A', TestAnswer.answersUser[i]) }
                        A) Verdadero
                      </div>
                      <div className={`${rateAnswers(p.respuesta, 'B', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        { setIconTrueFalse(p.respuesta, 'B', TestAnswer.answersUser[i]) }
                        B) Falso
                      </div>
                      
                      {p.respuesta !== TestAnswer.answersUser[i] && (
                        <div className='my-2 ml-2 '>
                          <div className='font-bold italic'>Respuesta correcta:</div>
                          <div className='text-gray-700'>
                            {`${p.respuesta}) ${TestAnswer.answersUser[i] === 'A' ? 'Falso' : 'Veradero'}`}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                { p.tipo === 'unaOpcion' && (
                  <div>
                    <div className='ml-2 '>
                    <div className='font-bold'>{i+1}. {p.pregunta}</div>
                      <div className={`${rateAnswers(p.respuesta, 'A', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'A', TestAnswer.answersUser[i])}
                        A) {p.A}
                      </div>
                      <div className={`${rateAnswers(p.respuesta, 'B', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'B', TestAnswer.answersUser[i])}
                        B) {p.B}
                      </div>
                      <div className={`${rateAnswers(p.respuesta, 'C', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'C', TestAnswer.answersUser[i])}
                        C) {p.C}
                      </div>
                      <div className={`${rateAnswers(p.respuesta, 'D', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'D', TestAnswer.answersUser[i])}
                        D) {p.D}
                      </div>

                      {p.respuesta !== TestAnswer.answersUser[i] && (
                        <div className='my-2 ml-2 '>
                          <div className='font-bold italic'>Respuesta correcta:</div>
                          <div className='text-gray-700'>
                            {proiedadIgualRespuesta(p)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                { p.tipo === 'multipleOpcion' && (
                  <div>
                    <div className='font-bold'>{i+1}. {p.pregunta}</div>
                    <div className='ml-2'>
                      <div className={`${rateMultipleAnswer(p.respuestaMultiple, 'A', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'A', TestAnswer.answersUser[i])}
                        A) {p.A}
                      </div>
                      <div className={`${rateMultipleAnswer(p.respuestaMultiple, 'B', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'B', TestAnswer.answersUser[i])}  
                        B) {p.B}
                      </div>
                      <div className={`${rateMultipleAnswer(p.respuestaMultiple, 'C', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'C', TestAnswer.answersUser[i])}
                        C) {p.C}
                      </div>
                      <div className={`${rateMultipleAnswer(p.respuestaMultiple, 'D', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'D', TestAnswer.answersUser[i])}
                        D) {p.D}
                      </div>
                    </div>

                    { !p.respuestaMultiple.every( resp => TestAnswer.answersUser.includes(resp)) && (
                      <div className='my-2 ml-2 '>
                        <div className='font-bold italic'>Respuesta correcta:</div>
                        <div className='text-gray-700 flex'>
                          {p.respuestaMultiple.map( (r, i) => (
                            <div className='flex mr-1' key={i}>
                              {r}){i+1 < p.respuestaMultiple.length && ','}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                <hr className='my-3' />

              </div>
            ))}

          {hasTest && (
            <>
              <div className='mt-10 text-blueLightCustom font-extrabold text-lg'>
                {emailSended === '' ? 'Te estaremos enviando ' : 'Te hemos enviado '}
                un correo a: <span className='underline'>{TestAnswer.correo}</span> con tu evaluación
              </div>
              <div>
                {emailSended === '' && (
                  <>
                    <div className='mb-3 font-extrabold text-red-600'>
                      No recargues la página 
                    </div>
                    <div className="lds-dual-ring mb-5"></div>
                  </>
                )}
              </div>
            </>
          )}

            <div className='flex text-lg font-semibold mb-10'>
              <div onClick={handlePrint} className='bg-blueConsufarma p-4 rounded-md text-white flex items-center hover:scale-110 transition-all cursor-pointer'>
                <FaPrint className="mr-2 text-lg" />
                Imprimir Examen</div>
              <div className='bg-blueConsufarma p-4 rounded-md text-white ml-4 flex items-center hover:scale-110 transition-all cursor-pointer'>
                <FaAward className="mr-2 text-xl" />
                Obtener Constancia</div>
            </div>
      </div>


      </>
  )
}

export default FormScoreTest
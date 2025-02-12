import React, { useEffect, useState } from 'react'
import instanceAPI from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { BsFillXCircleFill } from "react-icons/bs";
import { FaAward, FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import { API_BASE_URL } from '../../constants';
import axios from 'axios';
import { dateFormat } from '../../helpers/FomateDate';
import ModalDownload from './ModalDownload';

const FormScoreTest = ({ Test, TestAnswer, point }) => {

  const { terminoExamen } = useSelector((state) => state.testsAnswers);
  const { fecha_texto, nombre_curso, ponente_uno, ponente_dos, preguntas, img_curso } = Test[0]

    console.log(Test[0]);
    console.log(TestAnswer);

    const [openModal, setOpenModal] = useState(false)

    const handlePrint = async ( UrlScoreDiploma, TipoScoreDiploma ) => {
      try {
        const resp = await instanceAPI.get(
          `testsPDF/${UrlScoreDiploma}?testId=${TestAnswer.test_id}&scoreId=${TestAnswer._id}`,
          { responseType: 'blob' }
        );
    
        if (resp.data) {
          const fileURL = URL.createObjectURL(resp.data);
    
          // Crear un enlace temporal para descargar el archivo
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = `${TipoScoreDiploma} - ${TestAnswer.estudiante}.pdf`; // Nombre del archivo
          document.body.appendChild(link);
          link.click();
    
          // Limpieza: eliminar el enlace y liberar el objeto URL
          document.body.removeChild(link);
          URL.revokeObjectURL(fileURL);
          setOpenModal(true)
        } else {
          console.error('No data found in response.');
        }
      } catch (err) {
        console.error('Error fetching the PDF:', err);
      }
    };
    

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
      if (respUsuario) {
        if(respUsuario.includes(inciso)){
          if(respCorrecta.includes(inciso)){
            return 'bg-green-300'
          }
        }
      }
    }

    // Icono verde: Se muestre solo si el inciso está en respUsuario y en respCorrecta.
    // Icono rojo: Se muestre solo si el inciso está en respUsuario pero no está en respCorrecta.    
    const setIconMultipleAnswer = (respCorrecta, inciso, respUsuario) => {
      if (respUsuario) {
        if( respUsuario.includes(inciso) && respCorrecta.includes(inciso) ) {
          return <FaCheckCircle className='-ml-6 mr-1 text-green-500 w-[20px] h-[20px]' />  
        }
        if( respUsuario.includes(inciso) && !respCorrecta.includes(inciso) ) {
          return <BsFillXCircleFill className='-ml-6 mr-1 text-red-500 w-[20px] h-[20px]' />
        }
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
        correo: TestAnswer.correo,
        nombreCurso: nombre_curso,
        estudiante: TestAnswer.estudiante,
        examenConstancia: 'examen',
        curso_relacionado_uno: Test[0].curso_relacionado_uno,
        curso_relacionado_dos: Test[0].curso_relacionado_dos,
        curso_relacionado_tres: Test[0].curso_relacionado_tres,
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
      
      <ModalDownload 
        setOpenModal={setOpenModal}
        openModal={openModal}/>

      <div className='container m-auto mt-5'>
        <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='m-auto px-4 md:px-0'/>
            <div className='flex flex-col justify-center m-auto'>
              <h1 className="mt-5 font-bold text-2xl text-blueConsufarma text-center">{nombre_curso}</h1>
              <h1 className="mb-4 font-semibold text-lg text-blueConsufarma text-center">Fecha del curso: {fecha_texto}</h1>
              <h1 className="mb-4 font-light text-lg text-blueConsufarma text-center">EXAMEN DEL CURSO</h1>
              <div className='rounded-full'>
                <img src={img_curso} width="370px" className='m-auto rounded-full'/>
              </div>
            </div>
            
            <div className='mt-10 md:mt-2 px-4 md:px-0'>
              <div className='font-extrabold text-xl'>Nombre: {TestAnswer.estudiante}</div>
              <div><span className='font-bold'>Fecha de realización del Examen:</span> {dateFormat(TestAnswer.fecha_sistema)}</div>
              {ponente_dos[0].ponente === 'ninguno' ? (
                <div><span className='font-bold'>Ponente:</span> {ponente_uno[0].ponente}</div>
              ) : (
                <div><span className='font-bold'>Ponentes:</span> {ponente_uno[0].ponente} y {ponente_dos[0].ponente}</div>
              )}
              <div className='bg-blueLightCustom inline-block py-2 px-4 mt-2 rounded-full text-white'>
                <span className='font-bold mr-1'>Calificación:</span>
                {TestAnswer.score}
              </div>
            </div>

            <div className='mt-4 px-4 md:px-0'>
              <div className='font-semibold'>Instrucciones:</div>
              <div className='font-extralight'>Elige la respuesta correcta según aplique.</div>
            </div>

            <div className='mt-8 px-4 md:px-0'>
              <div className='font-extrabold text-xl'>Preguntas:</div>
            </div>
  
            {preguntas.map( (p,i) => (

              <div className='mt-3 px-4 md:px-0' key={p.pregunta}>
                { p.tipo === 'verdaderoFalso' && (
                  <div>
                    <div className='ml-2'>
                      <div className={`font-bold text-justify`}>{i+1}. {p.pregunta}</div>
                      {p.imagen !== '' && (
                        <div className="w-1/3">
                          <img src={p.imagen} className="" alt="imagen" />
                        </div>
                      )}
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
                          <div className='font-bold italic'>Respuesta correcta: {`${p.respuesta}`}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                { p.tipo === 'unaOpcion' && (
                  <div>
                    <div className='ml-2 '>
                    <div className='font-bold text-justify'>{i+1}. {p.pregunta}</div>
                      {p.imagen !== '' && (
                        <div className="w-[170px] mt-2">
                          <img src={p.imagen} className="" alt="imagen" />
                        </div>
                      )}
                      <div className={`${rateAnswers(p.respuesta, 'A', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'A', TestAnswer.answersUser[i])}
                        A) {p.A}
                      </div>
                      <div className={`${rateAnswers(p.respuesta, 'B', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'B', TestAnswer.answersUser[i])}
                        B) {p.B}
                      </div>
                      {p.C !== undefined && (<div className={`${rateAnswers(p.respuesta, 'C', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'C', TestAnswer.answersUser[i])}
                        C) {p.C}
                      </div>)}
                      {(p.D !== undefined && p.D !== '') && (<div className={`${rateAnswers(p.respuesta, 'D', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconOneTrueFalse(p.respuesta, 'D', TestAnswer.answersUser[i])}
                        D) {p.D}
                      </div>)}

                      {/* {/* "B" !== "A" && ( */}
                      {p.respuesta !== TestAnswer.answersUser[i] && (
                        <div className='my-2 ml-2 '>
                          <div className='font-bold italic'>Respuesta correcta: {p.respuesta}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                { p.tipo === 'multipleOpcion' && (
                  <div>
                    <div className='font-bold text-justify'>{i+1}. {p.pregunta}</div>
                    {p.imagen !== '' && (
                      <div className="w-1/3">
                        <img src={p.imagen} className="" alt="imagen" />
                      </div>
                    )}
                    <div className='ml-2'>
                      <div className={`${rateMultipleAnswer(p.respuestaMultiple, 'A', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'A', TestAnswer.answersUser[i])}
                        A) {p.A}
                      </div>
                      <div className={`${rateMultipleAnswer(p.respuestaMultiple, 'B', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'B', TestAnswer.answersUser[i])}  
                        B) {p.B}
                      </div>
                      {p.C !== undefined && (<div className={`${rateMultipleAnswer(p.respuestaMultiple, 'C', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'C', TestAnswer.answersUser[i])}
                        C) {p.C}
                      </div>)}
                      {p.D !== undefined && (<div className={`${rateMultipleAnswer(p.respuestaMultiple, 'D', TestAnswer.answersUser[i])} my-1 p-1 px-2 rounded-lg flex items-center`}>
                        {setIconMultipleAnswer(p.respuestaMultiple, 'D', TestAnswer.answersUser[i])}
                        D) {p.D}
                      </div>)}
                    </div>

                    { p.respuestaMultiple.every( cadaRespuesta => TestAnswer.answersUser.includes(cadaRespuesta)) 
                    ? (
                        <div></div>
                      ) : (
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
                      )
                    }

                  </div>
                )}

                <hr className='my-3' />

              </div>
            ))}

          {hasTest && (
            <>
              <div className='mt-10 text-blueLightCustom font-extrabold text-lg px-3 md:px-0'>
                {emailSended === '' ? 'Te estaremos enviando ' : 'Te hemos enviado '}
                un correo a: <span className='underline'>{TestAnswer.correo}</span> con tu Examen
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

          <div className='flex flex-col md:flex-row text-lg font-semibold mt-5 mb-10 px-4 md:px-0 justify-center'>
            <div onClick={() => handlePrint('scoreTestPDF', 'Examen')} className='w-12/12 md:w-4/12 bg-blueConsufarma p-4 rounded-md text-white flex items-center hover:scale-110 transition-all cursor-pointer justify-center'>
              <FaFilePdf className="mr-2 text-lg" />
                Descargar Examen</div>
            <div onClick={() => handlePrint('diplomaPDF', 'Constancia')} className='w-12/12 md:w-4/12 bg-blueLightCustom p-4 rounded-md text-white ml-6 flex items-center hover:scale-110 transition-all cursor-pointer justify-center'>
              <FaAward className="mr-2 text-xl" />
                Obtener Constancia</div>
          </div>
      </div>


      </>
  )
}

export default FormScoreTest
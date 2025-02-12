import React, { useEffect, useState } from 'react'
import instanceAPI from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { FaFilePdf } from 'react-icons/fa';
import { API_BASE_URL } from '../../constants';
import axios from 'axios';
import ModalDownload from './ModalDownload';

const FormDiploma = ({ Test, TestAnswer }) => {


  const { terminoExamen } = useSelector((state) => state.testsAnswers);
  
  const { fecha_texto, nombre_curso, ponente_uno, ponente_dos, img_curso } = Test[0]

  const [openModal, setOpenModal] = useState(false)

    const handlePrint = async () => {
      try {
        const resp = await instanceAPI.get(
          `testsPDF/diplomaPDF?testId=${TestAnswer.test_id}&scoreId=${TestAnswer._id}`,
          { responseType: 'blob' }
        );
    
        if (resp.data) {
          const fileURL = URL.createObjectURL(resp.data);
    
          // Crear un enlace temporal para descargar el archivo
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = `Constancia - ${TestAnswer.estudiante}.pdf`; // Nombre del archivo
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
        examenConstancia: 'constancia',
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
            <h1 className="font-semibold text-lg text-blueConsufarma text-center">Fecha del curso: {fecha_texto}</h1>

            <div className='rounded-full my-4'>
              <img src={img_curso} width="450px" className='m-auto rounded-full'/>
            </div>
          </div>
          
          <div className='mt-10 md:mt-4 px-4 md:px-0 text-center'>
            <div className='font-extrabold text-3xl'>Nombre: {TestAnswer.estudiante}</div>

            {ponente_dos[0].ponente === 'ninguno' ? (
                <div><span className='font-bold text-lg'>Ponente:</span> {ponente_uno[0].ponente}</div>
              ) : (
                <div><span className='font-bold text-lg'>Ponentes:</span> {ponente_uno[0].ponente} y {ponente_dos[0].ponente}</div>
              )}

          </div>

          {hasTest && (
            <div className='text-center'>
              <div className='mt-5 text-blueLightCustom font-extrabold text-lg px-3 md:px-0'>
                {emailSended === '' ? 'Te estaremos enviando ' : 'Te hemos enviado '}
                un correo a: <span className='underline'>{TestAnswer.correo}</span> con tu Constancia
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
            </div>
          )}

          <div className='flex-col md:flex text-lg font-semibold mt-4 mb-10 px-4 md:px-0'>
            <div onClick={handlePrint} className='w-12/12 md:w-4/12 bg-blueConsufarma p-4 rounded-md text-white flex items-center hover:scale-110 transition-all cursor-pointer justify-center m-auto'>
              <FaFilePdf className="mr-2 text-lg" />
              Descargar Constancia</div>
          </div>
      </div>


      </>
  )
}

export default FormDiploma
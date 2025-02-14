import React, { useEffect } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ListTestsAnswersByCourseAndDate } from '../../../store/slices/TestsAnswers/TestsAnswersService';
import { useRouter } from 'next/router';
import { dateFormat, dateTimeFormat } from '../../../src/helpers/FomateDate';
import { IoEyeOutline } from 'react-icons/io5';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import instanceAPI from '../../../src/config/axiosConfig';


const TableTestsAnswers = () => {
  
  const { allTestsAnswers } = useSelector((state) => state.testsAnswers);

  const dispatch = useDispatch()
  const {query: {TestId, date}} = useRouter()
  
  useEffect(() => {
    if (TestId && date) {
      ListTestsAnswersByCourseAndDate(dispatch, TestId, date)
    }
  }, [TestId, date])

  const handlePrint = async (TestId, ScoreId) => {
    await instanceAPI.get(`testsPDF/scoreTestPDF?testId=${TestId}&scoreId=${ScoreId}`, {responseType: 'blob'})
    .then((resp) => {
      window.open(URL.createObjectURL(resp.data));
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <div className="max-w-7xl mx-auto">
      <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='my-5 m-auto'/>

      <div className='mb-10 flex flex-col justify-center items-center m-auto text-center text-blueConsufarma'>
        <div className='font-normal text-xl uppercase'>
          Calificaciones del curso
        </div>
        <div className='font-light text-lg uppercase'></div>
        <div className='font-semibold text-xl uppercase'>{allTestsAnswers.length && allTestsAnswers[0].nombre_curso}</div>
      </div>
       
       <table id="table-to-xls" className="table-auto pb-10 my-8 w-full rounded-xl">
        <thead>
          <tr className='border-2 bg-blueDarkCustom text-white'>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Estudiante</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha Finalizacion</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha Impartición</th>
            {/* <th className='border-2 border-gray-100 font-bold text-md p-2'>Curso</th> */}
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Calificación</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha/Hora de Realización</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {allTestsAnswers.length && allTestsAnswers.map(t => (
            <tr className='border-2 text-1enter' key={t._id}>
              <td className='border-2 border-gray-200 p-1'>{t.estudiante}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{dateFormat(t.fecha_finalización)}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{t.fecha_texto}</td>
              {/* <td className='border-2 border-gray-200 p-1'>{t.nombre_curso}</td> */}
              <td className='border-2 border-gray-200 p-1 text-center'>{t.score}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{dateTimeFormat(t.fecha_sistema)}</td>
              <td className='border-2 border-gray-200 p-1'>
                <div className='flex text-xl justify-center px-1'>
                  <Link href={`/examen/resultado/${t.test_id}?student=${t._id}`}>
                    <div className='cursor-pointer hover:scale-110 transition-all mr-2'><IoEyeOutline title="Ver Examen" className='text-gray-500'/></div>
                  </Link>
                  <div onClick={() => handlePrint(t.test_id, t._id)} className='cursor-pointer hover:scale-110 transition-all'><BsFileEarmarkPdf title='Ver Examen en PDF' className='text-gray-500' /></div>
                </div>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableTestsAnswers
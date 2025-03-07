import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL, URL_SITE } from '../../../../src/constants';
import { VscCopy } from "react-icons/vsc";
import { ListTestsAnswers } from '../../../../store/slices/TestsAnswers/TestsAnswersService';
import { dateFormat, dateTimeFormat } from '../../../../src/helpers/FomateDate';
import { BsAward, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';
import instanceAPI from '../../../../src/config/axiosConfig';
import Select from 'react-select'
import Menu from '../../../../src/components/tests/UI/Menu';


const TableTestsAnswers = ({ courses }) => {
  
  const { allTestsAnswers } = useSelector((state) => state.testsAnswers);

  const dispatch = useDispatch()
  
  const [listSelected, setListSelected] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);
  
  const newListCourse = () => {
    const empty = {value: '', label: 'Selecciona una opción'}
    const valueSelect = courses.map( c => {
      return {
        value: c.nombre, label: c.nombre,
      }
    })
    valueSelect.unshift(empty)
    setListSelected(valueSelect)
  }
  
  const handleChange = (selected) => setSelectedCourse(selected.value);

  useEffect(() => {
    newListCourse()
  }, [courses])
  
  useEffect(() => {
    ListTestsAnswers(dispatch, selectedCourse, selectedDate)
  }, [selectedCourse, selectedDate])

  const copyLink = async (link) => {
    await navigator.clipboard.writeText(link);
    setCopied(true)
  }
  
  useEffect(() => {
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }, [copied])

  const handlePrint = async (TestId, ScoreId, urlTestDiploma) => {
    await instanceAPI.get(`testsPDF/${urlTestDiploma}?testId=${TestId}&scoreId=${ScoreId}`, {responseType: 'blob'})
    .then((resp) => {
      window.open(URL.createObjectURL(resp.data));
    })
    .catch((err) => {
      console.log(err)
    })
  }
  

  const onchangeDate = (e) => setSelectedDate(e.target.value)


  return (
    <div className="max-w-7xl mx-auto">

      <Menu />

      <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='my-5 m-auto'/>

      {copied && (
        <div className='bg-green-600 p-2 rounded-lg absolute top-10 right-20 font-bold text-white'>
          Se copió el Link del Examen
        </div>
      )}

      <div className='mb-10 flex justify-center items-center m-auto text-center'>
        <div className='font-bold text-3xl text-blueConsufarma'>
          Calificaciones <span className='font-light text-lg ml-1'>(Todos los estudiantes)</span>
        </div>
      </div>

      <div className='flex items-center mt-3'>
        <div className='w-2/3'>
        <Select options={listSelected} onChange={handleChange} placeholder="Filtar por curso" />
        </div>
        <div className='w-1/3 ml-5 border flex justify-between'>
          <input type='date' className='w-full p-1' onChange={onchangeDate } />
        </div>
      </div>
       
       <table id="table-to-xls" className="table-auto pb-10 mt-8 w-full rounded-xl">
        <thead>
          <tr className='border-2 bg-blueDarkCustom text-white'>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Estudiante</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha Finalizacion de Curso</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha Impartición</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Curso</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Calificación</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha Realización</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {allTestsAnswers.length && allTestsAnswers.map(t => (
            <tr className='border-2 text-1enter' key={t._id}>
              <td className='border-2 border-gray-200 p-1'>{t.estudiante}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{dateFormat(t.fecha_finalizacion)}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{t.fecha_texto}</td>
              <td className='border-2 border-gray-200 p-1'>{t.nombre_curso}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{t.score}</td>
              <td className='border-2 border-gray-200 p-1 text-center'>{dateTimeFormat(t.fecha_sistema)}</td>
              <td className='border-2 border-gray-200 p-1'>
                <div className='flex text-xl justify-center px-1'>
                  <div onClick={() => handlePrint(t.test_id, t._id, 'diplomaPDF')} className='cursor-pointer hover:scale-110 transition-all'><BsAward title='Ver Constancia' className='text-gray-500' /></div>
                  {t.score !== 'Sin Calificacion' && (
                    <Link href={`/examen/resultado/${t.test_id}?student=${t._id}`}>
                      <div className='cursor-pointer hover:scale-110 transition-all'><IoEyeOutline title="Ver Examen" className='text-gray-500 ml-3'/></div>
                    </Link>
                  )}
                  {t.score !== 'Sin Calificacion' && (
                    <div onClick={() => copyLink(`${URL_SITE}/examen/resultado/${t.test_id}?student=${t._id}`)} className='cursor-pointer hover:scale-110 transition-all ml-3'><VscCopy title="Copiar Link" className='text-gray-500'/></div>
                  )}
                  {t.score !== 'Sin Calificacion' && (
                    <div onClick={() => handlePrint(t.test_id, t._id, 'scoreTestPDF')} className='cursor-pointer hover:scale-110 transition-all ml-3'><BsFileEarmarkPdf title='Ver Examen en PDF' className='text-gray-500' /></div>
                  )}
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

export const getServerSideProps = async () => {

  const resCourses = await fetch(`${API_BASE_URL}/courses/name`);
  const dataCourses = await resCourses.json()
  const courses = dataCourses.courses

  return { props : { courses } }
}

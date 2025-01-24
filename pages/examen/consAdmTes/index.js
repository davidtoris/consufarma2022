import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AllTests, createTest } from '../../../store/slices/Tests/TestService';
import { API_BASE_URL, URL_SITE } from '../../../src/constants'

import { dateFormat } from '../../../src/helpers/FomateDate';
import { testReloadFunc } from '../../../store/slices/Tests/TestSlice';
import { FaRegCopy } from 'react-icons/fa'
import { BsFileEarmarkPdf, BsPlusCircleDotted } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { IoAddCircle, IoTrashOutline } from 'react-icons/io5';

import ModalDelete from '../../../src/components/tests/ModalDelete';
import instanceAPI from '../../../src/config/axiosConfig';
import Select from 'react-select'


const LandingItemCourse = ({ courses }) => {
  
  const { allTests, testReload, testLoading } = useSelector((state) => state.tests);
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
  
  const copyLink = async (link) => {
    await navigator.clipboard.writeText(link);
    setCopied(true)
  }
  
  const onchangeDate = (e) => setSelectedDate(e.target.value)

  const handlePrint = async (TestId) => {
    await instanceAPI.get(`testsPDF/downloadTestPDF?testId=${TestId}`, {responseType: 'blob'})
    .then((resp) => {
      window.open(URL.createObjectURL(resp.data));
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const DuplicateTest = (test) => {

    const data = {
      nombre_examen: test.nombre_examen,
      nombre_curso: test.nombre_curso,
      fecha_finalizacion: test.fecha_finalizacion,
      img_curso: test.img_curso,
      fecha_texto: test.fecha_texto,
      ponente_uno: test.ponente_uno,
      ponente_dos: test.ponente_dos,
      preguntas: test.preguntas,
    }

    createTest(dispatch, data)
  }

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [nameCourse, setNameCourse] = useState('')
  const [idCourse, setIdCourse] = useState('')

  const setOpenModal = ( name, idTest) => {
    setOpenModalDelete(true)
    setNameCourse(name)
    setIdCourse(idTest)
  }

  useEffect(() => {
    newListCourse()
  }, [courses])
  
  useEffect(() => {
    AllTests(dispatch, selectedCourse, selectedDate)
  }, [selectedCourse, selectedDate, testReload])

  useEffect(() => {
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }, [copied])
  
  useEffect(() => {
    if ( testReload ) {
      const timer = setTimeout(() => {
        dispatch(testReloadFunc())
      }, 1000);
      return () => clearTimeout(timer);
    } 
  }, [testReload, dispatch])

  console.log(testLoading);


  return (
    <div className="max-w-7xl mx-auto pb-10">

        <ModalDelete 
          setOpenModalDelete={setOpenModalDelete}
          openModalDelete={openModalDelete}
          nameCourse={nameCourse}
          idCourse={idCourse}
        />

      <img src="https://consufarma2022-davidtoris-projects.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.502e107c.png&w=1920&q=75" width="450px" className='my-5 m-auto'/>

      {copied && (
        <div className='bg-green-600 p-2 rounded-lg absolute top-10 right-20 font-bold text-white'>
          Se copió el Link del Examen
        </div>
      )}

      <div className='mt-7 flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='font-bold text-3xl text-blueConsufarma'>Exámenes</div>
          {testLoading && (
          <div>
            <div className="lds-dual-small-ring"></div>
          </div>
          )}
        </div>
        <Link href="/examen/consAdmTes/newTest">
          <div className='font-bold text-2xl text-blueConsufarma'>
            <div className='flex bg-redConsufarma p-2 rounded-lg items-center text-white font-medium text-lg hover:scale-110 transition-all cursor-pointer'>
            <IoAddCircle className="mr-2" /> Nuevo
            </div>
          </div>
        </Link>
      </div>

      <div className='flex items-center mt-3'>
        <div className='w-2/3'>
        <Select options={listSelected} onChange={handleChange} placeholder="Filtar por curso" />
        </div>
        <div className='w-1/3 ml-5 border flex justify-between'>
          <input type='date' className='w-full p-1' onChange={onchangeDate } />
        </div>
      </div>
       
       <table className="table-auto pb-10 mt-8 w-full rounded-xl">
        <thead>
          <tr className='border-2 bg-blueDarkCustom text-white'>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha finalización</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Nombre Curso</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Nombre Examen</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Fecha curso</th>
            <th className='border-2 border-gray-100 font-bold text-md p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allTests.length && allTests.map(t => (
              <tr className='border-2 text-1enter' key={t._id}>
                <td className='border-2 border-gray-200 p-1 text-center'>{dateFormat(t.fecha_finalizacion)}</td>
                <td className='border-2 border-gray-200 p-1'>{t.nombre_curso}</td>
                <td className='border-2 border-gray-200 p-1'>{t.nombre_examen}</td>
                <td className='border-2 border-gray-200 p-1'>{t.fecha_texto}</td>
                <td className='border-2 border-gray-200 p-1'>
                  <div className='flex text-xl justify-center px-1'>
                    <Link href={`/examen/consAdmTes/${t._id}`}>
                      <div className='cursor-pointer hover:scale-110 transition-all'><MdModeEditOutline title="Editar Examen" className='text-gray-500' /></div>
                    </Link>
                    <div onClick={() => copyLink(`${URL_SITE}/examen/${t._id}`)} className='cursor-pointer hover:scale-110 transition-all mx-3'><FaRegCopy title="Copiar al portapapeles" className='text-gray-500'/></div>
                    <div onClick={() => handlePrint(t._id)} className='cursor-pointer hover:scale-110 transition-all'><BsFileEarmarkPdf title='Ver Examen en PDF' className='text-gray-500' /></div>
                    <div onClick={() => setOpenModal(t.nombre_examen, t._id)} className='cursor-pointer hover:scale-110 transition-all ml-3'><IoTrashOutline title="Eliminar Examen" className='text-gray-500' /></div>
                    <div onClick={() => DuplicateTest(t)} className='cursor-pointer hover:scale-110 transition-all ml-3'><BsPlusCircleDotted title="Duplicar Examen" className='text-gray-500' /></div>
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

export default LandingItemCourse

export const getServerSideProps = async () => {

  const resCourses = await fetch(`${API_BASE_URL}/courses/name`);
  const dataCourses = await resCourses.json()
  const courses = dataCourses.courses

  return { props : { courses } }
}

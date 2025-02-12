import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AllTests, createTest } from '../../../store/slices/Tests/TestService';
import { API_BASE_URL, URL_SITE } from '../../../src/constants'

import { dateFormat } from '../../../src/helpers/FomateDate';
import { testReloadFunc } from '../../../store/slices/Tests/TestSlice';
import { VscCopy } from "react-icons/vsc";

import { BsFileEarmarkPdf, BsPlusCircleDotted } from "react-icons/bs";
import { MdModeEditOutline, MdOutlineMailOutline } from "react-icons/md";
import { IoAddCircle, IoTrashOutline } from 'react-icons/io5';

import ModalDelete from '../../../src/components/tests/ModalDelete';
import instanceAPI from '../../../src/config/axiosConfig';
import Select from 'react-select'
import Menu from '../../../src/components/tests/UI/Menu';
import { useRouter } from 'next/router';


const LandingItemCourse = ({ courses }) => {
  
  const { allTests, testReload, testLoading } = useSelector((state) => state.tests);
  const dispatch = useDispatch()
  const router = useRouter()
  
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
    await instanceAPI.get(`testsPDF/showTestPDF?testId=${TestId}`, {responseType: 'blob'})
    .then((resp) => {
      window.open(URL.createObjectURL(resp.data));
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const DuplicateTest = (test) => {

    const data = {
      especialidad_id: test.especialidad_id,
      fecha_finalizacion: test.fecha_finalizacion,
      fecha_texto: test.fecha_texto,
      img_curso: test.img_curso,
      nombre_curso: test.nombre_curso,
      nombre_examen: `${test.nombre_examen} Copia`,
      ponente_uno: test.ponente_uno,
      ponente_dos: test.ponente_dos,
      preguntas: test.preguntas,
      curso_relacionado_dos: test.curso_relacionado_dos,
      curso_relacionado_tres: test.curso_relacionado_tres,
      curso_relacionado_uno: test.curso_relacionado_uno,
      presencialVirtual: test.presencialVirtual,
      duracion: test.duracion,
    }

    createTest(dispatch, data, router)
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
      }, 500);
      return () => clearTimeout(timer);
    } 
  }, [testReload, dispatch])


  return (
    <div className="max-w-7xl mx-auto pb-10">

        <Menu />

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
                    <div onClick={() => copyLink(`${URL_SITE}/examen/${t._id}`)} className='cursor-pointer hover:scale-110 transition-all mx-2'><VscCopy title="Copiar Link" className='text-gray-500'/></div>
                    <div onClick={() => handlePrint(t._id)} className='cursor-pointer hover:scale-110 transition-all'><BsFileEarmarkPdf title='Ver Examen en PDF' className='text-gray-500' /></div>
                    <div onClick={() => setOpenModal(t.nombre_examen, t._id)} className='cursor-pointer hover:scale-110 transition-all ml-2'><IoTrashOutline title="Eliminar Examen" className='text-gray-500' /></div>
                    <div onClick={() => DuplicateTest(t)} className='cursor-pointer hover:scale-110 transition-all ml-2'><BsPlusCircleDotted title="Duplicar Examen" className='text-gray-500' /></div>
                    <Link href={`/examen/consAdmTes/enviarExamen/${t._id}`}>
                      <div className='cursor-pointer hover:scale-110 transition-all'><MdOutlineMailOutline title="Enviar Examen" className='text-gray-500 ml-2' /></div>
                    </Link>
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

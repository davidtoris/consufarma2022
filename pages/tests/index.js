import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../src/constants'
import { FaFilePdf } from 'react-icons/fa'
import { IoIosCopy } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { IoAddCircle } from 'react-icons/io5';
import Link from 'next/link';
import Select from 'react-select'
import { AllTests } from '../../store/slices/Tests/TestService';
import { useDispatch, useSelector } from 'react-redux';


const LandingItemCourse = ({ courses }) => {
  
  const { allTests } = useSelector((state) => state.tests);
  const dispatch = useDispatch()
  
  const [listSelected, setListSelected] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
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
    AllTests(dispatch, selectedCourse, selectedDate)
  }, [selectedCourse, selectedDate])  

  const onchangeDate = (e) => setSelectedDate(e.target.value)

  console.log(allTests)

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <img src="../logo.png" width="600px" className='my-5 m-auto'/>

      <div className='mt-20 flex justify-between'>
        <div className='font-bold text-2xl text-blueConsufarma'>Exámenes</div>
        <Link href="tests/newTest">
          <div className='font-bold text-2xl text-blueConsufarma'>
            <div className='flex bg-blue-600 p-2 rounded-lg items-center text-white font-medium text-lg hover:scale-110 transition-all cursor-pointer'>
            <IoAddCircle className="mr-2" /> Nuevo
            </div>
          </div>
        </Link>
      </div>

      <div className='mt-5 flex items-center'>
        Filtrar por:
      </div>
      <div className='flex items-center'>
        <div className='w-2/3'>
        <Select options={listSelected} onChange={handleChange} />
        </div>
        <div className='w-1/3 ml-5 border flex justify-between'>
          <input type='date' className='w-full p-1' onChange={onchangeDate } />
        </div>
      </div>
       
       <table id="table-to-xls" className="table-auto pb-10 mt-8 w-full rounded-xl">
        <thead>
          <tr className='border-2'>
            <th className='border-2 font-bold text-md p-2'>Fecha finalización</th>
            <th className='border-2 font-bold text-md p-2'>Nombre Curso</th>
            <th className='border-2 font-bold text-md p-2'>Nombre Examen</th>
            <th className='border-2 font-bold text-md p-2'>Fecha curso</th>
            <th className='border-2 font-bold text-md p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allTests && allTests.map(t => (
              <tr className='border-2 text-center p-2 even:bg-gray-100 ' key={t._id}>
                <td className='border-2 p-2'>{t.fecha_finalizacion}</td>
                <td className='border-2 p-2'>{t.nombre_curso}</td>
                <td className='border-2 p-2'>{t.nombre_examen}</td>
                <td className='border-2 p-2'>{t.fecha_texto}</td>
                <td className='border-2 p-2'>
                  <div className='flex text-xl justify-center'>
                    <Link href={`tests/${t._id}`}>
                      <div className='cursor-pointer hover:scale-110 transition-all'><MdModeEditOutline /></div>
                    </Link>
                    <div className='cursor-pointer hover:scale-110 transition-all mx-3'><IoIosCopy /></div>
                    <div className='cursor-pointer hover:scale-110 transition-all'><FaFilePdf /></div>
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
  
  const res = await fetch(`${API_BASE_URL}/tests/`);
  const data = await res.json()
  const test = data.tests

  const resCourses = await fetch(`${API_BASE_URL}/courses/name`);
  const dataCourses = await resCourses.json()
  const courses = dataCourses.courses

  return { props : { test, courses } }
}

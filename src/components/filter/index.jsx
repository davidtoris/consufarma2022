import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectSpecialities } from '../../../store/slices/Speciality/SpecialitiesSlice';

const Filter = ({specialities, active}) => {

  const dispatch = useDispatch();
  
  const [btnActive, setbtnActive] = useState(active);
  
  const handleChange = (e) => dispatch(selectSpecialities (e.target.value));
  const handleClick = (btnSelect) => setbtnActive(btnSelect);

  return (
    
    <div className='bg-blueConsufarma py-1'>
      <div className="max-w-7xl mx-auto bg-blueConsufarma">
          
        <section className='my-5 flex flex-col md:flex-row items-center justify-between px-2 '>

          <div className='flex xl:w-12/12 lg:w-12/12 text-center items-center'>
            <div className='text-white mr-3'>Cursos por:</div>
            <Link href="/" >
              <div onClick={() => handleClick('fecha')}
                className={btnActive === 'fecha' ? 'bg-white  text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 mr-3' : 'border-white border-2 text-white hover:bg-white hover:text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 mr-3'}>
                  Fecha
              </div>
            </Link>
            <Link href="/fecha">
              <div onClick={() => handleClick('especialidad')}
                className={btnActive === 'especialidad' ? 'bg-white  text-blueConsufarma cursor-pointer rounded-lg font-bold p-3' : 'border-white border-2 text-white hover:bg-white hover:text-blueConsufarma cursor-pointer rounded-lg font-bold p-3'}>
                  Especialidad
              </div>
            </Link>

            <div className='hidden md:flex'>
              <Link href="/?section=Programar">
                <div className='border-white border-2 text-white hover:bg-white hover:text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 ml-3'>
                    Por Programar
                </div>
              </Link>
              <Link href="/?section=Cerrados">
                <div className='border-white border-2 text-white hover:bg-white hover:text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 ml-3'>
                    Cerrados
                </div>
              </Link>
            </div>
            
            <div className='ml-2 text-white relative inline md:hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <select name="especialidad" className='bg-white w-1/12 opacity-0 absolute' onChange={handleChange}>
                <option value="" className='text-blueConsufarma'>Todas</option>
                {specialities.map(s => (
                  <option 
                  value={s.especialidad} 
                  key={s._id}>{s.especialidad}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className='text-righ justify-end pr-4 xs:pr-0 mt-3 md:mt-0 hidden md:flex'>
            <div className='text-white mr-2 font-semibold text-lg flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <span className='hidden md:inline'>Filtrar por especialidad:</span>
              <span className='inline md:hidden'>Especialidad</span>
            </div> 
            <select name="especialidad" className='bg-white p-2 text-blueConsufarma rounded-md pr-0' onChange={handleChange}>
              <option value="" className='text-blueConsufarma'>Todas</option>
                {specialities.map(s => (
                  <option 
                  value={s.especialidad} 
                  key={s._id}>{s.especialidad}</option>
                ))}
            </select>
          </div>
          
      </section>
      </div>
    </div>
  )
};

export default Filter;

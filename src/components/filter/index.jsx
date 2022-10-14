import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectSpecialities } from '../../../slices/SpecialitiesSlice';

const Filter = ({specialities, active}) => {

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    dispatch(selectSpecialities (e.target.value));
  }
  
  const [btnActive, setbtnActive] = useState(active);
  const handleClick = (btnSelect)=> {
    setbtnActive(btnSelect);
  }

  return (
    
    <div className='bg-blueConsufarma py-1'>
      <div className="max-w-7xl mx-auto bg-blueConsufarma">
          
        <section className='my-5 flex flex-col md:flex-row items-center justify-between px-10'>

          <div className='flex xl:w-12/12 lg:w-12/12 text-center'>
            <Link href="/" >
              <div 
                onClick={() => handleClick('fecha')}
                className={btnActive === 'fecha' ? 'bg-white  text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 mr-3' : 'border-white border-2 text-white hover:bg-white hover:text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 mr-3'}>
                  Cursos por fecha
              </div>
            </Link>
            <Link href="/fecha">
              <div 
                onClick={() => handleClick('especialidad')}
                className={btnActive === 'especialidad' ? 'bg-white  text-blueConsufarma cursor-pointer rounded-lg font-bold p-3' : 'border-white border-2 text-white hover:bg-white hover:text-blueConsufarma cursor-pointer rounded-lg font-bold p-3'}>
                  Cursos por Especialidad
              </div>
            </Link>
          </div>
          
          <form>
            <div className='text-righ flex justify-end pr-4 xs:pr-0 mt-3 md:mt-0'>
              <div className='text-white mr-2 font-semibold text-lg flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filtrar por especialidad:
              </div> 
              <select name="especialidad" className='bg-white p-2 text-blueConsufarma rounded-md pr-0' onChange={handleChange}>
                  <option value="" className='text-blueConsufarma'>Todas</option>
                {specialities.map(s => (
                  <option 
                    value={s.especialidad} 
                    key={s._id}
                    >{s.especialidad}</option>
                  ))}
              </select>
            </div>
          </form>
          
      </section>
      </div>
    </div>
  )
};

export default Filter;

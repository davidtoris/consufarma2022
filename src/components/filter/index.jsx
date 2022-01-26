import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectSpecialities } from '../../../slices/SpecialitiesSlice';

const Filter = ({specialities}) => {

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    dispatch(selectSpecialities (e.target.value));
  }

  useEffect(() => {
    dispatch(selectSpecialities (''));
  }, []);
  

  return (
    

    <div className="max-w-7xl mx-auto">
        
      <section className='my-5 mt-10 flex items-center justify-between'>

        <div className='flex xl:w-12/12 lg:w-12/12'>
          <Link href="/">
            <div className='bg-blueConsufarma text-center text-white cursor-pointer rounded-lg font-bold p-3 mr-3'>
              Cursos por Especialidad
            </div>
          </Link>
          <Link href="/calendario">
            <div className='border-blueConsufarma border-2 text-center text-blueConsufarma cursor-pointer rounded-lg font-bold p-3 hover:bg-blueConsufarma hover:text-white'>
              Cursos por fecha
            </div>
          </Link>
        </div>

        <form>
          <div className='text-righ flex justify-end pr-4 xs:pr-0'>
            <div className='text-blueDarkCustom mr-2 font-semibold text-lg flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filtrar por especialidad:
            </div> 
            <select name="especialidad" className='bg-blueDarkCustom p-2 text-white rounded-md pr-0' onChange={handleChange}>
                <option value="" className='text-white'>Todas</option>
              {specialities.map(s => (
                <option 
                  value={s.especialidad} 
                  key={s.id}
                  >{s.especialidad}</option>
                ))}
            </select>
          </div>
        </form>

    </section>
    </div>
  )
};

export default Filter;

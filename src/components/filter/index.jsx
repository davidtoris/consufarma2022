import React from 'react';

const Filter = ({specialities : { detalle }}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <section className='my-5 mt-10'>
        
      <form>
        <div className='text-righ flex justify-end'>
          <div className='text-blueDarkCustom mr-2 font-semibold text-lg flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filtrar por:
          </div> 
          <select name="especialidad" className='bg-blueDarkCustom p-2 text-white rounded-md pr-0'>
              <option value="">Especialidad</option>
            {detalle.map(s => (
              <option value={s.especialidad} key={s.id}>{s.especialidad}</option>
              ))}
          </select>
        </div>
      </form>

    </section>
    </div>
  )
};

export default Filter;

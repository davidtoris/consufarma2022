import React from 'react'

const Buscador = () => {
  return (
    <div className="mt-5 w-100">
      <form className="text-center">
          <div className="text-white text-3xl font-thin drop-shadow-md">
            Sigue aprendiendo
          </div>
          <div className="text-white text-5xl mb-2 drop-shadow-lg">
            ¿Qué vas a Aprender hoy?
          </div>
          <div className='flex items-center bg-gray-200 w-80 mx-auto rounded-full p-2 mt-5'>
            <input 
              type="text" 
              name="find" 
              className="bg-gray-200 w-64 border-none outline-none flex-grow pl-2 bg-transparent text-lg"
              placeholder ="Encuentra tu curso"/>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>
    </div>
  )
}

export default Buscador;

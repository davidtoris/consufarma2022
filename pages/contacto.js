import React from 'react'
import NavBar from '../src/components/NavBar'
import Footer from '../src/containers/Footer';

const Contacto = () => {

  return (
    <>
      <NavBar />
      <div className='max-w-7xl mx-auto container px-5 pb-40'>
        <h1 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center'>Contacto</h1>

        <p className='text-blueDarkCustom mb-5 text-center mt-6'>
          ¿Tienes alguna duda o requerimiento?, estamos para ayudarte.
        </p>

        <div className='bg-blueConsufarma rounded-md text-white py-10'>
          <div className='w-6/12 m-auto'>
          
            <form
              action="https://formspree.io/f/xdojaypg"
              method="POST"
            >

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="nombre"
                type="name" 
                name="nombre" 
                placeholder="Tu nombre" />
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="correo">
                Correo
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="email" 
                id="correo"
                name="correo" 
                placeholder="Tu correo" />
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="mensaje">
                Mensaje
              </label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="mensaje"
                name="mensaje"
                placeholder="Déjanos tu mensaje" />
            </div>
            
            <div className="mb-4">

              <input 
                className=" mr-2" 
                type="checkbox"
                id="aviso"
                name="aviso"/>
                Estoy de acuerdo con el <a href='' className='text-blueLightCustom'>Aviso de Privacidad</a>
            </div>

            <div className="flex items-center justify-between mt-5">
              <button 
                className="bg-redConsufarma hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Enviar
              </button>
            </div>

            </form>

          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Contacto;

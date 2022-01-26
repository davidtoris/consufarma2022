import React from 'react';
import NavBar from '../src/components/NavBar';
import Footer from '../src/containers/Footer';

const Nosotros = () => {
  return (
    <>
    <NavBar />
    <div className="max-w-7xl mx-auto container px-5 pb-40">

      <h1 className='text-4xl text-blueDarkCustom m-auto mt-5 font-bold text-center'>Nosotros</h1>

      

      <div className='grid sm:grid-cols-3 grid-cols-1 text-lg mt-4'>

        <div className='text-center block '>
          <div className='p-5 m-auto mt-0 text-5xl font-extrabold text-redConsufarma'>
          +500
          </div>
          <div className='h-1 w-6/12 bg-blueConsufarma m-auto mb-3'></div>
          <h3 className='text-center text-1xl font-bold text-blueDarkCustom w-8/12 m-auto'>
            Estudiantes felices
          </h3>
        </div>

        <div className='text-center block'>
          <div className='p-5 m-auto pt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 m-auto text-pinkCustom" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <div className='h-1 w-6/12 bg-red-500 m-auto mb-3'></div>
          <h3 className='text-center text-1xl font-bold text-blueDarkCustom w-8/12 m-auto'>
            Apoyo a nuestros estudiantes 
            <span className='text-blueLightCustom'> Antes y Después de su Curso</span>
          </h3>
        </div>
        
        <div className='text-center block'>
          <div className='p-5 m-auto'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 m-auto text-pinkCustom" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='h-1 w-6/12 bg-red-500 m-auto mb-3'>.</div>
          <h3 className='text-center text-1xl font-bold text-blueDarkCustom w-8/12 m-auto'>
            Cursos impartidos en
            <span className='text-blueLightCustom'> Empresas y Grupos personaliazdos</span>
          </h3>
        </div>
        
      </div>

      <section className='mb-8 mt-10'>
        <div className='text-gray-700'>
          <p className='mt-3'>
            Consufarma esta constituida por un grupo de expertos mexicanos que se se dedica a dar capacitación y consultoría a la industria farmacéutica y relacionadas, inició operaciones en el año 2013, cuenta con un grupo de expertos con amplia experiencia profesional y académica en las áreas de validación, estabilidad, sistemas de calidad y microbiología entre otras.
          </p>

          <p className='mt-3'>
            Enfocamos nuestros cursos a la identificación y prevención de riesgos sanitarios. Nos distinguimos por el alto nivel de nuestros cursos. Solicitamos previamente a los participantes sus preguntas las cuales son resueltas durante el curso. Nuestra capacitación es muy práctica al incluir la resolución de casos y ejercicios Tenemos un programa de cursos abiertos así como cursos en las instalaciones que nos indiquen nuestros clientes.
          </p>

          <p className='mt-3'>
            Contamos también con los servicios de consultoría en el áreas de validación, estabilidad y sistemas de calidad. Realizamos la traducción del Inglés al español de Archivos Maestros de Fabricación (DMF).
          </p>
        </div>
      </section>

      

      {/* <div className='grid grid-cols-3 gap-8 mt-20 text-center'>
        <div>
          <div className='font-bold text-2xl text-blueDarkCustom'>
            Misión
          </div>
          <p className='mt-4'>
            Proporcionar capacitación y asesoría a la industria farmacéutica y relacionadas con el fin de mejorar sus sistemas de calidad, eficientando sus procesos y ayudándolos a cumplir con las normas establecidas, brindando así a nuestros clientes un servicio que exceda sus expectativas.
          </p>
        </div>
        <div>
          <div className='font-bold text-2xl text-blueDarkCustom'>
            Visión
          </div>
          <p className='mt-4'>
            Para el 2021 ser reconocida por nuestros clientes, como una de las primeras 3 opciones del mercado mexicano para capacitar y asesorar a la industria farmacéutica y relacionadas.
          </p>
        </div>
        <div>
          <div className='font-bold text-2xl text-blueDarkCustom'>
            Valores
          </div>
          <p className='mt-4'>
            <ul>
              <li>Honestidad</li>
              <li>Responsabilidad con los clientes</li>
              <li>Integridad</li>
              <li>Respeto</li>
            </ul>
          </p>
        </div>
      </div> */}

    </div>
    <Footer />
    </>
  )
};

export default Nosotros;

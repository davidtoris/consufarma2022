import NavBar from '../src/components/NavBar';
import Footer from '../src/containers/Footer';

const Servicios = () => {
  return (
    <>
    <NavBar />
    <div className="max-w-7xl mx-auto container px-5">

      <h1 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center'>Servicios</h1>

      <section className='mb-8 mt-5'>
        <div className='text-gray-700'>
          <p className='mt-3'>
          Lo apoyamos en la capacitación de su personal, asesorándolo también en temas relacionados a laboratorio y sistemas de calidad, entre otros, así como en la traducción de DMF's (Archivos maestros de Ingredientes activos), para el registro de sus productos.
          </p>
        </div>
      </section>

      <div className='grid sm:grid-cols-3 grid-cols-1 text-lg gap-10'>

        <div className='text-center block '>
          <img src='https://www.consufarma.com/vistas/img/cursos.jpg' alt='' />
          <div className='h-1 w-6/12 bg-red-500 m-auto my-3'></div>
          <h3 className='text-center font-bold text-blueDarkCustom w-8/12 m-auto'>
            CURSOS ESPECIALIZADOS
          </h3>
          <div className='text-gray-500 mt-5 text-sm'>
            Consulte nuestro calendario anual, adaptamos y/o desarrollamos los temarios de acuerdo a sus necesidades
          </div>
          <div className='p-3 bg-blueLightCustom text-white mt-4 cursor-pointer hover:scale-105 transition'>
            CURSOS
          </div>
          <div className='p-3 bg-blueLightCustom text-white mt-4 cursor-pointer hover:scale-105 transition'>
            Consulte nuestro Calendario Anual
          </div>
        </div>

        <div className='text-center block'>
          <img src='https://www.consufarma.com/vistas/img/buenas-practicas-en-admisnitracion-de-proyectos.jpg' alt='' />
          <div className='h-1 w-6/12 bg-red-500 m-auto my-3'></div>
          <h3 className='text-center font-bold text-blueDarkCustom w-8/12 m-auto'>
            CONSULTORIA
          </h3>
          <div className='text-gray-500 mt-5 text-sm'>
            Ofrecemos asesoría para la validación, transferencia de metodología analítica y estudios de estabilidad de medicamentos entre otros servicios.
          </div>
        </div>
        
        <div className='text-center block'>
          <img src='https://www.consufarma.com/vistas/img/traduccion.jpg' alt='' />
          <div className='h-1 w-6/12 bg-red-500 m-auto my-3'>.</div>
          <h3 className='text-center font-bold text-blueDarkCustom w-8/12 m-auto'>
            TRADUCCIÓN DE “DMF’s” (ARCHIVOS MAESTROS DE INGREDIENTES ACTIVOS)
          </h3>
          <div className='text-gray-500 mt-5 text-sm'>
            Traducimos sus DMF ́s del idioma Inglés al Español.
          </div>
        </div>
        
      </div>

      

      

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

export default Servicios;

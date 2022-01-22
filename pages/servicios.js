import Image from 'next/image';
import NavBar from '../src/components/NavBar';
import Footer from '../src/containers/Footer';

const Servicios = () => {
  return (
    <>
    <NavBar />
    <div className='max-w-7xl mx-auto container px-5'>

      <h1 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center'>Servicios</h1>

      <section className='mb-8 mt-5'>
        <div className='text-gray-700'>
          <p className='mt-3'>
          Lo apoyamos en la capacitación de su personal, asesorándolo también en temas relacionados a laboratorio y sistemas de calidad, entre otros, así como en la traducción de DMF's (Archivos maestros de Ingredientes activos), para el registro de sus productos.
          </p>
        </div>
      </section>

      <div className='grid sm:grid-cols-3 grid-cols-1 text-lg gap-10'>

        <div className='text-center block'>
          <div className='relative w-100 h-36'>
            {/* <Image src='https://www.consufarma.com/vistas/img/cursos.jpg' alt='cursos-consufarma' layout='fill'/> */}
          </div>
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
          <div className='relative w-100 h-36'>
            {/* <Image src='https://www.consufarma.com/vistas/img/buenas-practicas-en-admisnitracion-de-proyectos.jpg' alt='consultoria consufarma' layout='fill'/> */}
          </div>
            <div className='h-1 w-6/12 bg-red-500 m-auto my-3'></div>
            <h3 className='text-center font-bold text-blueDarkCustom w-8/12 m-auto'>
              CONSULTORIA
            </h3>
            <div className='text-gray-500 mt-5 text-sm'>
              Ofrecemos asesoría para la validación, transferencia de metodología analítica y estudios de estabilidad de medicamentos entre otros servicios.
            </div>
        </div>
        
        <div className='text-center block'>
          <div className='relative w-100 h-36'>
            {/* <Image src='https://www.consufarma.com/vistas/img/traduccion.jpg' alt='traducciones' layout='fill' /> */}
          </div>
            <div className='h-1 w-6/12 bg-red-500 m-auto my-3'>.</div>
            <h3 className='text-center font-bold text-blueDarkCustom w-8/12 m-auto'>
              TRADUCCIÓN DE “DMF’s” (ARCHIVOS MAESTROS DE INGREDIENTES ACTIVOS)
            </h3>
            <div className='text-gray-500 mt-5 text-sm'>
              Traducimos sus DMF ́s del idioma Inglés al Español.
            </div>
        </div>
        
      </div>

    </div>
    <Footer />
    </>
  )
};

export default Servicios;

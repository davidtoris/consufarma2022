import Image from 'next/image';
import NavBar from '../src/components/NavBar';
import Footer from '../src/containers/Footer';

const Servicios = () => {
  return (
    <>
    <NavBar />
    <div className='max-w-7xl mx-auto container px-5 pb-40'>

      <h1 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center'>Servicios</h1>

      <section className='mb-8 mt-5'>
        <div className='text-gray-700'>
          <p className='mt-3'>
            Te apoyamos en la capacitación de tu personal, asesormos también en temas relacionados a laboratorio, cromatografía, validación, sistemas de calidad, entre otros, así como en la traducción de DMF’s (Archivos maestros de Ingredientes activos), para el registro de sus productos.
          </p>
        </div>
      </section>

      <div className='grid sm:grid-cols-3 grid-cols-1 text-lg gap-10'>

        <div className='text-center block'>
          <div className='relative w-100 h-36'>
            <Image src='https://www.consufarma.com/vistas/img/cursos.jpg' alt='cursos-consufarma' layout='fill'/>
          </div>

          <h3 className='text-center font-bold text-blueConsufarma w-8/12 m-auto mt-5'>
            CURSOS PERSONALIZADOS         
          </h3>
          <div className='text-gray-500 mt-5 text-sm'>
            Consulta nuestro calendario anual de cursos abiertos, contamos también con cursos cerrados para empresas, desarrollamos los temarios de acuerdo a tus necesidades.
          </div>
          <div className='p-3 bg-redConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
            Cursos
          </div>
          <div className='p-3 bg-blueConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
            Consulte nuestro Calendario Anual
          </div>
        </div>

        <div className='text-center block'>
          <div className='relative w-100 h-36'>
            <Image src='https://www.consufarma.com/vistas/img/buenas-practicas-en-admisnitracion-de-proyectos.jpg' alt='consultoria-consufarma' layout='fill'/>
          </div>
            <h3 className='text-center font-bold text-blueConsufarma w-8/12 m-auto mt-5'>
              CONSULTORIA
            </h3>
            <div className='text-gray-500 mt-5 text-sm'>
              Ofrecemos asesoría para el desarrollo y validación de métodos analíticos, implementación de sistemas de calidad y estudios de estabilidad entre otros servicios.
            </div>
            <div className='p-3 bg-redConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
              Contáctanos ahora
            </div>
        </div>
        
        <div className='text-center block'>
          <div className='relative w-100 h-36'>
            <Image src='https://www.consufarma.com/vistas/img/traduccion.jpg' alt='traducciones' layout='fill' />
          </div>

          <h3 className='text-center font-bold text-blueDarkCustom w-8/12 m-auto mt-5'>
            TRADUCCIÓN DE “DMF’s” (ARCHIVOS MAESTROS DE INGREDIENTES ACTIVOS)
          </h3>
          <div className='text-gray-500 mt-5 text-sm'>
            Traducimos tus DMF ́s del idioma Inglés al Español.
          </div>
          <div className='text-center p-3 bg-redConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
            Solicita tu traducción aquí
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </>
  )
};

export default Servicios;

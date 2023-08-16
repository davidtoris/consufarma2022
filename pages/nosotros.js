import Link from 'next/link';
import React, { useState } from 'react';
import NavBar from '../src/components/NavBar';
import Footer from '../src/containers/Footer';
import axios from 'axios';
import { API_BASE_URL } from '../src/constants';

const Nosotros = () => {

  const [document, setDocument] = useState('')
  const getPdf = async () => {
    // console.log('first')
    await axios.get(`${API_BASE_URL}/pdf/downloadPDF`, {responseType: 'blob'})
    .then((resp) => {
      console.log(resp.data)
      window.open(URL.createObjectURL(resp.data));
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <NavBar />
    <div className="max-w-7xl mx-auto container px-5 pb-10">


      <h1 className='text-4xl text-blueDarkCustom m-auto mt-5 font-bold text-center'>Nosotros</h1>

      

      <div className='grid sm:grid-cols-3 grid-cols-1 text-lg mt-4'>

        <div className='text-center block '>
          <div className='m-auto'>
            <img src="../nosotros/estudiantes.png" alt='' className='inline-block' width="50%" />
          </div>
          <div className='p-5 m-auto mt-0 text-5xl font-extrabold text-blueConsufarma'>
          +2000
          </div>
          <div className='h-1 w-6/12 bg-redConsufarma m-auto mb-3'></div>
          <h3 className='text-center text-3xl font-bold text-blueDarkCustom w-8/12 m-auto'>
            Estudiantes capacitados
          </h3>
        </div>

        <div className='text-center block '>
          <div className='m-auto'>
            <img src="../nosotros/empresas.png" alt='' className='inline-block' width="50%" />
          </div>
          <div className='p-5 m-auto mt-0 text-5xl font-extrabold text-blueConsufarma'>
          +80
          </div>
          <div className='h-1 w-6/12 bg-redConsufarma m-auto mb-3'></div>
          <h3 className='text-center text-3xl font-bold text-blueDarkCustom w-8/12 m-auto'>
            Empresas actualizadas
          </h3>
        </div>
        
        <div className='text-center block '>
          <div className='m-auto'>
            <img src="../nosotros/apoyo.png" alt='' className='inline-block' width="50%" />
          </div>
          <div className='p-5 m-auto mt-0 text-5xl font-extrabold text-blueConsufarma'>
          Apoyo
          </div>
          <div className='h-1 w-6/12 bg-redConsufarma m-auto mb-3'></div>
          <h3 className='text-center text-2xl font-bold text-blueDarkCustom w-8/12 m-auto'>
            Antes - durante y después de la capacitación
          </h3>
        </div>

      </div>
    </div>

    <div className='mx-auto bg-blueConsufarma'>
      <div className="max-w-7xl mx-auto container px-5">
        <div className='text-white flex p-10'>
          <div className='mr-5'>
            <img src="../nosotros/team.png" alt='' className='' width="100%" />
          </div>

          <section className=''>
              <p className=''>
                Consufarma esta constituida por un grupo de expertos mexicanos que se se dedica a dar capacitación y consultoría a la industria farmacéutica y relacionadas, inició operaciones en el año 2013, cuenta con un grupo de expertos con amplia experiencia profesional y académica en las áreas de validación, estabilidad, sistemas de calidad y microbiología entre otras.
              </p>

              <p className='mt-3'>
                Enfocamos nuestros cursos a la identificación y prevención de riesgos sanitarios. Nos distinguimos por el alto nivel de nuestros cursos. Solicitamos previamente a los participantes sus preguntas las cuales son resueltas durante el curso. Nuestra capacitación es muy práctica al incluir la resolución de casos y ejercicios Tenemos un programa de cursos abiertos así como cursos en las instalaciones que nos indiquen nuestros clientes.
              </p>

              <p className='mt-3'>
                Contamos también con los servicios de consultoría en el áreas de validación, estabilidad y sistemas de calidad. Realizamos la traducción del Inglés al español de Archivos Maestros de Fabricación (DMF).
              </p>
          </section>

        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto container px-5 py-10">
      <div className='grid sm:grid-cols-3 grid-cols-1 text-lg gap-10 text-center'>
        <Link href="/cursos/calendario">
          <div className='p-3 bg-blueConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
            Consulta el calendario anual
          </div>
        </Link>
        <Link href="/contacto">
          <div className='p-3 bg-redConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
            Contáctanos ahora
          </div>
        </Link>
        <div onClick={() => getPdf()} className='p-3 bg-blueConsufarma text-white mt-4 cursor-pointer hover:scale-105 transition rounded-md font-bold'>
          PDF
        </div>
      </div>
    </div>

      
      
    <Footer />
    </>
  )
};

export default Nosotros;

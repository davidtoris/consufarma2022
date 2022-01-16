import React from 'react'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, BadgeCheckIcon, QuestionMarkCircleIcon, PrinterIcon, EmojiHappyIcon, DocumentIcon, AcademicCapIcon, ShoppingCartIcon } from '@heroicons/react/solid'

const CursoItem = () => {
  return (
    <div className='max-w-7xl mx-auto font-body grid-flow-row grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <div className='relative w-100 h-60'>
          <Image src="/courses-img/validacion.jpg" layout='fill'/>
        </div>

        <h1 className='name-course text-blueDarkCustom font-bold text-2xl my-5'>Buenas prácticas de muestreo, Técnicas de Inspección y Tablas ANSI</h1>
        <div className='date-hour-course bg-blueLightCustom p-2 text-white rounded-md flex items-center justify-center w-[32rem]'>
            <span className='font-bold'>Fecha de inicio: </span> 
            <CalendarIcon className='w-6 h-6 ml-3 mr-1'/> 
            14 h (8:00 - 16:00)
            <span className='ml-3'>/</span>
             <ClockIcon className='w-6 h-6 ml-1 mr-1'/> 
              22 y 29 de Enero
        </div>
        <div className='speciality mt-5 flex'>
          <BadgeCheckIcon className='w-6 h-6 text-pinkCustom'/>
          <span className='text-pinkCustom font-bold'>Especialidad: </span>
          <span className='text-gray-700 ml-2'>Estadística</span>
        </div>
        
        <div className='instructor mb-7 flex'>
          <BadgeCheckIcon className='w-6 h-6 text-pinkCustom'/>
          <span className='text-pinkCustom font-bold'>Ponente: </span>
          <span className='text-gray-700 ml-2'>QFI. Juan Carlos Moreno Castillo</span>
        </div>
        
        <h2 className='text-2xl text-gray-800'>¿Qué aprenderás?</h2>
        <ul className='list-disc ml-10 mt-2 text-gray-600 mb-7'>
          <li>Analizará cuáles son las mejores prácticas de inspección de acuerdo al tipo de producto, logrando representatividad de las muestras.</li>
          <li>Comprenderá las diferencias entre los muestreos por atributos y por variables, diseñando planes adecuados según las características de la muestra.</li>
        </ul>

        <div className='temario mb-20'>
          <h2 className='text-pinkCustom text-2xl font-bold mt-5'>Temario</h2>
        </div>
        
        <h2 className='text-pinkCustom text-2xl mt-5 font-bold'>Ubicación</h2>
        <div className='ubication flex mt-2'>
          <div className='relative w-6 h-6'>
            <Image src="/courses-img/zoom-icon.png" layout='fill'/>
          </div>
          <div className='text-gray-600 ml-1'>
            Recibirás un link para acceder a tu curso en <span className='font-bold'> TIEMPO REAL </span>
          </div>
        </div>
        
        
        <h2 className='text-2xl text-gray-800 my-5'>
          Otros cursos para continuar con tu aprendizaje
        </h2>
      </div>
      
      {/* Second Column */}
      <div className=''>
        <div class="relative">
          <div class="fixed top-50 right-40">
            
            <div className='bg-gray-100 w-80 px-5 py-2 rounded-md text-center'>
              <div className='text-blueDarkCustom font-bold'> Pago por empresa: </div>
              <div className='font-normal'>$6,500 + IVA</div>
              
              <div className='text-blueDarkCustom font-bold mt-3'> Pago personal: </div>
              <div className='font-normal'>Pregunta por nuestro precio especial y opción a 3 meses sin interéses</div>
            </div>
            
            <div className='w-80 text-center flex items-center text-blueLightCustom mt-5 justify-center border-2 py-2'>
              
              <ShoppingCartIcon className='w-7 h-7 mr-3 '/>
              <div className='font-bold'>Añadir al Carrito</div>
              
            </div>

            
              
              

            <div className='bg-blueDarkCustom mt-5 rounded-md p-2 text-white font-bold text-center text-xl'>Inscríbete</div>
            <h2 className='text-2xl text-gray-800 text-center mt-7'>¿Qué incluye?</h2>
            
            <div className='w-80 px-5 py-2 rounded-md'>
              

              <div className=''> 

                <div className='text-gray-700 flex my-3'>
                  <QuestionMarkCircleIcon className='w-14 h-14 mr-3'/>
                  Recepción de dudas por parte de los asistentes previo al inicio del curso. 
                </div>
                <div className='text-gray-700 flex my-3'>
                  <PrinterIcon className='w-11 h-11 mr-3'/>
                  Material y ejercicios impreso o digital (Cursos virtual)
                </div>
                <div className='text-gray-700 flex my-3'>
                  <AcademicCapIcon className='w-7 h-7 mr-3'/>
                  Diploma de participación
                </div>
                <div className='text-gray-700 flex my-3'>
                  <DocumentIcon className='w-7 h-7 mr-3'/>
                  Examen a solicitud del participante
                </div>
                <div className='text-gray-700 flex my-3'>
                  <EmojiHappyIcon className='w-7 h-7 mr-3'/>
                  Servicio Posventa Resolución de dudas
                </div>
              </div>
              
            </div>
            

          </div>
        </div>
      </div>

    </div>
  )
}

export default CursoItem

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, BadgeCheckIcon, QuestionMarkCircleIcon, PrinterIcon, EmojiHappyIcon, DocumentIcon, AcademicCapIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import CardCourse from '../components/cursos/CardCourse'
import { API_BASE_URL } from '../constants'
import Link from 'next/link'


const ItemCourse = ({curso}) => {
  const [coursesSpeciality, setCoursesSpeciality] = useState([]);
  useEffect(() => {
    const especialidades = async () => {
      const res = await fetch(`${API_BASE_URL}/filterCoursesBySpecialities/${especialidad_ruta}`);
      const data = await res.json()
      const curso = data.detalle
      setCoursesSpeciality(curso);
    }
    especialidades();
  }, []);
  
  const route = useRouter();
  
  const {nombre, fecha_text, duracion, especialidad, especialidad_ruta, ponente, ponente_dos, objetivo, temario, precio, forms, imagen} = curso[0];
  const Objectiv = () => { 
    return {__html: objetivo};
  }
  const Topics = () => { 
    return {__html: temario};
  }

  return (
    <>
    <div className='max-w-7xl container mx-auto font-body grid-flow-row grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 px-2 md:px-5'>
      <div className='col-span-1 md:col-span-2 md:px-0 px-3'>
        <div className='relative sm:w-100 sm:h-60 w-100 h-32'>
          <Image src={`https://www.consufarma.com/vistas/img/${imagen}`} layout='fill' alt={nombre}/>
        </div>
        <div className="flex justify-between">
          <h1 className='name-course text-blueDarkCustom font-bold text-2xl my-5 w-8/12'>
            {nombre}
          </h1>
          <div className='rating text-yellowCustom mt-5 flex items-base'>
            <span className=""> 4.5 </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            <span className="mx-2 text-gray-500"> (31) </span>
          </div>
        </div>

        <div className='date-hour-course bg-blueLightCustom p-2 text-white rounded-md flex items-center justify-center md:w-[40rem] w-100 flex-col md:flex-row '>
            
            <div className='flex'>
              <span className='font-bold'>Fecha de inicio: </span> 
            </div>
            
            <div className='flex'>
              <CalendarIcon className='w-6 h-6 ml-3 mr-1'/> {duracion}
              <span className='ml-3 '>/</span>
            </div>
            
            <div className='flex'> 
              <ClockIcon className='w-6 h-6 ml-1 mr-1'/> {fecha_text}
            </div>
        </div>
        
        
        <h2 className='text-2xl text-gray-800 mt-10'>¿Qué aprenderás?</h2>
        <ul className='list-disc ml-10 mt-2 text-gray-600 mb-7'>
          <div dangerouslySetInnerHTML={Objectiv()} />
        </ul>

        <div className='temario mt-10'>
          <h2 className='text-pinkCustom text-2xl font-bold'>Temario</h2>
          <div dangerouslySetInnerHTML={Topics()} className='mt-1'/>
        </div>
        
        <div className='bg-gray-100 p-3 rounded-lg mt-10'>
          <h2 className='text-pinkCustom text-2xl font-bold'>Ubicación</h2>
          <div className='ubication flex mt-2'>
            <div className='relative w-6 h-6'>
              <Image src="/courses-img/zoom-icon.png" layout='fill'alt="zoom-icon"/>
            </div>
            <div className='text-gray-600 ml-1'>
              Recibirás un link para acceder a tu curso en <span className='font-bold'> TIEMPO REAL </span>
            </div>
          </div>
        </div>

        <div className='speciality mt-5 flex'>
          <BadgeCheckIcon className='w-6 h-6 text-blueDarkCustom'/>
          <span className='text-blueDarkCustom font-bold'>Especialidad: </span>
          <span className='text-gray-700 ml-2'>{especialidad}</span>
        </div>
        
        <div className='instructor mb-7 flex'>
          <BadgeCheckIcon className='w-6 h-6 text-blueDarkCustom'/>
          <span className='text-blueDarkCustom font-bold'>Ponente: </span>
          <span className='text-gray-700 ml-2'>{ponente}</span>
          <span className='text-gray-700 ml-2'>{ponente_dos === 'ninguno' ? '' : `/ ${ponente_dos}` }</span>
        </div>

      </div>
      
      {/* Second Column */}
      <div className='sm:pl-5 px-2'>
        
          <div className="top-50 right-40">
            
            <div className='bg-gray-100  px-5 py-2 rounded-md text-center'>
              <div className='text-blueDarkCustom font-bold'> Pago por empresa: </div>
              <div className='font-normal'>$6,500 + IVA</div>
              <div className='text-blueDarkCustom font-bold mt-3'> Pago personal: </div>
              <div className='font-normal'>Pregunta por nuestro precio especial y opción a 3 meses sin interéses</div>
            </div>
            
            <div className=' text-center flex items-center text-blueLightCustom mt-5 justify-center border-2 py-2'>
              <ShoppingCartIcon className='w-7 h-7 mr-3 '/>
              <div className='font-bold'>Añadir al Carrito</div>
            </div>

            <Link href={forms}>
              <div className='bg-blueDarkCustom mt-5 rounded-md p-2 sm:py-2 py-3 text-white font-bold text-center text-xl fixed sm:relative z-10 bottom-0 w-full left-0'>
                  Inscríbete
              </div>
            </Link>

            <div className='border-2 mt-5'>
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

    <div className='max-w-7xl mx-auto mt-5 container px-3'>
      <h2 className='text-2xl text-blueDarkCustom mb-5 mt-12 font-bold'>
      Otros cursos para continuar con tu aprendizaje
      </h2>
      <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden'>
      {coursesSpeciality.map(c => (
        <div key={c.nombre}>
          <CardCourse 
          link={`/cursos/${c.ruta}`}
          nombre={c.nombre}
          img={c.imagen}
          label={'Promoción'}
          ponente={c.ponente}
          />
        </div>
      ))}
      </div>
    </div>
  </>
  )
}

export default ItemCourse;

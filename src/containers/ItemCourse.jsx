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
    <div className='max-w-7xl mx-auto font-body grid-flow-row grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <div className='relative w-100 h-60'>
          <Image src={`https://www.consufarma.com/vistas/img/${imagen}`} layout='fill'/>
        </div>

        <h1 className='name-course text-blueDarkCustom font-bold text-2xl my-5'>
          {nombre}
        </h1>
        <div className='date-hour-course bg-blueLightCustom p-2 text-white rounded-md flex items-center justify-center w-[40rem]'>
            <span className='font-bold'>Fecha de inicio: </span> 
            <CalendarIcon className='w-6 h-6 ml-3 mr-1'/> 
              {duracion}
            <span className='ml-3'>/</span>
             <ClockIcon className='w-6 h-6 ml-1 mr-1'/> 
              {fecha_text}
        </div>
        <div className='speciality mt-5 flex'>
          <BadgeCheckIcon className='w-6 h-6 text-pinkCustom'/>
          <span className='text-pinkCustom font-bold'>Especialidad: </span>
          <span className='text-gray-700 ml-2'>{especialidad}</span>
        </div>
        
        <div className='instructor mb-7 flex'>
          <BadgeCheckIcon className='w-6 h-6 text-pinkCustom'/>
          <span className='text-pinkCustom font-bold'>Ponente: </span>
          <span className='text-gray-700 ml-2'>{ponente}</span>
          <span className='text-gray-700 ml-2'>{ponente_dos === 'ninguno' ? '' : `/ ${ponente_dos}` }</span>
        </div>
        
        <h2 className='text-2xl text-gray-800'>¿Qué aprenderás?</h2>
        <ul className='list-disc ml-10 mt-2 text-gray-600 mb-7'>
          <div dangerouslySetInnerHTML={Objectiv()} />
        </ul>

        <div className='temario mt-10'>
          <h2 className='text-pinkCustom text-2xl font-bold'>Temario</h2>
          <div dangerouslySetInnerHTML={Topics()} className=''/>
        </div>
        
        <div className='bg-gray-100 p-3 rounded-lg'>

          <h2 className='text-pinkCustom text-2xl font-bold'>Ubicación</h2>
          <div className='ubication flex mt-2'>
            <div className='relative w-6 h-6'>
              <Image src="/courses-img/zoom-icon.png" layout='fill'/>
            </div>
            <div className='text-gray-600 ml-1'>
              Recibirás un link para acceder a tu curso en <span className='font-bold'> TIEMPO REAL </span>
            </div>
          </div>
        </div>
        
        
        <h2 className='text-2xl text-gray-800 mb-5 mt-12'>
          Otros cursos para continuar con tu aprendizaje
        </h2>
        <div className='flex space-x-3 overflow-scroll'>
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
      
      {/* Second Column */}
      <div className=''>
        <div className="relative">
          <div className="fixed top-50 right-40">
            
            <div className='bg-gray-100 w-80 px-5 py-2 rounded-md text-center'>
              <div className='text-blueDarkCustom font-bold'> Pago por empresa: </div>
              <div className='font-normal'>{precio}</div>
              
              <div className='text-blueDarkCustom font-bold mt-3'> Pago personal: </div>
              <div className='font-normal'>Pregunta por nuestro precio especial y opción a 3 meses sin interéses</div>
            </div>
            
            <div className='w-80 text-center flex items-center text-blueLightCustom mt-5 justify-center border-2 py-2'>
              
              <ShoppingCartIcon className='w-7 h-7 mr-3 '/>
              <div className='font-bold'>Añadir al Carrito</div>
              
            </div>

            
              
              

            <Link href={forms}>
              <div className='bg-blueDarkCustom mt-5 rounded-md p-2 text-white font-bold text-center text-xl'>
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

    </div>
  )
}

export default ItemCourse;

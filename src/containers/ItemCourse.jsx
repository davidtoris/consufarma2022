import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { QuestionMarkCircleIcon, PrinterIcon, EmojiHappyIcon, DocumentIcon, AcademicCapIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import CardCourse from '../components/cursos/CardCourse'
import { API_BASE_URL } from '../constants'
import Link from 'next/link';
import moment from 'moment';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../../slices/basketSlice';
import Cookies from 'js-cookie'

const ItemCourse = ({curso}) => {

  const dispatch = useDispatch();

  const {_id, nombre, nombre_ruta, fecha, fecha_text, duracion, horario, especialidad_id, ponente_uno_id, ponente_dos_id, objetivo, temario, precio, imagen, register} = curso;
  const {ponente, ponente_cv, ponente_img} = ponente_uno_id;

  const [coursesSpeciality, setCoursesSpeciality] = useState([]);

  const especialidades = async () => {
    const res = await axios.get(`${API_BASE_URL}/courses/especialidad/${especialidad_id._id}`);
    setCoursesSpeciality(res.data.courseSpecialitty);
  }

  useEffect(() => {
    especialidades();
  }, []);
  
  const Objectiv = () => { 
    return {__html: objetivo};
  }
  const Topics = () => { 
    return {__html: temario};
  }
  
  const today = moment().startOf('day').format();

  const [baskState, setBaskState] = useState([])

  const addToBasket = () => {
    const dataBasket = { nombre, fecha_text, duracion, horario, precio, imagen, _id };
    
    const existInBasket = baskState.find(course => course._id === _id);
    if (existInBasket === undefined) {
      setBaskState([...baskState, dataBasket])
    }

  };

  useEffect(() => {
    const dataCookie = Cookies.get("basket");
    
    // Existe la cookie
    if (dataCookie !== undefined) {
      let dataCookieParse = JSON.parse(dataCookie)

      // Tiene algo la cookie
      if (dataCookieParse.length > 0) {
        setBaskState(dataCookieParse);
      }
    }
  }, [])

  useEffect(() => {
    Cookies.set('basket', JSON.stringify(baskState));
    console.log(baskState)
  }, [baskState])
  

  const url = imagen
  return (
    <div className='no-print'>
      <div className='max-w-7xl container mx-auto font-body grid-flow-row grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 px-2 md:px-5'>
        <div className='col-span-1 md:col-span-2 md:px-0 px-3'>
          <div className="flex justify-between">
            <h1 className='name-course text-blueDarkCustom font-bold text-2xl my-5 w-12/12 md:w-8/12'>
              {nombre}
            </h1>
            {/* <div className='rating text-yellowCustom mt-5 flex items-base'>
              <span className=""> 4.5 </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              <span className="mx-2 text-gray-500"> (31) </span>
            </div> */}
          </div>
          <div className='relative sm:w-100 sm:h-60 w-100 h-32'>
          {imagen && (
            <Image src={imagen} layout='fill' alt={nombre}/>
          )} 
          </div>

          <div className='date-hour-course bg-blueConsufarma p-2 text-white rounded-md flex md:w-[40rem] w-100 flex-col md:flex-row font-bold text-lg mt-3'>
            <div className='flex ml-3 items-center'>
              <FaClock className='w-4 h-4 ml-1 mr-1'/> {duracion}
              <span className='mx-3 '>/</span> {horario}
            </div>
            
            <div className='flex ml-1 md:ml-4 items-center'> 
              <FaCalendarAlt className='w-4 h-4 ml-3 mr-1'/>
                {fecha > today ? fecha_text : 'Por Programar'}
                
            </div>
          </div>
          
          
          <h2 className='text-2xl text-blueConsufarma uppercase font-bold mt-10 border-b-4 border-redConsufarma w-24'>objetivos</h2>
          <ul className='ml-2 mt-2 text-gray-600 mb-7'>
            <div dangerouslySetInnerHTML={Objectiv()} />
          </ul>

          <div className='temario mt-10'>
            <h2 className='text-2xl text-blueConsufarma uppercase font-bold mt-10 mb-7 border-b-4 border-redConsufarma w-24'>Temario</h2>
            <div dangerouslySetInnerHTML={Topics()} className='ml-2 mt-2 topic-html'/>
          </div>

          <button className='bg-redConsufarma rounded-xl text-white text-center font-bold text-lg w-full uppercase my-3 p-2 flex justify-center md:hidden'>
            Registráte
          </button>

        </div>
        
        {/* Second Column */}
        <div className='sm:pl-5 px-2'>
          
            <div className="top-50 right-40 mt-8">

              <div className='border-2'>
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
                      Servicio Posventa: Resolución de dudas
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='bg-gray-100 px-5 py-4 rounded-md text-center mt-10'>
                <div className='text-grayCustom font-bold mt-2'> Precio a empresas: </div>
                <div className='text-grayCustom font-light'> (Por participante) </div>
                <div className='font-bold text-3xl mt-3'>${precio} + IVA</div>
                <div className='text-grayCustom font-bold mt-3'> 
                  Pago personal: Pregunta por nuestro precio especial y opción a 3 meses sin interéses
                </div>
                {/* <button className='bg-blueConsufarma rounded-xl text-white font-bold text-lg w-11/12 mt-4 p-2'>
                  Regístrate
                </button> */}
                <div className='mt-6 mb-2 flex justify-center cursor-pointer' onClick={addToBasket}>
                  <ShoppingCartIcon className='w-7 h-7 text-grayCustom '/>
                  <div className='font-bold text-xl underline'>Añadir al Carrito</div>
                </div>
                <Link href={`/print/${nombre_ruta}`}>
                <button className='bg-blueConsufarma rounded-xl text-white font-bold text-lg w-11/12 mt-4 p-2'>
                  Imprimir Temario
                </button>
                </Link>
                <a href={register} target="blank">
                <button className='bg-redConsufarma rounded-xl text-white font-bold text-lg w-11/12 uppercase my-3 p-2'>
                  Regístrate
                </button>
                </a>
              </div>
              
              <div className='flex justify-center flex-col text-center mt-2'>

                <div>
                  <a href={`https://api.whatsapp.com/send?phone=5215618003145&text=Hola, me gustaría mayor información del curso: ${nombre}`}>
                    <Image src="https://res.cloudinary.com/drq8o9k36/image/upload/v1661528416/BOTON_WHATSAPP-01_lktuwg.webp" layout='fixed' width={250} height={90} alt="">
                    </Image>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='max-w-7xl container mx-auto mt-10 '>
        <div className='ponente bg-gray-100 text-gray-600 my-8 sm:block md:flex p-4 pb-5 rounded-md w-12/12'>
          {ponente_img && (
            <>
              <img src={ponente_img} layout='fixed' width="20%" alt="" className="mb-2" />
            </>
          )}
          <div className='ml-5'>
            <h2 className='text-2xl font-bold mb-2'>{ponente}</h2>
            <div>{ponente_cv}</div>
          </div>
        </div>
      </div>

    
      <div className='max-w-7xl container mx-auto '>
        <h2 className='text-2xl text-blueConsufarma uppercase font-bold mt-10 border-b-4 border-redConsufarma w-24 ml-5'>ubicación</h2>
        
        <div className='bg-gray-100 p-3 rounded-lg mt-4'>
          <div className='ubication flex mt-2 ml-2'>
            <div className='relative w-6 h-6'>
              <Image src="/courses-img/zoom-icon.png" layout='fill'alt="zoom-icon"/>
            </div>
            <div className='text-gray-600 ml-1'>
              Recibirás un link para acceder a tu curso en <span className='font-bold'> TIEMPO REAL </span>
            </div>
          </div>
        </div>
      </div>


      <div className='max-w-7xl mx-auto mt-5 container px-3'>
        <h2 className='text-2xl text-blueDarkCustom mb-5 mt-12 font-bold ml-2'>
        Otros cursos para continuar con tu aprendizaje
        </h2>
        <div className='flex space-x-3 overflow-x-scroll overflow-y-hidden'>
        {coursesSpeciality.map(c => (
          <div key={c._id}>
            <CardCourse 
            link={`/cursos/${c.nombre_ruta}`}
            nombre={c.nombre}
            img={c.imagen}
            label={c.label}
            ponente={c.ponente_uno_id.ponente}
            fechaText={c.fecha > today ? c.fecha_text : 'Por Programar'}
            duracion={c.duracion}
            horario={c.horario}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default ItemCourse;

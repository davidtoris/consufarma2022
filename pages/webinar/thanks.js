import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardCourse from "../../src/components/cursos/CardCourse";
import { API_BASE_URL } from "../../src/constants";
import moment from 'moment';

const Thanks = () => {

  const [emailSended, setEmailSended] = useState('');
  const [coursesSpeker, setCoursesSpeker] = useState([]);

  const { correo, correoDos } = useSelector(state => state.results.itemResults);

  const data = {
    correo,
    subject: "Consufarma - Webinar",
  };
  
  const dataDos = {
    correo: correoDos,
    subject: "Consufarma - Webinar",
  };

  const sendEmail = async () => {
    await axios.post(`${API_BASE_URL}/email/send`, data);
    // const emailDos = await axios.post(`${API_BASE_URL}/email/send`, dataDos);
    setEmailSended('Se hizo correcto');
  }

  useEffect(() => {
    if (correo !== undefined) {
      sendEmail();
    }
  }, [correo]);
  
  const coursesBySpeaker = async () => {
    // const coursesData = await axios.get(`${API_BASE_URL}/courses/fundamentos-y-aplicacion-de-los-metodos-farmacopeicos-y-calculos-criticos-empleados-en-el-analisis-farmaceutico`);
    // setCoursesSpeker(coursesData.data.course);
    
    const coursesData = await axios.get(`${API_BASE_URL}/courses/especialidad/6312576268423e81ea97df00`);
    setCoursesSpeker(coursesData.data.courseSpecialitty);
  }
  
  useEffect(() => {
    coursesBySpeaker()
  }, []);

  const today = moment().startOf('day').format()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <img src="..//logo.png" width="600px" className='my-5 m-auto'/>
      <img src="https://res.cloudinary.com/drq8o9k36/image/upload/v1694116968/reto/banner_cuadrado_aazxjy.png" width="300px" className='my-5 m-auto'/>
      <div className='text-center'>
        <div className='text-redConsufarma p-3 text-5xl font-extrabold'>
          ¡Gracias por tu registro al Webinar!
        </div>

        { emailSended === '' ? (
            <>
              <div className='bg-blueConsufarma p-3 h-2 mt-10'></div>
              <div className='bg-redConsufarma p-3 text-white text-3xl font-extrabold'>
                <div>Te estaremos enviando un correo con el link para que puedas acceder</div>
              </div>
              <div className='text-blueConsufarma text-3xl font-extrabold italic my-4'>
                ¿No lo recibiste? <br /> Revisa tu carpeta de correo no deseado
              </div>
            </>
          ) : (
            <div className="px-10">
              <div className='bg-redConsufarma p-3 h-2 mt-10'></div>
              <div className='bg-blueConsufarma p-3 text-white text-3xl font-extrabold'>
                <div>Hemos enviado, al correo electrónico registrado, el enlace para que puedas acceder al webinar</div>
              </div>
              <div className='text-redConsufarma text-2xl font-extrabold italic my-4'>
                ¿No lo recibiste? Revisa tu carpeta de correo no deseado
              </div>
            </div>
          )
        }
        
        <div className='text-gray-600 p-3 text-xl font-extrabold mt-5 w-10/12 sm:w-6/12 m-auto'>
          <ul>  
            <li>¿Qué necesito para pensionarme? </li>
            <li>¿Cómo se calcula la pensión? </li>
            <li>Aspectos clave que no debes descuidar </li>
            <li>¿Cómo mejorar tu pensión? </li>
            <li>Errores comunes que disminuyen tu pensión Empodérate </li>
            <li>Toma las mejores decisiones para maximizar tu pensión</li>
          </ul>
        </div>
        
        {/* <div className='text-blueConsufarma p-3 text-xl font-extrabold mt-10'>
          24 de Agosto 2023
        </div> */}
        
        <div className='text-blueConsufarma text-3xl font-extrabold mt-5'>
        19 de Septiembre 2023
        </div>
        <div className='text-gray-500 text-2xl font-italic my-2'>
          México - 16 h <br></br>
        </div>
        <div className='text-blueConsufarma text-3xl font-extrabold my-10'>
          Cursos relacionados que pueden ser de tu interés:
        </div>    

        <div className='container m-auto px-2 md:px-2 mt-2 overflow-scroll'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {coursesSpeker.map(c => (
              <div className='mb-7 m-auto' key={c._id}>
              <CardCourse 
              link={`/cursos/${c.nombre_ruta}`}
              nombre={c.nombre}
              img={c.imagen}
              label={c.label}
              ponente={c.ponente_uno_id.ponente}
              ponenteDos={c.ponente_dos_id.ponente}
              fechaText={c.fecha > today ? c.fecha_text : 'Por Programar'}
              duracion={c.duracion}
              horario={c.horario}
              />
              </div>
            ))}
          </div>
        </div>
          
      </div>
    </div>
  )
}

export default Thanks;
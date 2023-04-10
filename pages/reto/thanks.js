import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardCourse from "../../src/components/cursos/CardCourse";
import { API_BASE_URL } from "../../src/constants";
import moment from 'moment';

const Thanks = () => {

  const [emailSended, setEmailSended] = useState('');
  const [coursesSpeker, setCoursesSpeker] = useState([]);

  const { correo } = useSelector(state => state.results.itemResults);
  const data = {
    correo,
    subject: "Reto Consufarma",
  };

  const sendEmail = async () => {
    const email = await axios.post(`${API_BASE_URL}/email/send`, data);
    console.log(email.data.msg);
    setEmailSended('Se hizo correcto');
  }

  useEffect(() => {
    if (correo !== undefined) {
      sendEmail();
    }
  }, [correo]);
  
  const coursesBySpeaker = async () => {
    const coursesData = await axios.get(`${API_BASE_URL}/courses/fundamentos-y-aplicacion-de-los-metodos-farmacopeicos-y-calculos-criticos-empleados-en-el-analisis-farmaceutico`);
    console.log(coursesData.data.course);
    setCoursesSpeker(coursesData.data.course);
  }
  
  useEffect(() => {
    coursesBySpeaker()
  }, []);

  const today = moment().startOf('day').format()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <img src="..//logo.png" width="600px" className='my-5 m-auto'/>
      <img src="https://res.cloudinary.com/drq8o9k36/image/upload/v1681159649/reto/Captura_de_pantalla_2023-04-10_a_la_s_2.44.55_p.m._lxb5tq.png" width="300px" className='my-5 m-auto'/>
      <div className='text-center'>
        <div className='text-redConsufarma p-3 text-5xl font-extrabold'>
          ¡Gracias por tu registro al reto Consufarma!
        </div>

        { emailSended === '' ? (
            <>
              <div className='bg-blueConsufarma p-3 h-2 mt-10'></div>
              <div className='bg-redConsufarma p-3 text-white text-3xl font-extrabold'>
                <div>Te estaremos enviando un correo con el link para que puedas acceder</div>
              </div>
              <div className='text-blueConsufarma text-3xl font-extrabold italic my-4'>
                ¿No lo recibiste? Revisa tu carpeta de correo no deseado
              </div>
            </>
          ) : (
            <div className="px-10">
              <div className='bg-redConsufarma p-3 h-2 mt-10'></div>
              <div className='bg-blueConsufarma p-3 text-white text-3xl font-extrabold'>
                <div>Hemos enviado un correo electrónico con el link para que puedas acceder</div>
              </div>
              <div className='text-redConsufarma text-2xl font-extrabold italic my-4'>
                ¿No lo recibiste? Revisa tu carpeta de correo no deseado
              </div>
            </div>
          )
        }
        
        <div className='text-gray-600 p-3 text-3xl font-extrabold mt-10'>
          Podrás acceder ya sea el 10 u 11 de Abril
        </div>
        
        <div className='text-blueConsufarma text-2xl font-extrabold'>
          En el horario de tu preferencia
        </div>
        {/* <div className='text-gray-500 text-1xl font-italic my-2'>
          Ciudad de México y Guatemala - 10 h <br></br>
          Colombia - 11 h<br></br>
          Argentina - 13h <br></br>
        </div> */}
        <div className='text-blueConsufarma text-3xl font-extrabold mt-10'>
          Cursos relacionados que pueden ser de tu interés:
        </div>    

        <div className='container m-auto px-2 md:px-2 mt-2'>
          <div className='flex flex-col sm:flex-row'>
            {coursesSpeker.map(c => (
              <div className='m-auto my-2' key={c._id}>
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
    </div>
  )
}

export default Thanks;
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../src/constants";


const Thanks = () => {

  const [emailSended, setEmailSended] = useState('')

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
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <img src="..//logo.png" width="600px" className='my-5 m-auto'/>
      <img src="https://res.cloudinary.com/drq8o9k36/image/upload/v1665492528/courses-img/Captura_de_Pantalla_2022-10-11_a_la_s_7.48.33_a.m._vy9r5m.png" width="300px" className='my-5 m-auto'/>
      <div className='text-center'>
        <div className='text-redConsufarma p-3 text-5xl font-extrabold'>
          ¡Gracias por tu registro!
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
              <div className='text-redConsufarma text-3xl font-extrabold italic my-4'>
                ¿No lo recibiste? Revisa tu carpeta de correo no deseado
              </div>
            </div>
          )
        }
        
        <div className='text-gray-600 p-3 text-3xl font-extrabold mt-10'>
          Te esperamos el Viernes 3 de Febrero
        </div>
        
        <div className='text-blueConsufarma text-4xl font-extrabold'>
          Horarios
        </div>
        <div className='text-gray-500 text-2xl font-italic my-2'>
          Ciudad de México y Guatemala - 10 h <br></br>
          Colombia - 11 h<br></br>
          Argentina - 13h <br></br>
        </div>
        <div className='text-gray-600 p-3 text-3xl font-mediumbold'>
          Cursos relacionados que pueden ser de tu interés:
        </div>    
          
      </div>
    </div>
  )
}

export default Thanks;
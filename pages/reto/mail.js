import Footer from "../../src/containers/Footer";


const Mail = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <img src="../logo.png" width="600px" className='my-5 m-auto'/>
      <img src="https://res.cloudinary.com/drq8o9k36/image/upload/v1665492528/courses-img/Captura_de_Pantalla_2022-10-11_a_la_s_7.48.33_a.m._vy9r5m.png" width="800px" className='my-5 m-auto'/>
      <div className='text-center'>
        <div className='text-redConsufarma text-5xl font-extrabold mt-8'>
          Gracias por tu interés en participar en el Reto Consufarma 
        </div>
        <div className='text-blueConsufarma text-5xl font-extrabold mb-14 mt-8'>
          "Buenas prácticas de almacenamiento y distribución"
        </div>

        <div className='bg-redConsufarma p-3 h-3'>
        </div>
        <div className='bg-blueConsufarma p-3 text-white text-4xl font-extrabold'>
          Éste se llevará a cabo el día Viernes 3 de Febrero de 2023. 
        </div>
        <div className='text-orangeCustom text-4xl font-extrabold my-4'>
          Horarios
        </div>
        <div className='text-gray-500 text-2xl font-italic my-4'>
          Ciudad de México y Guatemala - 10 h <br></br>
          Colombia - 11 h<br></br>
          Argentina - 13h <br></br>
        </div>
        <div className='text-gray-600 p-3 text-3xl font-mediumbold'>
          Podrás ingresar a la sala de espera virtual de la plataforma ZOOM desde las 9:50 am (Hora Ciudad de México).<br></br>
        </div>    
        <div className='text-gray-600 p-3 text-2xl font-mediumbold'>
          El link para ingresar es el siguiente:
        </div>    
        <div className='text-blueLightCustom p-3 text-2xl font-bold underline'>
        <a href="https://us02web.zoom.us/j/2532924263" className="mt-2">https://us02web.zoom.us/j/2532924263 </a>
        </div>
        <div className='text-gray-600 p-3 text-2xl font-mediumbold'>
          Al final del evento recibirás un link para que puedas descargar <span className="font-bold">sin costo</span> tu constancia
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Mail;
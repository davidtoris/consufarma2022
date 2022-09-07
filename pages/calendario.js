/* eslint-disable @next/next/no-img-element */
import NavBar from '../src/components/NavBar';
import { API_BASE_URL } from '../src/constants';


const calendario = ( {curso} ) => {
  console.log(curso);

  const createMarkup = () => {
    return {__html: curso.objetivo};
  }
  const createMarkupTwo = () => {
    return {__html: curso.temario};
  }

  const print = () => {
    window.print();
  }

  return (
    <div className='print'>
      <NavBar />
      <div className='logo'>
        <img src='../logo.png' alt='' />
      </div>
      <div className='bg-blue-600 text-3xl text-center cursor-pointer text-white print' onClick={print}>Imprimir temario</div>
      <div className='container'>
        <div className='header'>
          <div className='imagen col-left'>
            <img src='https://www.consufarma.com/vistas/img/validacion-de-metodos-analiticos-para-impurezas-de-proceso-y-productos-de-degradacion.jpg ' alt="sds" />
            <div className="content-info">
            
              <div className='content-duration'>
                <img src="../print/watch.png" alt="" className='icon-duration'/>
                <div className='duration'>14h</div>
              </div>
              <div className='content-date'>
                <div className='date-up'>Calendar</div>
                <div className='date'>24, 25 y 26 Septiembre</div>
              </div>
                
              <div className='time'>
                8:00 / 12:30
              </div>

            </div>
          </div>
          <div className='col-right'>
            <div className='title'>
              {curso.nombre}
            </div>
            <div className='objectives'>
              <h2>Objetivos</h2>
              <div dangerouslySetInnerHTML={createMarkup()} />
            </div>
          </div>
        </div>
        <div className='topic-header'>
          temario
        </div>
        <div className='topic-content'>
          <div dangerouslySetInnerHTML={createMarkupTwo()} />
        </div>
      </div>
      <div className='profesor' style={{marginTop: '120px'}}>
        <img className='img-profesor' src="../print/profesor.png" alt='Image' />
        <div className='info-profesor'>
          <div className="name"> {curso.ponente} </div>
          <div className="cv">{curso.CV}</div>
        </div>
      </div>
      <div className='includes'>
        <h3>¿Qué incluye nuestro curso?</h3>
        <div className='includes-items'>
          <div className='item'>
            <img src='../print/diploma.png' alt=''/>
            Diploma de participación
          </div>
          <div className='item'>
            <img src='../print/material.png' alt=''/>
            Material y ejercicios impresos o digitales
          </div>
        </div>
        <div className='includes-items'>
          <div className='item'>
            <img src='../print/examen.png' alt=''/>
            Examen a solicitud del participante
          </div>
          <div className='item'>
            <img src='../print/preguntas.png' alt=''/>
            Resolución de dudas, antes y después del curso
          </div>
        </div>
      </div>
      <div className='subscribe'>
        <h3>¿Cómo inscribirme?</h3>
        <div className='subscribe-items'>
          <div className='item'>
          <a href='http://www.google.com'>
            <img src='../print/formulario.png' alt=''/>
            Llena nuestro formulario de inscripción
          </a>
          </div>
          <div className='item'>
            <img src='../print/contacto.png' alt=''/>
            Nos contactaremos contigo para confirmar tu registro
          </div>
          <div className='item'>
            <img src='../print/pago.png' alt=''/>
            Selecciona tu método de pago
          </div>
          <div className='item'>
            <img src='../print/asiste.png' alt=''/>
            Asiste el día señalado a tu curso y fortalce tu perfil profesional
          </div>
        </div>
      </div>

      <div className='footer'>
        <div className='ml-3'>
            <a href="https://www.facebook.com/consufarma">
              <img src="/facebook.png" height={25} width={25} alt="facebook"/>
            </a>
        </div>
        <div className='ml-3'>
          <a href="https://www.instagram.com">
            <img src="/instag.png" height={25} width={25} alt="instagram"/>
          </a> 
        </div>
        <div className='ml-3'>
          <a href="https://www.twitter.com">
            <img src="/twitter.png" height={25} width={25} alt="twitter"/>
          </a>
        </div>
        <div className='mx-3'>
          <a href="https://wa.me/525547810505?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
            <img src="/whatsapp.png" height={25} width={25} alt="whatsapp"/>
          </a>
        </div>
        <div>
          <a href="tel:5618003145">
            <span className='text-white'> 56 1800 3145</span>
          </a>
        </div>
      </div>

    </div>
  )
};

export default calendario;

export const getServerSideProps = async ({query: {ruta}}) => {
  const res = await fetch(`${API_BASE_URL}/courses/${ruta}`);
  const data = await res.json()
  const curso = data.course[0]

  return { props : { curso } }
}

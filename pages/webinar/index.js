import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import moment from 'moment';
import axios from 'axios';
import { API_BASE_URL } from '../../src/constants';
import { useDispatch } from 'react-redux';
import { itemResults } from '../../slices/resultsSlice';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const dataSchema = Yup.object().shape({
    nombre: Yup.string().required('Campo requerido'),
    correo: Yup.string().email('Escribe un correo válido').required('Campo requerido'),
    // nombreDos: Yup.string().required('Campo requerido'),
    // correoDos: Yup.string().email('Escribe un correo válido').required('Campo requerido'),
  });

  const tag = 'webinarAgo';
  const fecha = moment().format();
  const fechaFin = '2023-10-01T00:00:00-00:00';


  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:py-2 bg-gray-200 ">

     {fecha > fechaFin ? (
       <iframe width="860" height="515" src="https://www.youtube.com/embed/-2dBk9g400Y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
     ) : ( 
      <>
        <div className='w-12/12 sm:w-12/12 md:w-10/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 text-center'>
          <div className='bg-redConsufarma p-2 h-2 sm:mt-10'></div>
          <div className='bg-blueConsufarma p-4 pt-2 text-white text-3xl font-extrabold sm:mb-6'>
            Te invitamos a registrarte al Webinar GRATUITO
          </div>
        </div>
          
        <div className=''>
          <img src="https://res.cloudinary.com/drq8o9k36/image/upload/v1691516858/reto/Captura_de_pantalla_2023-08-08_a_la_s_11.46.48_a.m._r7njhz.png" width="600px"/>
          <div className='px-6 sm:px-0'>

            <Formik
                initialValues={{
                  nombre: '',
                  correo: '',
                  // nombreDos: '',
                  // correoDos: '',
                }}
                validationSchema={dataSchema}
                onSubmit={ async ({nombre, correo, nombreDos, correoDos}) =>  {

                  const data = {
                    nombre,
                    correo,
                    // nombreDos,
                    // correoDos,
                    fecha,
                    tag 
                  };

                  console.log(data);
                  dispatch(itemResults(data));
                  axios.post(`${API_BASE_URL}/challenge`, data)
                  router.push('/webinar/thanks')
                }}>
                {({ errors }) => (

                  <Form>

                    <div className='mb-3 m-auto w-12/12'>
                      <div className='text-left text-blue-900 font-bold text-lg ml-2 mt-2'>Nombre:</div>  
                      <div className="">
                        <Field
                          type="text" 
                          className="text-lg pl-3 text-gray-600 border-2 border-gray-300 w-full m-auto rounded-md px-3 py-1.5 bg-white" 
                          aria-describedby="emailHelp"
                          name="nombre" />
                        <ErrorMessage
                          name="nombre"
                          component={() => (
                            <div className="text-orangeCustom mt-1 ml-3">{ errors.nombre }</div>)} />
                      </div> 
                    </div>

                    <div className='mb-3 m-auto w-12/12'>
                      <div className='text-left text-blue-900 font-bold text-lg ml-2 mt-2'>Correo:</div>
                      <div className="">
                        <Field 
                          type="email" 
                          className="text-lg pl-3 text-gray-600 border-2 border-gray-300 w-full m-auto rounded-md px-3 py-1.5 bg-white" 
                          aria-describedby="emailHelp"
                          name="correo" />  
                        <ErrorMessage
                          name="correo"
                          component={() => (
                            <div className="text-orangeCustom mt-1 ml-3">{ errors.correo }</div>)} />
                      </div> 
                    </div>

                    {/* Segunda persona */}
                    {/* <div className='mb-3 m-auto w-12/12'>
                      <div className='text-left text-blue-900 font-bold text-lg ml-2 mt-2'>Nombre del Invitado:</div>  
                      <div className="">
                        <Field
                          type="text" 
                          className="text-lg pl-3 text-gray-600 border-2 border-gray-300 w-full m-auto rounded-md px-3 py-1.5 bg-white" 
                          aria-describedby="emailHelp"
                          name="nombreDos" />
                        <ErrorMessage
                          name="nombreDos"
                          component={() => (
                            <div className="text-orangeCustom mt-1 ml-3">{ errors.nombreDos }</div>)} />
                      </div> 
                    </div>

                    <div className='mb-3 m-auto w-12/12'>
                      <div className='text-left text-blue-900 font-bold text-lg ml-2 mt-2'>Correo del Invitado:</div>
                      <div className="">
                        <Field 
                          type="email" 
                          className="text-lg pl-3 text-gray-600 border-2 border-gray-300 w-full m-auto rounded-md px-3 py-1.5 bg-white" 
                          aria-describedby="emailHelp"
                          name="correoDos" />  
                        <ErrorMessage
                          name="correoDos"
                          component={() => (
                            <div className="text-orangeCustom mt-1 ml-3">{ errors.correoDos }</div>)} />
                      </div> 
                    </div> */}
                    
                    <div className='mb-3 m-auto w-12/12'>
                      <button type="submit" className="btn btn-primary w-full bg-redConsufarma border-0 w-100 p-2 text-2xl rounded-lg font-bold shadow-xl mt-2 mb-6 text-white">
                        Enviar
                      </button>
                    </div>
                  </Form>
                )}
            </Formik>
          </div>

        </div>
      </>
     )} 

    </div>
  )
}

export default Home;

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { API_BASE_URL } from '../../src/constants';
import axios from 'axios';
import qs from 'qs';
import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic'

const BackItemCourse = ({curso}) => {

  const [respuestaBack, setRespuestaBack] = useState('');
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
      const getSpecialities = async () => {
        await axios.get(`${API_BASE_URL}/specialities`)
        .then(resp => {
          setSpecialities(resp.data.specialities);      
        })
      };
      getSpecialities();
  }, []);
  

  return (
    <>
      <div className="max-w-7xl mx-auto pb-10 ">
        <Formik
          initialValues={{
            nombre: curso[0].nombre,
            fecha: curso[0].fecha,
            fecha_text: curso[0].fecha_text,
            duracion: curso[0].duracion,
            lugar: curso[0].lugar,
            ubicacion: curso[0].ubicacion,
            ruta: curso[0].ruta,
            precio: curso[0].precio,
            especialidad: curso[0].especialidad_id,
            ponente: curso[0].ponente_id,
            filtro: curso[0].filtro,
            objetivo: curso[0].objetivo,
          }}
          onSubmit={ async (valores) => {
            
            console.log(valores);
            console.log(qs.stringify(valores));

            const config = {
              method: 'put',
              url: `${API_BASE_URL}/courses/${curso.ruta}`,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data : qs.stringify(valores),
            };
            
            await axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              setRespuestaBack(JSON.stringify(response.data.detalle));
            })
            .catch(function (error) {
              console.log(error);
            });

          }}>
          {({ }) => (

            <Form className=" rounded px-8 pt-6 pb-8 mb-4 w-8/12 mx-auto">

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre del curso
                </label>
                <Field 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="text" 
                  name="nombre"/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha texto
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text"
                name="fecha_text" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Duracion
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text"
                name="duracion" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha Server
                </label>
                <Field 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="date"
                  name="fecha" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Objetivo
                </label>
                
                <Field 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  as="textarea"
                  name="objetivo" />
              </div>
              
              <div className='flex'>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Lugar
                  </label>
                  <div className="relative">
                    <Field as="select" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    name="lugar">
                      <option>{curso.lugar}</option>
                      <option>ONLINE</option>
                      <option>OTRO</option>
                    </Field>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Ubicación
                  </label>
                  <div className="relative">
                    <Field as="select" 
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    name="ubicacion">
                      <option>Recibirás un link para acceder a tu curso en TIEMPO REAL</option>
                    </Field>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Filtro
                  </label>
                  <div className="relative">
                    <Field as="select" 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="filtro">
                      <option>{curso.filtro}</option>
                      <option value="popular">Popular</option>
                      <option value="promocion">Promoción</option>
                      <option value="nuevo">Nuevo</option>
                    </Field>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Precio
                  </label>
                  <div className="relative">
                    <Field as="select" 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="precio">
                      <option>{curso.precio}</option>
                      <option value="3,500">$3,500</option>
                      <option value="6,500">$6,500</option>
                      
                    </Field>
                  </div>
                </div>
              </div>

              <div className='flex mt-5'>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Especialidades
                  </label>
                  <div className="relative">
                    <Field as="select" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    name="especialidad">
                      <option value={curso.especialidad_id}>{curso.especialidad}</option>
                      {specialities.map(s=>(
                        <option value={s.id} key={s._id}>{s.especialidad}</option>
                      ))}
                    </Field>
                  </div>
                </div>
              
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Ponente 1
                  </label>
                  <div className="relative">
                    <Field as="select" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    name="ponente">
                        <option>{curso.ponente}</option>
                    </Field>
                  </div>
                </div>
              </div>

              <div className="mb-4 mt-5">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ruta
                </label>
                <Field 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="text"
                  name="ruta" />
              </div>

              <div className="flex items-center justify-between mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign In
                </button>
              </div>
            </Form>
        )}
        </Formik>

        {respuestaBack ? respuestaBack : null}
        
      </div>
    </>
  )
}

export default BackItemCourse


export const getServerSideProps = async ({query: {ruta}}) => {
  const res = await fetch(`${API_BASE_URL}/topics/${ruta}`);
  const data = await res.json()
  console.log(data);
  const curso = data.topic

  return { props : { curso } }
}
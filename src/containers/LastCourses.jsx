import React, { useEffect, useState } from 'react'
import CardCourseSmall from '../components/cursos/CardCourseSmall';
import moment from 'moment';
import Logotipos from '../components/logotipos';

const lastCourses = () => {

  const [lastItems, setLastItems] = useState([]);

  useEffect(() => {
      if ( localStorage.getItem('lastCourses') ) {
        const storedLast = JSON.parse(localStorage.getItem('lastCourses'));
        if (storedLast) {
          console.log(storedLast)
          setLastItems(storedLast);
        }
      }
    }, []);

  const today = moment().startOf('day').format();

  return (
    <div>
      {!lastItems.length ? (
        <div className='bg-gray-50 mt-4 mb-10'>
          <div className='container m-auto px-2 md:px-2 pt-2'>
            <div className='text-2xl text-blueConsufarma font-bold mb-4 mt-8'>Cursos que has visto recientemente</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {
                lastItems.slice(0, 4).reverse().map(c => (
                  <div className='mb-7 m-auto' key={c.nombre}>
                    <CardCourseSmall  
                      link={`/cursos/${c.nombre_ruta}`}
                      nombre={c.nombre}
                      img={c.imagen}
                      label={c.label}
                      ponente={c.ponente}
                      ponenteDos={c.ponente_dos}
                      fecha={c.fecha}
                      fechaText={c.fecha > today ? c.fecha_text : 'Por Programar'}
                      duracion={c.duracion}
                      horario={c.horario}
                      lugar={c.lugar}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <Logotipos />
      )}
    </div>
      
  )
}

export default lastCourses
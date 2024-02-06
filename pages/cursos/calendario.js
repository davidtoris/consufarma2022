import Image from 'next/image';
import React from 'react';
import CardCalendar from '../../src/components/cursos/cardCalendar';
import { API_BASE_URL } from '../../src/constants';
import { FaPrint } from 'react-icons/fa';
import Link from 'next/link';
import { saveAs } from 'file-saver';
import instanceAPI from '../../src/config/axiosConfig';

const Calendar = ({cursosDate}) => {

  const handleClick = async () => {
    await instanceAPI.get("/pdf/getPDF", {responseType: 'blob'})
    .then(res => {
      const pdfBlob = new Blob([res.data], {type:'application/pdf'})
      saveAs(pdfBlob, "output.pdf")
    })
  } 


  return (
    <div className=''>

      <a href="../calendario-cursos-2023.pdf" className='fixed bottom-5 right-5 bg-redConsufarma p-5 text-white text-center flex items-center rounded-md cursor-pointer no-print'>
        <FaPrint className='w-4 h-4 ml-3 mr-2'/>Imprimir
      </a>
      {/* <button onClick={handleClick} href="../calendario-cursos-2023.pdf" className='fixed bottom-5 right-5 bg-redConsufarma p-5 text-white text-center flex items-center rounded-md cursor-pointer no-print'>
        <FaPrint className='w-4 h-4 ml-3 mr-2'/>Imprimir PDF
      </button> */}
      
      <div className=''>
        <div className='w-[1000px] m-auto'>
          <div className='w-12/12'>
            <Image src="/calendario/banner3.png" objectFit='content' width={1000} height={250} />
          </div>

          <div className='container m-auto px-2 md:px-2 mt-0 cont-cols-calendar'>

            <div>
              <h2 className='text-4xl text-blueDarkCustom m-auto mt-6 font-bold text-center mb-8 uppercase'>Junio</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 cols-calendar'>
                {cursosDate.filter(f => f.fecha_text.includes('Junio')).map(c => (
                  <div key={c._id}>
                    <CardCalendar
                      nombre={c.nombre}
                      fecha={c.fecha_text}
                      duracion={c.duracion}
                      horario={c.horario}
                      link={c.nombre_ruta}
                      color="redConsufarma"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 cols-calendar'>
                {cursosDate.filter(f => f.fecha_text.includes('Diciembre')).map(c => (
                  <CardCalendar
                    key={c._id}
                    nombre={c.nombre}
                    fecha={c.fecha_text}
                    duracion={c.duracion}
                    horario={c.horario}
                    link={c.nombre_ruta}
                    color="redConsufarma"
                  />
                ))}
              </div>
            </div> */}
          </div>

          <div className='h-[43px]'></div>
          {/* <div className='w-12/12'>
            <Image src="/calendario/footer.png" objectFit='content' width={1000} height={40} />
          </div> */}
        </div>
      </div>
      
      
    </div>
  )
};

export default Calendar;

export const getServerSideProps = async () => {
  const res = await fetch(`${API_BASE_URL}/courses?sortBy=fecha`);
  const data = await res.json()
  const cursosDate = data.courses

  return { props : { cursosDate } }
}
import React, { useState } from 'react'
import NavBar from '../src/components/NavBar'

const Carrito = () => {

  const [hours, setHours] = useState(0)

  const algo = {
    horas: '',
    p_empresa: '',
    d_empresa: '',
    p_personal: '',
    d_personal: '',
  }

  if (hours === 2) {
    
  }



  return (
    <>
      <NavBar />
      <div className='max-w-7xl mx-auto container px-5 pb-40 text-blueConsufarma mt-10'>
        <div className='flex'>
          <div>
            <label className='cursor-pointer'>
              <input type="radio" name='precio' /> <span className='font-bold'> Precio a empresa / </span> por participante
            </label>
            <label className='cursor-pointer'>
              <input type="radio" name='precio' className='ml-7' /> <span className='font-bold'> Precio pago personal </span>
            </label>
          </div>

          <div className='ml-24'>
            <label className='cursor-pointer'>
              <input type="radio" name="coin" /> <span className='font-bold'> MX </span>
            </label>
            <label className='cursor-pointer'>
              <input type="radio" name="coin" className='ml-7' /> USD
            </label>
          </div>
        </div>
        <h2 className='text-grayCustom font-bold mt-3'>A mayor número de asistentes y cursos, obtienes un mayor descuento</h2>

        <div className='flex'>

          <div className='flex-1'>
            <div className='bg-blueConsufarma p-3 text-white'>
              <div className='grid gap-4 grid-cols-5 px-2 text-center'>
                <div>
                  Curso
                </div>
                <div>
                  Precio
                </div>
                <div>
                  Descuento
                </div>
                <div>
                  Cantidad
                </div>
                <div>
                  Total
                </div>
              </div>
            </div>
            <div className='grid gap-4 grid-cols-5 px-2 text-center mt-5'>
              <div>
                <div className='font-thin'>3 de Marzo</div>
                <div>14 h (8 - 12:40)</div>
                <div className='mt-2'>Buenas practicas de documentación (BPD) e integridad de datos</div>
              </div>
              <div className='font-bold text-2xl'>
                7500
              </div>
              <div className='font-bold text-2xl'>
                10%
              </div>
              <div>
                <select>
                  <option>algo</option>
                </select>
              </div>
              <div className='font-bold text-2xl'>
                MX $13,500
              </div>
            </div>
          </div>

          <div className=''>
            <div className='font-bold text-2xl'>Resumen</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carrito
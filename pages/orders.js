import React, { useEffect } from 'react'
import NavBar from '../src/components/NavBar'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Thousands } from '../src/helpers/Thousands';

const Orders = () => {

  // const { orderData, orderStatus, orderMessage } = useSelector((state) => state.orders);

  const orderStatus = 'success'
  const orderData = {
    order: {
      "_id": "651cac8319b0020ef63f2235",
      "fecha": "2023-10-03T19:06:27-05:00",
      "total": "7047.00",
      "pagado": "true",
      "producto": [
        {
          "cantidad": 1,
          "descuento": 10,
          "descuentoTotal": 19,
          "duracion": 14,
          "fecha_text": "2 y 3 de Octubre",
          "horario": "8:00 - 16:00",
          "imagen": "https://res.cloudinary.com/drq8o9k36/image/upload/v1662441725/courses-img/Captura_de_Pantalla_2022-09-06_a_la_s_12.21.49_a.m._qmpgtf.png",
          "nombre": "Validación de Métodos Analíticos por Cromatografía de gases",
          "precio": 7500,
          "precioUSD": 485,
          "total": 6075,
          "_id": "6316d96e201a9a743920ec96"
        },
        {
          cantidad: 1,
          descuento: 1,
          descuentoTotal: 10,
          duracion: 14,
          fecha_text: "7 y 8 de Diciembre",
          horario: "8:00 - 16:00",
          imagen: "https://res.cloudinary.com/drq8o9k36/image/upload/v1662436604/courses-img/Captura_de_Pantalla_2022-09-05_a_la_s_10.56.27_p.m._yygo4n.png",
          nombre: "Estadística en Minitab y Statgraphics para la industria Farmacéutica (Validación y Producción)",
          precio: 7500,
          precioUSD: 485,
          total: 6682,
          "_id" :"6316c59a201a9a743920ebf6"
        },
      ],
      "__v": 0,
      "statusOrder": "Orden pagada con éxito",
      "transaccionId": "27H42115DA020471C"
    }
  }

  useEffect(() => {
    localStorage.setItem('cart', [])
  }, [])
  

  return (
    <>
      <NavBar />


      {orderStatus === 'success' && (
        
        <div className='container m-auto px-2 md:px-2 mt-10 w-6/12'>
          <h2 className="mt-6 text-5xl font-bold text-blueDarkCustom text-center mb-10">Gracias por tu compra</h2>

          <div className="mt-7">
            <div className="mt-6 text-3xl font-bold text-blueDarkCustom text-center mb-10">Resumen de la compra:</div>
          </div>

          <div className='flex '>
            {orderData?.order?.producto.map( o => (
              <>
                <div className='flex flex-col text-center mx-9 text-blueDarkCustom font-semibold bg-slate-100 rounded-md p-4 shadow-md' key={o.nombre}>
                  <div className="mb-4 text-2xl">{o.nombre}</div>
                  <img src={o.imagen} />
                <div className="mt-5 text-xl font-normal">Fecha: {o.fecha_text}</div>
                <h2 className=" text-xl font-normal">{o.duracion} horas</h2>
                <h2 className=" text-xl font-normal">Horario: {o.horario} horas</h2>
                </div>
              </>
            ))}
          </div>

          <div className="mt-7">
            <div className="mt-6 text-2xl font-normal text-blueDarkCustom text-center"><span className='font-bold'>Fecha:</span> {orderData?.order?.fecha}</div>
            <div className="text-2xl font-normal text-blueDarkCustom text-center mb-10 mt-1"><span className='font-bold'>Total:</span> ${Thousands(orderData?.order?.total)}</div>
          </div>

          <div className="mt-16">
            <div className="mt-6 text-2xl font-bold bg-blueConsufarma text-white text-center mb-10 p-3">En breve recibirás un correo con los datos de tu compra</div>
          </div>
          <Link href="/">
            <h2 className="mt-6 text-2xl font-semibold text-blueLightCustom underline cursor-pointer text-center">
              Seguir comprando
            </h2>
          </Link>
          
        </div>
      )}

      {orderStatus === 'error' && (
        <div className='text-center py-32'>
          <img src="../404.png" width={600} className="m-auto" />
          <h2 className="mt-6 text-4xl font-semibold text-blueDarkCustom">{orderMessage}</h2>
          <Link href="/carrito">
            <h2 className="mt-6 text-xl font-semibold text-blueLightCustom underline cursor-pointer">
              Regresar
            </h2>
          </Link>
        </div>
      )}
    </>
  )
}

export default Orders
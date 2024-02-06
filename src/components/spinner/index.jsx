import React from 'react'
import Image from 'next/image'
// import prev from './../../../public'

const Spinner = () => {
  return (
    <div className="w-full text-center m-auto">
      <div className="lds-dual-ring"></div>
      <img src={"/../../../prev.jpg"} width={600} height={450} alt='Cargando...' className='m-auto'  />
      <h2 className=" text-2xl font-semibold text-blueConsufarma">Tu solicitud esta siendo procesada, por favor no recargues la página...</h2>
    </div>
  )
}

export default Spinner
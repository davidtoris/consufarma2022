import React from 'react'

const Spinner = () => {
  return (
    <div className="w-full text-center">
      <div className="lds-dual-ring"></div>
      <h2 className="mt-6 text-2xl font-semibold text-blueLightCustom">Su solicitud esta siendo procesada...</h2>
    </div>
  )
}

export default Spinner
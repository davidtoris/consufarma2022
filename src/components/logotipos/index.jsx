import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Logotipos = () => {

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "ease",
      nextArrow: false,
      prevArrow: false,
    };


  return (
    <>
       
        <Slider {...settings} className="py-3 bg-white">
          <div className='w-4 h-67'>
            <img src="/empresas/asofarma.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/bayer.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/best.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/carnot.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/incobra.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/chinoin.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/italmex.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/lambda.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/lasca.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/liomont.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/medipan.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/medix.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/neolpharma.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/pisa.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/sophia.png" alt="buscador consufarma"/>
          </div>
          
        </Slider>
      
      
    </>
  )
}

export default Logotipos;
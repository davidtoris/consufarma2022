import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
const Logotipos = () => {

    var settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };


  return (
    <>
       
        <Slider {...settings} className="py-3 bg-white">
          <div className='w-4 h-67'>
            <img src="/empresas/1.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/2.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/3.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/4.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/5.png" alt="buscador consufarma"/>
          </div>
          <div className='w-4 h-67'>
            <img src="/empresas/6.png" alt="buscador consufarma"/>
          </div>
          
            {/* 
            <div className='w-100 h-67'>
              <Image src="/empresas/2.png" layout='fill' priority="false" alt="buscador consufarma"/>
            </div> */}
          
        </Slider>
      
      
    </>
  )
}

export default Logotipos;
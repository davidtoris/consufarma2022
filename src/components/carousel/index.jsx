import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Buscador from '../buscador'
import Image from 'next/image'

const Carousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <>
       
      <div className="relative w-100">
          <div className="absolute left-40 top-5 z-10 mt-10">
            <div className="text-white text-3xl font-thin drop-shadow-md">
            Sigue aprendiendo
          </div>
          <div className="text-white text-5xl mb-2 drop-shadow-lg">
            ¿Qué vas a Aprender hoy?
          </div>
          <Buscador
          />  
        </div>
        <Slider {...settings}>
          <div className="">
            <div className='relative w-100 h-80'>
              <Image src="/courses-img/practicas.jpeg" layout='fill' priority="false"/>
            </div>
          </div>
        </Slider>
      </div>
      
    </>
  )
}

export default Carousel;

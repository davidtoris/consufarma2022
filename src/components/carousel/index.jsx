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
          <div className="absolute left-10 sm:left-20 md:left-20 sm:top-5 top-2 z-10 mt-0 sm:mt-10">
            <div className="text-white sm:text-3xl text-2xl font-thin drop-shadow-md">
            Sigue aprendiendo
          </div>
          <div className="text-white sm:text-5xl text-3xl mb-0 sm:mb-2 drop-shadow-lg">
            ¿Qué vas a Aprender hoy?
          </div>
          <Buscador
          />  
        </div>
        <Slider {...settings}>
          <div className="">
            <div className='relative sm:w-100 sm:h-80 h-36'>
              <Image src="/courses-img/practicas.jpeg" layout='fill' priority="false"/>
            </div>
          </div>
        </Slider>
      </div>
      
    </>
  )
}

export default Carousel;

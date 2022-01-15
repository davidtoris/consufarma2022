import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <Slider {...settings}>
      <div className="bg-blueDark">
        <img src="https://picsum.photos/1200/250" width="100%"/>
      </div>
      <div>
        <img src="https://picsum.photos/1200/250" width="100%"/>
      </div>
      <div>
        <img src="https://picsum.photos/1200/250" width="100%"/>
      </div>
    </Slider>
  )
}

export default Carousel

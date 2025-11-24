import React from 'react';
import Slider from 'react-slick';
import './HeroSlider.css';

const images = [
  '/images/slider/slide1.jpg',
  '/images/slider/slide2.jpg',
  '/images/slider/slide3.jpg',
];

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="hero-slider-container">
      <Slider {...settings}>
        {images.map((imgSrc, index) => (
          <div key={index}>
            <div className="slider-item" style={{ backgroundImage: `url(${imgSrc})` }}>
              <div className="slider-caption">
                <h1>Haz perfecta cada celebración</h1>
                <p>Reserva tu momento en Mi Restaurante</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;
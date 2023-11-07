import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getCarById } from './carsData';
import ImageSlider from './ImageSlider'

function CarDetail() {
  const { id } = useParams();

  const car = getCarById(id);

  return (
    <div className='parent'>
      <Header />
      <div className='content bg-dark text-white p-4 overflow-hidden'>
        <h2>{car.name}</h2>
        <div className='img-slider-container'>
          <ImageSlider images={car.colors[0].images} />
        </div>
        <p>Price: {car.price}</p>
      </div>
      <Footer />
    </div>
  );
}

export default CarDetail;

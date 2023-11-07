import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getCarById } from './carsData';

function CarDetail() {
  const { id } = useParams();

  const car = getCarById(id);

  if (!car) {
    return <div>Car not found</div>;
  }

  const carImageSrc = require(`./cars/${car.src}`);

  return (
    <div className='parent'>
      <Header />
      <div className='content bg-dark text-white p-4 overflow-hidden'>
        <h2>{car.name}</h2>
        <img src={carImageSrc} alt={car.name} className='car-detail-img'/>
        <p>Price: {car.price}</p>
      </div>
      <Footer />
    </div>
  );
}

export default CarDetail;

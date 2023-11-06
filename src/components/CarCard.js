import React from 'react';
import carimage from './cars/car-image.webp';

function CarCard() {
  return (
    <div className='w-100 my-2 car-card'>
        <h4 className='card-title'>Car Name</h4>
        <img src={carimage} className="card-img img-fluid" alt="Car" />
    </div>
  );
}

export default CarCard;

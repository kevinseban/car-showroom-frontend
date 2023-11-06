import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';
import carimage from './cars/car-image.webp';

function CarList() {
  return (
    <div>
      <Header />
      <h2 className='px-5 py-4'>Car List</h2>
      <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
        <CarCard carId="1" name="Car name" price="price" src={carimage} transmission="Automatic" mileage="20" />
        <CarCard carId="1" name="Car name" price="price" src={carimage} transmission="Automatic" mileage="20" />
        <CarCard carId="1" name="Car name" price="price" src={carimage} transmission="Automatic" mileage="20" />
        <CarCard carId="1" name="Car name" price="price" src={carimage} transmission="Automatic" mileage="20" />
      </div>
      <Footer />
    </div>
  );
}

export default CarList;

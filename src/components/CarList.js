import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';
import carsData from './cars.json';

function CarList() {
  return (
    <div className='parent'>
      <Header />
      <div className="content w-100 p-5 bg-dark text-white">
        <h2 className='px-5 py-4'>Car List</h2>
        <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
          {carsData.map((car) => (
            <CarCard key={car.carId} carId={car.carId}/>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarList;

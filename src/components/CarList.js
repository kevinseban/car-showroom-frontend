import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';
import axios from 'axios';

function CarList() {

  const [cars, setCars] = useState([]);
  useEffect(() => {
    // Fetch car data for all the cars in the server
    const fetchCarsData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cars/allCars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car list:', error);
      }
    };
    fetchCarsData();
  }, []);

  return (
    <div className='parent'>
      <Header />
      <div className="content w-100 p-5 bg-dark text-white">
        <h2 className='px-5 py-4'>Car List</h2>
        <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
          {cars.map((car) => (
            <CarCard key={car._id} carId={car._id}/>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarList;

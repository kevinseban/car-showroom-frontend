import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';
import axios from 'axios';

function CarList() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      var response;
      if (searchTerm === "") {
        response = await axios.get('https://car-showroom-backend.onrender.com/cars/all');
      } else {
        response = await axios.get(`https://car-showroom-backend.onrender.com/cars/search/${searchTerm}`);
      }
      setCars(response.data);
    } catch (error) {
      console.error('Error searching for cars:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className='parent'>
      <Header />
      <div className="content w-100 p-5 bg-dark text-white">
        <div className='row justify-content-center align-items-center'>
          <h2 className='px-5 py-4 col-8'>Car List</h2>
          <input
            type="text"
            style={{ width: "fit-content", height:"fit-content", borderRadius: "5px"  }}
            className='px-3 col-4'
            placeholder="Search by name, color, etc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
        <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
          {cars.length === 0 ? (
            <p>No cars found</p>
          ) : (
            cars.map((car) => (
              <CarCard key={car._id} carId={car._id} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarList;

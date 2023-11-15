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
      console.log(searchTerm);
      var response;
      if (searchTerm === "") {
        response = await axios.get('http://localhost:8000/cars/all');
      } else {
        response = await axios.get(`http://localhost:8000/cars/search/${searchTerm}`);
      }
      setCars(response.data);
    } catch (error) {
      console.error('Error searching for cars:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className='parent'>
      <Header />
      <div className="content w-100 p-5 bg-dark text-white">
        <div className='container-fluid text-center'>
          <h2 className='px-5 py-4'>Car List</h2><br></br>
          <div className="search-bar px-5 mb-4">
            <input
              type="text"
              style={{ width: "300px" }}
              placeholder="Search by car name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleSearch}
            /><br /><br />
          </div>
        </div>
        <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
          {cars.map((car) => (
            <CarCard key={car._id} carId={car._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarList;

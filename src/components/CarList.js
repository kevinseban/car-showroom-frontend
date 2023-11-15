import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';
import axios from 'axios';

function CarList() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cars/all');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car list:', error);
      }
    };
    fetchCarsData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cars/search/${searchTerm}`);
      setCars(response.data);
    } catch (error) {
      console.error('Error searching for cars:', error);
    }
  };

  return (
    <div className='parent'>
      <Header />
      <div className="content w-100 p-5 bg-dark text-white">
        <div className='container-fluid text-center'>
          <h2 className='px-5 py-4'>Car List</h2><br></br>
          <div className="search-bar px-5 mb-4">
            <input
              type="text"
              style={{width:"300px"}}
              placeholder="Search by model, make, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /><br /><br />
            <button className='btn btn-primary' onClick={handleSearch}>Search</button>
          </div>
        </div>
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

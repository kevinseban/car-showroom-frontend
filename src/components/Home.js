import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';
import axios from 'axios';

function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    // Fetch featured cars from the server
    const fetchFeaturedCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/featured');
        setFeaturedCars(response.data);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <div className='parent'>
      <Header />
      <div className='content bg-dark text-white'>
        <div className="w-100 p-5 ">
          <div className="text-center">
            <h1 className="display-2">Welcome to Car360</h1>
            <p className="lead">Your one-stop destination for the latest cars and deals.</p>
          </div>
          <div className='container'>
            <h2 className="mt-5 text-center">Featured Cars</h2>
            <div className="d-flex flex-wrap justify-content-center gap-2 pb-3">
              {/* Map over the fetched featured cars and pass each car as a prop to CarCard */}
              {featuredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          </div>
          <h2 className="mt-5 display-5 text-center">About Us</h2>
          <p className='text-center'>
            At Car360, we are passionate about cars and committed to providing you
            with the best car-buying experience.<br />Explore our wide range of vehicles
            and find the perfect car for your needs.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

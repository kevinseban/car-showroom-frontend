import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';

function Home() {
  return (
    <div>
      <Header />
      <div className="w-100 p-5 bg-dark text-white">
        <div className="text-center">
          <h1 className="display-2">Welcome to Car360</h1>
          <p className="lead">Your one-stop destination for the latest cars and deals.</p>
        </div>
        <div className='container'>
          <h2 className="mt-5 text-center">Featured Cars</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <CarCard carId="1" name="Car name" price="price" src="car-image.webp" transmission="Automatic" mileage="20" />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <CarCard carId="1" name="Car name" price="price" src="car-image.webp" transmission="Automatic" mileage="20" />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <CarCard carId="1" name="Car name" price="price" src="car-image.webp" transmission="Automatic" mileage="20" />
            </div>
          </div>
        </div>

        <h2 className="mt-5 display-5 text-center">About Us</h2>
        <p className='text-center'>
          At Car360, we are passionate about cars and committed to providing you
          with the best car-buying experience.<br />Explore our wide range of vehicles
          and find the perfect car for your needs.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

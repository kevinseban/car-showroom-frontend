import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';

function Home() {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="display-4">Welcome to Car360</h1>
          <p className="lead">Your one-stop destination for the latest cars and deals.</p>
        </div>

        <h2 className="mt-5">Featured Cars</h2>
        <div className="row">
          <div className="col-md-4">
            <CarCard />
          </div>
          <div className="col-md-4">
            <CarCard />
          </div>
          <div className="col-md-4">
            <CarCard />
          </div>
        </div>

        <h2 className="mt-5">About Us</h2>
        <p>
          At Car360, we are passionate about cars and committed to providing you
          with the best car-buying experience. Explore our wide range of vehicles
          and find the perfect car for your needs.
        </p>

      </div>
      <Footer />
    </div>
  );
}

export default Home;

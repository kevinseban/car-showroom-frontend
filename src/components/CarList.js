import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function CarList() {
  return (
    <div>
      <Header/>
      <h2>Car List</h2>
      <Link to="/car/1">Car 1</Link>
      <Link to="/car/2">Car 2</Link>
      <Footer/>
    </div>
  );
}

export default CarList;

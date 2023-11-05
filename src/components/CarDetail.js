import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function CarDetail() {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <h2>Car Details</h2>
      <Footer/>
    </div>
  );
}

export default CarDetail;

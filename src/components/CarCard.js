import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import steering from './images/steering-wheel.svg';
import gas from './images/gas.svg';
import axios from 'axios';

function CarCard(props) {
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Fetch car data from the server based on the provided car ID
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cars/${props.carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarData();
  }, [props.carId]);

  if (!car) {
    return <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }

  const carImageSrc = (() => {
    try {
      return car.mainSrc;
    } catch (error) {
      console.error(error);
    }

    return '';
  })();

  return (
    <div className='my-2 car-card px-4 text-black justify-content-center d-flex flex-column'>
      <h4>{car.name}</h4>
      <h5 className='lead'>From ₹ {car.price}</h5>
      <img src={carImageSrc} className="card-img img-fluid my-2" alt="Car" />
      <div className='d-flex justify-content-center gap-5 mt-2'>
        <div className='text-center'>
          <img src={steering} className="m-1" alt="Steering Wheel" />
          <p className='lead' style={{ fontSize: "small" }}>{car.transmission}</p>
        </div>
        <div className='text-center'>
          <img src={gas} className="m-1" alt="Mileage" />
          <p className='lead' style={{ fontSize: "small" }}>{car.mileage}Km/l</p>
        </div>
        <Link to={`/car/${car._id}`} className="btn btn-outline-dark mt-2 px-4" style={{ height: "fit-content" }}>Explore</Link>
      </div>
      <Link to='/booking-Page' className="btn btn-outline-dark mt-2 px-4" style={{ height: "fit-content" }}>E-book</Link>
    </div>
  );
}

export default CarCard;

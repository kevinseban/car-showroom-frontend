import React from 'react';
import { Link } from 'react-router-dom';
import steering from './images/steering-wheel.svg';
import gas from './images/gas.svg';

function CarCard(props) {
  return (
    <div className='my-2 car-card px-4'>
      <h4>{props.name}</h4>
      <h5 className='lead '>From ₹ {props.price}</h5>
      <img src={props.src} className="card-img img-fluid " alt="Car" />
      <div className='d-flex justify-content-center gap-5 mt-2'>
        <div className='text-center'>
          <img src={steering} className="m-1" alt="Steering Wheel" />
          <p className='lead' style={{ fontSize: "small" }}>{props.transmission}</p>
        </div>
        <div className='text-center'>
          <img src={gas} className="m-1" alt="Mileage" />
          <p className='lead' style={{ fontSize: "small" }}>{props.mileage}Km/l</p>
        </div>
        <Link to={`/car/${props.carId}`} className="btn btn-dark mt-2 px-4" style={{ height: "fit-content" }}>Explore</Link>
      </div>
    </div>
  );
}

export default CarCard;

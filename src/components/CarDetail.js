import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getCarById } from './carsData';
import ImageSlider from './ImageSlider';

function CarDetail() {
  const { id } = useParams();
  const car = getCarById(id);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
  };

  return (
    <div className='parent'>
      <Header />
      <div className='content bg-dark text-white p-4 overflow-hidden lead row'>
        <div className='col ps-3'>
          <h2 className='display-3 mb-2'>{car.name}</h2>
          <p className='lead'>Starting from ₹ {car.price}</p>
          <div className='img-slider-container'>
            <ImageSlider images={car.colors[selectedColorIndex].images} />
          </div>
        </div>

        <div className='w-100 col pt-5 mt-5 '>
          <div>
            <h3>Colors</h3>
            <select
              className='form-select w-25 p-1 mb-2'
              onChange={(e) => handleColorChange(e.target.value)}
            >
              {car.colors.map((color, index) => (
                <option key={color.colorId} value={index}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Transmission</h3>
            <p>{car.transmission}</p>
          </div>
          <div>
            <h3>Mileage</h3>
            <p>{car.mileage} Km/l</p>
          </div>
          <div>
            <h3>Features</h3>
            <ul className='list-group'>
              {car.features.map((feature, index) => (
                <li key={index} style={{ listStyle: "none" }}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarDetail;

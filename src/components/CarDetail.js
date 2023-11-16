import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ImageSlider from './ImageSlider';
import axios from 'axios';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    // Fetch car data from the server based on the provided car ID
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cars/${id}`);
        setCar(response.data); // Assuming the server returns the car data as JSON
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarData();
  }, [id]);

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className='parent'>
      <Header />
      <div className='content bg-dark text-white p-4 overflow-hidden lead row'>
        <div className='col-xl-8 col-lg-12 col-md-12 ps-3'>
          <h2 className='display-3 mb-2'>{car.name}</h2>
          <p className='lead'>Starting from ₹ {car.price}</p>
          <div className='img-slider-container'>
            {/* Pass the selected color's images to ImageSlider */}
            <ImageSlider images={car.colors[selectedColorIndex].images} />
          </div>
        </div>

        <div className='col-xl-4 col-lg-12 col-md-12 pt-5 mt-5 text-center d-flex flex-column justify-content-center'>
          <div>
            <h3>Colors</h3>
            <div className='container-fluid'>
              <select
                className='form-select w-50 p-1 mb-3 text-center'
                onChange={(e) => handleColorChange(e.target.value)}
                style={{ display: 'block', margin: '0 auto' }}
              >
                {car.colors.map((color, index) => (
                  <option key={color.colorId} value={index}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
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
                <li key={index} style={{ listStyle: 'none' }}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className='container-fluid'>
          <Link to={`/booking/${car._id}`} className="btn btn-primary w-50 p-1 mt-3 text-center" style={{ height: "fit-content" }}>E-book</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarDetail;
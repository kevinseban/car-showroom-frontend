import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ImageSlider from './ImageSlider';
import axios from 'axios';

function EditCar() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    //GEt Car Data for the ._id
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarData();
  }, [id]);

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e, key) => {
    setCar({
      ...car,
      [key]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      //Make an API call to update the car data
      await axios.put(`http://localhost:8000/cars/update/${id}`, car);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  const handleAddFeature = () => {
    setCar((prevCar) => ({
      ...prevCar,
      features: [...prevCar.features, ''],
    }));
  };
  
  // Remove a feature from the features array
  const handleRemoveFeature = (indexToRemove) => {
    setCar((prevCar) => ({
      ...prevCar,
      features: prevCar.features.filter((_, index) => index !== indexToRemove),
    }));
  };
  
  // Handle changes in the feature input fields
  const handleFeatureChange = (e, index) => {
    const updatedFeatures = car.features.map((feature, i) =>
      i === index ? e.target.value : feature
    );
    setCar((prevCar) => ({ ...prevCar, features: updatedFeatures }));
  };

  return (
    <div className='parent'>
      <Header />
      <div className='content bg-dark text-white p-4 overflow-hidden lead row'>
        <div className='col-xl-8 col-lg-12 col-md-12 ps-3'>
          <h2 className='display-3 mb-2'>
            {editMode ? (
              <input
                type='text'
                value={car.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            ) : (
              car.name
            )}
          </h2>
          <p className='lead'>
            {editMode ? (
              <input
                type='text'
                value={car.price}
                onChange={(e) => handleInputChange(e, 'price')}
              />
            ) : (
              `Starting from ₹ ${car.price}`
            )}
          </p>
          <div className='img-slider-container'>
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
            {editMode ? (
                <select
                value={car.transmission}
                onChange={(e) => handleInputChange(e, 'transmission')}
                >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                </select>
            ) : (
              <p>{car.transmission}</p>
            )}
          </div>
          <div>
            <h3>Mileage</h3>
            {editMode ? (
              <input
                type='text'
                value={car.mileage}
                onChange={(e) => handleInputChange(e, 'mileage')}
              />
            ) : (
              <p>{car.mileage} Km/l</p>
            )}
          </div>
          <div>
            <h3>Is Featured</h3>
            {editMode ? (
                <select
                value={car.isFeatured}
                onChange={(e) => handleInputChange(e, 'isFeatured')}
                >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </select>
            ) : (
                <p>{car.isFeatured ? 'Yes' : 'No'}</p>
            )}
            </div>
          <div>
            <h3>Features</h3>
            {editMode ? (
                <div>
                <ul className='list-group'>
                    {car.features.map((feature, index) => (
                    <li key={index} style={{ listStyle: 'none', marginBottom: '5px' }}>
                        <input
                        type='text'
                        value={feature}
                        onChange={(e) => handleFeatureChange(e, index)}
                        />
                        <button type="button" onClick={() => handleRemoveFeature(index)}>
                        Remove
                        </button>
                    </li>
                    ))}
                </ul>
                <button type="button" onClick={handleAddFeature}>
                    Add Feature
                </button>
                </div>
            ) : (
                <ul className='list-group'>
                {car.features.map((feature, index) => (
                    <li key={index} style={{ listStyle: 'none' }}>
                    {feature}
                    </li>
                ))}
                </ul>
            )}
        </div>
          <br></br>
          <div>
            {editMode ? (
              <button className='btn btn-primary' onClick={handleSaveChanges}>Save Changes</button>
            ) : (
              <button className='btn btn-primary' onClick={handleEditModeToggle}>Edit</button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditCar;
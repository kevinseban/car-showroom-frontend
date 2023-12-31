import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { ref, deleteObject, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from './firebase';
import AdminHeader from './AdminHeader';
import { v4 } from 'uuid';

function EditCar() {
  
  const navigate = useNavigate();
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      // Redirect to admin login if adminToken is not present
      navigate('/admin/login');
    }
  }, [navigate]);

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [imageUpload ,setImageUpload] = useState(null);
  const [mainImageUrl, setMainImageUrls] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    //GEt Car Data for the ._id
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`https://car-showroom-backend.onrender.com/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarData();
  }, [id]);

  const carName = car?.name;  // Use optional chaining to handle null or undefined
  const selectedColor = car?.colors[selectedColorIndex];  // Use optional chaining
  const colorName = selectedColor ? selectedColor.name : null;
  const imagesListRef = ref(storage, `images/${carName}/${colorName}`);

  const handleImageAdd = async (s) => {
    try{
      if(window.confirm("Are you sure you want to upload this photo")) {
        if(s == "main"){
          if(imageUpload == null){
            alert("Please select a picture to upload");
            return;
          }
          const mImageref = ref(storage , `images/${carName}/main/${imageUpload.name + v4()}`);
          const snapshot = await uploadBytes(mImageref , imageUpload);
          const url = await getDownloadURL(snapshot.ref);
          setMainImageUrls(url);
        } else {
          if (imageUpload == null) {
            alert("Please Enter car name, car color, and select a picture to upload.");
            return;
          }

          const imRef = ref (storage , `images/${carName}/${colorName}/${imageUpload.name + v4()}`);
          const snapshot = await uploadBytes(imRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);

          setImageUrls((prev) => [...prev, url]);
        }
      }
    } catch (error){
      console.error("Error Uploading file",error);
    }
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  
  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://car-showroom-backend.onrender.com/cars/addEdit", {
        carName,
        colorName,
        imageUrls,
        mainImageUrl,
      });

      alert("Message sent successfully");
    } catch (error) {
      console.error("Error sending: ", error);
    }

    window.location.reload();
  };

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
      await axios.put(`https://car-showroom-backend.onrender.com/cars/update/${id}`, car);
      setEditMode(false);
      window.location.reload();
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

  const handleImageDeletion = async (imageIndex) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      try {
        // Get the URL of the image to be deleted
        const imageUrlToDelete = car.colors[selectedColorIndex].images[imageIndex];
  
        // Delete the image from Firebase Storage
        const imageRef = ref(storage, imageUrlToDelete);
        await deleteObject(imageRef);
  
        // Make an API call to delete the image
        await axios.delete(`https://car-showroom-backend.onrender.com/cars/deleteImage/${id}/${selectedColorIndex}/${imageIndex}`);
  
        // Update the state to reflect the deleted image
        setCar((prevCar) => {
          const updatedCar = { ...prevCar };
          updatedCar.colors[selectedColorIndex].images.splice(imageIndex, 1);
          return updatedCar;
        });
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleMainImageDeletion = async () => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      try {
        // Get the URL of the main image to be deleted
        const mainImageUrlToDelete = car.mainSrc;
  
        // Delete the main image from Firebase Storage
        const mainImageRef = ref(storage, mainImageUrlToDelete);
        await deleteObject(mainImageRef);
  
        // Make an API call to delete the main image
        await axios.delete(`https://car-showroom-backend.onrender.com/cars/deleteMainImage/${id}`);

        window.location.reload();
      } catch (error) {
        console.error('Error deleting main image:', error);
      }
    }
  };

  
  return (
    <div className='parent'>
      <AdminHeader/>
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
            <h2 className='text-center'>Images</h2>
            {editMode ? (
                car.colors[selectedColorIndex].images.map((image, imageIndex) => (
                  <div className="text-center" key={imageIndex}>
                    <img src={image} alt={`Image ->  ${imageIndex}`} width={"300px"} />
                    <button type="button" onClick={() => handleImageDeletion(imageIndex)}>
                      Delete Image
                    </button>
                    <br /> <br />
                  </div>
                ))
              ) : (
                car.colors[selectedColorIndex].images.map((image, imageIndex) => (
                  <div className='text-center' key={imageIndex}>
                    <img src={image} alt={`Image ${imageIndex}`} width={"300px"}/>
                  </div>
              ))
              )}
          </div>
          <br />
          <div className='img-slider-container'>
            <h2 className='text-center'>Main Image</h2>
            <br />
            {editMode ? (
              <div className="text-center"> 
                <img src={car.mainSrc} alt="Main image of car" width={"300px"} />
                <button type="button" onClick={() => handleMainImageDeletion()}>Delete Image</button>
              </div>
            ) : (
              <div className="text-center">
                <img src={car.mainSrc} alt="main image of car" width={"300px"}/>
              </div>
            )}
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
                {car.colors.length > 0 && car.colors.map((color, index) => (
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
          <br />
          <form onSubmit={collectData} style={{border:"1px solid black", padding:"2rem"}}>
            <div>
              <input type="file" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
              />
              <button type="button" className='btn btn-primary' onClick={() => handleImageAdd("not main")}>Add Photo</button><br /><br />
              {imageUrls.map((url) => {
                return <img src={url} />;
              })}
            </div>
            <div>
            <input type="file" onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
            />
            <button type="button" className='btn btn-primary' onClick={() => handleImageAdd("main")}>Add Main Photo</button><br /><br />
            <img src={mainImageUrl} />
            </div>
            <div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditCar;
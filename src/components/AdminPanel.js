import React from 'react';
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Link } from 'react-router-dom';

function AdminPanel() {

  //Code to handle Form data
  //Initializing the required states
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carMileage, setCarMileage] = useState("");
  const [carTransmission, setCarTransmission] = useState("");
  const [carFeatures, setCarFeatures] = useState(""); //Array of Strings which contain the Features.
  const [isFeatured, setCarFeatured] = useState(false);
  //imageUrls on submit will contain an array of urls that correspond to the pictures of that car in that color.

  //code to send data to mongoDB
  const collectData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/cars/add", {
        carName,
        carPrice,
        carColor,
        carMileage,
        carTransmission,
        carFeatures,
        imageUrls,
        mainImageUrl,
        isFeatured
      });

      alert("Message sent successfully");
    } catch (error) {
      console.error("Error sending: ", error);
    }

    window.location.reload();
  };

  // Code to handle image upload to firebase
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [mainImageUrl, setMainImageUrls] = useState("");
  const imagesListRef = ref(storage, `images/${carName}/${carColor}`);

  const uploadFile = async (s) => {
    try {
      if (window.confirm("Are you sure you want to upload this photo")) {
        if (s === "main") {
          if (imageUpload == null || carName === "") {
            alert("Please Enter car name and select a picture to upload.");
            return;
          }

          const mainImageRef = ref(storage, `images/${carName}/main/${imageUpload.name + v4()}`);
          const snapshot = await uploadBytes(mainImageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
          setMainImageUrls(url);
        } else {
          if (imageUpload == null || carName === "" || carColor === "") {
            alert("Please Enter car name, car color, and select a picture to upload.");
            return;
          }

          const imageRef = ref(storage, `images/${carName}/${carColor}/${imageUpload.name + v4()}`);
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);

          setImageUrls((prev) => [...prev, url]);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle the error as needed
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
  // ending of code to send image to firebase

  // Code to display messages from the Contact Us DB.
  const [mess, setMess] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/getMessage')
      .then(mess => setMess(mess.data))
      .catch(err => console.log(err))
  }, []);

  // Code to delete entries.
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this complaint`)) {
      axios.post('http://localhost:8000/deleteMessage', null, {
        params: { messid: id }
      })
        .then(res => {
          alert("record has been deleted");
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  }
  
  return (
    <div className="parent">
      <Header />
      <div className='content bg-dark text-white pt-2 overflow-hidden pt-xl-5 pt-lg-5'>
        <div className='container text-start' style={{ width: '50%', marginTop: '5rem', border: '0.16rem solid black', padding: '2.5rem 3.5rem', borderRadius: '0.5rem' }}>
          <form onSubmit={collectData}>
            {/* Form Heading */}
            <h2 className='text-center pt-3'>Enter Car Details</h2>

            {/* Car name */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Name</label>
              <input type='text' className='form-control'
                value={carName}
                onChange={(event) => setCarName(event.target.value)}
              />
            </div>

            {/* Car color */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Color</label>
              <input type='text' className='form-control'
                value={carColor}
                onChange={(event) => setCarColor(event.target.value)}
              />
            </div>

            {/* Car Price */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Price</label>
              <input type='text' className='form-control'
                value={carPrice}
                onChange={(event) => setCarPrice(event.target.value)}
              />
            </div>

            {/* Car Mileage */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Mileage</label>
              <input type='text' className='form-control'
                value={carMileage}
                onChange={(event) => setCarMileage(event.target.value)}
              />
            </div>

            {/* Car Transmission Type */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Transmission</label><br></br>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" value="Automatic" onChange={() => setCarTransmission("Automatic")} />
                <label className="form-check-label" htmlFor="inlineRadio1">Automatic</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" value="Manual" onChange={() => setCarTransmission("Manual")} />
                <label className="form-check-label" htmlFor="inlineRadio2">Manual</label>
              </div>
            </div>

            {/* Option to Choose if car needs to be featured */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Featured</label><br></br>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="Yes" onChange={() => setCarFeatured(true)} />
                <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="No" onChange={() => setCarFeatured(false)} />
                <label className="form-check-label" htmlFor="inlineRadio2">No</label>
              </div>
            </div>

            {/* Features */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}><small>Features (newline seperated)</small></label>
              <textarea className='feat form-control' id='feat' cols="5" rows="5" onChange={() => setCarFeatures(document.getElementById('feat').value.split('\n'))} />
            </div>

            {/* Main Image */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Main Image</label><br></br>
              <input type="file" onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              />
              <button type="button" onClick={() => uploadFile("main")}>Upload Main Image</button><br />
              <img src={mainImageUrl} />
            </div>

            {/* Images */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{ fontSize: '18px', fontWeight: '600' }}>Pictures</label><br></br>
              <input type="file" onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              />
              <button type="button" onClick={() => uploadFile("notmain")}>Upload Image</button><br />
              {imageUrls.map((url) => {
                return <img src={url} />;
              })}
            </div>

            {/* Submit Button */}
            <div className='container text-center'>
              <button type='submit' className='btn btn-success'>Submit</button>
            </div>
          </form>
        </div>

        <br /><br />
        <hr />
        <br />
          
        {/* Table for complaints */}
        <h2 className='text-center'>Complaints</h2><br />
        <div className='w-100 d-flex justify-content-center align-items-center table-responsive'>
          <div className="w-50">
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th className='bg-secondary text-white'>
                    Name
                  </th>
                  <th className='bg-secondary text-white'>
                    Email
                  </th>
                  <th className='bg-secondary text-white'>
                    Phone No.
                  </th>
                  <th className='bg-secondary text-white'>
                    Message
                  </th>
                  <th className='bg-secondary text-white text-center'>
                    Action
                  </th>
                  <th className='bg-secondary text-white text-center'>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  mess.map(mess => {
                    return (
                      <tr>
                        <td>{mess.messName}</td>
                        <td>{mess.messEmail}</td>
                        <td>{mess.messPhone}</td>
                        <td>{mess.messMessage}</td>
                        <td>{new Date(mess.createdAt).toLocaleDateString()}</td>
                        <td><button type="button" className='btn btn-danger w-100' onClick={() => handleDelete(mess._id)}>Delete</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <br /><br />
        <div className='container-fuild text-center'>
            <Link to="/admin/AllCars" className='btn btn-primary'>View all Cars</Link>
          </div>
        <br></br><br></br>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;

import React from 'react';
import { useState, useEffect } from "react";
import { ref,uploadBytes,getDownloadURL,listAll,list,} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";


function AdminPanel() {
  // const features = document.getElementById('feat').value.split('\n'); -> method to convert textarea features into array of features.

  // Code to handle image upload to firebase
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
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
  //ending of code to send image to firebase


  return (
    <div className="parent">
      <Header />
      <div className='content bg-dark text-white pt-2 overflow-hidden pt-xl-5 pt-lg-5'>
        <div className='container text-start' style={{width: '50%',marginTop:'5rem',border:'0.16rem solid black',padding:'2.5rem 3.5rem',borderRadius:'0.5rem'}}>
          <form>
            {/* Form Heading */}
            <h2 className='text-center pt-3'>Enter Car Details</h2>

            {/* Car name */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}>Name</label>
              <input type='text' className='form-control'/>
            </div>

            {/* Car color */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}>Color</label>
              <input type='text' className='form-control'/>
            </div>

            {/* Car Price */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}>Price</label>
              <input type='number' className='form-control'/>
            </div>

            {/* Car Mileage */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}>Mileage</label>
              <input type='number' className='form-control'/>
            </div>

            {/* Car Transmission Type */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}>Transmission</label><br></br>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Automatic" />
                <label class="form-check-label" for="inlineRadio1">Automatic</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Manual" />
                <label class="form-check-label" for="inlineRadio2">Manual</label>
              </div>
            </div>

            {/* Features */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}><small>Features (newline seperated)</small></label>
              <textarea className='feat form-control' id='feat' cols="5" rows="5"/>
            </div>

            {/* Images */}
            <div className='form-group mb-3 mt-3'>
              <label className='form-label' style={{fontSize:'18px',fontWeight:'600'}}>Pictures</label><br></br>
              <input type="file" onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button onClick={uploadFile}>Upload Image</button><br />
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
      </div>
    <Footer />
    </div>
  );
}

export default AdminPanel;

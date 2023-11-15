import React from 'react';
import { useState, useEffect } from "react";
// import { ref, deleteObject, } from "firebase/storage";
// import { storage } from "./firebase";
import Footer from "./Footer";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminCarCard from './AdminCarCard';
import { useNavigate } from 'react-router-dom';



function AdminPanel() {

  const navigate = useNavigate();
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      // Redirect to admin login if adminToken is not present
      navigate('/admin/login');
    }
  }, [navigate]);

  const [cars, setCars] = useState([]);
  useEffect(() => {
    // Fetch car data for all the cars in the server
    const fetchCarsData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cars/all');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car list:', error);
      }
    };
    fetchCarsData();
  }, []);

  return (
    <div className='parent'>
      <AdminHeader />
      <div className="content w-100 p-5 bg-dark text-white">
        <h2 className='px-5 py-4'>Car List</h2>
        <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
          {cars.map((car) => (
            <AdminCarCard key={car._id} carId={car._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;
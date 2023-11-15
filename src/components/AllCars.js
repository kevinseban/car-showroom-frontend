import React from 'react';
import { useState, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";
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

  const [cars, setCars] = useState([]);  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      console.log(searchTerm);
      var response;
      if (searchTerm === "") {
        response = await axios.get('http://localhost:8000/cars/all');
      } else {
        response = await axios.get(`http://localhost:8000/cars/search/${searchTerm}`);
      }
      setCars(response.data);
    } catch (error) {
      console.error('Error searching for cars:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className='parent'>
      <AdminHeader />
      <div className="content w-100 p-5 bg-dark text-white">
        <div className='container-fluid text-center'>
          <h2 className='px-5 py-4'>Car List</h2><br></br>
          <div className="search-bar px-5 mb-4">
            <input
              type="text"
              style={{ width: "300px" }}
              placeholder="Search by car name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleSearch}
            /><br /><br />
          </div>
        </div>
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
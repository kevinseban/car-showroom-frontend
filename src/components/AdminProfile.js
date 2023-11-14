import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import AdminHeader from './AdminHeader';

function AdminProfile() {
  const [adminProfile, setAdminProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('http://localhost:8000/admin/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdminProfile(response.data);
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (adminProfile) {
    return (
      <div className='app parent'>
        <AdminHeader/>
        <div className='content bg-dark text-white py-5 text-center'>
          <h1>Admin Profile</h1>
          <div>
            <p>Username: {adminProfile.username}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return <div className='app parent'>
    <AdminHeader/>
    <div className='content bg-dark text-white py-5 text-center'>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Footer />
  </div>;
}

export default AdminProfile;

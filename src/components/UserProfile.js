import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const response = await axios.get('http://localhost:8000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User profile data could not be loaded.</div>;
  }

  return (
    <div className="container mt-4">
      <h1>User Profile</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{userProfile.name}</h5>
          <p className="card-text">Email: {userProfile.email}</p>
          <p className="card-text">Phone Number: {userProfile.phoneNumber}</p>
          <p className="card-text">Address: {userProfile.address}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import UserBookings from './UserBookings';

function EditProfileModal({ userProfile, onClose, onSave }) {
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedProfile);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="modal bg-secondary" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button type="button" className="close btn btn-outline-secondary" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group p-2">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group p-2">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group p-2">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={editedProfile.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="float-end">
                <label>Show Password&nbsp;</label>
                <input
                  type="checkbox"
                  className='fs-1'
                  checked={showPassword}
                  onChange={handleTogglePassword}
                />
              </div>
            </form>
          </div>
          <div className="text-center p-3">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('https://car-showroom-backend.onrender.com/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleEditSave = async (editedProfile) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not authenticated');
        return;
      }

      const response = await axios.put('https://car-showroom-backend.onrender.com/user/profile', editedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError('Error updating user profile');
    }
  };

  if (error) {
    alert('Error loading/updating user profile. Please check the console for details');
    return <div>User profile data could not be loaded.</div>;
  }

  if (userProfile) {
    return (
      <div className='app parent'>
        <Header />
        <div className='content bg-dark text-white py-5 text-center'>
          <h3>User Profile</h3>
          <div className='mt-4 lead'>
            <h5>Name: {userProfile.name}</h5>
            <p>Email: {userProfile.email}</p>
            <p>Username: {userProfile.username}</p>
            <p>Phone: {userProfile.phoneNumber}</p>
            <button onClick={handleEditClick} className='btn btn-outline-light'>
              Edit Profile
            </button>
          </div>
          {isEditing && (
            <EditProfileModal
              userProfile={userProfile}
              onClose={handleEditClose}
              onSave={handleEditSave}
            />
          )}
          <UserBookings username={userProfile.username} />
        </div>
        <Footer />
      </div>
    );
  }

  return <div className='app parent'>
    <Header />
    <div className='content bg-dark text-white py-5 text-center'>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Footer />
  </div>;
}

export default UserProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      // Redirect to admin login if adminToken is not present
      navigate('/admin/login');
    } else {
      // Fetch bookings when adminToken is present
      fetchBookings();
    }
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/booking/getBookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/booking/deleteBooking/${id}`);
      // Refresh bookings after deletion
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="parent">
      <AdminHeader />
      <div className="content bg-dark text-white pt-2 overflow-hidden pt-xl-5 pt-lg-5">
        <h2 className="text-center">Admin Bookings</h2>
        <div className="w-100 d-flex justify-content-center align-items-center table-responsive">
          <div className="w-100 p-4">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Car Name</th>
                  <th>Car Color</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.username}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.address}</td>
                    <td>{booking.pincode}</td>
                    <td>{booking.carname}</td>
                    <td>{booking.carcolor}</td>
                    <td>{new Date(booking.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(booking._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminBookings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

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

  useEffect(() => {
    // Use a separate function to handle search
    const handleSearch = async () => {
      try {
        let response;

        if (searchTerm === "" && searchDate === "") {
          response = await axios.get('http://localhost:8000/booking/getBookings');
        } else if (searchDate !== "") {
          response = await axios.get(`http://localhost:8000/booking/searchBookingsByDate/${searchDate}`);
        } else {
          response = await axios.get(`http://localhost:8000/booking/searchBookings/${searchTerm}`);
        }

        setBookings(response.data);
      } catch (error) {
        console.error('Error searching for bookings:', error);
      }
    };

    // Call handleSearch when either searchTerm or searchDate changes
    handleSearch();
  }, [searchTerm, searchDate]);

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
      <div className="content w-100 p-5 bg-dark text-white">
        <div className='row justify-content-center align-items-center'>
          <h2 className='px-5 py-4 col-8'>Bookings List</h2>
          <input
            type="text"
            style={{ width: "fit-content", height: "fit-content", borderRadius: "5px" }}
            className='px-3 col-4 my-2'
            placeholder="Search by name, email, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className='px-2 mx-2 col-4'
            style={{ width: "fit-content", height: "fit-content", borderRadius: "5px" }}
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <div className='w-100 d-flex justify-content-center align-items-center table-responsive'>
          <div className=" p-4" style={{width:"90%"}}>
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

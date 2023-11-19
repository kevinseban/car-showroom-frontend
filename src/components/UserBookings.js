import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserBookings = ({ username }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define fetchUserBookings outside the useEffect
    const fetchUserBookings = async () => {
        try {
            const response = await axios.get(`https://car-showroom-backend.onrender.com/booking/getBookings/${username}`);
            const data = response.data;

            setBookings(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Call fetchUserBookings within useEffect
        fetchUserBookings();
    }, [username]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://car-showroom-backend.onrender.com/booking/deleteBooking/${id}`);
            // Refresh bookings after deletion
            fetchUserBookings();
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div className='w-100'>
            <h2 className='mt-5 mb-4'>My Bookings</h2>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="d-flex flex-wrap flex-row gap-4 justify-content-center align-items-center">
                    {bookings.map((booking) => (
                        <div className="card bg-secondary text-white booking-card mx-2" key={booking._id}>
                            <div className="card-body">
                                <h5 className="card-title">Booking ID: {booking._id}</h5>
                                <p className="card-text">Name: {booking.name}</p>
                                <p className="card-text">Email: {booking.email}</p>
                                <p className="card-text">Phone: {booking.phone}</p>
                                <p className="card-text">Address: {booking.address}</p>
                                <p className="card-text">Pincode: {booking.pincode}</p>
                                <p className="card-text">Car Name: {booking.carname}</p>
                                <p className="card-text">Car Color: {booking.carcolor}</p>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(booking._id)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserBookings;

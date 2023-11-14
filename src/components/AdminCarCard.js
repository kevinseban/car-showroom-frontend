import React, { useState, useEffect } from 'react';
import steering from './images/steering-wheel.svg';
import { ref, deleteObject, } from "firebase/storage";
import { storage } from "./firebase";
import { useNavigate } from 'react-router-dom';
import gas from './images/gas.svg';
import axios from 'axios';

function AdminCarCard(props) {
    const [car, setCar] = useState(null);

    useEffect(() => {
        // Fetch car data from the server based on the provided car ID
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/cars/${props.carId}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarData();
    }, [props.carId]);

    const handleDeleteCar = async (id) => {
        try {
            // Fetch detailed car information
            const response = await axios.get(`http://localhost:8000/cars/${id}`);
            const carData = response.data;

            // Confirm deletion
            if (window.confirm(`Are you sure you want to delete this car?`)) {
                // Delete car from the server
                await axios.post(`http://localhost:8000/cars/delete`, null, {
                    params: { carid: id },
                });

                // Delete images from Firebase Storage
                await Promise.all(
                    carData.colors.flatMap((color) =>
                        color.images.map(async (imageUrl) => {
                            const imageRef = ref(storage, imageUrl);
                            try {
                                await deleteObject(imageRef);
                            } catch (error) {
                                console.error('Error deleting image from Firebase Storage:', error);
                            }
                        })
                    )
                );

                const mRef = ref(storage, carData.mainSrc);
                try {
                    await deleteObject(mRef);
                }
                catch (error) {
                    console.error("Error deleting main image", error);
                }
                alert('Car has been deleted');
                window.location.reload();
            }
        } catch (error) {
            console.log('Error fetching car details:', error);
        }
    };

    //Code to allow for the editing of cars
    const navigate = useNavigate();
    const handleEditCar = (id) => {
        // Navigate to the detailed view of the car using the history object
        navigate(`/admin/car/${id}`);
    };

    if (!car) {
        return <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    const carImageSrc = (() => {
        try {
            return car.mainSrc;
        } catch (error) {
            console.error(error);
        }

        return '';
    })();

    return (
        <div className='my-2 car-card px-4 text-black justify-content-center d-flex flex-column'>
            <h4>{car.name}</h4>
            <h5 className='lead'>From ₹ {car.price}</h5>
            <img src={carImageSrc} className="card-img img-fluid my-2" alt="Car" />
            <div className='d-flex justify-content-center gap-5 mt-2'>
                <div className='text-center'>
                    <img src={steering} className="m-1" alt="Steering Wheel" />
                    <p className='lead' style={{ fontSize: "small" }}>{car.transmission}</p>
                </div>
                <div className='text-center'>
                    <img src={gas} className="m-1" alt="Mileage" />
                    <p className='lead' style={{ fontSize: "small" }}>{car.mileage}Km/l</p>
                </div>
            </div>
            <div className='d-flex flex-row'>
                <button type="button" className='btn btn-danger mt-2' onClick={() => handleDeleteCar(car._id)}>Delete</button>
                <button type="button" className='btn btn-warning mt-2' onClick={() => handleEditCar(car._id)}>Edit</button>
            </div>
        </div>
    );
}

export default AdminCarCard;

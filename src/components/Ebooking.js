import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Ebooking() {
    const carId = useParams().id;
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/cars/${carId}`)
            .then((response) => {
                setCarDetails(response.data);
                if (response.data.colors.length > 0) {
                    setSelectedColor(response.data.colors[0].name);
                }
            })
            .catch((error) => console.error('Error fetching car details:', error));
    }, [carId]);

    const resetForm = () => {
        setName('');
        setPincode('');
        setAddress('');
        setEmail('');
        setPhone('');
        setUsername('');
        setErrorMessage(null);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!name || !email || !username || !phone || !address || !pincode) {
            setErrorMessage('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/booking/newBooking', {
                name,
                email,
                username,
                phone,
                address,
                pincode,
                carname: carDetails.name,
                carcolor: selectedColor,
            });

            console.log('Booked successfully');
            setSuccessMessage('Booked Successfully');
            navigate('/profile');
        } catch (error) {
            console.error('Error booking: ', error);
            if (error.response && error.response.status === 400) {
                setErrorMessage('Something went wrong');
            } else {
                setErrorMessage('An error occurred while booking.');
            }
        }
    };

    return (
        <div className="bg-dark text-white">
            <Header />
            <div className="container text-center">
                <h1 className="text-light display-2 mb-2">E-Booking</h1>
            </div>
            <div className="container form-div">
                <form noValidate validated={validated} onSubmit={handleSubmit} action="POST">
                    <br />
                    <hr />
                    <br />
                    <h3 className="text-light font-weight-bold">Personal Details</h3>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="invalid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="invalid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile number"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className="invalid-feedback">Please provide a valid Phone number.</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <div className="invalid-feedback">Please provide a valid address.</div>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pincode"
                                required
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            <div className="invalid-feedback">Please provide a valid Pincode.</div>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <h3>Car Details</h3>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <input type="text" disabled className="form-control" placeholder="Car Name" required value={carDetails.name} />
                            <div className="invalid-feedback">Please provide a valid Car.</div>
                        </div>
                        <div className="col-md-6">
                            <select className="form-select" required value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                                {carDetails.colors &&
                                    carDetails.colors.length > 0 &&
                                    carDetails.colors.map((color) => (
                                        <option key={color.name} value={color.name}>
                                            {color.name}
                                        </option>
                                    ))}
                            </select>
                            <div className="invalid-feedback">Please choose a valid Color.</div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="text-center w-100 d-flex flex-row flex-wrap justify-content-center align-items-center">
                        {errorMessage && <div className="alert alert-danger w-50">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success w-50">{successMessage}</div>}
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mx-2" onClick={submit}>
                            Submit
                        </button>
                        <button type="reset" className="btn btn-secondary mx-2" value="Reset Form" onClick={resetForm}>
                            Reset
                        </button>
                    </div>
                    <br />
                    <hr />
                    <br />
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Ebooking;

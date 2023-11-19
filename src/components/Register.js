import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const history = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const validatePhoneNumber = (number) => {
        return /^\d{10}$/.test(number);
    };

    const validateEmail = (email) => {
        // Regular expression for a simple email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phoneNumber || !username || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage("Enter valid phone number.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Enter valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Confirm Password does not match.");
            return;
        }

        try {
            const response = await axios.post("https://car-showroom-backend.onrender.com/user/register", {
                username,
                password,
                name,
                email,
                phoneNumber,
            });

            console.log("User registered successfully");
            history("/login");
        } catch (error) {
            console.error("Error registering: ", error);
            if (error.response && error.response.status === 400) {
                setErrorMessage("Username already exists");
            } else {
                setErrorMessage("An error occurred while registering.");
            }
        }
    };

    useEffect(() => {
        document.body.classList.add("reg-page");
    }, []);

    return (
        <div className="app parent">
            <Header />
            <center className="content bg-black py-5">
                <div className="auth-form-container log">
                    <h1 className="text-secondary mb-4">Sign Up</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <form className="register-form needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="text-light m-1">
                                Name
                            </label>
                            <input
                                className="form-control m-1"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Your Name"
                                id="name"
                                name="name"
                                required
                            />
                            <div className="invalid-feedback">Please provide your name.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-light m-1">
                                Email
                            </label>
                            <input
                                className="form-control m-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="your.email@example.com"
                                id="email"
                                name="email"
                                required
                            />
                            <div className="invalid-feedback">Please provide a valid email address.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="text-light m-1">
                                Phone Number
                            </label>
                            <input
                                className="form-control m-1"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="tel"
                                placeholder="123-456-7890"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                            />
                            <div className="invalid-feedback">Please provide a valid 10-digit phone number.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="text-light m-1">
                                Username
                            </label>
                            <input
                                className="form-control m-1"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Username"
                                id="username"
                                name="username"
                                required
                            />
                            <div className="invalid-feedback">Please provide a username.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="text-light m-1">
                                Password
                            </label>
                            <input
                                className="form-control m-1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="********"
                                id="password"
                                name="password"
                                required
                            />
                            <div className="invalid-feedback">Please provide a password.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="text-light m-1">
                                Confirm Password
                            </label>
                            <input
                                className="form-control m-1"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder="********"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                            />
                            <div className="invalid-feedback">Please confirm your password.</div>
                        </div>
                        <br />
                        <button
                            className="btn btn-secondary text-dark"
                            type="submit"
                            onClick={submit}
                        >
                            Sign up
                        </button>
                    </form>
                    <br />
                    <Link to="/login">Already have an account? Login here.</Link>
                </div>
            </center>
            <Footer />
        </div>
    );
};

export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/user/generateToken", {
                email, password
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                history("/", { state: { id: user.email } });
            } else {
                alert("User already exists or wrong details");
            }
        } catch (error) {
            console.error("Error registering: ", error);
            alert("An error occurred while registering.");
        }
    }

    useEffect(() => {
        document.body.classList.add("reg-page");
    });

    return (
        <div className="app parent">
            <Header />
            <center className="content bg-black py-5">
                <div className="auth-form-container  log">
                    <h1 className="text-secondary mb-4">Sign Up</h1>
                    <form className="register-form" action="POST">
                        <label htmlFor="email" className="text-light m-1">Email</label>
                        <input className="form-control m-1" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password" className="text-light m-1">Password</label>
                        <input className="form-control m-1" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <br />
                        <button className="btn btn-secondary text-dark" type="submit" onClick={submit}>Sign up</button>
                    </form>
                    <br />
                    <Link to="/login">Already have an account? Login here.</Link>
                </div>
            </center>
            <Footer/>
        </div>
    );
}

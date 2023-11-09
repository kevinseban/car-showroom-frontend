import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/user/generateToken", {
                email,
                password,
            });

            const { token, user } = response.data;
            if (token) {
                // Store the token in local storage
                localStorage.setItem("token", token);
                console.log("Logged in with email:", email);
                console.log("Password:", password);
                console.log("Token:", token);
                history("/", { state: { id: user.email } });
            } else {
                alert("Wrong details or user does not exist");
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            alert("An error occurred while logging in.");
        }
    }


    return (
        <div className="app parent">
            <Header />
            <center className="content bg-black py-5">
                <div className="auth-form-container log">
                    <h1 className="text-secondary mb-4">Login</h1>
                    <form className="login-form" action="POST">
                        <label htmlFor="email" className="text-light m-1">Email</label>
                        <input
                            className="form-control m-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="youremail@gmail.com"
                            id="email"
                            name="email"
                        />
                        <label htmlFor="password" className="text-light m-1">Password</label>
                        <input
                            className="form-control m-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                            id="password"
                            name="password"
                        />
                        <br />
                        <button className="btn btn-secondary" type="submit" onClick={submit}>
                            Log In
                        </button>
                    </form>
                    <br />
                    <Link to="/signup">Don't have an account? Register here.</Link>
                </div>
            </center>
            <Footer />
        </div>
    );
};

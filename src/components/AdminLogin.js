import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // Redirect to the previous page or a default page if there's no previous page
            window.history.back();
        }
    }, [history]);

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/admin/generateToken", {
                username,
                password,
            });

            const { token, user } = response.data;
            if (token) {
                // Store the token in local storage
                localStorage.setItem("adminToken", token);
                console.log("Logged in as admin with email:", user.username);
                console.log("Token:", token);

                // Redirect to the previous page or a default page if there's no previous page
                window.history.back();
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
                    <h1 className="text-secondary mb-4">Admin Login</h1>
                    <form className="login-form" action="POST">
                        <label htmlFor="username" className="text-light m-1">Username</label>
                        <input
                            className="form-control m-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="username"
                            id="username"
                            name="username"
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
                </div>
            </center>
            <Footer />
        </div>
    );
};

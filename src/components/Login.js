import React, { useState , useEffect } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    useEffect(() => {
        document.body.classList.add("log-page");
      });

    return (
        <div className="auth-form-container log">
            <h1 className="text-warning">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-light">Email</label>
                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password" className="text-light">Password</label>
                <input className="form-control" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <br/>
                <button className="btn btn-warning" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
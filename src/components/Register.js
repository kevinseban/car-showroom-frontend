import React, { useState , useEffect } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    useEffect(() => {
        document.body.classList.add("reg-page");
      });

    return (
        <div className="auth-form-container log">
            <h1 className="text-warning">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-light">Full name</label>
            <input className="form-control" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email" className="text-light">Email</label>
            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password" className="text-light">Password</label>
            <input className="form-control" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <br/>
            <button className="btn btn-warning text-dark" type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
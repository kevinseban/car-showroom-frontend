import React, { useState , useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate ,Link } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history=useNavigate();

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res=>{
                if (res.data==="exist"){
                    history("/",{state:{id:email}})
                    console.log(res.data)
                }
                else if (res.data==="notexist"){
                    alert("User have not Signed up")
                }
            })
            .catch(e=>{
                alert("Wrong details")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        document.body.classList.add("log-page");
      });

    return (
        <div className="app">
            <Header/>
            <center>
                <div className="auth-form-container log">
                    <h1 className="text-secondary">Login</h1>
                    <form className="login-form"  action="POST">
                        <label htmlFor="email" className="text-light m-1">Email</label>
                        <input className="form-control m-1" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password" className="text-light m-1">Password</label>
                        <input className="form-control m-1" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <br/>
                        <button className="btn btn-secondary" type="submit" onClick={submit}>Log In</button>
                    </form>
                    <br/>
                    <Link to="/signup">Don't have an account? Register here.</Link>
                </div>
            </center>
        </div>
    )
}
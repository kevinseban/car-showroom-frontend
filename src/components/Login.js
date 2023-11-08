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
                    history("/home",{state:{id:email}})
                    //history("/home")
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
                    <h1 className="text-warning">Login</h1>
                    <form className="login-form"  action="POST">
                        <label htmlFor="email" className="text-light">Email</label>
                        <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password" className="text-light">Password</label>
                        <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <br/>
                        <button className="btn btn-warning" type="submit" onClick={submit}>Log In</button>
                    </form>
                    <br/>
                    <Link to="/signup">Don't have an account? Register here.</Link>
                </div>
            </center>
        </div>
    )
}
/*
<button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
*/

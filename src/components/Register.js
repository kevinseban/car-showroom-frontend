import React, { useState , useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate ,Link } from "react-router-dom";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history=useNavigate();

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/signup",{
                email,password
            })
            .then(res=>{
                if (res.data==="exist"){
                    alert("User already exists")
                }
                else if (res.data==="notexist"){
                    history("/home",{state:{id:email}})
                    //history("/home")
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
        document.body.classList.add("reg-page");
      });

    return (
        <div>
            <Header/>
            <center>
                <div className="auth-form-container log">
                    <h1 className="text-secondary">Sign Up</h1>
                <form className="register-form" action="POST">
                    <label htmlFor="email" className="text-light m-1">Email</label>
                    <input className="form-control m-1" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password" className="text-light m-1">Password</label>
                    <input className="form-control m-1" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <br/>
                    <button className="btn btn-secondary text-dark" type="submit" onClick={submit}>Sign up</button>
                </form>
                <br/>
                <Link to="/">Already have an account? Login here.</Link>
            </div>
        </center>
    </div>
    )
}

/*
<button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
*/

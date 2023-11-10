import React from 'react';
import { useState } from "react";
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function Contact() {
    const[messName, setMessName] = useState("");
    const[messEmail, setMessEmail] = useState("");
    const[messPhone, setMessPhone] = useState("");
    const[messMessage, setMessMessage] = useState("");

    const collectData = async (e) => {
        e.preventDefault();
        alert("Message has been sent!");
        try {
            const response = await axios.post("http://localhost:8000/message", {
                messName,
                messEmail,
                messPhone,
                messMessage
            });
            console.log("Message sent successfully");
        } catch (error) {
            console.error("Error sending: ", error);
        }
        setMessName('');
        setMessEmail('');
        setMessPhone('');
        setMessMessage('');
    }
    return (
        <div className='parent'>
            <Header />
            <div className='content bg-dark text-white pt-2 overflow-hidden pt-xl-5 pt-lg-5'>
                <div className="row">
                    <div className='squareBox'>
                        <div className='container text-center p-5'>
                            <h1 className='display-4 pb-3'>Contact Us</h1>
                            <h2 className='h4 pb-2'>Contact Information</h2>
                            <div className="py-1"><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;+91 1234567890</div>
                            <div className="py-1"><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;<a href='mailto:' className='text-decoration-none text-white'>car360@email.com</a></div>
                            <div className="py-1"><FontAwesomeIcon icon={faAddressCard} />&nbsp;&nbsp;&nbsp;123 Main Street, City, Country</div>
                        </div>
                    </div>
                    <div className='squareBox' onSubmit={collectData}>
                        <div className='container p-2'>
                            <form>
                                <h1 className='display-4 pb-4 text-center'>Message Us</h1>
                                <div className="form-outline mb-4">
                                    <input type="text" id="formIn1" className="form-control" placeholder="Name" 
                                    value={messName}
                                    onChange={(event) => setMessName(event.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="formIn2" className="form-control" placeholder="Email address"
                                    value={messEmail}
                                    onChange={(event) => setMessEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="phone" id="formIn3" className="form-control" placeholder="Phone no."
                                    value={messPhone}
                                    onChange={(event) => setMessPhone(event.target.value)}
                                     />
                                </div>
                                <div className="form-outline mb-4">
                                    <textarea className="form-control" id="formIn4" rows="3" placeholder="Message"
                                    value={messMessage}
                                    onChange={(event) => setMessMessage(event.target.value)}>
                                    </textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-light btn-block mb-4 w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;

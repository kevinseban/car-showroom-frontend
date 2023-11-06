import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    return (
        <div>
            <Header />
            <div className='bg-dark text-white pt-2 overflow-hidden'>
                <div class="row">
                    <div className='squareBox'>
                        <div className='container text-center p-5'>
                            <h1 className='display-3 pb-3'>Contact Us</h1>
                            <h2 className='h3 pb-2'>Contact Information</h2>
                            <div className="py-1"><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;+91 1234567890</div>
                            <div className="py-1"><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;<a href='mailto:' className='text-decoration-none text-white'>car360@email.com</a></div>
                            <div className="py-1"><FontAwesomeIcon icon={faAddressCard} />&nbsp;&nbsp;&nbsp;123 Main Street, City, Country</div>
                        </div>
                    </div>
                    <div className='squareBox'>
                        <div className='container p-2'>
                            <form>
                                <h1 className='display-3 pb-4 text-center'>Message Us</h1>
                                <div class="form-outline mb-4">
                                    <input type="text" id="formIn1" class="form-control" placeholder="Name" />
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="email" id="formIn2" class="form-control" placeholder="Email address" />
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="phone" id="formIn3" class="form-control" placeholder="Phone no." />
                                </div>
                                <div class="form-outline mb-4">
                                    <textarea class="form-control" id="formIn4" rows="3" placeholder="Message"></textarea>
                                </div>
                                <button type="submit" class="btn btn-outline-light btn-block mb-4 w-100">Submit</button>
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

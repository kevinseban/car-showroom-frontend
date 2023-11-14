import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='ft'>
            <div className='footer bg-black text-white'>
                <div className='container-fuild p-3'>
                    <div className='row'>
                        <div className='col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-start gap-1 pb-2'>
                            <p className="py-1 fw-bold lead">CAR360</p>
                            <div className="py-1 text-secondary"><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;+91 1234567890</div>
                            <div className="py-1 text-secondary"><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;<a href='mailto:' className='text-decoration-none text-secondary'>car360@email.com</a></div>
                        </div>
                        <div className='col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-lg-center gap-1 pb-2'>
                            <h5>Useful Links</h5>
                            <Link to="/" className='nav-link text-secondary py-1'>Home</Link>
                            <Link to="/cars" className='nav-link text-secondary py-1'>Browse Cars</Link>
                            <Link to="/contact" className='nav-link text-secondary py-1'>Contact Us</Link>
                        </div>            
                        <div className='col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-center gap-2 pb-2 align-items-lg-end pe-4'>
                            <div className='d-flex gap-5 justify-content-center'>
                                <a href="https://www.facebook.com" target='_blank' className='text-decoration-none text-white'>
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </a>
                                <a href="https://www.twitter.com" target='_blank' className='text-decoration-none text-white'>
                                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                                </a>
                                <a href="https://www.instagram.com" target='_blank' className='text-decoration-none text-white'>
                                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (
            <div className='footer p-3 bg-black text-white'>
                <div className='container-fuild p-3'>
                    <div className='row'>
                        <div className='col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-start gap-1 pb-4'>
                            <p className="py-1 fw-bold lead">CAR360</p>
                            <div className="py-1 text-secondary"><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;+91 1234567890</div>
                            <div className="py-1 text-secondary"><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;<a href='mailto:' className='text-decoration-none text-secondary'>car360@email.com</a></div>
                        </div>
                        <div className='col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-lg-center gap-1 pb-4'>
                            <h5>Useful Links</h5>
                            <Link to="/" className='nav-link text-secondary py-1'>Home</Link>
                            <Link to="/cars" className='nav-link text-secondary py-1'>Browse Cars</Link>
                            <Link to="/contact" className='nav-link text-secondary py-1'>Contact Us</Link>
                        </div>            
                        <div className='col-lg-4 col-md-12 d-flex flex-column justify-content-center align-items-start gap-2 pb-4 align-items-lg-end pe-4'>
                            <h5 style={{paddingRight:60}}>Subscribe</h5>
                            <form className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                <input className='form-control py-1' placeholder='Your email' type='email' />
                                <button className='btn btn-primary w-100 py-1' type='submit'>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Footer;

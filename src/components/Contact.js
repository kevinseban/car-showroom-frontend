import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Contact() {
    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h1>Contact Us</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Contact Information</h2>
                        <p>Phone: +1-123-456-7890</p>
                        <p>Email: contact@carhub.com</p>
                        <p>Address: 123 Main Street, City, Country</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Contact;

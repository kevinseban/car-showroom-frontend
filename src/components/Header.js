import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Logged out")
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black d-flex">
      <div className="container-fluid px-4 py-1 m-0">
        <Link to="/" className="navbar-brand fw-bold">CAR360</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/cars" className="nav-link">Browse Cars</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </li>
          </ul>
          <ul className='ms-auto navbar-nav'>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link"><FontAwesomeIcon icon={faUser}/></Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
            <li className="nav-item ">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

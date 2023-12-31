import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function AdminHeader() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    console.log("Logged out")
    navigate('/admin/login');
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
              <Link to="/admin" className="nav-link">Add Car</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/AllCars" className="nav-link">View all Cars</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/messages" className="nav-link">View all Messages</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/bookings" className="nav-link">View all Bookings</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/viewUsers" className="nav-link">View all Users</Link>
            </li>
          </ul>
          <ul className='ms-auto navbar-nav'>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/admin/profile" className="nav-link"><FontAwesomeIcon icon={faUser}/></Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/login" className="nav-link" onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item">
                <Link to="/admin/login" className="nav-link">Admin Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">User Login</Link>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;

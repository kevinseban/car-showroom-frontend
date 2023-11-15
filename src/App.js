import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import { Login } from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import EditCar from './components/EditCar';
import AllCars from './components/AllCars';
import Ebooking from './components/Ebooking';
import { AdminLogin } from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import AdminMessages from './components/AdminMessages';
import AdminBookings from './components/AdminBookings';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="" element={<Home />} />
        <Route path="cars" element={<CarList />} />
        <Route path="car/:id" element={<CarDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="booking" element={<Ebooking />} />
        <Route path="admin" element={<AdminPanel/>}/>
        <Route path="admin/login" element={<AdminLogin/>}/>
        <Route path="admin/profile" element={<AdminProfile/>}/>
        <Route path='admin/car/:id' element={<EditCar />} />
        <Route path='admin/allCars' element={<AllCars />} />
        <Route path='admin/messages' element={<AdminMessages />} />
        <Route path='admin/bookings' element={<AdminBookings/>}/>
      </Routes>
    </Router>
  );
}

export default App;

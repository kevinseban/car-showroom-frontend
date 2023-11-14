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
        <Route path='/admin/car/:id' element={<EditCar />} />
        <Route path='/admin/allCars' element={<AllCars />} />
        <Route path="booking-Page" element={<Ebooking />} />
      </Routes>
    </Router>
  );
}

export default App;

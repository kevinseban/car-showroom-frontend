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

function App() {

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="" element={<Home />} />
        <Route path="cars" element={<CarList />} />
        <Route path="car/:id" element={<CarDetail />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

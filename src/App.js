import React from 'react';
import { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cars" element={<CarList />} />
        <Route path="car/:id" element={<CarDetail />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

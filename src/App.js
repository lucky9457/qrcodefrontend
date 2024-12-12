import { useState } from 'react'
import axios from 'axios';
import './App.css'
import QRCodeGenerator from './components/Main/Main'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Logins/Register';
import Login from './components/Logins/Login';
import ProtectedRoute from './components/ProtectedRoute';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL; // Set the base URL from your environment variable

function App() {
  return (
    <div className='main'>
      <Router>
        <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

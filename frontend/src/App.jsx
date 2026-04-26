import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage />} />
          {/* Legacy path support */}
          <Route path="/doctors" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

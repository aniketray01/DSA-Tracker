import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = location.pathname !== '/login' && location.pathname !== '/';
  
  if (!isAuth) return null;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Dashboard</div>
      <div className="navbar-links">
        <Link to="/profile" style={{ fontWeight: location.pathname === '/profile' ? 'bold' : 'normal' }}>Profile</Link>
        <Link to="/topics" style={{ fontWeight: location.pathname === '/topics' ? 'bold' : 'normal' }}>Topics</Link>
        <Link to="/progress" style={{ fontWeight: location.pathname === '/progress' ? 'bold' : 'normal' }}>Progress</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

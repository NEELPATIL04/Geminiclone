import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from '../../axiosConfig';
import './Auth.css';
import Popup from './Popup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(Context);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      setUser(response.data.user);
      setShowPopup(true);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/'); // Navigate to home page after closing popup
  };

  return (
    <div className="auth-container">
      <header className="header">
        <div className="logo">Gemini</div>
        <nav className="nav-links">
          <a href="#">Try Gemini Advanced</a>
          <a href="#">For business</a>
          <a href="#">FAQ</a>
        </nav>
      </header>
      
      <div className="auth-content">
        <h1 className="auth-title">Create your Gemini account</h1>
        <p className="auth-subtitle">Supercharge your creativity and productivity</p>
        
        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Full name" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email address" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Create a password" 
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-button">Create account</button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
      
      <footer className="footer">
        <span>Google</span>
        <a href="#" className="auth-link">Privacy & Terms</a>
      </footer>

      {showPopup && (
        <Popup 
          message="Account created successfully! Welcome to Gemini." 
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Signup;
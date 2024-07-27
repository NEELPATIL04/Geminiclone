import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'An error occurred during login');
    }
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
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Use your Gemini Account</p>
        
        <form onSubmit={handleLogin} className="auth-form">
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
              placeholder="Enter your password" 
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-button">Sign in</button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Create account</Link>
        </div>
      </div>
      
      <footer className="footer">
        <span>Google</span>
        <a href="#" className="auth-link">Privacy & Terms</a>
      </footer>
    </div>
  );
};

export default Login;

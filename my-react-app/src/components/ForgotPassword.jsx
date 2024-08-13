import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="fp">
      <div className="fp-container">
        <div className="logo">
          <img
            src="https://github.com/Neeladas03/Lynk2/blob/main/Lynk2/public/Logo1-removebg-preview1.png?raw=true"
            alt="Lynk Logo"
          />
          <h4>Lynk</h4>
        </div>
        
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p className="back-login">
          <a href="/">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
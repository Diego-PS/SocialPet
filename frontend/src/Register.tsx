import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login-register.css';

const Register: React.FC = () => {
  useEffect(() => {
    document.body.className = 'login'; // Adicione a classe 'page1' ao body
    return () => {
      document.body.className = ''; // Remova a classe quando o componente for desmontado
    };
  }, []);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Password and Confirm Password must match.');
      return; 
    }
  
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  
    // You can make an API request to register the user here
  };
  

  return (
    <div className="login-form">
      
      <p className="welcome">welcome,</p>

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e-mail"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <button type="submit">register</button>
      </form>

      <div className="register">
        <p>already have an account?</p>
        <Link to="/Login" className="link">login</Link>
      </div>
    </div>
  );
};

export default Register;

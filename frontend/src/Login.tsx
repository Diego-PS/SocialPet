import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login-register.css';

const Login: React.FC = () => {
  useEffect(() => {
    document.body.className = 'login'; // Adicione a classe 'page1' ao body
    return () => {
      document.body.className = ''; // Remova a classe quando o componente for desmontado
    };
  }, []);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., API request)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-form">
      
      <div className="welcome-back">
        <p>welcome</p>
        <p>back,</p>
      </div>

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
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit">login</button>
      </form>

      <div className="register">
        <p>don't have an account yet?</p>
        <Link to="/Register" className="link">sign up</Link>
      </div>
    </div>
  );
};

export default Login;

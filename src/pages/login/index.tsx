import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  login: () => void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login();
    // Redirigir a /products después del login
    navigate('/products');
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
   
        <button className="login-button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;

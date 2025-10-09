import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);

      if (res.data.user.role === 'admin') navigate('/admin-dashboard');
      else if (res.data.user.role === 'organisateur') navigate('/organisateur-dashboard');
      else navigate('/events');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur login');
    }
  };

  return (
    <div className="login-page">
      <section className={`login-wrapper ${active ? 'active' : ''}`}>
        <div className="login-form login-signup">
          <header onClick={() => setActive(false)}>Signup</header>
          <form>
            <input type="text" placeholder="Full name" required />
            <input type="text" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />
            <div className="login-checkbox">
              <input type="checkbox" id="signupCheck" />
              <label htmlFor="signupCheck">I accept all terms & conditions</label>
            </div>
            <input type="submit" value="Signup" />
          </form>
        </div>

        <div className="login-form login">
          <header onClick={() => setActive(true)}>Login</header>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <a href="#">Forgot password?</a>
            <input type="submit" value="Login" />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;

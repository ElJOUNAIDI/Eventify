import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import '../styles/Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <section className="login-wrapper active">
        <div className="login-form login">
          <header>Connexion</header>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <a href="#">Mot de passe oublié ?</a>
            <input type="submit" value="Se connecter" />
          </form>

          <p className="switch-form">
            Pas encore de compte ?{' '}
            <span onClick={() => navigate('/register')}>S’inscrire</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;

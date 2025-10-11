import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import '../styles/Login.css'; // ✅ même style que le login

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password, password_confirmation });
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur inscription');
    }
  };

  return (
    <div className="login-page">
      <section className="login-wrapper active">
        <div className="login-form login-signup">
          <header>Inscription</header>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
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
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={password_confirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              required
            />
            <input type="submit" value="S’inscrire" />
          </form>

          <p className="switch-form">
            Déjà un compte ?{' '}
            <span onClick={() => navigate('/login')}>Se connecter</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;

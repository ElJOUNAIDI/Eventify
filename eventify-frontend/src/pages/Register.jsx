import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [password_confirmation,setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password, password_confirmation });
      alert('Inscription réussie, connectez-vous !');
      navigate('/login');
    } catch(err) {
      alert(err.response?.data?.message || 'Erreur inscription');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
        <input type="password" placeholder="Confirmer mot de passe" value={password_confirmation} onChange={e=>setPasswordConfirmation(e.target.value)} />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;

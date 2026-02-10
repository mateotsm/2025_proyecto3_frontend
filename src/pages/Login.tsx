import { useState } from 'react';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [nombre, setUsername] = useState('');
  const [contrasena, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { access_token } = await login(nombre, contrasena);
      localStorage.setItem('token', access_token);
      navigate('/reclamos/nuevo');
    } catch (err) {
      alert('Usuario o contraseña incorrectos');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Usuario"
        value={nombre}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}

import { parseJwt } from '../utils/jwt';

export default function Header() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  const { nombre } = parseJwt(token);

  return (
    <header>
      <span>Usuario: {nombre}</span>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </header>
  );
}

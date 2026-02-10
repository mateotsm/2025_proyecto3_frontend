import { API_BASE_URL } from '../config/api';

interface LoginResponse {
  access_token: string;
}

export async function login(
  nombre: string,
  contrasena: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, contrasena }),
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return res.json();
}

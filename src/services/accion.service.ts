import { authFetch } from './authFetch';
import { API_BASE_URL } from '../config/api';

interface CreateAccionDto {
  reclamoId: string;
  areaDestinoId: string;
  responsableId: string;
  estadoNuevoId: string;
  descripcion: string;
}

export async function createAccion(data: CreateAccionDto) {
  const res = await authFetch(`${API_BASE_URL}/accion`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al crear acción');
  }

  return res.json();
}

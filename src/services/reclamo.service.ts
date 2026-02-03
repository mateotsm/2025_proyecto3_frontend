import { API_BASE_URL } from '../config/api';

export interface Reclamo {
  descripcion: string;
  proyectoId: string;
  tipoReclamoId: string;
  prioridadId: string;
  nivelCriticidadId: string;
  estadoId: string;
}

export async function crearReclamo(data: Reclamo) {
  const response = await fetch(`${API_BASE_URL}/reclamo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

export async function getReclamos(): Promise<Reclamo[]> {
  const response = await fetch(`${API_BASE_URL}/reclamo`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

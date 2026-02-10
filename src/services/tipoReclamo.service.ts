import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';
import { authFetch } from './authFetch';

export async function getTiposReclamo(): Promise<BaseEntity[]> {
  const res = await authFetch(`${API_BASE_URL}/tipo-reclamo`);
  if (!res.ok) {
    throw new Error('Error al cargar tipos de reclamo');
  }
  return res.json();
}
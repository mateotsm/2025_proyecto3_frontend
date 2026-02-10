import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';
import { authFetch } from './authFetch';

export async function getPrioridades(): Promise<BaseEntity[]> {
  const res = await authFetch(`${API_BASE_URL}/prioridad`);
  if (!res.ok) throw new Error('Error al cargar prioridades');
  return res.json();
}
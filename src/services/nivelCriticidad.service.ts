import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';
import { authFetch } from './authFetch';

export async function getNivelesCriticidad(): Promise<BaseEntity[]> {
  const res = await authFetch(`${API_BASE_URL}/nivel-criticidad`);
  if (!res.ok) throw new Error('Error al cargar niveles de criticidad');
  return res.json();
}
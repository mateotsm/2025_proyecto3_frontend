import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';

export async function getNivelesCriticidad(): Promise<BaseEntity[]> {
  const res = await fetch(`${API_BASE_URL}/nivelCriticidad`);
  if (!res.ok) throw new Error('Error al cargar niveles de criticidad');
  return res.json();
}
import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';

export async function getEstados(): Promise<BaseEntity[]> {
  const res = await fetch(`${API_BASE_URL}/estado`);
  if (!res.ok) throw new Error('Error al cargar prioridades');
  return res.json();
}
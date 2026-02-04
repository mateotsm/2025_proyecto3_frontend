import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';

export async function getAreas(): Promise<BaseEntity[]> {
  const res = await fetch(`${API_BASE_URL}/area`);
  if (!res.ok) throw new Error('Error al cargar areas');
  return res.json();
}

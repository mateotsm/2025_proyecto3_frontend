import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';

export async function getPrioridades(): Promise<BaseEntity[]> {
  const res = await fetch(`${API_BASE_URL}/prioridad`);
  if (!res.ok) throw new Error('Error al cargar prioridades');
  return res.json();
}
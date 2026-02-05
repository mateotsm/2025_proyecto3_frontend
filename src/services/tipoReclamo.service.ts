import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';

export async function getTiposReclamo(): Promise<BaseEntity[]> {
  const res = await fetch(`${API_BASE_URL}/tipo-reclamo`);
  if (!res.ok) {
    throw new Error('Error al cargar tipos de reclamo');
  }
  return res.json();
}
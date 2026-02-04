import { API_BASE_URL } from '../config/api';
import type { BaseEntity } from '../types/common';

export async function getProyectos(): Promise<BaseEntity[]> {
  const res = await fetch(`${API_BASE_URL}/proyecto`);
  if (!res.ok) throw new Error('Error al cargar proyectos');
  return res.json();
}
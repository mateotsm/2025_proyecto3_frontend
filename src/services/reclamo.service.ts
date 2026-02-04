import { API_BASE_URL } from '../config/api';

export interface Reclamo {
  descripcion: string;
  proyectoId: string;
  tipoReclamoId: string;
  prioridadId: string;
  nivelCriticidadId: string;
  estadoId: string;
  areaId: string;
}

export async function crearReclamo(
  data: Reclamo,
  archivos?: FileList | null,
  imagenes?: FileList | null,
) {
  const formData = new FormData();

  // DTO
  formData.append('descripcion', data.descripcion);
  formData.append('proyectoId', data.proyectoId);
  formData.append('tipoReclamoId', data.tipoReclamoId);
  formData.append('prioridadId', data.prioridadId);
  formData.append('nivelCriticidadId', data.nivelCriticidadId);
  formData.append('estadoId', data.estadoId);
  formData.append('areaId', data.areaId);

  // Archivos
  if (archivos) {
    Array.from(archivos).forEach((file) => {
      formData.append('archivos', file);
    });
  }

  if (imagenes) {
    Array.from(imagenes).forEach((file) => {
      formData.append('imagenes', file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/reclamo`, {
    method: 'POST',
    body: formData, // 👈 SIN headers
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

import { useEffect, useState } from 'react';
import { crearReclamo } from '../services/reclamo.service';
import  { getPrioridades } from '../services/prioridad.service'
import { getAreas } from '../services/area.service';
import type { BaseEntity } from '../types/common';

export function ReclamoCreate() {
  const [descripcion, setDescripcion] = useState('');
  const [prioridades, setPrioridades] = useState<BaseEntity[]>([]);
  const [prioridadId, setPrioridadId] = useState('');
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [areaId, setAreaId] = useState('');
  const [areas, setAreas] = useState<BaseEntity[]>([]);

  useEffect(() => {
    getPrioridades()
      .then(setPrioridades)
      .catch(console.error);

    getAreas()
      .then(setAreas)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Crear Reclamo</h2>

      {/* DESCRIPCIÓN */}
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      {/* SELECT PRIORIDAD */}
      <select
        value={prioridadId}
        onChange={e => setPrioridadId(e.target.value)}
      >
        <option value="">Seleccione prioridad</option>
        {prioridades.map(p => (
          <option key={p._id} value={p._id}>
            {p.nombre}
          </option>
        ))}
      </select>

      {/* SELECT AREA */}
      <select
        value={areaId}
        onChange={e => setAreaId(e.target.value)}
      >
        <option value="">Seleccione area</option>
        {areas.map(a => (
          <option key={a._id} value={a._id}>
            {a.nombre}
          </option>
        ))}
      </select>
      
      {/* ARCHIVOS */}
      <input
        type="file"
        multiple
        onChange={e => setArchivos(e.target.files)}
      />

      {/* IMÁGENES */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={e => setImagenes(e.target.files)}
      />

      {/* BOTÓN GUARDAR */}
      <button
        onClick={async () => {
          if (!descripcion || !prioridadId || !areaId) {
            alert('Complete todos los campos');
            return;
          }

          try {
            await crearReclamo(
              {
                descripcion,
                prioridadId,
                areaId,
                proyectoId: 'HARDCODE_TEMP',
                tipoReclamoId: 'HARDCODE_TEMP',
                nivelCriticidadId: 'HARDCODE_TEMP',
                estadoId: 'HARDCODE_TEMP',
              },
              archivos,
              imagenes,
            );

            alert('Reclamo creado');
          } catch (e: any) {
            alert(e.message);
          }
        }}
      >
        Guardar
      </button>
    </div>
  );
}
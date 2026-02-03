import { useEffect, useState } from 'react';
import { crearReclamo } from '../services/reclamo.service';
import  { getPrioridades } from '../services/prioridad.service'
import type { BaseEntity } from '../types/common';

export function ReclamoCreate() {
  const [descripcion, setDescripcion] = useState('');

  const [prioridades, setPrioridades] = useState<BaseEntity[]>([]);
  const [prioridadId, setPrioridadId] = useState('');

  useEffect(() => {
    getPrioridades()
      .then(setPrioridades)
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

      {/* BOTÓN GUARDAR */}
      <button
        onClick={async () => {
          if (!descripcion || !prioridadId) {
            alert('Complete todos los campos');
            return;
          }

          try {
            await crearReclamo({
              descripcion,
              prioridadId,
              proyectoId: 'HARDCODE_TEMP',
              tipoReclamoId: 'HARDCODE_TEMP',
              nivelCriticidadId: 'HARDCODE_TEMP',
              estadoId: 'HARDCODE_TEMP',
            });

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
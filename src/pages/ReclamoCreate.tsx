import { useState } from 'react';
import { crearReclamo } from '../services/reclamo.service';

export function ReclamoCreate() {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await crearReclamo({
        descripcion,
        proyectoId: 'ID_DE_PROYECTO',
        tipoReclamoId: 'ID_TIPO_RECLAMO',
        prioridadId: 'ID_PRIORIDAD',
        nivelCriticidadId: 'ID_NIVEL',
        estadoId: 'ID_ESTADO',
      });

      alert('Reclamo creado');
      setDescripcion('');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Reclamo</h2>

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        required
      />

      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}

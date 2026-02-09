import { useEffect, useState } from 'react';
import { crearReclamo } from '../services/reclamo.service';
import  { getPrioridades } from '../services/prioridad.service'
import { getAreas } from '../services/area.service';
import { getTiposReclamo } from '../services/tipoReclamo.service';
import { getNivelesCriticidad } from '../services/nivelCriticidad.service';
import { getProyectos } from '../services/proyecto.service';
import type { BaseEntity } from '../types/common';

export function ReclamoCreate() {
  const [descripcion, setDescripcion] = useState('');
  const [prioridades, setPrioridades] = useState<BaseEntity[]>([]);
  const [prioridadId, setPrioridadId] = useState('');
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [areaId, setAreaId] = useState('');
  const [areas, setAreas] = useState<BaseEntity[]>([]);
  const [tiposReclamo, setTiposReclamo] = useState<BaseEntity[]>([]);
  const [tipoReclamoId, setTipoReclamoId] = useState('');
  const [nivelesCriticidad, setNivelesCriticidad] = useState<BaseEntity[]>([]);
  const [nivelCriticidadId, setNivelCriticidadId] = useState('');
  const [proyectos, setProyectos] = useState<BaseEntity[]>([]);
  const [proyectoId, setProyectoId] = useState('');

  useEffect(() => {
    getPrioridades()
      .then(setPrioridades)
      .catch(console.error);

    getAreas()
      .then(setAreas)
      .catch(console.error);
    
    getTiposReclamo()
      .then(setTiposReclamo)
      .catch(console.error);
    
    getNivelesCriticidad()
      .then(setNivelesCriticidad)
      .catch(console.error);

    getProyectos()
      .then(setProyectos)
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
      
      {/* SELECT TIPO RECLAMO */}
      <select
        value={tipoReclamoId}
        onChange={e => setTipoReclamoId(e.target.value)}
      >
        <option value="">Seleccione tipo reclamo</option>
        {tiposReclamo.map(tr => (
          <option key={tr._id} value={tr._id}>
            {tr.nombre}
          </option>
        ))}
      </select>

      {/* SELECT NIVEL CRITICIDAD */}
      <select
        value={nivelCriticidadId}
        onChange={e => setNivelCriticidadId(e.target.value)}
      >
        <option value="">Seleccione criticidad</option>
        {nivelesCriticidad.map(nc => (
          <option key={nc._id} value={nc._id}>
            {nc.nombre}
          </option>
        ))}
      </select>

      {/* SELECT PROYECTO */}
      <select
        value={proyectoId}
        onChange={e => setProyectoId(e.target.value)}
      >
        <option value="">Seleccione proyecto</option>
        {proyectos.map(p => (
          <option key={p._id} value={p._id}>
            {p.nombre}
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
          if (!descripcion || 
            !prioridadId || 
            !areaId || 
            !tipoReclamoId || 
            !nivelCriticidadId || 
            !proyectoId
          ) {
            alert('Complete todos los campos');
            return;
          }

          try {
            await crearReclamo(
              {
                descripcion,
                prioridadId,
                areaId,
                tipoReclamoId,
                nivelCriticidadId,
                proyectoId,
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
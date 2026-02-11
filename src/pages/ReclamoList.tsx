import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../services/authFetch';
import { API_BASE_URL } from '../config/api';

interface Reclamo {
  _id: string;
  descripcion: string;
  estadoId?: { nombre: string };
  proyectoId?: { nombre: string };
}

export default function ReclamoList() {
  const [reclamos, setReclamos] = useState<Reclamo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReclamos() {
      try {
        const res = await authFetch(`${API_BASE_URL}/reclamo`);
        const data = await res.json();
        setReclamos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReclamos();
  }, []);

  if (loading) return <p>Cargando reclamos...</p>;

  return (
    <div>
      <h2>Listado de Reclamos</h2>

      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Proyecto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reclamos.map(r => (
            <tr key={r._id}>
              <td>{r.descripcion}</td>
              <td>{r.proyectoId?.nombre ?? '-'}</td>
              <td>{r.estadoId?.nombre ?? '-'}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/reclamos/${r._id}/acciones`)
                  }
                >
                  Registrar acción
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

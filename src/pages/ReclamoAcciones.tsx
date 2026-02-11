import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authFetch } from '../services/authFetch'
import { API_BASE_URL } from '../config/api'

interface Area {
  _id: string
  nombre: string
}

interface Usuario {
  _id: string
  nombre: string
}

interface Estado {
  _id: string
  nombre: string
}

interface Accion {
  _id: string
  descripcion: string
  areaDestinoId: Area
  responsableId: Usuario
  estadoNuevoId: Estado
  createdAt: string
}

export default function ReclamoAcciones() {
  const { id } = useParams()

  const [areas, setAreas] = useState<Area[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [estados, setEstados] = useState<Estado[]>([])

  const [form, setForm] = useState({
    areaDestinoId: '',
    responsableId: '',
    estadoNuevoId: '',
    descripcion: '',
  })

  const [loading, setLoading] = useState(true)
  const [acciones, setAcciones] = useState<Accion[]>([])

  useEffect(() => {
    cargarCombos()
    cargarAcciones()
  }, [])

  async function cargarCombos() {
    try {
      const [areasRes, usuariosRes, estadosRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/area`),
        authFetch(`${API_BASE_URL}/usuario`),
        authFetch(`${API_BASE_URL}/estado`)
      ])

      setAreas(await areasRes.json())
      setUsuarios(await usuariosRes.json())
      setEstados(await estadosRes.json())

    } catch (error) {
      console.error('Error cargando combos', error)
    } finally {
      setLoading(false)
    }
  }

  async function cargarAcciones() {
    if (!id) return

    try {
      const res = await authFetch(`${API_BASE_URL}/accion/reclamo/${id}`)
      const data = await res.json()
      setAcciones(data)
    } catch (error) {
      console.error('Error cargando acciones', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!id) return

    await authFetch(`${API_BASE_URL}/accion`, {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        reclamoId: id
      })
    })

    await cargarAcciones()

    setForm({
      areaDestinoId: '',
      responsableId: '',
      estadoNuevoId: '',
      descripcion: '',
    })

    alert('Acción creada correctamente')
  }

  if (loading) return <p>Cargando datos...</p>

  return (
    <div>
      <h2>Registrar Acción</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Área destino</label>
          <select
            value={form.areaDestinoId}
            onChange={e =>
              setForm({ ...form, areaDestinoId: e.target.value })
            }
            required
          >
            <option value="">Seleccione área</option>
            {areas.map(area => (
              <option key={area._id} value={area._id}>
                {area.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Responsable</label>
          <select
            value={form.responsableId}
            onChange={e =>
              setForm({ ...form, responsableId: e.target.value })
            }
            required
          >
            <option value="">Seleccione responsable</option>
            {usuarios.map(usuario => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Nuevo estado</label>
          <select
            value={form.estadoNuevoId}
            onChange={e =>
              setForm({ ...form, estadoNuevoId: e.target.value })
            }
            required
          >
            <option value="">Seleccione estado</option>
            {estados.map(estado => (
              <option key={estado._id} value={estado._id}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={e =>
              setForm({ ...form, descripcion: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">Guardar Acción</button>
      </form>

      <h3>Historial de acciones</h3>

      {acciones.length === 0 ? (
        <p>No hay acciones registradas.</p>
      ) : (
        <ul>
          {acciones.map(accion => (
            <li key={accion._id} style={{ marginBottom: '10px' }}>
                <strong>{accion.estadoNuevoId?.nombre}</strong> —{' '}
                {accion.descripcion}
                <br />
                Área destino: {accion.areaDestinoId?.nombre}
                <br />
                Responsable: {accion.responsableId?.nombre}
                <br />
                Fecha: {new Date(accion.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

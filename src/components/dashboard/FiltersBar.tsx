import { useState } from 'react'

interface Filters {
  from?: string
  to?: string
  clienteId?: string
  proyectoId?: string
  estadoId?: string
}

interface Props {
  onChange: (filters: Filters) => void
}

export default function FiltersBar({ onChange }: Props) {
  const [filters, setFilters] = useState<Filters>({})

  const update = (key: keyof Filters, value: string) => {
    const updated = { ...filters, [key]: value || undefined }
    setFilters(updated)
    onChange(updated)
  }

  return (
    <div className="bg-white p-4 rounded shadow flex flex-wrap gap-3">

      <input
        type="date"
        className="border p-2 rounded"
        onChange={e => update('from', e.target.value)}
      />

      <input
        type="date"
        className="border p-2 rounded"
        onChange={e => update('to', e.target.value)}
      />

      <select
        className="border p-2 rounded"
        onChange={e => update('clienteId', e.target.value)}
      >
        <option value="">Cliente</option>
        {/* cargar dinámicamente */}
      </select>

      <select
        className="border p-2 rounded"
        onChange={e => update('proyectoId', e.target.value)}
      >
        <option value="">Proyecto</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={e => update('estadoId', e.target.value)}
      >
        <option value="">Estado</option>
      </select>

    </div>
  )
}

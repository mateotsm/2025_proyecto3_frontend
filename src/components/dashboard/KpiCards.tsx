import type { KpisResponse } from '../../types/stats.types'

interface Props {
  data: KpisResponse
}

export default function KpiCards({ data }: Props) {
  const cards = [
    { label: 'Total', value: data.total },
    { label: 'Abiertos', value: data.abiertos },
    { label: 'En proceso', value: data.enProceso },
    { label: 'Cerrados', value: data.cerrados },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  )
}

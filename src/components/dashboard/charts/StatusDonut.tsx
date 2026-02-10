import { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { StatsService } from '../../../services/stats.service'

interface Item {
  _id: string
  total: number
}

const COLORS = ['#fbbf24', '#60a5fa', '#22c55e', '#ef4444']

export default function StatusDonut({ filters }: { filters: any }) {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    StatsService.getByStatus(filters).then(res => setData(res.data))
  }, [filters])

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Estado de Reclamos</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="_id"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

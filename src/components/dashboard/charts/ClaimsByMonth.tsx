import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { StatsService } from '../../../services/stats.service'

interface Item {
  _id: { year: number; month: number }
  total: number
}

export default function ClaimsByMonth({ filters }: { filters: any }) {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    StatsService.getMonthly(filters).then(res => setData(res.data))
  }, [filters])

  const chartData = data.map(d => ({
    name: `${d._id.month}/${d._id.year}`,
    total: d.total,
  }))

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Reclamos por Mes</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="total" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

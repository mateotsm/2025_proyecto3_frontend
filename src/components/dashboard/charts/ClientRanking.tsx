import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { StatsService } from '../../../services/stats.service'

interface Item {
  _id: string
  total: number
}

export default function ClientRanking({ filters }: { filters: any }) {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    StatsService.getClientRanking(filters).then(res => setData(res.data))
  }, [filters])

  const chartData = data.map(d => ({
    name: d._id,
    total: d.total,
  }))

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Ranking de Clientes</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

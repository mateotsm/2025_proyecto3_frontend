import { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts'
import { StatsService } from '../../../services/stats.service'

interface Item {
  _id: string
  total: number
}

export default function CommonTypesPie({ filters }: { filters: any }) {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    StatsService.getCommonTypes(filters).then(res => setData(res.data))
  }, [filters])

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Tipos más comunes</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="_id" label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

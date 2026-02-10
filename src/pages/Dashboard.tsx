import { useEffect, useState } from 'react'
import FiltersBar from '../components/dashboard/FiltersBar'
import KpiCards from '../components/dashboard/KpiCards'
import ClaimsByMonth from '../components/dashboard/charts/ClaimsByMonth'
import StatusDonut from '../components/dashboard/charts/StatusDonut'
import WorkloadBar from '../components/dashboard/charts/WorkloadBar'
import CommonTypesPie from '../components/dashboard/charts/CommonTypesPie'
import ClientRanking from '../components/dashboard/charts/ClientRanking'

import { StatsService } from '../services/stats.service'
import type { KpisResponse, DashboardFilters } from '../types/stats.types'

export default function Dashboard() {
  const [kpis, setKpis] = useState<KpisResponse | null>(null)
  const [filters, setFilters] = useState<DashboardFilters>({})

  useEffect(() => {
    StatsService.getOverview(filters).then(response => {
      setKpis(response.data)
    })
  }, [filters])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Dashboard Reclamos</h1>

      <FiltersBar onChange={setFilters} />

      {kpis && <KpiCards data={kpis} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClaimsByMonth filters={filters} />
        <StatusDonut filters={filters} />
        <WorkloadBar filters={filters} />
        <CommonTypesPie filters={filters} />
        <ClientRanking filters={filters} />
      </div>
    </div>
  )
}

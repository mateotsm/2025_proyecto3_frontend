import { api } from './api'
import type { DashboardFilters } from '../types/stats.types'

export class StatsService {

  static getOverview(filters?: DashboardFilters) {
    return api.get('/stats/overview', { params: filters })
  }

  /** Total de reclamos por mes */
  static getMonthly(filters?: DashboardFilters) {
    return api.get('/stats/by-month', { params: filters })
  }

  /** En curso vs resueltos */
  static getByStatus(filters?: DashboardFilters) {
    return api.get('/stats/status', { params: filters })
  }

  /** Carga laboral por área */
  static getByArea(filters?: DashboardFilters) {
    return api.get('/stats/workload', { params: filters })
  }

  /** Tipos de reclamos más frecuentes */
  static getCommonTypes(filters?: DashboardFilters) {
    return api.get('/stats/common-types', { params: filters })
  }

  /** Ranking de clientes */
  static getClientRanking(filters?: DashboardFilters) {
    return api.get('/stats/by-client', { params: filters })
  }

}

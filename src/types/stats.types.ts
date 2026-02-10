export interface KpisResponse {
  total: number
  abiertos: number
  cerrados: number
  enProceso: number
}

export interface ClaimsByMonth {
  _id: { year: number; month: number }
  total: number
}

export interface StatusCount {
  _id: string
  total: number
}

export interface Workload {
  _id: string
  total: number
}

export interface CommonType {
  _id: string
  total: number
}

export interface ClientRanking {
  _id: string
  total: number
}

export interface DashboardFilters {
  from?: string
  to?: string
  clienteId?: string
  proyectoId?: string
  estadoId?: string
}

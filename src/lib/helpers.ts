import type { RiskLevel, RecommendationStatus } from './types'

export function getRiskColor(level: RiskLevel): string {
  const colors = {
    critical: 'text-risk-critical bg-risk-critical/10 border-risk-critical/30',
    high: 'text-risk-high bg-risk-high/10 border-risk-high/30',
    moderate: 'text-risk-moderate bg-risk-moderate/10 border-risk-moderate/30',
    low: 'text-risk-low bg-risk-low/10 border-risk-low/30'
  }
  return colors[level]
}

export function getRiskBadgeColor(level: RiskLevel): string {
  const colors = {
    critical: 'bg-risk-critical text-white',
    high: 'bg-risk-high text-white',
    moderate: 'bg-risk-moderate text-foreground',
    low: 'bg-risk-low text-white'
  }
  return colors[level]
}

export function getStatusColor(status: RecommendationStatus): string {
  const colors = {
    open: 'bg-secondary text-secondary-foreground',
    'in-progress': 'bg-accent text-accent-foreground',
    complete: 'bg-risk-low text-white',
    deferred: 'bg-muted text-muted-foreground',
    overdue: 'bg-risk-critical text-white'
  }
  return colors[status]
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function isOverdue(dueDate: string, status: RecommendationStatus): boolean {
  if (status === 'complete') return false
  return new Date(dueDate) < new Date()
}

export function calculateDaysUntilDue(dueDate: string): number {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getRiskScore(level: RiskLevel, count: number): number {
  const weights = {
    critical: 100,
    high: 50,
    moderate: 20,
    low: 5
  }
  return weights[level] * count
}

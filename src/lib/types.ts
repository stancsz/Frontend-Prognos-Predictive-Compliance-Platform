export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low'

export type RecommendationStatus = 'open' | 'in-progress' | 'complete' | 'deferred' | 'overdue'

export type MOCStatus = 'draft' | 'pending-review' | 'approved' | 'rejected' | 'implemented'

export interface Facility {
  id: string
  name: string
  location: string
  riskScore: number
  riskLevel: RiskLevel
  openRecommendations: number
  overdueRecommendations: number
  lastPHADate: string
  activeMOCs: number
}

export interface Recommendation {
  id: string
  facilityId: string
  facilityName: string
  title: string
  description: string
  source: string
  riskLevel: RiskLevel
  status: RecommendationStatus
  assignee: string
  dueDate: string
  createdDate: string
  completedDate?: string
  equipmentTag?: string
}

export interface PHA {
  id: string
  facilityId: string
  facilityName: string
  studyName: string
  equipmentUnit: string
  studyType: string
  completedDate: string
  nextReviewDate: string
  scenarioCount: number
  recommendationCount: number
  teamLead: string
}

export interface MOC {
  id: string
  facilityId: string
  facilityName: string
  title: string
  description: string
  initiator: string
  status: MOCStatus
  submittedDate: string
  impactedPHAs: number
  approvers: string[]
  currentApprover?: string
}

export interface IncidentTrend {
  month: string
  incidents: number
  nearmisses: number
}

export interface RiskTrend {
  date: string
  critical: number
  high: number
  moderate: number
  low: number
}

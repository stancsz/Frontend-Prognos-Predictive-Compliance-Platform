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

export type ComplianceStandardType = 'regulatory' | 'custom'

export interface ComplianceStandard {
  id: string
  name: string
  type: ComplianceStandardType
  description: string
  uploadedDate?: string
  uploadedBy?: string
  organizationId?: string
  clauseCount?: number
}

export type FindingStatus = 'pending' | 'accepted' | 'dismissed'

export interface ComplianceFinding {
  id: string
  violation: string
  standardSource: string
  standardClause: string
  evidenceSnippet: string
  recommendation: string
  actionPlan: string[]
  status: FindingStatus
  dismissReason?: string
  editedRecommendation?: string
  editedActionPlan?: string[]
}

export interface ComplianceAnalysis {
  id: string
  documentName: string
  documentType: string
  uploadedDate: string
  analyzedDate?: string
  selectedStandards: string[]
  findings: ComplianceFinding[]
  status: 'uploading' | 'analyzing' | 'complete' | 'error'
  errorMessage?: string
}

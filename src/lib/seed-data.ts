import type { Facility, Recommendation, PHA, MOC, IncidentTrend, RiskTrend } from './types'

export const sampleFacilities: Facility[] = [
  {
    id: 'fac-001',
    name: 'Houston Refinery Unit 3',
    location: 'Houston, TX',
    riskScore: 72,
    riskLevel: 'high',
    openRecommendations: 28,
    overdueRecommendations: 5,
    lastPHADate: '2024-03-15',
    activeMOCs: 3
  },
  {
    id: 'fac-002',
    name: 'Baton Rouge Chemical Plant',
    location: 'Baton Rouge, LA',
    riskScore: 45,
    riskLevel: 'moderate',
    openRecommendations: 15,
    overdueRecommendations: 2,
    lastPHADate: '2024-08-22',
    activeMOCs: 1
  },
  {
    id: 'fac-003',
    name: 'Corpus Christi Terminal',
    location: 'Corpus Christi, TX',
    riskScore: 28,
    riskLevel: 'low',
    openRecommendations: 8,
    overdueRecommendations: 0,
    lastPHADate: '2024-10-05',
    activeMOCs: 2
  },
  {
    id: 'fac-004',
    name: 'Newark Processing Facility',
    location: 'Newark, NJ',
    riskScore: 89,
    riskLevel: 'critical',
    openRecommendations: 42,
    overdueRecommendations: 12,
    lastPHADate: '2023-11-10',
    activeMOCs: 0
  }
]

export const sampleRecommendations: Recommendation[] = [
  {
    id: 'rec-001',
    facilityId: 'fac-001',
    facilityName: 'Houston Refinery Unit 3',
    title: 'Install redundant pressure relief valve on reactor vessel',
    description: 'Current single PRV creates single point of failure for overpressure protection',
    source: 'PHA-2024-03',
    riskLevel: 'critical',
    status: 'open',
    assignee: 'Mark Thompson',
    dueDate: '2025-01-15',
    createdDate: '2024-03-20',
    equipmentTag: 'R-301'
  },
  {
    id: 'rec-002',
    facilityId: 'fac-001',
    facilityName: 'Houston Refinery Unit 3',
    title: 'Upgrade high-temperature alarm system',
    description: 'Replace aging DCS temperature sensors with redundant thermocouples',
    source: 'Incident Investigation 2024-08',
    riskLevel: 'high',
    status: 'in-progress',
    assignee: 'Sarah Chen',
    dueDate: '2025-02-28',
    createdDate: '2024-08-15',
    equipmentTag: 'TI-205'
  },
  {
    id: 'rec-003',
    facilityId: 'fac-002',
    facilityName: 'Baton Rouge Chemical Plant',
    title: 'Update emergency shutdown procedures',
    description: 'Revise ESD logic to account for new process modifications',
    source: 'MOC-2024-BR-012',
    riskLevel: 'moderate',
    status: 'complete',
    assignee: 'James Rodriguez',
    dueDate: '2024-12-01',
    createdDate: '2024-10-05',
    completedDate: '2024-11-28'
  },
  {
    id: 'rec-004',
    facilityId: 'fac-004',
    facilityName: 'Newark Processing Facility',
    title: 'Repair corroded pipeline section C-14',
    description: 'Ultrasonic testing revealed wall thinning below minimum thickness',
    source: 'Mechanical Integrity Inspection',
    riskLevel: 'critical',
    status: 'overdue',
    assignee: 'David Park',
    dueDate: '2024-11-30',
    createdDate: '2024-09-10',
    equipmentTag: 'P-C14-3'
  },
  {
    id: 'rec-005',
    facilityId: 'fac-003',
    facilityName: 'Corpus Christi Terminal',
    title: 'Implement confined space entry permit system',
    description: 'Standardize entry procedures for all storage tanks',
    source: 'OSHA Audit 2024',
    riskLevel: 'high',
    status: 'in-progress',
    assignee: 'Lisa Martinez',
    dueDate: '2025-03-15',
    createdDate: '2024-10-20'
  }
]

export const samplePHAs: PHA[] = [
  {
    id: 'pha-001',
    facilityId: 'fac-001',
    facilityName: 'Houston Refinery Unit 3',
    studyName: 'Crude Distillation Unit HAZOP',
    equipmentUnit: 'CDU-3',
    studyType: 'HAZOP',
    completedDate: '2024-03-15',
    nextReviewDate: '2029-03-15',
    scenarioCount: 127,
    recommendationCount: 18,
    teamLead: 'Dr. Priya Sharma'
  },
  {
    id: 'pha-002',
    facilityId: 'fac-002',
    facilityName: 'Baton Rouge Chemical Plant',
    studyName: 'Reactor System LOPA',
    equipmentUnit: 'REACT-A',
    studyType: 'LOPA',
    completedDate: '2024-08-22',
    nextReviewDate: '2029-08-22',
    scenarioCount: 45,
    recommendationCount: 12,
    teamLead: 'Michael Chang'
  },
  {
    id: 'pha-003',
    facilityId: 'fac-003',
    facilityName: 'Corpus Christi Terminal',
    studyName: 'Loading Rack What-If Analysis',
    equipmentUnit: 'LOAD-RACK-2',
    studyType: 'What-If',
    completedDate: '2024-10-05',
    nextReviewDate: '2029-10-05',
    scenarioCount: 63,
    recommendationCount: 8,
    teamLead: 'Jennifer Wu'
  },
  {
    id: 'pha-004',
    facilityId: 'fac-004',
    facilityName: 'Newark Processing Facility',
    studyName: 'Ammonia Storage FMEA',
    equipmentUnit: 'NH3-STOR',
    studyType: 'FMEA',
    completedDate: '2023-11-10',
    nextReviewDate: '2028-11-10',
    scenarioCount: 89,
    recommendationCount: 24,
    teamLead: 'Robert Anderson'
  }
]

export const sampleMOCs: MOC[] = [
  {
    id: 'moc-001',
    facilityId: 'fac-001',
    facilityName: 'Houston Refinery Unit 3',
    title: 'Replace heat exchanger HX-204 with higher capacity unit',
    description: 'Upgrade to accommodate increased throughput from upstream modifications',
    initiator: 'Tom Wilson',
    status: 'pending-review',
    submittedDate: '2024-12-10',
    impactedPHAs: 2,
    approvers: ['Safety Manager', 'Operations Manager', 'Engineering Lead'],
    currentApprover: 'Safety Manager'
  },
  {
    id: 'moc-002',
    facilityId: 'fac-002',
    facilityName: 'Baton Rouge Chemical Plant',
    title: 'Install new nitrogen purge system',
    description: 'Add automated N2 purge for reactor startup/shutdown',
    initiator: 'Sarah Chen',
    status: 'approved',
    submittedDate: '2024-11-05',
    impactedPHAs: 1,
    approvers: ['Safety Manager', 'Operations Manager']
  },
  {
    id: 'moc-003',
    facilityId: 'fac-003',
    facilityName: 'Corpus Christi Terminal',
    title: 'Modify loading arm configuration',
    description: 'Replace fixed loading arm with articulated arm for improved safety',
    initiator: 'David Miller',
    status: 'implemented',
    submittedDate: '2024-10-01',
    impactedPHAs: 1,
    approvers: ['Safety Manager', 'Operations Manager']
  },
  {
    id: 'moc-004',
    facilityId: 'fac-001',
    facilityName: 'Houston Refinery Unit 3',
    title: 'Update DCS control logic for emergency shutdown',
    description: 'Implement staged shutdown sequence to prevent thermal shock',
    initiator: 'Alex Johnson',
    status: 'pending-review',
    submittedDate: '2024-12-15',
    impactedPHAs: 3,
    approvers: ['Safety Manager', 'Operations Manager', 'Engineering Lead', 'Maintenance Manager'],
    currentApprover: 'Safety Manager'
  }
]

export const sampleIncidentTrends: IncidentTrend[] = [
  { month: 'Jan', incidents: 2, nearmisses: 8 },
  { month: 'Feb', incidents: 1, nearmisses: 12 },
  { month: 'Mar', incidents: 3, nearmisses: 10 },
  { month: 'Apr', incidents: 0, nearmisses: 15 },
  { month: 'May', incidents: 2, nearmisses: 9 },
  { month: 'Jun', incidents: 1, nearmisses: 11 },
  { month: 'Jul', incidents: 4, nearmisses: 14 },
  { month: 'Aug', incidents: 1, nearmisses: 13 },
  { month: 'Sep', incidents: 2, nearmisses: 8 },
  { month: 'Oct', incidents: 1, nearmisses: 10 },
  { month: 'Nov', incidents: 0, nearmisses: 7 },
  { month: 'Dec', incidents: 1, nearmisses: 9 }
]

export const sampleRiskTrends: RiskTrend[] = [
  { date: 'Q1 2024', critical: 8, high: 15, moderate: 28, low: 42 },
  { date: 'Q2 2024', critical: 6, high: 18, moderate: 25, low: 38 },
  { date: 'Q3 2024', critical: 9, high: 16, moderate: 30, low: 35 },
  { date: 'Q4 2024', critical: 5, high: 14, moderate: 27, low: 41 }
]

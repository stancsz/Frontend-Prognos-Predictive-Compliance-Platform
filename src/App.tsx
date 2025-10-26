import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Navigation } from '@/components/navigation'
import { DashboardView } from '@/components/views/dashboard-view'
import { RecommendationsView } from '@/components/views/recommendations-view'
import { PHAView } from '@/components/views/pha-view'
import { MOCView } from '@/components/views/moc-view'
import { AnalyticsView } from '@/components/views/analytics-view'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import type { Facility, Recommendation, PHA, MOC, IncidentTrend, RiskTrend } from '@/lib/types'
import { 
  sampleFacilities, 
  sampleRecommendations, 
  samplePHAs, 
  sampleMOCs, 
  sampleIncidentTrends, 
  sampleRiskTrends 
} from '@/lib/seed-data'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [facilities, setFacilities] = useKV<Facility[]>('facilities', [])
  const [recommendations, setRecommendations] = useKV<Recommendation[]>('recommendations', [])
  const [phas, setPHAs] = useKV<PHA[]>('phas', [])
  const [mocs, setMOCs] = useKV<MOC[]>('mocs', [])
  const [incidentTrends, setIncidentTrends] = useKV<IncidentTrend[]>('incident-trends', [])
  const [riskTrends, setRiskTrends] = useKV<RiskTrend[]>('risk-trends', [])

  useEffect(() => {
    if (!facilities || facilities.length === 0) {
      setFacilities(sampleFacilities)
    }
    if (!recommendations || recommendations.length === 0) {
      setRecommendations(sampleRecommendations)
    }
    if (!phas || phas.length === 0) {
      setPHAs(samplePHAs)
    }
    if (!mocs || mocs.length === 0) {
      setMOCs(sampleMOCs)
    }
    if (!incidentTrends || incidentTrends.length === 0) {
      setIncidentTrends(sampleIncidentTrends)
    }
    if (!riskTrends || riskTrends.length === 0) {
      setRiskTrends(sampleRiskTrends)
    }
  }, [])

  const handleCreateRecommendation = () => {
    toast.info('Recommendation creation dialog would open here', {
      description: 'In production, this would open a form to create a new recommendation'
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-7xl">
          {activeView === 'dashboard' && <DashboardView facilities={facilities || []} />}
          {activeView === 'recommendations' && (
            <RecommendationsView 
              recommendations={recommendations || []} 
              onCreateRecommendation={handleCreateRecommendation}
            />
          )}
          {activeView === 'pha' && <PHAView phas={phas || []} />}
          {activeView === 'moc' && <MOCView mocs={mocs || []} />}
          {activeView === 'analytics' && (
            <AnalyticsView 
              incidentTrends={incidentTrends || []}
              riskTrends={riskTrends || []}
            />
          )}
        </div>
      </main>

      <Toaster />
    </div>
  )
}

export default App
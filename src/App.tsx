import { useState } from 'react'
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

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [facilities] = useKV<Facility[]>('facilities', [])
  const [recommendations] = useKV<Recommendation[]>('recommendations', [])
  const [phas] = useKV<PHA[]>('phas', [])
  const [mocs] = useKV<MOC[]>('mocs', [])
  const [incidentTrends] = useKV<IncidentTrend[]>('incident-trends', [])
  const [riskTrends] = useKV<RiskTrend[]>('risk-trends', [])

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
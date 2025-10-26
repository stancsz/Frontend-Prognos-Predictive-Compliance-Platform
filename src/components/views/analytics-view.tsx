import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/metric-card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendUp, Warning, CheckCircle } from '@phosphor-icons/react'
import type { IncidentTrend, RiskTrend } from '@/lib/types'

interface AnalyticsViewProps {
  incidentTrends: IncidentTrend[]
  riskTrends: RiskTrend[]
}

export function AnalyticsView({ incidentTrends, riskTrends }: AnalyticsViewProps) {
  const totalIncidents = incidentTrends.reduce((sum, t) => sum + t.incidents, 0)
  const totalNearMisses = incidentTrends.reduce((sum, t) => sum + t.nearmisses, 0)
  const avgIncidentsPerMonth = incidentTrends.length > 0 
    ? (totalIncidents / incidentTrends.length).toFixed(1)
    : '0.0'

  const recentMonth = incidentTrends[incidentTrends.length - 1]
  const previousMonth = incidentTrends[incidentTrends.length - 2]
  const trendChange = previousMonth && recentMonth
    ? ((recentMonth.incidents - previousMonth.incidents) / (previousMonth.incidents || 1)) * 100 
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics & Trends</h1>
        <p className="text-muted-foreground mt-1">Predictive insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Incidents (YTD)"
          value={totalIncidents}
          subtitle="Across all facilities"
          icon={<Warning size={20} />}
          trend={{ value: Math.abs(trendChange), positive: trendChange < 0 }}
          variant={trendChange > 0 ? 'warning' : 'success'}
        />
        <MetricCard
          title="Near Misses (YTD)"
          value={totalNearMisses}
          subtitle="Leading indicators"
          icon={<Warning size={20} />}
        />
        <MetricCard
          title="Avg Incidents/Month"
          value={avgIncidentsPerMonth}
          subtitle="Last 12 months"
          icon={<TrendUp size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Incident Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {incidentTrends.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No incident data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incidentTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'oklch(0.35 0.04 250)' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'oklch(0.35 0.04 250)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(1 0 0)',
                      border: '1px solid oklch(0.85 0.01 250)',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="incidents" fill="oklch(0.55 0.22 25)" name="Incidents" />
                  <Bar dataKey="nearmisses" fill="oklch(0.75 0.12 90)" name="Near Misses" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {riskTrends.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No risk trend data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={riskTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: 'oklch(0.35 0.04 250)' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'oklch(0.35 0.04 250)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(1 0 0)',
                      border: '1px solid oklch(0.85 0.01 250)',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="critical" stroke="oklch(0.55 0.22 25)" strokeWidth={2} name="Critical" />
                  <Line type="monotone" dataKey="high" stroke="oklch(0.70 0.18 50)" strokeWidth={2} name="High" />
                  <Line type="monotone" dataKey="moderate" stroke="oklch(0.75 0.12 90)" strokeWidth={2} name="Moderate" />
                  <Line type="monotone" dataKey="low" stroke="oklch(0.65 0.12 150)" strokeWidth={2} name="Low" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

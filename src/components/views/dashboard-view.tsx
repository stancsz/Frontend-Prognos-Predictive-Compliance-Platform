import { MetricCard } from '@/components/metric-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RiskBadge } from '@/components/badges'
import { ShieldWarning, CheckCircle, Clock, Warning } from '@phosphor-icons/react'
import type { Facility } from '@/lib/types'
import { formatDate } from '@/lib/helpers'

interface DashboardViewProps {
  facilities: Facility[]
}

export function DashboardView({ facilities }: DashboardViewProps) {
  const totalOpenRecs = facilities.reduce((sum, f) => sum + f.openRecommendations, 0)
  const totalOverdueRecs = facilities.reduce((sum, f) => sum + f.overdueRecommendations, 0)
  const totalActiveMOCs = facilities.reduce((sum, f) => sum + f.activeMOCs, 0)
  const criticalFacilities = facilities.filter(f => f.riskLevel === 'critical').length
  const avgRiskScore = facilities.length > 0 
    ? Math.round(facilities.reduce((sum, f) => sum + f.riskScore, 0) / facilities.length)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Risk Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time safety intelligence across all facilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Risk Score"
          value={avgRiskScore}
          subtitle="Across all facilities"
          icon={<ShieldWarning size={20} />}
          variant={avgRiskScore > 70 ? 'critical' : avgRiskScore > 50 ? 'warning' : 'default'}
        />
        <MetricCard
          title="Open Recommendations"
          value={totalOpenRecs}
          subtitle={`${totalOverdueRecs} overdue`}
          icon={<Clock size={20} />}
          variant={totalOverdueRecs > 0 ? 'warning' : 'default'}
        />
        <MetricCard
          title="Active MOCs"
          value={totalActiveMOCs}
          subtitle="Pending review"
          icon={<Warning size={20} />}
        />
        <MetricCard
          title="Critical Facilities"
          value={criticalFacilities}
          subtitle={`of ${facilities.length} total`}
          icon={<ShieldWarning size={20} />}
          variant={criticalFacilities > 0 ? 'critical' : 'success'}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Risk Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Risk Score</TableHead>
                <TableHead className="text-right">Open Recs</TableHead>
                <TableHead className="text-right">Overdue</TableHead>
                <TableHead>Last PHA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No facilities found. Add facilities to see risk data.
                  </TableCell>
                </TableRow>
              ) : (
                facilities.map((facility) => (
                  <TableRow key={facility.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell className="text-muted-foreground">{facility.location}</TableCell>
                    <TableCell>
                      <RiskBadge level={facility.riskLevel} />
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">{facility.riskScore}</TableCell>
                    <TableCell className="text-right">{facility.openRecommendations}</TableCell>
                    <TableCell className="text-right">
                      {facility.overdueRecommendations > 0 ? (
                        <span className="text-risk-critical font-medium">{facility.overdueRecommendations}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(facility.lastPHADate)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

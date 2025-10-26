import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RiskBadge, StatusBadge } from '@/components/badges'
import { Plus, Funnel } from '@phosphor-icons/react'
import type { Recommendation, RecommendationStatus, RiskLevel } from '@/lib/types'
import { formatDate, calculateDaysUntilDue } from '@/lib/helpers'

interface RecommendationsViewProps {
  recommendations: Recommendation[]
  onCreateRecommendation: () => void
}

export function RecommendationsView({ recommendations, onCreateRecommendation }: RecommendationsViewProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [riskFilter, setRiskFilter] = useState<string>('all')

  const filteredRecs = recommendations.filter(rec => {
    if (statusFilter !== 'all' && rec.status !== statusFilter) return false
    if (riskFilter !== 'all' && rec.riskLevel !== riskFilter) return false
    return true
  })

  const getDueDateDisplay = (rec: Recommendation) => {
    if (rec.status === 'complete') return formatDate(rec.completedDate!)
    const daysUntil = calculateDaysUntilDue(rec.dueDate)
    if (daysUntil < 0) return <span className="text-risk-critical font-medium">Overdue by {Math.abs(daysUntil)}d</span>
    if (daysUntil === 0) return <span className="text-risk-high font-medium">Due today</span>
    if (daysUntil <= 7) return <span className="text-risk-moderate">Due in {daysUntil}d</span>
    return <span className="text-muted-foreground">Due in {daysUntil}d</span>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Recommendations</h1>
          <p className="text-muted-foreground mt-1">Track and manage safety recommendations</p>
        </div>
        <Button onClick={onCreateRecommendation} className="gap-2">
          <Plus size={20} weight="bold" />
          New Recommendation
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Recommendations</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Funnel size={16} className="text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="deferred">Deferred</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No recommendations found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecs.map((rec) => (
                  <TableRow key={rec.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium max-w-md">
                      <div className="truncate">{rec.title}</div>
                      {rec.equipmentTag && (
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">{rec.equipmentTag}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{rec.facilityName}</TableCell>
                    <TableCell>
                      <RiskBadge level={rec.riskLevel} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={rec.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{rec.assignee}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{rec.source}</TableCell>
                    <TableCell className="text-sm">{getDueDateDisplay(rec)}</TableCell>
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

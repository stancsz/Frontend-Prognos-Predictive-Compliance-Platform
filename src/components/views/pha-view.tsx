import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { PHA } from '@/lib/types'
import { formatDate } from '@/lib/helpers'

interface PHAViewProps {
  phas: PHA[]
}

export function PHAView({ phas }: PHAViewProps) {
  const getStudyTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'HAZOP': 'bg-accent text-accent-foreground',
      'LOPA': 'bg-secondary text-secondary-foreground',
      'What-If': 'bg-muted text-muted-foreground',
      'FMEA': 'bg-primary/10 text-primary'
    }
    return colors[type] || 'bg-muted text-muted-foreground'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">PHA Repository</h1>
        <p className="text-muted-foreground mt-1">Process Hazard Analysis studies and findings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active PHA Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Study Name</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Equipment Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Scenarios</TableHead>
                <TableHead className="text-right">Recommendations</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Next Review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                    No PHA studies found. Add PHA studies to track process hazard analyses.
                  </TableCell>
                </TableRow>
              ) : (
                phas.map((pha) => (
                  <TableRow key={pha.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{pha.studyName}</TableCell>
                    <TableCell className="text-muted-foreground">{pha.facilityName}</TableCell>
                    <TableCell className="font-mono text-sm">{pha.equipmentUnit}</TableCell>
                    <TableCell>
                      <Badge className={getStudyTypeColor(pha.studyType)}>{pha.studyType}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{pha.scenarioCount}</TableCell>
                    <TableCell className="text-right font-mono">{pha.recommendationCount}</TableCell>
                    <TableCell className="text-muted-foreground">{pha.teamLead}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(pha.completedDate)}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(pha.nextReviewDate)}</TableCell>
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

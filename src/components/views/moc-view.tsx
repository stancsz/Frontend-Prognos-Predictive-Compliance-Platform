import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Warning } from '@phosphor-icons/react'
import type { MOC, MOCStatus } from '@/lib/types'
import { formatDate } from '@/lib/helpers'

interface MOCViewProps {
  mocs: MOC[]
}

export function MOCView({ mocs }: MOCViewProps) {
  const getStatusColor = (status: MOCStatus) => {
    const colors: Record<MOCStatus, string> = {
      'draft': 'bg-muted text-muted-foreground',
      'pending-review': 'bg-accent text-accent-foreground',
      'approved': 'bg-risk-low text-white',
      'rejected': 'bg-risk-critical text-white',
      'implemented': 'bg-secondary text-secondary-foreground'
    }
    return colors[status]
  }

  const getStatusLabel = (status: MOCStatus) => {
    return status.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Management of Change</h1>
        <p className="text-muted-foreground mt-1">Track facility changes and PHA impacts</p>
      </div>

      <Alert className="border-risk-high/40 bg-risk-high/5">
        <Warning size={20} className="text-risk-high" />
        <AlertDescription className="text-sm">
          All MOCs must acknowledge impacted PHAs before approval. Changes without safety review introduce hidden risks.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Active MOC Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MOC Title</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Initiator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Impacted PHAs</TableHead>
                <TableHead>Current Approver</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mocs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No MOC requests found. Add MOC requests to track facility changes.
                  </TableCell>
                </TableRow>
              ) : (
                mocs.map((moc) => (
                  <TableRow key={moc.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium max-w-sm">
                      <div className="truncate">{moc.title}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{moc.facilityName}</TableCell>
                    <TableCell className="text-muted-foreground">{moc.initiator}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(moc.status)}>{getStatusLabel(moc.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {moc.impactedPHAs > 0 ? (
                        <span className="font-mono font-medium text-risk-high">{moc.impactedPHAs}</span>
                      ) : (
                        <span className="font-mono text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {moc.currentApprover || '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(moc.submittedDate)}</TableCell>
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

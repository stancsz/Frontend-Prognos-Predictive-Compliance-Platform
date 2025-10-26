import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { RiskLevel, RecommendationStatus } from '@/lib/types'
import { getRiskBadgeColor, getStatusColor } from '@/lib/helpers'

interface RiskBadgeProps {
  level: RiskLevel
  className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  return (
    <Badge className={cn(getRiskBadgeColor(level), 'font-medium uppercase text-xs', className)}>
      {level}
    </Badge>
  )
}

interface StatusBadgeProps {
  status: RecommendationStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const displayStatus = status.replace('-', ' ')
  return (
    <Badge className={cn(getStatusColor(status), 'font-medium capitalize', className)}>
      {displayStatus}
    </Badge>
  )
}

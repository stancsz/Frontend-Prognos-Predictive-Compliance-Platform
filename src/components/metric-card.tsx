import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    positive: boolean
  }
  icon?: React.ReactNode
  variant?: 'default' | 'critical' | 'warning' | 'success'
}

export function MetricCard({ title, value, subtitle, trend, icon, variant = 'default' }: MetricCardProps) {
  const variants = {
    default: 'border-border',
    critical: 'border-risk-critical/40 bg-risk-critical/5',
    warning: 'border-risk-high/40 bg-risk-high/5',
    success: 'border-risk-low/40 bg-risk-low/5'
  }

  return (
    <Card className={cn('transition-all hover:shadow-md', variants[variant])}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-semibold font-mono tracking-tight">{value}</div>
          {trend && (
            <div className={cn('text-sm font-medium', trend.positive ? 'text-risk-low' : 'text-risk-critical')}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

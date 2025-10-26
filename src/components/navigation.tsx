import { ShieldWarning, FileText, GitBranch, TrendUp, Gear } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendUp },
    { id: 'recommendations', label: 'Recommendations', icon: ShieldWarning },
    { id: 'pha', label: 'PHA Repository', icon: FileText },
    { id: 'moc', label: 'MOC Workflow', icon: GitBranch },
    { id: 'analytics', label: 'Analytics', icon: TrendUp }
  ]

  return (
    <nav className="w-64 bg-card border-r border-border flex flex-col h-screen">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <ShieldWarning size={24} weight="bold" className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Prognos</h1>
            <p className="text-xs text-muted-foreground">Safety Intelligence</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeView === item.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon size={20} weight={activeView === item.id ? 'fill' : 'regular'} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-all">
          <Gear size={20} />
          Settings
        </button>
      </div>
    </nav>
  )
}

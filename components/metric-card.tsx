import { ArrowDown, ArrowUp } from "lucide-react"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string
  change?: number
  icon: ReactNode
  subtitle?: string
  showChange?: boolean
}

export function MetricCard({ title, value, change = 0, icon, subtitle, showChange = true }: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>

          {showChange && (
            <div className="flex items-center mt-1">
              <span className={`flex items-center text-xs ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}

          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-2 rounded-md bg-gray-50">{icon}</div>
      </div>
    </div>
  )
}

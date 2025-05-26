"use client"

import { usePathname } from "next/navigation"
import { Home, Users, Map, Route, Settings, CalendarClock } from "lucide-react"
import Link from "next/link"

function NavItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
        active ? "bg-emerald-50 text-emerald-600 font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <div className="w-56 bg-white border-r flex flex-col h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">B</span>
          </div>
          <Link href="/dashboard-page" className="font-medium text-gray-800 hover:underline">
            Bumame Dashboard
          </Link>
        </div>
      </div>

      <div className="py-2 px-2">
        <p className="text-xs font-medium text-gray-500 px-3 py-2">Menu</p>
        <nav className="space-y-1">
          <NavItem href="/dashboard-page" icon={<Home size={18} />} label="Overview" />
          <NavItem href="/nakes-management" icon={<Users size={18} />} label="Nakes Management" />
          <NavItem href="/area-analysis" icon={<Map size={18} />} label="Area Analysis" />
          <NavItem href="/route-optimization" icon={<Route size={18} />} label="Route Optimization" />
          <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" />
          <NavItem href="/schedule" icon={<CalendarClock size={18} />} label="Schedule" />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div>
            <p className="text-sm font-medium text-gray-800">Operations Manager</p>
            <p className="text-xs text-gray-500">Bumame Homecare</p>
          </div>
        </div>
      </div>
    </div>
  )
}

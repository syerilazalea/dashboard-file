import { Home, Users, Map, Route, Settings } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <div className="w-56 bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">B</span>
          </div>
          <span className="font-medium text-gray-800">Bumame Dashboard</span>
        </div>
      </div>

      <div className="py-2 px-2">
        <p className="text-xs font-medium text-gray-500 px-3 py-2">Menu</p>
        <nav className="space-y-1">
          <NavItem href="#" icon={<Home size={18} />} label="Overview" active />
          <NavItem href="#" icon={<Users size={18} />} label="Nakes Management" />
          <NavItem href="#" icon={<Map size={18} />} label="Area Analysis" />
          <NavItem href="#" icon={<Route size={18} />} label="Route Optimization" />
          <NavItem href="#" icon={<Settings size={18} />} label="Settings" />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3">
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

function NavItem({ href, icon, label, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active ? "bg-emerald-50 text-emerald-600 font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

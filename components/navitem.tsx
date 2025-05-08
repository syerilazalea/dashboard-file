'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

type NavItemProps = {
  href: string
  icon: React.ReactNode
  label: string
}

export default function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div
        className={clsx(
          'flex items-center gap-2 p-2 rounded transition-colors',
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        )}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  )
}

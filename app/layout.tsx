import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'

export const metadata: Metadata = {
  title: 'Bumame Dashboard',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
  <body className="flex min-h-screen overflow-x-hidden">
    {/* Fixed Sidebar */}
    <div className="fixed top-0 left-0 h-screen w-10 z-50">
      <Sidebar />
    </div>

    {/* Main Content with left padding to avoid overlapping */}
    <main className="flex-1 ml-56">
      {children}
    </main>
  </body>
</html>
  )
}

"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Accounting", icon: FileText, href: "/accounting" },
  { label: "Finance", icon: TrendingUp, href: "/finance" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Support", icon: HelpCircle, href: "/support" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [timePeriod, setTimePeriod] = useState("Month")

  const getPageTitle = () => {
    if (pathname === "/") return "Overview"
    const current = navItems.find(item => pathname.startsWith(item.href) && item.href !== "/")
    return current?.label || "Overview"
  }

  return (
    <div className="flex h-screen bg-[#0a0e1a]">
      {/* Left Sidebar */}
      <aside className="w-60 bg-[#0a0e1a] border-r border-white/10 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-white font-bold text-xl tracking-tight">Zero2One</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-[#0a0e1a] shadow-lg"
                    : "text-white/70 hover:text-[#7FFF7F] hover:bg-white/5",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 ring-2 ring-[#7FFF7F]">
              <AvatarFallback className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-[#0a0e1a]">
                KM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Katelyn</p>
              <p className="text-xs text-white/50 truncate">macpherson.katelyn@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-[#1a1f2e] flex items-center justify-between px-8 shrink-0">
          <h1 className="text-2xl font-semibold text-white">{getPageTitle()}</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-32 justify-between gap-2 bg-transparent border-white/10 text-white hover:bg-white/5 hover:border-[#7FFF7F]/30"
              >
                <span>{timePeriod}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 bg-[#1a1f2e] border-white/10">
              {["Hour", "Day", "Week", "Month"].map((period) => (
                <DropdownMenuItem 
                  key={period}
                  onClick={() => setTimePeriod(period)} 
                  className="text-white hover:bg-white/5"
                >
                  {period}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#1a1f2e]">
          {children}
        </div>
      </div>
    </div>
  )
}

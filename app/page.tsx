"use client"

import type React from "react"

import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CheckCircle2,
  Star,
  ChevronRight,
  Send,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon: React.ElementType
  href: string
}

const navItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "#overview" },
  { label: "Accounting", icon: FileText, href: "#accounting" },
  { label: "Finance", icon: TrendingUp, href: "#finance" },
  { label: "Settings", icon: Settings, href: "#settings" },
  { label: "Support", icon: HelpCircle, href: "#support" },
]

const metrics = [
  { label: "Net Sales", value: "$2,847,392", trend: "up", change: "+12.5%" },
  { label: "Net Profit", value: "$847,392", trend: "up", change: "+8.2%" },
  { label: "Marketing Spend", value: "$234,891", trend: "down", change: "-3.1%" },
  { label: "Cash on Hand", value: "$4,921,847", trend: "up", change: "+15.7%" },
  { label: "Net Contribution Margin", value: "$1,234,567", trend: "up", change: "+6.4%" },
]

const salesData = [
  { month: "Jan", sales: 2100000 },
  { month: "Feb", sales: 2350000 },
  { month: "Mar", sales: 2650000 },
  { month: "Apr", sales: 2400000 },
  { month: "May", sales: 2800000 },
  { month: "Jun", sales: 2847392 },
]

const teamMembers = [
  { name: "Sarah Johnson", email: "sarah@zero2one.app", role: "Admin", phone: "(555) 123-4567", isPrimary: true },
  { name: "Michael Chen", email: "michael@zero2one.app", role: "Manager", phone: "(555) 234-5678", isPrimary: false },
  {
    name: "Emily Rodriguez",
    email: "emily@zero2one.app",
    role: "Accountant",
    phone: "(555) 345-6789",
    isPrimary: false,
  },
  { name: "David Kim", email: "david@zero2one.app", role: "Analyst", phone: "(555) 456-7890", isPrimary: false },
]

const cogsData = [
  {
    sku: "PROD-001",
    name: "Wireless Headphones",
    purchaseCost: 45.0,
    freight: 3.5,
    duty: 2.25,
    totalCost: 50.75,
    lastSold: "2024-01-10",
    startDate: "2023-06-01",
    endDate: "-",
  },
  {
    sku: "PROD-002",
    name: "Laptop Stand",
    purchaseCost: 18.5,
    freight: 2.0,
    duty: 1.5,
    totalCost: 22.0,
    lastSold: "2024-01-12",
    startDate: "2023-08-15",
    endDate: "-",
  },
  {
    sku: "PROD-003",
    name: "USB-C Cable",
    purchaseCost: 5.25,
    freight: 0.5,
    duty: 0.25,
    totalCost: 6.0,
    lastSold: "2024-01-14",
    startDate: "2023-05-01",
    endDate: "-",
  },
  {
    sku: "PROD-004",
    name: "Mechanical Keyboard",
    purchaseCost: 72.0,
    freight: 5.0,
    duty: 3.5,
    totalCost: 80.5,
    lastSold: "2024-01-08",
    startDate: "2023-09-20",
    endDate: "-",
  },
]

const integrations = [
  { name: "QuickBooks", connected: true, logo: "QB" },
  { name: "Amazon", connected: false, logo: "AZ" },
  { name: "Shopify", connected: false, logo: "SH" },
]

type FinancialTab = "balance-sheet" | "income-statement"

const balanceSheetData = {
  assets: {
    current: [
      { name: "Cash and Cash Equivalents", amount: 4921847 },
      { name: "Accounts Receivable", amount: 1234567 },
      { name: "Inventory", amount: 876543 },
      { name: "Prepaid Expenses", amount: 98765 },
    ],
    fixed: [
      { name: "Property and Equipment", amount: 2345678 },
      { name: "Accumulated Depreciation", amount: -543210 },
      { name: "Intangible Assets", amount: 456789 },
    ],
  },
  liabilities: {
    current: [
      { name: "Accounts Payable", amount: 654321 },
      { name: "Accrued Expenses", amount: 234567 },
      { name: "Short-term Debt", amount: 500000 },
    ],
    longTerm: [
      { name: "Long-term Debt", amount: 2000000 },
      { name: "Deferred Tax Liabilities", amount: 123456 },
    ],
  },
  equity: [
    { name: "Common Stock", amount: 1000000 },
    { name: "Retained Earnings", amount: 5778879 },
    { name: "Additional Paid-in Capital", amount: 500000 },
  ],
}

const incomeStatementData = {
  thisMonth: {
    revenue: {
      amazon: 1250000,
      shopify: 987000,
      wholesale: 610392,
    },
    cogs: 1134567,
    operatingExpenses: {
      marketing: 234891,
      salaries: 425000,
      rent: 45000,
      utilities: 12000,
      other: 89500,
    },
  },
  lastMonth: {
    revenue: {
      amazon: 1180000,
      shopify: 945000,
      wholesale: 525000,
    },
    cogs: 1060000,
    operatingExpenses: {
      marketing: 242000,
      salaries: 425000,
      rent: 45000,
      utilities: 11500,
      other: 85000,
    },
  },
  yoy: {
    revenue: {
      amazon: 1050000,
      shopify: 780000,
      wholesale: 470000,
    },
    cogs: 920000,
    operatingExpenses: {
      marketing: 198000,
      salaries: 380000,
      rent: 40000,
      utilities: 10000,
      other: 72000,
    },
  },
}

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("Overview")
  const [timePeriod, setTimePeriod] = useState("Month")
  const [activeTab, setActiveTab] = useState<FinancialTab>("balance-sheet")
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})
  const [roasView, setRoasView] = useState("By Day")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [messageInput, setMessageInput] = useState("")

  const maxSales = Math.max(...salesData.map((d) => d.sales))

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount)
    if (amount < 0) {
      return `(${absAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })})`
    }
    return absAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }

  const calculateTotal = (items: { amount: number }[]) => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  const currentAssets = calculateTotal(balanceSheetData.assets.current)
  const fixedAssets = calculateTotal(balanceSheetData.assets.fixed)
  const totalAssets = currentAssets + fixedAssets

  const currentLiabilities = calculateTotal(balanceSheetData.liabilities.current)
  const longTermLiabilities = calculateTotal(balanceSheetData.liabilities.longTerm)
  const totalLiabilities = currentLiabilities + longTermLiabilities

  const totalEquity = calculateTotal(balanceSheetData.equity)

  const calculateIncomeStatement = (period: (typeof incomeStatementData)["thisMonth"]) => {
    const totalRevenue = period.revenue.amazon + period.revenue.shopify + period.revenue.wholesale
    const grossProfit = totalRevenue - period.cogs
    const totalOpEx =
      period.operatingExpenses.marketing +
      period.operatingExpenses.salaries +
      period.operatingExpenses.rent +
      period.operatingExpenses.utilities +
      period.operatingExpenses.other
    const netIncome = grossProfit - totalOpEx
    return { totalRevenue, grossProfit, totalOpEx, netIncome }
  }

  const thisMonthCalc = calculateIncomeStatement(incomeStatementData.thisMonth)
  const lastMonthCalc = calculateIncomeStatement(incomeStatementData.lastMonth)
  const yoyCalc = calculateIncomeStatement(incomeStatementData.yoy)

  const roasData = [
    { time: "00:00", value: 2.8 },
    { time: "04:00", value: 2.9 },
    { time: "08:00", value: 3.1 },
    { time: "12:00", value: 3.3 },
    { time: "16:00", value: 3.2 },
    { time: "20:00", value: 3.0 },
  ]

  const revenueDrivers = [
    { label: "Ad Spend", value: "$234,891", trend: "up", change: "+5.2%" },
    { label: "CAC", value: "$42.50", trend: "down", change: "-2.1%" },
    { label: "LTV", value: "$385.00", trend: "up", change: "+8.4%" },
    { label: "New Customer Count", value: "1,247", trend: "up", change: "+12.3%" },
    { label: "New Customer AOV", value: "$127.50", trend: "up", change: "+3.8%" },
    { label: "Returning Customer Count", value: "3,892", trend: "up", change: "+6.1%" },
    { label: "Returning Customer AOV", value: "$156.25", trend: "up", change: "+4.2%" },
  ]

  const skuProfitData = [
    {
      sku: "PROD-001",
      name: "Wireless Headphones",
      revenue: 125000,
      cogs: 50750,
      grossMargin: 74250,
      adSpend: 18750,
      netProfit: 55500,
      profitMargin: 44.4,
    },
    {
      sku: "PROD-002",
      name: "Laptop Stand",
      revenue: 89000,
      cogs: 22000,
      grossMargin: 67000,
      adSpend: 13350,
      netProfit: 53650,
      profitMargin: 60.3,
    },
    {
      sku: "PROD-003",
      name: "USB-C Cable",
      revenue: 45000,
      cogs: 6000,
      grossMargin: 39000,
      adSpend: 9000,
      netProfit: 30000,
      profitMargin: 66.7,
    },
    {
      sku: "PROD-004",
      name: "Mechanical Keyboard",
      revenue: 156000,
      cogs: 80500,
      grossMargin: 75500,
      adSpend: 31200,
      netProfit: 44300,
      profitMargin: 28.4,
    },
    {
      sku: "PROD-005",
      name: "Webcam HD",
      revenue: 67000,
      cogs: 35000,
      grossMargin: 32000,
      adSpend: 16750,
      netProfit: 15250,
      profitMargin: 22.8,
    },
    {
      sku: "PROD-006",
      name: "Mouse Pad",
      revenue: 28000,
      cogs: 8000,
      grossMargin: 20000,
      adSpend: 7000,
      netProfit: 13000,
      profitMargin: 46.4,
    },
  ]

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const getSortedSkuData = () => {
    if (!sortConfig) return skuProfitData

    return [...skuProfitData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a]
      const bValue = b[sortConfig.key as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  const maxRoas = Math.max(...roasData.map((d) => d.value))

  const chatMessages = [
    {
      id: 1,
      sender: "Joel MacPherson",
      isAccountManager: true,
      message: "Hi! I've reviewed your Q4 numbers and they're looking strong. Net profit is up 23% vs last quarter.",
      timestamp: "10:42 AM",
    },
    {
      id: 2,
      sender: "You",
      isAccountManager: false,
      message: "Thanks Joel! I'm concerned about the marketing spend though. It's higher than I expected.",
      timestamp: "10:45 AM",
    },
    {
      id: 3,
      sender: "Joel MacPherson",
      isAccountManager: true,
      message:
        "I noticed that too. The Amazon PPC campaigns ramped up in November. Let me pull a detailed breakdown and we can discuss optimization strategies.",
      timestamp: "10:47 AM",
    },
    {
      id: 4,
      sender: "You",
      isAccountManager: false,
      message: "Perfect. Can we schedule a call this week?",
      timestamp: "10:48 AM",
    },
    {
      id: 5,
      sender: "Joel MacPherson",
      isAccountManager: true,
      message: "I have availability Thursday at 2pm or Friday at 10am. Which works better for you?",
      timestamp: "10:49 AM",
    },
  ]

  const recentConversations = [
    {
      id: 1,
      title: "Q4 Financial Review",
      lastMessage: "Great, I'll send the updated forecast...",
      date: "Dec 12, 2024",
    },
    {
      id: 2,
      title: "COGs Analysis for New Products",
      lastMessage: "The freight costs are higher than expected...",
      date: "Dec 8, 2024",
    },
    {
      id: 3,
      title: "Tax Planning Discussion",
      lastMessage: "I've connected with our tax advisor...",
      date: "Dec 3, 2024",
    },
  ]

  return (
    <div className="flex h-screen bg-[#0a0e1a]">
      {/* Left Sidebar */}
      <aside className="w-60 bg-[#0a0e1a] border-r border-white/10 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-white font-bold text-xl tracking-tight">Zero2One</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.label
            return (
              <button
                key={item.label}
                onClick={() => setActivePage(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-[#0a0e1a] shadow-lg"
                    : "text-white/70 hover:text-[#7FFF7F] hover:bg-white/5",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 ring-2 ring-[#7FFF7F]">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-[#0a0e1a]">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-white/50 truncate">john@zero2one.app</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-[#1a1f2e] flex items-center justify-between px-8">
          <h1 className="text-2xl font-semibold text-white">{activePage}</h1>

          {/* Time Period Selector */}
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
              <DropdownMenuItem onClick={() => setTimePeriod("Hour")} className="text-white hover:bg-white/5">
                Hour
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimePeriod("Day")} className="text-white hover:bg-white/5">
                Day
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimePeriod("Week")} className="text-white hover:bg-white/5">
                Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimePeriod("Month")} className="text-white hover:bg-white/5">
                Month
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 bg-[#1a1f2e]">
          {activePage === "Finance" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Real-time ROAS Card */}
              <Card className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-none">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-white/70 font-medium">Real-time ROAS</CardTitle>
                      <div className="flex items-baseline gap-3 mt-2">
                        <span className="text-5xl font-bold text-white">3.2x</span>
                        <div className="flex items-center gap-1 text-[#7FFF7F] font-semibold">
                          <ArrowUpRight className="w-5 h-5" />
                          <span>+8.4%</span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="min-w-32 justify-between gap-2 bg-transparent border-white/10 text-white hover:bg-white/5"
                        >
                          <span className="text-sm">{roasView}</span>
                          <ChevronDown className="w-4 h-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-[#1a1f2e] border-white/10">
                        <DropdownMenuItem
                          onClick={() => setRoasView("By Hour")}
                          className="text-white hover:bg-white/5"
                        >
                          By Hour
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoasView("By Day")} className="text-white hover:bg-white/5">
                          By Day
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setRoasView("By Category")}
                          className="text-white hover:bg-white/5"
                        >
                          By Category
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setRoasView("By Channel")}
                          className="text-white hover:bg-white/5"
                        >
                          By Channel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* ROAS Line Chart */}
                  <div className="h-48 flex items-end gap-2">
                    {roasData.map((item, index) => {
                      const heightPercent = (item.value / maxRoas) * 100
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full relative h-40 flex items-end">
                            <div className="w-full relative">
                              {index < roasData.length - 1 && (
                                <div
                                  className="absolute top-0 left-full w-full h-0.5 bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] origin-left"
                                  style={{
                                    transform: `rotate(${Math.atan2(
                                      ((roasData[index + 1].value - item.value) / maxRoas) * 160,
                                      100 / roasData.length,
                                    )}rad)`,
                                    transformOrigin: "0 0",
                                  }}
                                />
                              )}
                              <div
                                className="w-full bg-gradient-to-t from-[#7FFF7F] to-[#00CED1] rounded-t transition-all hover:opacity-80 relative group"
                                style={{ height: `${heightPercent}%` }}
                              >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a0e1a] text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-white/10">
                                  {item.value}x
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-white/50 font-medium">{item.time}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Drivers Grid */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Revenue Drivers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {revenueDrivers.map((driver, index) => (
                    <Card
                      key={index}
                      className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-none transition-all duration-300 hover:border-[#7FFF7F]/30 hover:-translate-y-1"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white/50">{driver.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-white">{driver.value}</p>
                          <div className="flex items-center justify-between">
                            <div
                              className={cn(
                                "flex items-center gap-1 text-sm font-semibold",
                                driver.trend === "up" ? "text-[#7FFF7F]" : "text-red-500",
                              )}
                            >
                              {driver.trend === "up" ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              <span>{driver.change}</span>
                            </div>
                            {/* Mini Sparkline */}
                            <svg className="w-16 h-8" viewBox="0 0 64 32">
                              <polyline
                                points="0,20 16,15 32,18 48,10 64,12"
                                fill="none"
                                stroke={driver.trend === "up" ? "#7FFF7F" : "#ef4444"}
                                strokeWidth="2"
                                opacity="0.5"
                              />
                              <polyline
                                points="0,20 16,15 32,18 48,10 64,12 64,32 0,32"
                                fill={driver.trend === "up" ? "#7FFF7F" : "#ef4444"}
                                opacity="0.1"
                              />
                            </svg>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* SKU-level Profit Table */}
              <Card className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-none">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white">SKU-level Profit Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/[0.02]">
                        <tr className="border-b border-white/10">
                          <th
                            className="text-left py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("sku")}
                          >
                            SKU
                          </th>
                          <th
                            className="text-left py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("name")}
                          >
                            Name
                          </th>
                          <th
                            className="text-right py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("revenue")}
                          >
                            Revenue
                          </th>
                          <th
                            className="text-right py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("cogs")}
                          >
                            COGS
                          </th>
                          <th
                            className="text-right py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("grossMargin")}
                          >
                            Gross Margin
                          </th>
                          <th
                            className="text-right py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("adSpend")}
                          >
                            Ad Spend
                          </th>
                          <th
                            className="text-right py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("netProfit")}
                          >
                            Net Profit
                          </th>
                          <th
                            className="text-right py-3 px-6 text-sm font-medium text-white/70 cursor-pointer hover:text-white"
                            onClick={() => handleSort("profitMargin")}
                          >
                            Margin %
                          </th>
                        </tr>
                      </thead>
                      <tbody className="font-mono">
                        {getSortedSkuData().map((item, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/[0.05] transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-white">{item.sku}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{item.name}</td>
                            <td className="py-4 px-6 text-sm text-right text-white">
                              ${item.revenue.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 text-sm text-right text-white/70">
                              ${item.cogs.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 text-sm text-right text-white">
                              ${item.grossMargin.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 text-sm text-right text-white/70">
                              ${item.adSpend.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 text-sm text-right font-semibold text-white">
                              ${item.netProfit.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 text-sm text-right">
                              <span
                                className={cn(
                                  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                                  item.profitMargin >= 50
                                    ? "bg-[#7FFF7F]/10 text-[#7FFF7F] border border-[#7FFF7F]/20"
                                    : item.profitMargin >= 30
                                      ? "bg-[#00CED1]/10 text-[#00CED1] border border-[#00CED1]/20"
                                      : "bg-white/5 text-white/70 border border-white/10",
                                )}
                              >
                                {item.profitMargin.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activePage === "Accounting" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Tabs */}
              <div className="flex gap-2 border-b border-white/10">
                <button
                  onClick={() => setActiveTab("balance-sheet")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === "balance-sheet"
                      ? "border-[#7FFF7F] text-white"
                      : "border-transparent text-white/50 hover:text-white/70",
                  )}
                >
                  Balance Sheet
                </button>
                <button
                  onClick={() => setActiveTab("income-statement")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === "income-statement"
                      ? "border-[#7FFF7F] text-white"
                      : "border-transparent text-white/50 hover:text-white/70",
                  )}
                >
                  Income Statement
                </button>
              </div>

              {activeTab === "balance-sheet" && (
                <Card className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-none">
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">Balance Sheet</CardTitle>
                    <p className="text-sm text-white/50 mt-1">As of December 31, 2024</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-8 font-mono">
                      {/* Assets */}
                      <div>
                        <button
                          onClick={() => toggleSection("assets")}
                          className="flex items-center justify-between w-full text-left mb-3 hover:text-[#7FFF7F] transition-colors"
                        >
                          <h3 className="text-lg font-bold text-white">ASSETS</h3>
                          <ChevronRight
                            className={cn(
                              "w-5 h-5 transition-transform text-white",
                              !collapsedSections.assets && "rotate-90",
                            )}
                          />
                        </button>

                        {!collapsedSections.assets && (
                          <div className="space-y-4 pl-4">
                            {/* Current Assets */}
                            <div>
                              <p className="text-sm font-semibold text-white/70 mb-2">Current Assets</p>
                              <div className="space-y-1.5 pl-4">
                                {balanceSheetData.assets.current.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between text-sm py-1 hover:bg-white/[0.02] px-2 rounded"
                                  >
                                    <span className="text-white/70">{item.name}</span>
                                    <span className="text-white">{formatCurrency(item.amount)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2 mt-2 px-2">
                                  <span className="text-white/90">Total Current Assets</span>
                                  <span className="text-white">{formatCurrency(currentAssets)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Fixed Assets */}
                            <div>
                              <p className="text-sm font-semibold text-white/70 mb-2">Fixed Assets</p>
                              <div className="space-y-1.5 pl-4">
                                {balanceSheetData.assets.fixed.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between text-sm py-1 hover:bg-white/[0.02] px-2 rounded"
                                  >
                                    <span className="text-white/70">{item.name}</span>
                                    <span className={cn("text-white", item.amount < 0 && "text-red-500")}>
                                      {formatCurrency(item.amount)}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2 mt-2 px-2">
                                  <span className="text-white/90">Total Fixed Assets</span>
                                  <span className="text-white">{formatCurrency(fixedAssets)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between text-base font-bold border-t-2 border-white/20 pt-3 mt-3 bg-white/[0.02] px-2 py-2 rounded">
                              <span className="text-white">TOTAL ASSETS</span>
                              <span className="text-white">{formatCurrency(totalAssets)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Liabilities */}
                      <div>
                        <button
                          onClick={() => toggleSection("liabilities")}
                          className="flex items-center justify-between w-full text-left mb-3 hover:text-[#7FFF7F] transition-colors"
                        >
                          <h3 className="text-lg font-bold text-white">LIABILITIES</h3>
                          <ChevronRight
                            className={cn(
                              "w-5 h-5 transition-transform text-white",
                              !collapsedSections.liabilities && "rotate-90",
                            )}
                          />
                        </button>

                        {!collapsedSections.liabilities && (
                          <div className="space-y-4 pl-4">
                            {/* Current Liabilities */}
                            <div>
                              <p className="text-sm font-semibold text-white/70 mb-2">Current Liabilities</p>
                              <div className="space-y-1.5 pl-4">
                                {balanceSheetData.liabilities.current.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between text-sm py-1 hover:bg-white/[0.02] px-2 rounded"
                                  >
                                    <span className="text-white/70">{item.name}</span>
                                    <span className="text-white">{formatCurrency(item.amount)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2 mt-2 px-2">
                                  <span className="text-white/90">Total Current Liabilities</span>
                                  <span className="text-white">{formatCurrency(currentLiabilities)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Long-term Liabilities */}
                            <div>
                              <p className="text-sm font-semibold text-white/70 mb-2">Long-term Liabilities</p>
                              <div className="space-y-1.5 pl-4">
                                {balanceSheetData.liabilities.longTerm.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between text-sm py-1 hover:bg-white/[0.02] px-2 rounded"
                                  >
                                    <span className="text-white/70">{item.name}</span>
                                    <span className="text-white">{formatCurrency(item.amount)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2 mt-2 px-2">
                                  <span className="text-white/90">Total Long-term Liabilities</span>
                                  <span className="text-white">{formatCurrency(longTermLiabilities)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between text-base font-bold border-t-2 border-white/20 pt-3 mt-3 bg-white/[0.02] px-2 py-2 rounded">
                              <span className="text-white">TOTAL LIABILITIES</span>
                              <span className="text-white">{formatCurrency(totalLiabilities)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Equity */}
                      <div>
                        <button
                          onClick={() => toggleSection("equity")}
                          className="flex items-center justify-between w-full text-left mb-3 hover:text-[#7FFF7F] transition-colors"
                        >
                          <h3 className="text-lg font-bold text-white">EQUITY</h3>
                          <ChevronRight
                            className={cn(
                              "w-5 h-5 transition-transform text-white",
                              !collapsedSections.equity && "rotate-90",
                            )}
                          />
                        </button>

                        {!collapsedSections.equity && (
                          <div className="space-y-2 pl-4">
                            {balanceSheetData.equity.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm py-1 hover:bg-white/[0.02] px-2 rounded"
                              >
                                <span className="text-white/70">{item.name}</span>
                                <span className="text-white">{formatCurrency(item.amount)}</span>
                              </div>
                            ))}

                            <div className="flex justify-between text-base font-bold border-t-2 border-white/20 pt-3 mt-3 bg-white/[0.02] px-2 py-2 rounded">
                              <span className="text-white">TOTAL EQUITY</span>
                              <span className="text-white">{formatCurrency(totalEquity)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Line */}
                      <div className="flex justify-between text-lg font-bold border-t-2 border-[#7FFF7F]/30 pt-4 mt-4 bg-[#7FFF7F]/5 px-3 py-3 rounded-lg">
                        <span className="text-white">TOTAL LIABILITIES + EQUITY</span>
                        <span className="text-white">{formatCurrency(totalLiabilities + totalEquity)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "income-statement" && (
                <Card className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-none">
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">Income Statement</CardTitle>
                    <p className="text-sm text-white/50 mt-1">Period Comparison</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full font-mono">
                        <thead>
                          <tr className="border-b-2 border-white/20">
                            <th className="text-left py-3 px-2 text-sm font-semibold text-white">Account</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-white min-w-32">
                              This Month
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-white min-w-32">
                              Last Month
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-white min-w-32">YoY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Revenue */}
                          <tr className="border-t border-white/10">
                            <td className="py-3 px-2 font-bold text-white" colSpan={4}>
                              REVENUE
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Amazon</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.revenue.amazon)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.revenue.amazon)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.revenue.amazon)}
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Shopify</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.revenue.shopify)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.revenue.shopify)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.revenue.shopify)}
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Wholesale</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.revenue.wholesale)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.revenue.wholesale)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.revenue.wholesale)}
                            </td>
                          </tr>
                          <tr className="border-t border-white/10 bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm font-semibold text-white/90">Total Revenue</td>
                            <td className="py-2 px-4 text-sm text-right font-semibold text-white">
                              {formatCurrency(thisMonthCalc.totalRevenue)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right font-semibold text-white">
                              {formatCurrency(lastMonthCalc.totalRevenue)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right font-semibold text-white">
                              {formatCurrency(yoyCalc.totalRevenue)}
                            </td>
                          </tr>

                          {/* COGS */}
                          <tr className="border-t border-white/10">
                            <td className="py-3 px-2 font-bold text-white" colSpan={4}>
                              COST OF GOODS SOLD
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Cost of Goods Sold</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.cogs)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.cogs)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.cogs)}
                            </td>
                          </tr>

                          {/* Gross Profit */}
                          <tr className="border-t-2 border-white/20 bg-[#7FFF7F]/5">
                            <td className="py-3 px-2 pl-6 text-base font-bold text-white">Gross Profit</td>
                            <td className="py-3 px-4 text-base text-right font-bold text-white">
                              {formatCurrency(thisMonthCalc.grossProfit)}
                            </td>
                            <td className="py-3 px-4 text-base text-right font-bold text-white">
                              {formatCurrency(lastMonthCalc.grossProfit)}
                            </td>
                            <td className="py-3 px-4 text-base text-right font-bold text-white">
                              {formatCurrency(yoyCalc.grossProfit)}
                            </td>
                          </tr>

                          {/* Operating Expenses */}
                          <tr className="border-t border-white/10">
                            <td className="py-3 px-2 font-bold text-white" colSpan={4}>
                              OPERATING EXPENSES
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Marketing</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.marketing)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.marketing)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.marketing)}
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Salaries</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.salaries)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.salaries)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.salaries)}
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Rent</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.rent)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.rent)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.rent)}
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Utilities</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.utilities)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.utilities)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.utilities)}
                            </td>
                          </tr>
                          <tr className="hover:bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm text-white/70">Other</td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.other)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.other)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right text-white">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.other)}
                            </td>
                          </tr>
                          <tr className="border-t border-white/10 bg-white/[0.02]">
                            <td className="py-2 px-2 pl-6 text-sm font-semibold text-white/90">
                              Total Operating Expenses
                            </td>
                            <td className="py-2 px-4 text-sm text-right font-semibold text-white">
                              {formatCurrency(thisMonthCalc.totalOpEx)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right font-semibold text-white">
                              {formatCurrency(lastMonthCalc.totalOpEx)}
                            </td>
                            <td className="py-2 px-4 text-sm text-right font-semibold text-white">
                              {formatCurrency(yoyCalc.totalOpEx)}
                            </td>
                          </tr>

                          {/* Net Income */}
                          <tr className="border-t-2 border-[#7FFF7F]/30 bg-[#7FFF7F]/10">
                            <td className="py-4 px-2 pl-6 text-lg font-bold text-white">Net Income</td>
                            <td className="py-4 px-4 text-lg text-right font-bold text-white">
                              {formatCurrency(thisMonthCalc.netIncome)}
                            </td>
                            <td className="py-4 px-4 text-lg text-right font-bold text-white">
                              {formatCurrency(lastMonthCalc.netIncome)}
                            </td>
                            <td className="py-4 px-4 text-lg text-right font-bold text-white">
                              {formatCurrency(yoyCalc.netIncome)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activePage === "Overview" && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {metrics.map((metric) => (
                  <Card
                    key={metric.label}
                    className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                            metric.trend === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
                          )}
                        >
                          {metric.trend === "up" ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {metric.change}
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-foreground tracking-tight">{metric.value}</p>
                      {/* Simple sparkline placeholder */}
                      <div className="mt-4 flex items-end gap-1 h-8">
                        {[40, 45, 42, 48, 52, 49, 55, 58, 54, 60, 65, 62].map((height, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex-1 rounded-sm transition-all",
                              metric.trend === "up" ? "bg-green-200" : "bg-red-200",
                            )}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Net Sales by Month</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-end justify-between gap-4 h-80">
                    {salesData.map((data) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-3">
                        <div className="relative w-full flex items-end justify-center" style={{ height: "280px" }}>
                          <div
                            className="w-full rounded-t-lg shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                            style={{
                              height: `${(data.sales / maxSales) * 100}%`,
                              background: "linear-gradient(135deg, #7FFF7F 0%, #00CED1 100%)",
                            }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-slate-900 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                ${(data.sales / 1000000).toFixed(2)}M
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activePage === "Settings" && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Team Section */}
              <Card className="border border-white/10 shadow-xl bg-white/[0.03] backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-white">Team</CardTitle>
                  <Button className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] hover:opacity-90 text-slate-900 font-semibold shadow-lg shadow-emerald-500/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/[0.05] border-y border-white/10">
                        <tr>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Name</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Email</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Role</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Phone</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Primary Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {teamMembers.map((member) => (
                          <tr key={member.email} className="hover:bg-white/[0.05] transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-white">{member.name}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{member.email}</td>
                            <td className="py-4 px-6 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#7FFF7F]/10 text-[#7FFF7F] border border-[#7FFF7F]/20">
                                {member.role}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-white/70">{member.phone}</td>
                            <td className="py-4 px-6">
                              <Star className="w-5 h-5 fill-[#7FFF7F] text-[#7FFF7F]" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* COGs Section */}
              <Card className="border border-white/10 shadow-xl bg-white/[0.03] backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-white">Cost of Goods (COGs)</CardTitle>
                  <Button className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] hover:opacity-90 text-slate-900 font-semibold shadow-lg shadow-emerald-500/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add SKU
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/[0.05] border-y border-white/10">
                        <tr>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">SKU</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Name</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-white/60">Purchase Cost</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-white/60">Freight</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-white/60">Duty</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-white/60">Total Cost</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Last Sold</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Start Date</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">End Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {cogsData.map((item) => (
                          <tr key={item.sku} className="hover:bg-white/[0.05] transition-colors">
                            <td className="py-4 px-6 text-sm font-mono font-medium text-white">{item.sku}</td>
                            <td className="py-4 px-6 text-sm text-white">{item.name}</td>
                            <td className="py-4 px-6 text-sm text-right text-white/70">
                              ${item.purchaseCost.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-sm text-right text-white/70">${item.freight.toFixed(2)}</td>
                            <td className="py-4 px-6 text-sm text-right text-white/70">${item.duty.toFixed(2)}</td>
                            <td className="py-4 px-6 text-sm text-right font-semibold text-white">
                              ${item.totalCost.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-sm text-white/70">{item.lastSold}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{item.startDate}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{item.endDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations Section */}
              <Card className="border border-white/10 shadow-xl bg-white/[0.03] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Integrations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:border-white/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center text-white/70 font-bold text-sm shadow-sm border border-white/10">
                          {integration.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{integration.name}</h3>
                          {integration.connected && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <CheckCircle2 className="w-4 h-4 text-[#7FFF7F]" />
                              <span className="text-sm text-[#7FFF7F] bg-[#7FFF7F]/10 px-2 py-0.5 rounded-full">
                                Connected
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {integration.connected ? (
                        <Button
                          variant="outline"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent border-red-500/30 hover:border-red-500/50"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] hover:opacity-90 text-slate-900 font-semibold shadow-lg shadow-emerald-500/20">
                          Connect
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Billing Section */}
              <Card className="border border-white/10 shadow-xl bg-white/[0.03] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Billing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Plan */}
                  <div className="flex items-start justify-between p-5 border border-white/10 rounded-lg bg-white/[0.03]">
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="font-semibold text-white text-lg">Done For You</h3>
                        <p className="text-3xl font-bold text-white mt-1">
                          $9,500<span className="text-lg text-white/50 font-normal">/month</span>
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-white/50">Next billing date:</span>
                          <span className="text-white">January 15, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-white/50">Payment method:</span>
                          <span className="text-white">Visa ending in 4242</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                    >
                      Update Payment Method
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="link" className="text-[#7FFF7F] hover:text-[#7FFF7F]/80 p-0 h-auto font-medium">
                      View Invoices →
                    </Button>
                    <Button variant="link" className="text-[#7FFF7F] hover:text-[#7FFF7F]/80 p-0 h-auto font-medium">
                      Change Plan →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activePage === "Support" && (
            <div className="space-y-6">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Chat Interface (65%) */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/10 shadow-xl h-[600px] flex flex-col">
                    {/* Chat Header */}
                    <div className="border-b border-white/10 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7FFF7F] to-[#00CED1] flex items-center justify-center text-sm font-bold text-[#0a0e1a]">
                            JM
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-white">Your Account Manager</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white/70">Joel MacPherson</span>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-[#7FFF7F]"></div>
                                <span className="text-xs text-[#7FFF7F]">Online</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn("flex", msg.isAccountManager ? "justify-start" : "justify-end")}
                        >
                          <div
                            className={cn(
                              "max-w-[75%] rounded-2xl px-4 py-3",
                              msg.isAccountManager
                                ? "bg-white/[0.05] border border-white/10"
                                : "bg-gradient-to-r from-[#7FFF7F] to-[#00CED1]",
                            )}
                          >
                            <p
                              className={cn(
                                "text-sm",
                                msg.isAccountManager ? "text-white/90" : "text-[#0a0e1a] font-medium",
                              )}
                            >
                              {msg.message}
                            </p>
                            <p
                              className={cn(
                                "text-xs mt-1",
                                msg.isAccountManager ? "text-white/50" : "text-[#0a0e1a]/70",
                              )}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>

                    {/* Message Input */}
                    <div className="border-t border-white/10 p-4 space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7FFF7F]/50"
                        />
                        <Button className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-[#0a0e1a] hover:opacity-90 font-semibold">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-white/10 text-white/70 hover:bg-white/[0.05] hover:text-white bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Start Huddle
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Right Column - Contact Card (35%) */}
                <div className="lg:col-span-1">
                  <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/10 shadow-xl">
                    <CardContent className="p-6 space-y-6">
                      {/* Avatar and Name */}
                      <div className="text-center space-y-3">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7FFF7F] to-[#00CED1] flex items-center justify-center text-2xl font-bold text-[#0a0e1a] mx-auto">
                          JM
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Joel MacPherson</h3>
                          <p className="text-sm text-white/60">Financial Controller</p>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-white/50" />
                          <span className="text-white/80">(555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-white/50" />
                          <span className="text-white/80">joel@zero2one.finance</span>
                        </div>
                      </div>

                      {/* Schedule Call Button */}
                      <Button className="w-full bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-[#0a0e1a] hover:opacity-90 font-semibold">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule a Call
                      </Button>

                      {/* Response Time Note */}
                      <div className="bg-[#7FFF7F]/10 border border-[#7FFF7F]/20 rounded-lg p-3">
                        <p className="text-xs text-white/70 text-center">
                          <span className="text-[#7FFF7F] font-semibold">Response time:</span> Usually within 10 minutes
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Conversations */}
              <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        className="w-full flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-colors text-left"
                      >
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white mb-1">{conversation.title}</h4>
                          <p className="text-xs text-white/50">{conversation.lastMessage}</p>
                        </div>
                        <div className="text-xs text-white/40 ml-4">{conversation.date}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

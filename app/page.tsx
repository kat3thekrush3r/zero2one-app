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
  Clock,
  MessageSquare,
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
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <aside className="w-60 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-sidebar-border flex flex-col shadow-xl">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
          <span className="text-sidebar-foreground font-bold text-xl tracking-tight">Zero2One</span>
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
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-slate-800/50 hover:translate-x-0.5",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 ring-2 ring-slate-700">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">john@zero2one.app</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">{activePage}</h1>

          {/* Time Period Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-32 justify-between gap-2 bg-transparent hover:bg-accent">
                <span>{timePeriod}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => setTimePeriod("Hour")}>Hour</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimePeriod("Day")}>Day</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimePeriod("Week")}>Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimePeriod("Month")}>Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 bg-slate-50">
          {activePage === "Finance" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Real-time ROAS Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-slate-600 font-medium">Real-time ROAS</CardTitle>
                      <div className="flex items-baseline gap-3 mt-2">
                        <span className="text-5xl font-bold text-slate-900">3.2x</span>
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <ArrowUpRight className="w-5 h-5" />
                          <span>+8.4%</span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="min-w-32 justify-between gap-2 bg-transparent">
                          <span className="text-sm">{roasView}</span>
                          <ChevronDown className="w-4 h-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => setRoasView("By Hour")}>By Hour</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoasView("By Day")}>By Day</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoasView("By Category")}>By Category</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoasView("By Channel")}>By Channel</DropdownMenuItem>
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
                                  className="absolute top-0 left-full w-full h-px bg-blue-500 origin-left"
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
                                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600 hover:to-blue-500 relative group"
                                style={{ height: `${heightPercent}%` }}
                              >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                  {item.value}x
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">{item.time}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Drivers Grid */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Drivers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {revenueDrivers.map((driver, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm text-slate-600 font-medium">{driver.label}</span>
                          {driver.trend === "up" ? (
                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-slate-900">{driver.value}</p>
                          <div className="flex items-center justify-between">
                            <span
                              className={cn(
                                "text-xs font-semibold",
                                driver.trend === "up" ? "text-green-600" : "text-red-600",
                              )}
                            >
                              {driver.change}
                            </span>
                            {/* Mini Sparkline */}
                            <div className="flex items-end gap-0.5 h-6">
                              {[0.6, 0.8, 0.7, 0.9, 0.85, 1.0].map((height, i) => (
                                <div
                                  key={i}
                                  className={cn("w-1 rounded-t", driver.trend === "up" ? "bg-green-500" : "bg-red-500")}
                                  style={{ height: `${height * 100}%` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* SKU Level Profit Table */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">SKU Level Profit</h2>
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <th className="text-left p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("sku")}
                              className="flex items-center gap-1 hover:text-slate-900"
                            >
                              SKU
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "sku" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("name")}
                              className="flex items-center gap-1 hover:text-slate-900"
                            >
                              Product Name
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "name" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("revenue")}
                              className="flex items-center gap-1 hover:text-slate-900 ml-auto"
                            >
                              Revenue
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "revenue" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("cogs")}
                              className="flex items-center gap-1 hover:text-slate-900 ml-auto"
                            >
                              COGS
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "cogs" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("grossMargin")}
                              className="flex items-center gap-1 hover:text-slate-900 ml-auto"
                            >
                              Gross Margin
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "grossMargin" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("adSpend")}
                              className="flex items-center gap-1 hover:text-slate-900 ml-auto"
                            >
                              Ad Spend
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "adSpend" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("netProfit")}
                              className="flex items-center gap-1 hover:text-slate-900 ml-auto"
                            >
                              Net Profit
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "netProfit" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-slate-700">
                            <button
                              onClick={() => handleSort("profitMargin")}
                              className="flex items-center gap-1 hover:text-slate-900 ml-auto"
                            >
                              Profit Margin %
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  sortConfig?.key === "profitMargin" && sortConfig.direction === "desc" && "rotate-180",
                                )}
                              />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSortedSkuData().map((item, index) => (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                              <span className="text-sm font-mono text-slate-600">{item.sku}</span>
                            </td>
                            <td className="p-4">
                              <span className="text-sm font-medium text-slate-900">{item.name}</span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-sm font-mono text-slate-900 tabular-nums">
                                ${item.revenue.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-sm font-mono text-slate-900 tabular-nums">
                                ${item.cogs.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-sm font-mono text-slate-900 tabular-nums">
                                ${item.grossMargin.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-sm font-mono text-slate-900 tabular-nums">
                                ${item.adSpend.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span
                                className={cn(
                                  "text-sm font-mono font-semibold tabular-nums",
                                  item.netProfit >= 0 ? "text-green-600" : "text-red-600",
                                )}
                              >
                                ${item.netProfit.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span
                                className={cn(
                                  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tabular-nums",
                                  item.profitMargin >= 50
                                    ? "bg-green-100 text-green-700"
                                    : item.profitMargin >= 30
                                      ? "bg-blue-100 text-blue-700"
                                      : item.profitMargin >= 0
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700",
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
                </Card>
              </div>
            </div>
          )}

          {activePage === "Accounting" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Tab Bar */}
              <div className="flex gap-2 border-b border-slate-200">
                <button
                  onClick={() => setActiveTab("balance-sheet")}
                  className={cn(
                    "px-6 py-3 text-sm font-semibold border-b-2 transition-all",
                    activeTab === "balance-sheet"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300",
                  )}
                >
                  Balance Sheet
                </button>
                <button
                  onClick={() => setActiveTab("income-statement")}
                  className={cn(
                    "px-6 py-3 text-sm font-semibold border-b-2 transition-all",
                    activeTab === "income-statement"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300",
                  )}
                >
                  Income Statement
                </button>
              </div>

              {/* Balance Sheet Tab */}
              {activeTab === "balance-sheet" && (
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Balance Sheet</CardTitle>
                    <p className="text-sm text-muted-foreground">As of December 31, 2024</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Assets Section */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection("assets")}
                        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <h3 className="font-bold text-lg text-slate-900">ASSETS</h3>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 transition-transform text-slate-600",
                            !collapsedSections["assets"] && "rotate-90",
                          )}
                        />
                      </button>

                      {!collapsedSections["assets"] && (
                        <div className="px-6 py-4 space-y-6">
                          {/* Current Assets */}
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Current Assets</h4>
                            <div className="space-y-2">
                              {balanceSheetData.assets.current.map((item) => (
                                <div key={item.name} className="flex justify-between py-2 border-b border-slate-100">
                                  <span className="text-slate-600 pl-4">{item.name}</span>
                                  <span className="font-mono text-slate-900 tabular-nums">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              ))}
                              <div className="flex justify-between py-2 font-semibold">
                                <span className="text-slate-700 pl-4">Total Current Assets</span>
                                <span className="font-mono text-slate-900 tabular-nums">
                                  {formatCurrency(currentAssets)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Fixed Assets */}
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Fixed Assets</h4>
                            <div className="space-y-2">
                              {balanceSheetData.assets.fixed.map((item) => (
                                <div key={item.name} className="flex justify-between py-2 border-b border-slate-100">
                                  <span className="text-slate-600 pl-4">{item.name}</span>
                                  <span className="font-mono text-slate-900 tabular-nums">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              ))}
                              <div className="flex justify-between py-2 font-semibold">
                                <span className="text-slate-700 pl-4">Total Fixed Assets</span>
                                <span className="font-mono text-slate-900 tabular-nums">
                                  {formatCurrency(fixedAssets)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Total Assets */}
                          <div className="flex justify-between py-3 border-t-2 border-slate-300 font-bold text-lg">
                            <span className="text-slate-900">TOTAL ASSETS</span>
                            <span className="font-mono text-slate-900 tabular-nums">{formatCurrency(totalAssets)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Liabilities Section */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection("liabilities")}
                        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <h3 className="font-bold text-lg text-slate-900">LIABILITIES</h3>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 transition-transform text-slate-600",
                            !collapsedSections["liabilities"] && "rotate-90",
                          )}
                        />
                      </button>

                      {!collapsedSections["liabilities"] && (
                        <div className="px-6 py-4 space-y-6">
                          {/* Current Liabilities */}
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Current Liabilities</h4>
                            <div className="space-y-2">
                              {balanceSheetData.liabilities.current.map((item) => (
                                <div key={item.name} className="flex justify-between py-2 border-b border-slate-100">
                                  <span className="text-slate-600 pl-4">{item.name}</span>
                                  <span className="font-mono text-slate-900 tabular-nums">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              ))}
                              <div className="flex justify-between py-2 font-semibold">
                                <span className="text-slate-700 pl-4">Total Current Liabilities</span>
                                <span className="font-mono text-slate-900 tabular-nums">
                                  {formatCurrency(currentLiabilities)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Long-term Liabilities */}
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Long-term Liabilities</h4>
                            <div className="space-y-2">
                              {balanceSheetData.liabilities.longTerm.map((item) => (
                                <div key={item.name} className="flex justify-between py-2 border-b border-slate-100">
                                  <span className="text-slate-600 pl-4">{item.name}</span>
                                  <span className="font-mono text-slate-900 tabular-nums">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              ))}
                              <div className="flex justify-between py-2 font-semibold">
                                <span className="text-slate-700 pl-4">Total Long-term Liabilities</span>
                                <span className="font-mono text-slate-900 tabular-nums">
                                  {formatCurrency(longTermLiabilities)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Total Liabilities */}
                          <div className="flex justify-between py-3 border-t-2 border-slate-300 font-bold text-lg">
                            <span className="text-slate-900">TOTAL LIABILITIES</span>
                            <span className="font-mono text-slate-900 tabular-nums">
                              {formatCurrency(totalLiabilities)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Equity Section */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection("equity")}
                        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <h3 className="font-bold text-lg text-slate-900">EQUITY</h3>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 transition-transform text-slate-600",
                            !collapsedSections["equity"] && "rotate-90",
                          )}
                        />
                      </button>

                      {!collapsedSections["equity"] && (
                        <div className="px-6 py-4 space-y-2">
                          {balanceSheetData.equity.map((item) => (
                            <div key={item.name} className="flex justify-between py-2 border-b border-slate-100">
                              <span className="text-slate-600 pl-4">{item.name}</span>
                              <span className="font-mono text-slate-900 tabular-nums">
                                {formatCurrency(item.amount)}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between py-3 border-t-2 border-slate-300 font-bold text-lg">
                            <span className="text-slate-900">TOTAL EQUITY</span>
                            <span className="font-mono text-slate-900 tabular-nums">{formatCurrency(totalEquity)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total Liabilities & Equity */}
                    <div className="flex justify-between py-4 px-6 bg-blue-50 rounded-lg border-2 border-blue-200 font-bold text-lg">
                      <span className="text-slate-900">TOTAL LIABILITIES & EQUITY</span>
                      <span className="font-mono text-slate-900 tabular-nums">
                        {formatCurrency(totalLiabilities + totalEquity)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Income Statement Tab */}
              {activeTab === "income-statement" && (
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Income Statement</CardTitle>
                    <p className="text-sm text-muted-foreground">For the period ending December 31, 2024</p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b-2 border-slate-300">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-slate-900"></th>
                            <th className="text-right py-3 px-6 font-semibold text-slate-700 min-w-32">This Month</th>
                            <th className="text-right py-3 px-6 font-semibold text-slate-700 min-w-32">Last Month</th>
                            <th className="text-right py-3 px-6 font-semibold text-slate-700 min-w-32">YoY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Revenue Section */}
                          <tr className="bg-slate-50">
                            <td className="py-3 px-4 font-bold text-slate-900" colSpan={4}>
                              REVENUE
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Amazon</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.revenue.amazon)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.revenue.amazon)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.revenue.amazon)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Shopify</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.revenue.shopify)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.revenue.shopify)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.revenue.shopify)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Wholesale</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.revenue.wholesale)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.revenue.wholesale)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.revenue.wholesale)}
                            </td>
                          </tr>
                          <tr className="border-b-2 border-slate-300 font-semibold bg-slate-50">
                            <td className="py-3 px-4 pl-8 text-slate-900">Total Revenue</td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(thisMonthCalc.totalRevenue)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(lastMonthCalc.totalRevenue)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(yoyCalc.totalRevenue)}
                            </td>
                          </tr>

                          {/* COGS */}
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-semibold text-slate-900">Cost of Goods Sold</td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.cogs)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.cogs)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.cogs)}
                            </td>
                          </tr>

                          {/* Gross Profit */}
                          <tr className="border-b-2 border-slate-300 font-bold bg-blue-50">
                            <td className="py-3 px-4 text-slate-900">GROSS PROFIT</td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(thisMonthCalc.grossProfit)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(lastMonthCalc.grossProfit)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(yoyCalc.grossProfit)}
                            </td>
                          </tr>

                          {/* Operating Expenses */}
                          <tr className="bg-slate-50">
                            <td className="py-3 px-4 font-bold text-slate-900" colSpan={4}>
                              OPERATING EXPENSES
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Marketing</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.marketing)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.marketing)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.marketing)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Salaries</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.salaries)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.salaries)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.salaries)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Rent</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.rent)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.rent)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.rent)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Utilities</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.utilities)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.utilities)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.utilities)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2 px-4 pl-8 text-slate-600">Other</td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.thisMonth.operatingExpenses.other)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.lastMonth.operatingExpenses.other)}
                            </td>
                            <td className="py-2 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(incomeStatementData.yoy.operatingExpenses.other)}
                            </td>
                          </tr>
                          <tr className="border-b-2 border-slate-300 font-semibold bg-slate-50">
                            <td className="py-3 px-4 pl-8 text-slate-900">Total Operating Expenses</td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(thisMonthCalc.totalOpEx)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(lastMonthCalc.totalOpEx)}
                            </td>
                            <td className="py-3 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(yoyCalc.totalOpEx)}
                            </td>
                          </tr>

                          {/* Net Income */}
                          <tr className="border-b-2 border-slate-300 font-bold text-lg bg-green-50">
                            <td className="py-4 px-4 text-slate-900">NET INCOME</td>
                            <td className="py-4 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(thisMonthCalc.netIncome)}
                            </td>
                            <td className="py-4 px-6 text-right font-mono tabular-nums text-slate-900">
                              {formatCurrency(lastMonthCalc.netIncome)}
                            </td>
                            <td className="py-4 px-6 text-right font-mono tabular-nums text-slate-900">
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
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer group"
                            style={{ height: `${(data.sales / maxSales) * 100}%` }}
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
              <Card className="border-0 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Team</CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-y border-slate-200">
                        <tr>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Name</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Email</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Role</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Phone</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Primary Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {teamMembers.map((member) => (
                          <tr key={member.email} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-slate-900">{member.name}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">{member.email}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                {member.role}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-600">{member.phone}</td>
                            <td className="py-4 px-6">
                              {member.isPrimary ? (
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              ) : (
                                <button className="text-slate-300 hover:text-yellow-400 transition-colors">
                                  <Star className="w-5 h-5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* COGs Section */}
              <Card className="border-0 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Cost of Goods (COGs)</CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add SKU
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-y border-slate-200">
                        <tr>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">SKU</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Name</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Purchase Cost</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Freight</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Duty</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Total Cost</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Last Sold</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Start Date</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">End Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {cogsData.map((item) => (
                          <tr key={item.sku} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 text-sm font-mono font-medium text-slate-900">{item.sku}</td>
                            <td className="py-4 px-6 text-sm text-slate-900">{item.name}</td>
                            <td className="py-4 px-6 text-sm text-right text-slate-600">
                              ${item.purchaseCost.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-sm text-right text-slate-600">${item.freight.toFixed(2)}</td>
                            <td className="py-4 px-6 text-sm text-right text-slate-600">${item.duty.toFixed(2)}</td>
                            <td className="py-4 px-6 text-sm text-right font-semibold text-slate-900">
                              ${item.totalCost.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-600">{item.lastSold}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">{item.startDate}</td>
                            <td className="py-4 px-6 text-sm text-slate-600">{item.endDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations Section */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Integrations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm shadow-sm">
                          {integration.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                          {integration.connected && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Connected</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {integration.connected ? (
                        <Button
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button className="bg-blue-600 hover:bg-blue-700">Connect</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activePage === "Support" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Main Chat Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Interface - Left Side (65%) */}
                <Card className="lg:col-span-2 border-0 shadow-md flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <CardHeader className="border-b border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                          JM
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Your Account Manager: Joel MacPherson</h3>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Online
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Message History */}
                  <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={cn("flex", msg.isAccountManager ? "justify-start" : "justify-end")}>
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
                            msg.isAccountManager
                              ? "bg-white border border-slate-200 text-slate-900"
                              : "bg-blue-600 text-white",
                          )}
                        >
                          {msg.isAccountManager && (
                            <p className="text-xs font-semibold text-blue-600 mb-1">{msg.sender}</p>
                          )}
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          <p className={cn("text-xs mt-1", msg.isAccountManager ? "text-slate-500" : "text-blue-100")}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  {/* Input Box */}
                  <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                      />
                      <Button className="bg-blue-600 hover:bg-blue-700 px-6 shadow-sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <Button variant="outline" className="gap-2 text-sm bg-transparent">
                        <Phone className="w-4 h-4" />
                        Start Huddle
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Contact Card - Right Side (35%) */}
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 space-y-6">
                    {/* Account Manager Photo & Info */}
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
                        JM
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Joel MacPherson</h3>
                        <p className="text-sm text-slate-600">Financial Controller</p>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700 font-medium">+1 (555) 234-5678</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">joel@zero2one.com</span>
                      </div>
                    </div>

                    {/* Schedule Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule a Call
                    </Button>

                    {/* Response Time Note */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Quick Response</p>
                          <p className="text-xs text-blue-700 mt-1">Usually responds within 10 minutes</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <p className="text-xs text-slate-500 text-center">
                        Joel has been your dedicated account manager since Jan 2024
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Conversations */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Conversations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {recentConversations.map((convo) => (
                      <button
                        key={convo.id}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 text-sm">{convo.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{convo.lastMessage}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{convo.date}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activePage !== "Overview" &&
            activePage !== "Settings" &&
            activePage !== "Accounting" &&
            activePage !== "Finance" &&
            activePage !== "Support" && (
              <div className="max-w-7xl mx-auto">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">Dashboard content goes here</p>
                  </CardContent>
                </Card>
              </div>
            )}
        </div>
      </main>
    </div>
  )
}

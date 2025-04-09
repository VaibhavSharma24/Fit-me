"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, ArrowUpRight, ChevronRight, BarChart3, DollarSign, X, Moon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [revenueTimeframe, setRevenueTimeframe] = useState("Month")
  const [installsTimeframe, setInstallsTimeframe] = useState("Week")
  const [currentMonth, setCurrentMonth] = useState("")
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [showMonthSelector, setShowMonthSelector] = useState(false)
  const [gender, setGender] = useState("Male")
  const [showGenderSelector, setShowGenderSelector] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [calendarDays, setCalendarDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  // Add a new state for the settings popup at the top of the Dashboard component, near the other state declarations
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const monthSelectorRef = useRef(null)
  const router = useRouter()

  // Initialize with current month and year
  useEffect(() => {
    const now = new Date()
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    setCurrentMonth(monthNames[now.getMonth()])
    setCurrentYear(now.getFullYear())
    setSelectedDate(now.getDate())

    // Generate calendar days for current month
    generateCalendarDays(now.getMonth(), now.getFullYear())
  }, [])

  // Generate calendar days for a given month and year
  const generateCalendarDays = (month, year) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        date: new Date(year, month, i),
        isToday: new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year,
      })
    }

    setCalendarDays(days)
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = [currentYear - 1, currentYear, currentYear + 1]

  const genders = ["Male", "Female", "All"]

  // Handle month selection
  const handleMonthSelect = (month, year) => {
    setCurrentMonth(month)
    setCurrentYear(year)
    setShowMonthSelector(false)

    // Find the month index
    const monthIndex = months.findIndex((m) => m === month)
    generateCalendarDays(monthIndex, year)
  }

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(day)
    console.log(`Selected date: ${day} ${currentMonth} ${currentYear}`)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthSelectorRef.current && !monthSelectorRef.current.contains(event.target)) {
        setShowMonthSelector(false)
      }
      setShowGenderSelector(false)
      setShowProfileMenu(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Content for different tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "Workouts":
        return <WorkoutsTab gender={gender} router={router} />
      case "Finance":
        return <FinanceTab />
      case "Analytics":
        return <AnalyticsTab />
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Section */}
            <div className="bg-zinc-900 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-semibold">Revenue</h2>

                <div className="flex bg-zinc-800 rounded-full p-1">
                  <button
                    className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${revenueTimeframe === "Today" ? "bg-zinc-700" : ""}`}
                    onClick={() => setRevenueTimeframe("Today")}
                  >
                    Today
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${revenueTimeframe === "Week" ? "bg-zinc-700" : ""}`}
                    onClick={() => setRevenueTimeframe("Week")}
                  >
                    Week
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${revenueTimeframe === "Month" ? "bg-zinc-700" : ""}`}
                    onClick={() => setRevenueTimeframe("Month")}
                  >
                    Month
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${revenueTimeframe === "Range" ? "bg-zinc-700" : ""}`}
                    onClick={() => setRevenueTimeframe("Range")}
                  >
                    Range
                  </button>
                </div>
              </div>

              <div className="flex items-end mb-4">
                <div className="text-white text-5xl font-bold">79,675</div>
                <div className="ml-3 px-2 py-1 bg-green-900 text-green-400 rounded-md text-sm flex items-center">
                  <span>2.4%</span>
                </div>
              </div>

              <div className="text-gray-400 text-sm mb-3">This month</div>

              <div className="flex items-end mb-4">
                <div className="text-white text-4xl font-bold">312</div>
                <div className="ml-3 px-2 py-1 bg-green-900 text-green-400 rounded-md text-sm flex items-center">
                  <span>4.7%</span>
                </div>
              </div>

              <div className="text-gray-400 text-sm mb-3">Daily subscriptions</div>

              <div className="relative h-28 w-full">
                <div className="absolute inset-0 flex items-end">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-zinc-800"
                      style={{
                        height: `${20 + Math.sin(i * 0.5) * 15 + Math.random() * 10}%`,
                        opacity: i === 20 ? 1 : 0.5,
                      }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <path
                      d={`M 0,${20 + Math.sin(0) * 10} ${Array.from({ length: 30 })
                        .map((_, i) => `L ${i * 3.33},${20 + Math.sin(i * 0.5) * 10}`)
                        .join(" ")}`}
                      fill="none"
                      stroke="#AAFF00"
                      strokeWidth="0.5"
                    />
                    <path
                      d={`M 0,${25 + Math.cos(0) * 5} ${Array.from({ length: 30 })
                        .map((_, i) => `L ${i * 3.33},${25 + Math.cos(i * 0.5) * 5}`)
                        .join(" ")}`}
                      fill="none"
                      stroke="#9C5FFF"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-500 text-xs">
                  <span>1</span>
                  <span>4</span>
                  <span>8</span>
                  <span>12</span>
                  <span>16</span>
                  <span>20</span>
                  <span>24</span>
                  <span>28</span>
                  <span>31</span>
                </div>
              </div>
            </div>

            {/* Calendar and Total Section */}
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="relative" ref={monthSelectorRef}>
                    <button
                      className="flex items-center bg-zinc-800 rounded-full px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowMonthSelector(!showMonthSelector)
                      }}
                    >
                      <span>
                        {currentMonth} {currentYear}
                      </span>
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </button>

                    {showMonthSelector && (
                      <div className="absolute top-full left-0 mt-2 bg-zinc-800 rounded-xl p-2 z-50 w-64 max-h-60 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-1">
                          {years.map((year) => (
                            <div key={year} className="col-span-3 py-1 px-2 text-gray-300 font-semibold">
                              {year}
                            </div>
                          ))}

                          {years.map((year) =>
                            months.map((month) => (
                              <button
                                key={`${month}-${year}`}
                                className={`text-left px-3 py-2 rounded-md text-sm 
                                  ${
                                    month === currentMonth && year === currentYear
                                      ? "bg-zinc-700 text-white"
                                      : "text-gray-300 hover:bg-zinc-700"
                                  }`}
                                onClick={() => handleMonthSelect(month, year)}
                              >
                                {month.substring(0, 3)}
                              </button>
                            )),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="text-gray-400 hover:text-white">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="flex items-center justify-center text-xs text-gray-500 font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before the 1st of the month */}
                  {calendarDays.length > 0 &&
                    Array.from({ length: new Date(currentYear, months.indexOf(currentMonth), 1).getDay() }).map(
                      (_, i) => <div key={`empty-${i}`} className="w-10 h-10"></div>,
                    )}

                  {/* Actual calendar days */}
                  {calendarDays.map(({ day, isToday }) => (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      className={`flex items-center justify-center rounded-full w-10 h-10 text-sm
                        ${
                          isToday
                            ? "bg-[#AAFF00] text-black font-bold"
                            : selectedDate === day
                              ? "bg-purple-500 text-white"
                              : "text-gray-400 hover:bg-zinc-800 transition-colors"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <div className="text-white text-3xl font-bold">$18,434</div>
                  <BarChart3 className="text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Installs Section */}
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-xl font-semibold">Installs</h2>

                  <div className="flex bg-zinc-800 rounded-full p-1">
                    <button
                      className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${installsTimeframe === "Today" ? "bg-zinc-700" : ""}`}
                      onClick={() => setInstallsTimeframe("Today")}
                    >
                      Today
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${installsTimeframe === "Week" ? "bg-zinc-700" : ""}`}
                      onClick={() => setInstallsTimeframe("Week")}
                    >
                      Week
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${installsTimeframe === "Month" ? "bg-zinc-700" : ""}`}
                      onClick={() => setInstallsTimeframe("Month")}
                    >
                      Month
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${installsTimeframe === "Range" ? "bg-zinc-700" : ""}`}
                      onClick={() => setInstallsTimeframe("Range")}
                    >
                      Range
                    </button>
                  </div>
                </div>

                <div className="text-white text-4xl font-bold mb-2">4,365</div>
                <div className="text-gray-400 text-sm mb-4">This week</div>

                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-md bg-purple-500 mr-2 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                    </div>
                    <div className="text-white text-xl">2,876</div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-md bg-yellow-500 mr-2 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                      </svg>
                    </div>
                    <div className="text-white text-xl">1,489</div>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 h-24">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <div key={day} className="flex flex-col items-center">
                      <div className="flex-grow w-full flex items-end">
                        <div
                          className={`w-full rounded-md ${i === 4 ? "bg-purple-500" : i === 5 ? "bg-yellow-500" : "bg-zinc-800"}`}
                          style={{ height: `${i === 4 ? 80 : i === 5 ? 40 : 20 + Math.random() * 30}%` }}
                        />
                      </div>
                      <div className="text-gray-400 text-xs mt-2">{day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Workouts Section */}
            <div className="bg-zinc-900 rounded-xl p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">Popular workouts</h2>

                <div className="relative">
                  <button
                    className="flex items-center bg-zinc-800 rounded-full px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowGenderSelector(!showGenderSelector)
                    }}
                  >
                    <span>{gender}</span>
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </button>

                  {showGenderSelector && (
                    <div className="absolute top-full right-0 mt-2 bg-zinc-800 rounded-xl p-2 z-50 w-32">
                      {genders.map((g) => (
                        <button
                          key={g}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${g === gender ? "bg-zinc-700 text-white" : "text-gray-300 hover:bg-zinc-700"}`}
                          onClick={() => {
                            setGender(g)
                            setShowGenderSelector(false)
                          }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="flex items-center bg-zinc-800 rounded-lg p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
                  onClick={() => router.push("/dashboard/workout-details")}
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-700 mr-4 flex items-center justify-center">
                    <Image src="/workout-1.jpg" alt="Good morning" width={48} height={48} className="rounded-lg" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-white font-medium">Good morning</div>
                    <div className="flex items-center">
                      <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-md mr-2">shoulders</span>
                      <span className="text-gray-400 text-xs">20 reps</span>
                    </div>
                  </div>
                  <div className="text-white font-bold ml-4">39k</div>
                </div>

                <div
                  className="flex items-center bg-zinc-800 rounded-lg p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
                  onClick={() => router.push("/dashboard/workout-details")}
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-700 mr-4 flex items-center justify-center">
                    <Image
                      src="/workout-2.jpg"
                      alt="Seated Back Extension"
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-white font-medium">Seated Back Extension</div>
                    <div className="flex items-center">
                      <span className="text-xs bg-green-500 text-black px-2 py-0.5 rounded-md mr-2">lower back</span>
                      <span className="text-gray-400 text-xs">15 reps</span>
                    </div>
                  </div>
                  <div className="text-white font-bold ml-4">31k</div>
                </div>

                <div
                  className="flex items-center bg-zinc-800 rounded-lg p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
                  onClick={() => router.push("/dashboard/workout-details")}
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-700 mr-4 flex items-center justify-center">
                    <Image src="/workout-3.jpg" alt="Pull Ups" width={48} height={48} className="rounded-lg" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-white font-medium">Pull Ups</div>
                    <div className="flex items-center">
                      <span className="text-xs bg-red-500 text-black px-2 py-0.5 rounded-md mr-2">back</span>
                      <span className="text-gray-400 text-xs">12 reps</span>
                    </div>
                  </div>
                  <div className="text-white font-bold ml-4">27k</div>
                </div>
              </div>
            </div>

            {/* Age Range Section */}
            <div className="bg-zinc-900 rounded-xl p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">Age range</h2>
                <button className="text-gray-400 hover:text-white">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-64 flex items-center justify-center">
                <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-70"></div>
                <div className="absolute w-32 h-32 rounded-full bg-yellow-500 opacity-70 translate-x-16 translate-y-16"></div>
                <div className="absolute w-24 h-24 rounded-full bg-cyan-500 opacity-70 -translate-x-16 -translate-y-16"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">
                  46%
                </div>
                <div className="absolute top-1/2 left-1/2 translate-x-8 translate-y-8 text-white font-bold text-xl">
                  32%
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-8 text-white font-bold text-xl">
                  18%
                </div>

                <div className="absolute bottom-0 left-1/4 text-white text-sm">18-30 years</div>
                <div className="absolute bottom-0 right-1/4 text-white text-sm">30-45 years</div>
                <div className="absolute top-0 left-1/4 text-white text-sm">45-60 years</div>
                <div className="absolute top-1/4 right-1/4 text-white text-sm">4%</div>
              </div>
            </div>

            {/* Impressions Section */}
            <div className="bg-zinc-900 rounded-xl p-4 col-span-1 md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">Impressions</h2>
                <button className="text-gray-400 hover:text-white">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64">
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      <path d="M0,200 Q200,100 400,200 T800,200" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                      <path d="M0,250 Q200,150 400,250 T800,250" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                      <path d="M0,300 Q200,200 400,300 T800,300" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
                    </svg>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-5xl font-bold">231,841</div>
                  </div>

                  <div className="absolute bottom-0 left-0 text-gray-400 text-sm">Impressions worldwide</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-4 bg-blue-500 mr-2"></div>
                      <span className="text-white">USA</span>
                    </div>
                    <div className="text-white">43,987</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-4 bg-blue-800 mr-2"></div>
                      <span className="text-white">Australia</span>
                    </div>
                    <div className="text-white">32,648</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-4 bg-yellow-500 mr-2"></div>
                      <span className="text-white">Germany</span>
                    </div>
                    <div className="text-white">26,563</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-4 bg-red-500 mr-2"></div>
                      <span className="text-white">Spain</span>
                    </div>
                    <div className="text-white">21,514</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-4 bg-blue-300 mr-2"></div>
                      <span className="text-white">Argentina</span>
                    </div>
                    <div className="text-white">13,987</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-black p-8 flex items-center justify-center"
      initial={{ opacity: 0, x: "100vw" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="w-full max-w-6xl bg-black rounded-3xl overflow-hidden p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold flex items-center">
            <Image src="/fitmee-logo.svg" alt="Fit&me" width={120} height={32} className="mr-2" priority />
          </div>
          <button
            onClick={() => window.history.back()}
            className="ml-4 px-4 py-1 rounded-full border border-[#AAFF00] text-[#AAFF00] hover:bg-[#AAFF00]/10 transition-colors"
          >
            Back to Home
          </button>

          <div className="flex space-x-2">
            <div className="bg-white rounded-full px-4 py-2 flex space-x-4">
              <button
                className={`px-4 py-1 rounded-full hover:bg-zinc-700 transition-colors ${activeTab === "Overview" ? "bg-black text-white" : "text-black"}`}
                onClick={() => setActiveTab("Overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-1 rounded-full hover:bg-zinc-700 transition-colors ${activeTab === "Analytics" ? "bg-black text-white" : "text-black"}`}
                onClick={() => setActiveTab("Analytics")}
              >
                Analytics
              </button>
              <button
                className={`px-4 py-1 rounded-full hover:bg-zinc-700 transition-colors ${
                  activeTab === "Finance" ? "bg-black text-white" : "text-black"
                }`}
                onClick={() => setActiveTab("Finance")}
              >
                Finance
              </button>
              <button
                className={`px-4 py-1 rounded-full hover:bg-zinc-700 transition-colors ${
                  activeTab === "Workouts" ? "bg-black text-white" : "text-black"
                }`}
                onClick={() => setActiveTab("Workouts")}
              >
                Workouts
              </button>
            </div>

            <div className="relative">
              <button
                className="bg-zinc-800 rounded-full p-3 hover:bg-zinc-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowSearch(!showSearch)
                }}
              >
                <Search className="w-5 h-5 text-white" />
              </button>

              {showSearch && (
                <div className="absolute right-0 top-full mt-2 bg-zinc-800 rounded-xl p-3 z-50 w-64">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-zinc-700 text-white rounded-l-md px-3 py-2 w-full focus:outline-none"
                    />
                    <button
                      className="bg-zinc-700 rounded-r-md px-2 py-2 text-gray-400 hover:text-white"
                      onClick={() => {
                        console.log("Search for:", searchQuery)
                        setShowSearch(false)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center bg-zinc-800 rounded-full pl-2 hover:bg-zinc-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowProfileMenu(!showProfileMenu)
                }}
              >
                <Image src="/profile.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
                <div className="px-3">
                  <div className="text-white text-sm font-medium">Vaibhav Sharma</div>
                  <div className="text-gray-400 text-xs">admin@fit.net</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white mr-2" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 bg-zinc-800 rounded-xl p-2 z-50 w-48 shadow-lg">
                  <div className="py-2 px-3 border-b border-zinc-700 mb-2">
                    <div className="text-white font-medium">Vaibhav Sharma</div>
                    <div className="text-gray-400 text-xs">admin@fit.net</div>
                  </div>
                  {/* Modify the Settings button in the profile dropdown menu to open the modal instead of navigating */}
                  <button
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-zinc-700"
                    onClick={() => {
                      setShowProfileMenu(false)
                      setShowSettingsModal(true)
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-zinc-700"
                    onClick={() => {
                      setShowProfileMenu(false)
                      router.push("/dashboard/profile")
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-zinc-700"
                    onClick={() => {
                      setShowProfileMenu(false)
                      router.push("/dashboard/billing")
                    }}
                  >
                    Billing
                  </button>
                  <div className="border-t border-zinc-700 my-1"></div>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-zinc-700"
                    onClick={() => {
                      setShowProfileMenu(false)
                      router.push("/")
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
      {/* Add the Settings Modal component at the end of the Dashboard component, just before the final closing tag */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="bg-zinc-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Settings</h2>
              <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="flex border-b border-zinc-800 mb-6">
                <button className="px-6 py-4 text-sm font-medium text-[#AAFF00] border-b-2 border-[#AAFF00]">
                  General
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-400">Notifications</button>
                <button className="px-6 py-4 text-sm font-medium text-gray-400">Security</button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Dark Mode</h3>
                    <p className="text-gray-400 text-sm">Toggle between light and dark mode</p>
                  </div>
                  <button className="w-12 h-6 rounded-full relative bg-[#AAFF00]">
                    <span className="sr-only">Toggle Dark Mode</span>
                    <span className="absolute top-1 w-4 h-4 rounded-full transition-all bg-black right-1"></span>
                    <span className="absolute left-1 top-1">
                      <Moon className="w-4 h-4 text-black" />
                    </span>
                  </button>
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <h3 className="text-white font-medium mb-4">Language</h3>
                  <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <h3 className="text-white font-medium mb-4">Time Zone</h3>
                  <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]">
                    <option value="utc">UTC (Coordinated Universal Time)</option>
                    <option value="est">EST (Eastern Standard Time)</option>
                    <option value="cst">CST (Central Standard Time)</option>
                    <option value="pst">PST (Pacific Standard Time)</option>
                  </select>
                </div>

                <div className="border-t border-zinc-800 pt-6 pb-4">
                  <button
                    className="bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#AAFF00]/90 transition-colors"
                    onClick={() => setShowSettingsModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Workouts Tab Component
function WorkoutsTab({ gender, router }) {
  const navigateToWorkoutDetails = () => router.push("/dashboard/workout-details")

  const workouts = [
    {
      id: 1,
      name: "Good Morning",
      category: "shoulders",
      reps: 20,
      image: "/workout-1.jpg",
      popularity: "39k",
      difficulty: "Medium",
      duration: "15 min",
      description:
        "A compound exercise that primarily targets the hamstrings, lower back, and glutes. Stand with feet shoulder-width apart, bend at the hips while keeping your back straight, then return to starting position.",
    },
    {
      id: 2,
      name: "Seated Back Extension",
      category: "lower back",
      reps: 15,
      image: "/workout-2.jpg",
      popularity: "31k",
      description:
        "Strengthens the erector spinae muscles. Sit on the machine with your back against the pad, then extend backward against resistance, focusing on contracting your lower back muscles.",
      difficulty: "Medium",
      duration: "12 min",
    },
    {
      id: 3,
      name: "Pull Ups",
      category: "back",
      reps: 12,
      image: "/workout-3.jpg",
      popularity: "27k",
      difficulty: "Hard",
      duration: "10 min",
      description:
        "A challenging upper body exercise that targets the lats, biceps, and shoulders. Hang from a bar with palms facing away, then pull your body up until your chin is over the bar.",
    },
    {
      id: 4,
      name: "Bench Press",
      category: "chest",
      reps: 10,
      image: "/workout-1.jpg",
      popularity: "45k",
      difficulty: "Medium",
      duration: "20 min",
      description:
        "The classic chest exercise. Lie on a bench, lower the barbell to your chest with control, then press it back up to the starting position, focusing on chest muscle contraction.",
    },
    {
      id: 5,
      name: "Squats",
      category: "legs",
      reps: 15,
      image: "/workout-2.jpg",
      popularity: "52k",
      difficulty: "Medium",
      duration: "25 min",
      description:
        "The king of leg exercises. Stand with feet shoulder-width apart, bend your knees and hips to lower your body as if sitting in a chair, then return to standing position.",
    },
    {
      id: 6,
      name: "Deadlift",
      category: "full body",
      reps: 8,
      image: "/workout-3.jpg",
      popularity: "48k",
      difficulty: "Hard",
      duration: "30 min",
      description:
        "A powerful compound movement that works almost every muscle. With feet hip-width apart, bend at the hips and knees to grip the bar, then stand up straight while keeping your back flat.",
    },
  ]

  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Shoulders", "Back", "Chest", "Legs", "Full Body"]

  const filteredWorkouts =
    activeCategory === "All"
      ? workouts
      : workouts.filter(
          (workout) =>
            workout.category.toLowerCase() === activeCategory.toLowerCase() ||
            (activeCategory.toLowerCase() === "back" &&
              (workout.category.toLowerCase() === "back" || workout.category.toLowerCase() === "lower back")),
        )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Workouts</h1>
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">Filter:</span>
          <div className="flex bg-zinc-800 rounded-full p-1">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${activeCategory === category ? "bg-zinc-700 text-white" : "text-gray-400"}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-800 transition-colors"
            onClick={navigateToWorkoutDetails}
          >
            <div className="p-4 bg-zinc-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#AAFF00] text-xs font-medium">{workout.duration}</span>
                <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-md">{workout.category}</span>
              </div>
              <p className="text-gray-300 text-sm line-clamp-3">{workout.description}</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium">{workout.name}</h3>
                <span className="text-[#AAFF00] font-bold">{workout.popularity}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md mr-2">
                    {workout.difficulty}
                  </span>
                  <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md">{workout.reps} reps</span>
                </div>
                <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-md">{workout.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Finance Tab Component
function FinanceTab() {
  const [timeframe, setTimeframe] = useState("Month")
  const [showTransactions, setShowTransactions] = useState(true)

  const transactions = [
    { id: 1, date: "2024-07-19", description: "Premium Subscription", amount: -29.99, type: "expense" },
    { id: 2, date: "2024-07-18", description: "Personal Training Session", amount: -120.0, type: "expense" },
    { id: 3, date: "2024-07-17", description: "Membership Payment - John D.", amount: 49.99, type: "income" },
    { id: 4, date: "2024-07-16", description: "Membership Payment - Sarah L.", amount: 49.99, type: "income" },
    { id: 5, date: "2024-07-15", description: "Equipment Purchase", amount: -350.0, type: "expense" },
    { id: 6, date: "2024-07-14", description: "Membership Payment - Mike T.", amount: 49.99, type: "income" },
    { id: 7, date: "2024-07-13", description: "Nutrition Consultation", amount: 85.0, type: "income" },
    { id: 8, date: "2024-07-12", description: "Utility Bill", amount: -125.5, type: "expense" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Finance</h1>
        <div className="flex bg-zinc-800 rounded-full p-1">
          <button
            className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${timeframe === "Day" ? "bg-zinc-700" : ""}`}
            onClick={() => setTimeframe("Day")}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${timeframe === "Week" ? "bg-zinc-700" : ""}`}
            onClick={() => setTimeframe("Week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${timeframe === "Month" ? "bg-zinc-700" : ""}`}
            onClick={() => setTimeframe("Month")}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full hover:bg-zinc-700 transition-colors ${timeframe === "Year" ? "bg-zinc-700" : ""}`}
            onClick={() => setTimeframe("Year")}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <div className="bg-[#AAFF00] rounded-full p-2 mr-2">
              <DollarSign className="w-5 h-5 text-black" />
            </div>
            <span className="text-gray-400">Total Revenue</span>
          </div>
          <div className="text-white text-3xl font-bold">$18,434.50</div>
          <div className="mt-2 text-green-500 text-sm">+12.5% from last month</div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <div className="bg-purple-500 rounded-full p-2 mr-2">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-400">Total Expenses</span>
          </div>
          <div className="text-white text-3xl font-bold">$5,245.75</div>
          <div className="mt-2 text-red-500 text-sm">+3.2% from last month</div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <div className="bg-yellow-500 rounded-full p-2 mr-2">
              <DollarSign className="w-5 h-5 text-black" />
            </div>
            <span className="text-gray-400">Net Profit</span>
          </div>
          <div className="text-white text-3xl font-bold">$13,188.75</div>
          <div className="mt-2 text-green-500 text-sm">+16.8% from last month</div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Revenue Breakdown</h2>
          <button className="text-gray-400 hover:text-white">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="h-64 relative">
          <div className="absolute inset-0">
            <svg viewBox="0 0 800 300" className="w-full h-full">
              <path
                d="M0,250 C100,180 200,150 300,200 C400,250 500,220 600,180 C700,140 800,160 800,200"
                fill="none"
                stroke="#AAFF00"
                strokeWidth="3"
              />
              <path
                d="M0,280 C100,260 200,240 300,260 C400,280 500,270 600,250 C700,230 800,240 800,260"
                fill="none"
                stroke="#9C5FFF"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-500 text-xs">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#AAFF00] rounded-full mr-2"></div>
            <span className="text-gray-300 text-sm">Memberships</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#9C5FFF] rounded-full mr-2"></div>
            <span className="text-gray-300 text-sm">Personal Training</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Recent Transactions</h2>
          <button className="text-gray-400 hover:text-white" onClick={() => setShowTransactions(!showTransactions)}>
            {showTransactions ? "Hide" : "Show"}
          </button>
        </div>

        {showTransactions && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Description</th>
                  <th className="text-right py-2 text-gray-400 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-zinc-800">
                    <td className="py-3 text-gray-300">{transaction.date}</td>
                    <td className="py-3 text-white">{transaction.description}</td>
                    <td
                      className={`py-3 text-right ${transaction.type === "income" ? "text-green-500" : "text-red-400"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// Analytics Tab Component
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Analytics</h1>
        <div className="flex bg-zinc-800 rounded-full p-1">
          <button className="px-3 py-1 text-sm rounded-full bg-zinc-700">Last 30 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-64 relative">
            <div className="absolute inset-0">
              <svg viewBox="0 0 800 300" className="w-full h-full">
                <path
                  d="M0,280 C50,260 100,240 150,220 C200,200 250,180 300,160 C350,140 400,120 450,100 C500,80 550,70 600,60 C650,50 700,45 750,40 C800,35 850,30 900,25"
                  fill="none"
                  stroke="#AAFF00"
                  strokeWidth="3"
                />
                <path
                  d="M0,280 C50,270 100,260 150,250 C200,240 250,230 300,220 C350,210 400,200 450,190 C500,180 550,170 600,160 C650,150 700,145 750,140 C800,135 850,130 900,125"
                  fill="none"
                  stroke="#9C5FFF"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-500 text-xs">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#AAFF00] rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Actual</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#9C5FFF] rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Projected</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold mb-4">Engagement Metrics</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-zinc-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Avg. Session Time</div>
              <div className="text-white text-2xl font-bold">24m 32s</div>
              <div className="text-green-500 text-xs mt-1">+2.4%</div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Workouts Completed</div>
              <div className="text-white text-2xl font-bold">1,248</div>
              <div className="text-green-500 text-xs mt-1">+5.7%</div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Retention Rate</div>
              <div className="text-white text-2xl font-bold">78.3%</div>
              <div className="text-green-500 text-xs mt-1">+1.2%</div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Active Users</div>
              <div className="text-white text-2xl font-bold">8,742</div>
              <div className="text-green-500 text-xs mt-1">+12.5%</div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-400 text-sm">User Satisfaction</div>
              <div className="text-white font-bold">4.8/5.0</div>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div className="bg-[#AAFF00] h-2 rounded-full" style={{ width: "96%" }}></div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold mb-4">Popular Workout Times</h2>
          <div className="h-48 relative">
            <div className="absolute inset-0 flex items-end">
              {[15, 10, 25, 45, 60, 40, 30, 20, 15, 10, 5, 8].map((height, i) => (
                <div key={i} className="flex-1 mx-0.5">
                  <div
                    className={`w-full rounded-t-sm ${height > 40 ? "bg-[#AAFF00]" : "bg-zinc-700"}`}
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-500 text-xs pt-2 border-t border-zinc-800">
              <span>6am</span>
              <span>8am</span>
              <span>10am</span>
              <span>12pm</span>
              <span>2pm</span>
              <span>4pm</span>
              <span>6pm</span>
              <span>8pm</span>
              <span>10pm</span>
            </div>
          </div>

          <div className="mt-4 text-center text-gray-400 text-sm">Peak workout times: 12pm - 2pm and 5pm - 7pm</div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold mb-4">Device Usage</h2>
          <div className="flex items-center justify-center h-48">
            <div className="w-40 h-40 rounded-full border-8 border-zinc-800 relative">
              <div
                className="absolute inset-0"
                style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
              >
                <div className="w-full h-full bg-[#AAFF00] rounded-full"></div>
              </div>
              <div
                className="absolute inset-0"
                style={{ clipPath: "polygon(50% 50%, 50% 0%, 0% 0%, 0% 65%, 50% 65%)" }}
              >
                <div className="w-full h-full bg-purple-500 rounded-full"></div>
              </div>
              <div
                className="absolute inset-0"
                style={{ clipPath: "polygon(50% 50%, 50% 65%, 0% 65%, 0% 100%, 50% 100%)" }}
              >
                <div className="w-full h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#AAFF00] rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Mobile (52%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Desktop (28%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Tablet (20%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


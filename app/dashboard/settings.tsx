"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [activeTab, setActiveTab] = useState("general")

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }

    alert("Password updated successfully!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="text-white text-2xl font-bold flex items-center">
            <Image src="/fitmee-logo.svg" alt="Fit&me" width={120} height={32} className="mr-2" priority />
          </div>
        </div>

        <h1 className="text-white text-3xl font-bold mb-8">Settings</h1>

        {/* Settings Content */}
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <div className="flex border-b border-zinc-800">
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === "general" ? "text-[#AAFF00] border-b-2 border-[#AAFF00]" : "text-gray-400"}`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === "notifications" ? "text-[#AAFF00] border-b-2 border-[#AAFF00]" : "text-gray-400"}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === "security" ? "text-[#AAFF00] border-b-2 border-[#AAFF00]" : "text-gray-400"}`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>

          <div className="p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Dark Mode</h3>
                    <p className="text-gray-400 text-sm">Toggle between light and dark mode</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full relative ${darkMode ? "bg-[#AAFF00]" : "bg-zinc-700"}`}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <span className="sr-only">Toggle Dark Mode</span>
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full transition-all ${darkMode ? "bg-black right-1" : "bg-white left-1"}`}
                    ></span>
                    <span className="absolute left-1 top-1">
                      {darkMode ? <Moon className="w-4 h-4 text-black" /> : <Sun className="w-4 h-4 text-white" />}
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
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive notifications via email</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full relative ${emailNotifications ? "bg-[#AAFF00]" : "bg-zinc-700"}`}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  >
                    <span className="sr-only">Toggle Email Notifications</span>
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full transition-all ${emailNotifications ? "bg-black right-1" : "bg-white left-1"}`}
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Push Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive push notifications on your device</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full relative ${pushNotifications ? "bg-[#AAFF00]" : "bg-zinc-700"}`}
                    onClick={() => setPushNotifications(!pushNotifications)}
                  >
                    <span className="sr-only">Toggle Push Notifications</span>
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full transition-all ${pushNotifications ? "bg-black right-1" : "bg-white left-1"}`}
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Marketing Emails</h3>
                    <p className="text-gray-400 text-sm">Receive marketing and promotional emails</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full relative ${marketingEmails ? "bg-[#AAFF00]" : "bg-zinc-700"}`}
                    onClick={() => setMarketingEmails(!marketingEmails)}
                  >
                    <span className="sr-only">Toggle Marketing Emails</span>
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full transition-all ${marketingEmails ? "bg-black right-1" : "bg-white left-1"}`}
                    ></span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-white font-medium mb-4">Change Password</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1">New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Confirm New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    />
                  </div>

                  <button
                    onClick={handleSavePassword}
                    className="bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#AAFF00]/90 transition-colors"
                  >
                    Update Password
                  </button>
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <h3 className="text-white font-medium mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                  <button className="bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-700 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


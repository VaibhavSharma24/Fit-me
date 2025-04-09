"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Download, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Billing() {
  const [activePlan, setActivePlan] = useState("premium")

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      period: "monthly",
      features: ["Access to basic workouts", "Limited workout tracking", "Standard support"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      period: "monthly",
      features: [
        "Access to all workouts",
        "Advanced workout tracking",
        "Priority support",
        "Personalized workout plans",
        "Nutrition guidance",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      price: "$29.99",
      period: "monthly",
      features: [
        "Everything in Premium",
        "1-on-1 coaching sessions",
        "Custom meal plans",
        "Advanced analytics",
        "API access",
        "White-label options",
      ],
    },
  ]

  const invoices = [
    { id: "INV-001", date: "Jul 01, 2024", amount: "$19.99", status: "Paid" },
    { id: "INV-002", date: "Jun 01, 2024", amount: "$19.99", status: "Paid" },
    { id: "INV-003", date: "May 01, 2024", amount: "$19.99", status: "Paid" },
    { id: "INV-004", date: "Apr 01, 2024", amount: "$19.99", status: "Paid" },
    { id: "INV-005", date: "Mar 01, 2024", amount: "$19.99", status: "Paid" },
  ]

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

        <h1 className="text-white text-3xl font-bold mb-8">Billing & Subscription</h1>

        {/* Current Plan */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-white text-xl font-semibold">Current Plan</h2>
              <p className="text-gray-400">Manage your subscription and billing details</p>
            </div>
            <div className="bg-[#AAFF00]/20 text-[#AAFF00] px-3 py-1 rounded-full text-sm font-medium">Active</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl mb-6">
            <div>
              <div className="text-white font-medium">Premium Plan</div>
              <div className="text-gray-400 text-sm">Billed monthly</div>
            </div>
            <div className="text-white font-bold">$19.99/month</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              Next billing date: <span className="text-white">August 1, 2024</span>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors">Cancel Subscription</button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8">
          <h2 className="text-white text-xl font-semibold mb-6">Payment Method</h2>

          <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl mb-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-md mr-3">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Visa ending in 4242</div>
                <div className="text-gray-400 text-sm">Expires 12/25</div>
              </div>
            </div>
            <button className="text-[#AAFF00] hover:text-[#AAFF00]/80 transition-colors">Edit</button>
          </div>

          <button className="text-white bg-zinc-800 hover:bg-zinc-700 transition-colors px-4 py-2 rounded-lg">
            Add Payment Method
          </button>
        </div>

        {/* Billing History */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8">
          <h2 className="text-white text-xl font-semibold mb-6">Billing History</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2 text-gray-400 font-medium">Invoice</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Status</th>
                  <th className="text-right py-2 text-gray-400 font-medium">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-zinc-800">
                    <td className="py-3 text-white">{invoice.id}</td>
                    <td className="py-3 text-gray-300">{invoice.date}</td>
                    <td className="py-3 text-white">{invoice.amount}</td>
                    <td className="py-3">
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-md text-xs">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Available Plans */}
        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">Available Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-zinc-800 rounded-xl p-5 border-2 ${
                  plan.id === activePlan ? "border-[#AAFF00]" : "border-transparent hover:border-zinc-700"
                } transition-all`}
              >
                <h3 className="text-white text-lg font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-white text-2xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">/{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#AAFF00] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.id === activePlan ? (
                  <button className="w-full bg-[#AAFF00] text-black py-2 rounded-lg font-medium">Current Plan</button>
                ) : (
                  <button
                    onClick={() => setActivePlan(plan.id)}
                    className="w-full bg-zinc-700 text-white py-2 rounded-lg font-medium hover:bg-zinc-600 transition-colors"
                  >
                    Switch Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


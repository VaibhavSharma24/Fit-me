"use client"

import { useState } from "react"
import { ArrowLeft, Edit, Camera, Save } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Vaibhav Sharma",
    email: "admin@fit.net",
    role: "Administrator",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Fitness enthusiast and administrator with over 5 years of experience in the fitness industry. Passionate about helping others achieve their fitness goals.",
  })

  const [formData, setFormData] = useState({ ...profileData })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = () => {
    setProfileData({ ...formData })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div className="text-white text-2xl font-bold flex items-center">
              <Image src="/fitmee-logo.svg" alt="Fit&me" width={120} height={32} className="mr-2" priority />
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-zinc-800 px-4 py-2 rounded-lg text-white hover:bg-zinc-700 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center bg-[#AAFF00] px-4 py-2 rounded-lg text-black hover:bg-[#AAFF00]/90 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          )}
        </div>

        {/* Profile Content */}
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="h-48 bg-gradient-to-r from-purple-900 to-[#AAFF00]/30 relative">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-900 overflow-hidden bg-zinc-800">
                  <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#AAFF00] p-2 rounded-full">
                    <Camera className="w-4 h-4 text-black" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            {!isEditing ? (
              <>
                <h1 className="text-white text-3xl font-bold mb-1">{profileData.name}</h1>
                <p className="text-[#AAFF00] mb-6">{profileData.role}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-gray-400 text-sm mb-1">Email</h2>
                      <p className="text-white">{profileData.email}</p>
                    </div>
                    <div>
                      <h2 className="text-gray-400 text-sm mb-1">Phone</h2>
                      <p className="text-white">{profileData.phone}</p>
                    </div>
                    <div>
                      <h2 className="text-gray-400 text-sm mb-1">Location</h2>
                      <p className="text-white">{profileData.location}</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-gray-400 text-sm mb-1">Bio</h2>
                    <p className="text-white">{profileData.bio}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


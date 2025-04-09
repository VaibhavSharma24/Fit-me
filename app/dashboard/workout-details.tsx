"use client"

import { useState } from "react"
import { ArrowLeft, Play, Clock, Flame, Dumbbell, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function WorkoutDetails() {
  const [isFavorite, setIsFavorite] = useState(false)

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

        {/* Workout Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-bold">Good Morning</h1>
          <button
            className={`p-2 rounded-full ${isFavorite ? "bg-red-500/20" : "bg-zinc-800"}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
          </button>
        </div>

        {/* Workout Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-80">
          <Image src="/workout-1.jpg" alt="Good Morning Exercise" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <button className="absolute bottom-6 right-6 bg-[#AAFF00] text-black p-4 rounded-full hover:bg-[#AAFF00]/90 transition-colors">
            <Play className="w-6 h-6" fill="black" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <div className="bg-[#AAFF00] rounded-full p-2 mr-2">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <span className="text-gray-400">Duration</span>
            </div>
            <div className="text-white text-2xl font-bold">15 min</div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <div className="bg-[#AAFF00] rounded-full p-2 mr-2">
                <Flame className="w-5 h-5 text-black" />
              </div>
              <span className="text-gray-400">Calories</span>
            </div>
            <div className="text-white text-2xl font-bold">180 kcal</div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <div className="bg-[#AAFF00] rounded-full p-2 mr-2">
                <Dumbbell className="w-5 h-5 text-black" />
              </div>
              <span className="text-gray-400">Difficulty</span>
            </div>
            <div className="text-white text-2xl font-bold">Medium</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-300 mb-4">
            The Good Morning exercise primarily targets the hamstrings, glutes, and lower back. It's an excellent
            movement for developing posterior chain strength and improving hip hinge mechanics.
          </p>
          <p className="text-gray-300">
            This exercise can be performed with a barbell, resistance band, or bodyweight only, making it versatile for
            different fitness levels and equipment availability.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            <li className="flex">
              <span className="bg-[#AAFF00] text-black w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                1
              </span>
              <p className="text-gray-300">Stand with feet shoulder-width apart, knees slightly bent.</p>
            </li>
            <li className="flex">
              <span className="bg-[#AAFF00] text-black w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                2
              </span>
              <p className="text-gray-300">Place hands behind your head or across your chest.</p>
            </li>
            <li className="flex">
              <span className="bg-[#AAFF00] text-black w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                3
              </span>
              <p className="text-gray-300">
                Keeping your back straight, hinge at the hips and bend forward until your torso is nearly parallel to
                the floor.
              </p>
            </li>
            <li className="flex">
              <span className="bg-[#AAFF00] text-black w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                4
              </span>
              <p className="text-gray-300">Engage your hamstrings and glutes to return to the starting position.</p>
            </li>
            <li className="flex">
              <span className="bg-[#AAFF00] text-black w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                5
              </span>
              <p className="text-gray-300">Repeat for the recommended number of repetitions (20 reps).</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}


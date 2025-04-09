"use client"

import Image from "next/image"
import { Clock, Flame, Dumbbell, X } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isHovering, setIsHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPrevHovering, setIsPrevHovering] = useState(false)
  const [isNextHovering, setIsNextHovering] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const featuresRef = useRef(null)
  const serviceRef = useRef(null)
  const exerciseRef = useRef(null)

  const router = useRouter()

  const handleStartClick = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 800) // Wait for the animation to complete
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.main
      className="bg-black text-white min-h-screen overflow-hidden"
      animate={{
        x: isTransitioning ? "-100vw" : 0,
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between py-6 px-4 md:px-6 sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Image src="/fitmee-logo.svg" alt="Fit&me" width={150} height={40} className="mr-8" priority />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection(homeRef)}
            className="text-white hover:text-[#AAFF00] relative group transition-colors"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#AAFF00] group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="text-white hover:text-[#AAFF00] relative group transition-colors"
          >
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#AAFF00] group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </button>
          <button
            onClick={() => scrollToSection(featuresRef)}
            className="text-white hover:text-[#AAFF00] relative group transition-colors"
          >
            Features
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#AAFF00] group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </button>
          <button
            onClick={() => scrollToSection(serviceRef)}
            className="text-white hover:text-[#AAFF00] relative group transition-colors"
          >
            Service
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#AAFF00] group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </button>
          <button
            onClick={() => scrollToSection(exerciseRef)}
            className="text-white hover:text-[#AAFF00] relative group transition-colors"
          >
            Exercise
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#AAFF00] group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </button>

          <div className="flex items-center space-x-4 ml-8">
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-[#AAFF00] text-black px-6 py-2 rounded-full font-medium hover:bg-[#AAFF00]/90 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={handleStartClick}
              className="border border-[#AAFF00] text-[#AAFF00] px-6 py-2 rounded-full font-medium hover:bg-[#AAFF00]/10 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
        <button className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section ref={homeRef} className="container mx-auto relative px-4 md:px-6 pt-8 pb-16">
        {/* PREV text with expanded hover area */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[200px] hidden md:block cursor-pointer"
          onMouseEnter={() => setIsPrevHovering(true)}
          onMouseLeave={() => setIsPrevHovering(false)}
        >
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center"
            animate={{
              rotateZ: isPrevHovering ? 0 : -90,
              x: isPrevHovering ? 40 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="whitespace-nowrap text-xl tracking-widest">
              <span className={isPrevHovering ? "text-[#AAFF00]" : "text-gray-500"}>P</span>
              <span className={isPrevHovering ? "text-[#AAFF00]" : "text-gray-500"}>R</span>
              <span className={isPrevHovering ? "text-[#AAFF00]" : "text-gray-500"}>E</span>
              <span className={isPrevHovering ? "text-[#AAFF00]" : "text-gray-500"}>V</span>
            </div>
          </motion.div>
        </div>

        {/* NEXT text with expanded hover area */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[200px] hidden md:block cursor-pointer"
          onMouseEnter={() => setIsNextHovering(true)}
          onMouseLeave={() => setIsNextHovering(false)}
          onClick={() => scrollToSection(aboutRef)}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center"
            animate={{
              rotateZ: isNextHovering ? 0 : -90,
              x: isNextHovering ? -40 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="whitespace-nowrap text-xl tracking-widest">
              <span className={isNextHovering ? "text-[#AAFF00]" : "text-gray-500"}>N</span>
              <span className={isNextHovering ? "text-[#AAFF00]" : "text-gray-500"}>E</span>
              <span className={isNextHovering ? "text-[#AAFF00]" : "text-gray-500"}>X</span>
              <span className={isNextHovering ? "text-[#AAFF00]" : "text-gray-500"}>T</span>
            </div>
          </motion.div>
        </div>

        {/* Main Hero Content */}
        <div className="relative">
          {/* Bodybuilder Image */}
          <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
            <Image src="/bodybuilder.png" alt="Bodybuilder" width={800} height={600} className="opacity-90" priority />
          </div>

          {/* Headline */}
          <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight relative z-20">
            <span className="text-[#f0f5d7]">Sculpt </span>
            <span className="text-[#AAFF00]/60">Your</span>
            <span className="text-[#f0f5d7]"> Body,</span>
            <br />
            <span className="text-[#f0f5d7]">Elevate </span>
            <span className="text-[#AAFF00]/60">Your</span>
            <span className="text-[#f0f5d7]"> Spirit</span>
          </h1>

          {/* Floating Badges */}
          <div className="relative flex justify-center mt-16 mb-16 h-[300px] z-20">
            {/* Hours Badge */}
            <div className="absolute top-0 left-1/4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-[#AAFF00]/30 transform -rotate-12 z-20">
              <div className="flex flex-col items-center">
                <div className="bg-[#AAFF00] rounded-full p-2 mb-1">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <span className="text-xs text-gray-300">Hours</span>
                <span className="text-2xl font-bold text-white">1.5</span>
              </div>
            </div>

            {/* Poses Badge */}
            <div className="absolute top-0 right-1/4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-[#AAFF00]/30 transform rotate-12 z-20">
              <div className="flex flex-col items-center">
                <div className="bg-[#AAFF00] rounded-full p-2 mb-1">
                  <svg
                    className="w-5 h-5 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z"
                      fill="currentColor"
                    />
                    <path d="M15 14L13 7L11 7L9 14L6 15V18L9 17L10 21H14L15 17L18 18V15L15 14Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-xs text-gray-300">Poses</span>
                <span className="text-2xl font-bold text-white">20</span>
              </div>
            </div>

            {/* Kcal Badge */}
            <div className="absolute bottom-0 left-1/4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-[#AAFF00]/30 transform -rotate-12 z-20">
              <div className="flex flex-col items-center">
                <div className="bg-[#AAFF00] rounded-full p-2 mb-1">
                  <Flame className="w-5 h-5 text-black" />
                </div>
                <span className="text-xs text-gray-300">Kcal</span>
                <span className="text-2xl font-bold text-white">550</span>
              </div>
            </div>

            {/* Sets Badge */}
            <div className="absolute bottom-0 right-1/4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-[#AAFF00]/30 transform rotate-12 z-20">
              <div className="flex flex-col items-center">
                <div className="bg-[#AAFF00] rounded-full p-2 mb-1">
                  <Dumbbell className="w-5 h-5 text-black" />
                </div>
                <span className="text-xs text-gray-300">Sets</span>
                <span className="text-2xl font-bold text-white">5</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-center mt-8 relative z-20">
            {/* 12k+ Happy Spirits */}
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-black flex items-center justify-center text-xs text-white">
                  U1
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center text-xs text-white">
                  U2
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-xs text-white">
                  U3
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold">12k+</div>
                <div className="text-sm text-gray-400">Happy Spirits</div>
              </div>
            </div>

            {/* Let's Start Button with Amazing Hover Effect */}
            <motion.button
              className="relative bg-[#AAFF00] text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              onClick={handleStartClick}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#22cc00]"
                initial={{ x: "-100%" }}
                animate={{ x: isHovering ? 0 : "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10 flex items-center"
                animate={{ x: isHovering ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={isHovering ? "text-white" : ""}>Let&apos;s Start</span>
                <motion.span
                  className={`ml-2 ${isHovering ? "text-white" : ""}`}
                  animate={{
                    x: isHovering ? 5 : 0,
                    opacity: isHovering ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  &gt;&gt;&gt;
                </motion.span>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="bg-zinc-900 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            About <span className="text-[#AAFF00]">Fit&me</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                At Fit&me, we believe fitness is more than just physical transformation—it's a journey of self-discovery
                and empowerment. Our mission is to provide innovative training methods and expert guidance that help you
                sculpt not just your body, but elevate your spirit.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Approach</h3>
              <p className="text-gray-300">
                We combine cutting-edge exercise science with personalized coaching to create fitness experiences that
                are effective, sustainable, and enjoyable. Whether you're a beginner or an advanced athlete, our
                programs adapt to your unique needs and goals.
              </p>
            </div>
            <div className="bg-black/30 p-8 rounded-2xl border border-[#AAFF00]/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 p-4 rounded-xl">
                  <div className="text-[#AAFF00] text-4xl font-bold mb-2">10+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl">
                  <div className="text-[#AAFF00] text-4xl font-bold mb-2">50+</div>
                  <div className="text-gray-300">Expert Trainers</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl">
                  <div className="text-[#AAFF00] text-4xl font-bold mb-2">100+</div>
                  <div className="text-gray-300">Workout Programs</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl">
                  <div className="text-[#AAFF00] text-4xl font-bold mb-2">12k+</div>
                  <div className="text-gray-300">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-black py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-[#AAFF00]">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-6 rounded-xl hover:border hover:border-[#AAFF00]/50 transition-all">
              <div className="bg-[#AAFF00] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Workouts</h3>
              <p className="text-gray-400">
                Custom training programs designed specifically for your body type, fitness level, and goals.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl hover:border hover:border-[#AAFF00]/50 transition-all">
              <div className="bg-[#AAFF00] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Coaching</h3>
              <p className="text-gray-400">
                Access to certified trainers who provide guidance, motivation, and accountability.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl hover:border hover:border-[#AAFF00]/50 transition-all">
              <div className="bg-[#AAFF00] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Nutrition Plans</h3>
              <p className="text-gray-400">
                Customized meal plans that complement your workouts and help you achieve optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={serviceRef} className="bg-zinc-900 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-[#AAFF00]">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="bg-[#AAFF00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-black">
                  1
                </span>
                Personal Training
              </h3>
              <p className="text-gray-300 mb-4">
                One-on-one sessions with expert trainers who will guide you through personalized workouts designed to
                help you reach your specific fitness goals.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Customized workout plans
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Form correction and technique guidance
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Progress tracking and adjustments
                </li>
              </ul>
            </div>
            <div className="bg-black p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="bg-[#AAFF00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-black">
                  2
                </span>
                Group Classes
              </h3>
              <p className="text-gray-300 mb-4">
                High-energy group sessions led by motivating instructors. Experience the power of community while
                getting an effective workout.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> HIIT, yoga, strength, and more
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Supportive community atmosphere
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Flexible scheduling options
                </li>
              </ul>
            </div>
            <div className="bg-black p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="bg-[#AAFF00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-black">
                  3
                </span>
                Nutrition Coaching
              </h3>
              <p className="text-gray-300 mb-4">
                Expert guidance on nutrition to complement your fitness routine and maximize your results.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Personalized meal planning
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Nutritional education and guidance
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Supplement recommendations
                </li>
              </ul>
            </div>
            <div className="bg-black p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="bg-[#AAFF00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-black">
                  4
                </span>
                Online Coaching
              </h3>
              <p className="text-gray-300 mb-4">
                Access our expert training and nutrition guidance from anywhere in the world.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Remote workout programs
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> Video consultations
                </li>
                <li className="flex items-center">
                  <span className="text-[#AAFF00] mr-2">✓</span> 24/7 messaging support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Section */}
      <section ref={exerciseRef} className="bg-black py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured <span className="text-[#AAFF00]">Exercises</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 rounded-xl overflow-hidden">
              <div className="p-4 bg-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#AAFF00] text-xs font-medium">15 min</span>
                  <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-md">shoulders</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">
                  A compound exercise that primarily targets the hamstrings, lower back, and glutes. Stand with feet
                  shoulder-width apart, bend at the hips while keeping your back straight, then return to starting
                  position.
                </p>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium">Good Morning</h3>
                  <span className="text-[#AAFF00] font-bold">39k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md mr-2">Medium</span>
                    <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md">20 reps</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl overflow-hidden">
              <div className="p-4 bg-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#AAFF00] text-xs font-medium">12 min</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-md">lower back</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">
                  Strengthens the erector spinae muscles. Sit on the machine with your back against the pad, then extend
                  backward against resistance, focusing on contracting your lower back muscles.
                </p>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium">Seated Back Extension</h3>
                  <span className="text-[#AAFF00] font-bold">31k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md mr-2">Medium</span>
                    <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md">15 reps</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl overflow-hidden">
              <div className="p-4 bg-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#AAFF00] text-xs font-medium">10 min</span>
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-md">back</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">
                  A challenging upper body exercise that targets the lats, biceps, and shoulders. Hang from a bar with
                  palms facing away, then pull your body up until your chin is over the bar.
                </p>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium">Pull Ups</h3>
                  <span className="text-[#AAFF00] font-bold">27k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md mr-2">Hard</span>
                    <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-md">12 reps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleStartClick}
              className="bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#AAFF00]/90 transition-colors"
            >
              View All Exercises
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Contact Us</h3>
                <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Message</label>
                  <textarea
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#AAFF00] h-32"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full bg-[#AAFF00] text-black py-3 rounded-lg font-medium hover:bg-[#AAFF00]/90 transition-colors"
                  onClick={() => {
                    alert("Message sent! We'll get back to you soon.")
                    setShowContactModal(false)
                  }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}


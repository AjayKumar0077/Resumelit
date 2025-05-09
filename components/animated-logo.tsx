"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function AnimatedLogo({ size = "md", className = "" }: AnimatedLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)

  // Size mapping
  const sizeMap = {
    sm: {
      container: "h-8 w-8",
      text: "text-lg ml-2",
    },
    md: {
      container: "h-10 w-10",
      text: "text-xl ml-2",
    },
    lg: {
      container: "h-12 w-12",
      text: "text-2xl ml-3",
    },
    xl: {
      container: "h-16 w-16",
      text: "text-3xl ml-3",
    },
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  return (
    <motion.div
      className={`flex items-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      ref={logoRef}
    >
      <motion.div
        className={`relative ${sizeMap[size].container} bg-gradient-to-br from-purple-500 to-indigo-700 rounded-lg flex items-center justify-center overflow-hidden`}
        variants={iconVariants}
        whileHover={pulseAnimation}
      >
        <motion.div
          className="absolute inset-0 bg-white opacity-20"
          animate={{
            background: [
              "linear-gradient(0deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)",
              "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)",
              "linear-gradient(360deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <span className="text-white font-bold">R</span>
      </motion.div>

      <div className={`flex ${sizeMap[size].text} font-bold`}>
        {Array.from("RESUMELIT").map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={index < 6 ? "text-purple-600 dark:text-purple-400" : "text-indigo-800 dark:text-indigo-300"}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

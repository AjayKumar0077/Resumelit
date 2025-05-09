"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, MessageSquare, Upload, CheckCircle, Zap, Shield } from "lucide-react"
import EnhancedLogo from "@/components/enhanced-logo"
import EnhancedHeader from "@/components/enhanced-header"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedHeader transparent={true} />

      <main className="flex-1">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-purple-50/50 to-transparent dark:from-purple-900/20 dark:to-transparent z-0"></div>
          <div className="container relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="mb-6 flex justify-center"
              >
                <EnhancedLogo size="xl" />
              </motion.div>
              <motion.h1
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6 gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Build Stunning Resumes with AI
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Create professional, ATS-optimized resumes in minutes with our AI-powered tools. Stand out to recruiters
                and land your dream job.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 hover:from-purple-700 hover:via-fuchsia-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16 relative">
              <span className="gradient-text">Three Ways to Build Your Perfect Resume</span>
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 rounded-full"></span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-purple-600" />}
                title="Chat-based Builder"
                description="Have a conversation with our AI assistant that guides you through building your resume step by step."
                delay={0.3}
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-purple-600" />}
                title="Form-based Generator"
                description="Fill in your information in a structured form and let our AI generate a professionally formatted resume."
                delay={0.5}
              />
              <FeatureCard
                icon={<Upload className="h-10 w-10 text-purple-600" />}
                title="Auto-scan AI"
                description="Upload your existing resume or LinkedIn profile and our AI will enhance and reformat it to be ATS-friendly."
                delay={0.7}
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16 relative">
              <span className="gradient-text">Why Choose RESUMELIT</span>
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 rounded-full"></span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Zap className="h-8 w-8 text-yellow-500" />}
                title="Powered by Gemini AI"
                description="Our advanced AI understands job requirements and helps you create tailored, impactful resumes."
                delay={0.3}
              />
              <BenefitCard
                icon={<CheckCircle className="h-8 w-8 text-green-500" />}
                title="ATS-Optimized"
                description="Ensure your resume passes through Applicant Tracking Systems with our optimized templates and keywords."
                delay={0.5}
              />
              <BenefitCard
                icon={<Shield className="h-8 w-8 text-blue-500" />}
                title="Secure & Private"
                description="Your data is encrypted and never shared. We prioritize your privacy and security."
                delay={0.7}
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Ready to Land Your Dream Job?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Join thousands of job seekers who have successfully created ATS-optimized resumes with RESUMELIT.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 hover:from-purple-700 hover:via-fuchsia-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Your Resume Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
        <div className="container text-center text-gray-500 dark:text-gray-400">
          <EnhancedLogo size="sm" className="mx-auto mb-4" />
          <p>© {new Date().getFullYear()} RESUMELIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 rounded-lg glass shadow-glass hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="mb-4 p-3 rounded-full bg-purple-100/50 dark:bg-purple-900/30 shadow-glow"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

function BenefitCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      className="p-6 rounded-lg glass shadow-glass hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="mb-4"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

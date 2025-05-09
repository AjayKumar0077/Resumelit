"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, FileText, BarChart4, Settings, User } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui-theme"

interface DashboardHeaderProps {
  onLogout: () => void
}

export default function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-glow"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">R</div>
            </div>
            <span className="hidden md:inline-block text-xl font-bold gradient-text">RESUMELIT</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/builder/form" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Create Resume
          </Link>
          <Link href="/resume-analysis" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Resume Analysis
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Templates
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" onClick={onLogout} className="hidden md:flex">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b"
          >
            <div className="container py-4 space-y-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5 text-purple-600" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/builder/form"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5 text-purple-600" />
                <span>Create Resume</span>
              </Link>
              <Link
                href="/resume-analysis"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart4 className="h-5 w-5 text-purple-600" />
                <span>Resume Analysis</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5 text-purple-600" />
                <span>Templates</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 text-purple-600" />
                <span>Settings</span>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onLogout()
                }}
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

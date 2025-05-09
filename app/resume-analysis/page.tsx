"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, BarChart, Target, Briefcase, History } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/dashboard-header"
import CustomAnalysisCriteria, { type AnalysisCriteria } from "@/components/custom-analysis-criteria"
import EnhancedJobMatcher from "@/components/enhanced-job-matcher"
import IndustryAnalysis from "@/components/industry-analysis"
import HistoricalAnalysis from "@/components/historical-analysis"
import { getResumeById } from "@/lib/resume-storage"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResumeAnalysisPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumeId = searchParams?.get("id") || ""

  const [resumeData, setResumeData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [analysisCriteria, setAnalysisCriteria] = useState<AnalysisCriteria>({
    content: true,
    format: true,
    impact: true,
    relevance: true,
    keywords: true,
    ats: false,
    readability: false,
    grammar: false,
    industryFit: false,
    careerLevel: false,
  })

  useEffect(() => {
    const fetchResume = async () => {
      setIsLoading(true)
      try {
        if (resumeId) {
          const resume = await getResumeById(resumeId)
          if (resume) {
            setResumeData(resume.data)
          } else {
            // If no resume found, use mock data
            setResumeData(getMockResumeData())
          }
        } else {
          // If no ID provided, use mock data
          setResumeData(getMockResumeData())
        }
      } catch (error) {
        console.error("Error fetching resume:", error)
        setResumeData(getMockResumeData())
      } finally {
        setIsLoading(false)
      }
    }

    fetchResume()
  }, [resumeId])

  const getMockResumeData = () => {
    return {
      personalInfo: {
        fullName: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/alexjohnson",
        website: "alexjohnson.dev",
      },
      summary:
        "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Skilled in JavaScript, React, and Node.js with a strong focus on user experience and performance optimization.",
      experiences: [
        {
          id: "exp-1",
          company: "Tech Innovations Inc.",
          position: "Senior Frontend Developer",
          startDate: "Jan 2020",
          endDate: "Present",
          description:
            "Led development of the company's flagship SaaS product, improving performance by 40%. Mentored junior developers and implemented modern CI/CD practices.",
        },
        {
          id: "exp-2",
          company: "WebSolutions Co.",
          position: "Frontend Developer",
          startDate: "Mar 2017",
          endDate: "Dec 2019",
          description:
            "Developed responsive web applications using React and Redux. Collaborated with UX designers to implement user-friendly interfaces.",
        },
      ],
      education: [
        {
          id: "edu-1",
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2013",
          endDate: "2017",
        },
      ],
      skills:
        "JavaScript, TypeScript, React, Redux, Node.js, Express, HTML, CSS, Tailwind CSS, Git, CI/CD, Jest, Testing Library, Agile Methodologies",
    }
  }

  const handleCriteriaChange = (criteria: AnalysisCriteria) => {
    setAnalysisCriteria(criteria)
    // In a real app, this would trigger a new analysis with the selected criteria
  }

  const handleLogout = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader onLogout={handleLogout} />
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="inline-block rounded-full h-12 w-12 border-4 border-t-purple-600 border-purple-200 animate-spin"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader onLogout={handleLogout} />

      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Resume Analysis</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Comprehensive analysis and optimization for your resume
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Resume Overview
              </CardTitle>
              <CardDescription>
                {resumeData.personalInfo.fullName} • {resumeData.personalInfo.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Current Position</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {resumeData.experiences[0]?.position} at {resumeData.experiences[0]?.company}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Experience</h3>
                  <p className="text-gray-700 dark:text-gray-300">{resumeData.experiences.length} positions</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Skills</h3>
                  <p className="text-gray-700 dark:text-gray-300 truncate">
                    {resumeData.skills.split(",").slice(0, 3).join(", ")}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="criteria" className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="criteria" className="data-[state=active]:gradient-text">
              <BarChart className="h-4 w-4 mr-2" />
              Analysis Criteria
            </TabsTrigger>
            <TabsTrigger value="job-match" className="data-[state=active]:gradient-text">
              <Target className="h-4 w-4 mr-2" />
              Job Matching
            </TabsTrigger>
            <TabsTrigger value="industry" className="data-[state=active]:gradient-text">
              <Briefcase className="h-4 w-4 mr-2" />
              Industry Analysis
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:gradient-text">
              <History className="h-4 w-4 mr-2" />
              Historical Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="criteria">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CustomAnalysisCriteria defaultCriteria={analysisCriteria} onCriteriaChange={handleCriteriaChange} />
            </motion.div>
          </TabsContent>

          <TabsContent value="job-match">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <EnhancedJobMatcher resumeData={resumeData} />
            </motion.div>
          </TabsContent>

          <TabsContent value="industry">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <IndustryAnalysis resumeData={resumeData} />
            </motion.div>
          </TabsContent>

          <TabsContent value="history">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <HistoricalAnalysis resumeId={resumeId || "mock-resume-id"} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6 glass">
        <div className="container text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} RESUMELIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

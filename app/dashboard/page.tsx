"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Upload, Plus, LogOut, Download, Trash, FileEdit } from "lucide-react"
import { getUserResumes, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import LanguageSelector from "@/components/language-selector"
import CoverLetterGenerator from "@/components/cover-letter-generator"
import LinkedInImport from "@/components/linkedin-import"
import ResumeStrengthMeter from "@/components/resume-strength-meter"
import { motion } from "framer-motion"

type Resume = {
  id: string
  title: string
  createdAt: string
  lastUpdated: string
  method: "chat" | "form" | "upload"
}

export default function DashboardPage() {
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState("en")
  const [activeTab, setActiveTab] = useState("create")
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // In a real app, this would fetch from an API
        const data = await getUserResumes()
        setResumes(data)
      } catch (error) {
        console.error("Failed to fetch resumes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumes()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  // Add a function to handle resume deletion
  const handleDeleteResume = (id: string) => {
    // In a real app, this would call an API to delete the resume
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    // In a real app, we would update the UI language here
  }

  const handleLinkedInImport = (data: any) => {
    // In a real app, we would process the LinkedIn data and create a new resume
    console.log("LinkedIn data imported:", data)
    // For demo purposes, let's add a mock resume
    const newResume = {
      id: `resume-${resumes.length + 1}`,
      title: "LinkedIn Imported Resume",
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      method: "upload" as const,
    }
    setResumes([...resumes, newResume])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader onLogout={handleLogout} />

      <main className="flex-1 container py-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your resumes and create new ones</p>
          </div>
          <div className="flex gap-2">
            <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />
            <Button variant="outline" onClick={handleLogout} className="md:hidden">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="create" className="data-[state=active]:gradient-text">
              Create New
            </TabsTrigger>
            <TabsTrigger value="my-resumes" className="data-[state=active]:gradient-text">
              My Resumes
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:gradient-text">
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Link href="/builder/chat" className="block h-full">
                  <Card className="h-full glass card-hover">
                    <CardHeader>
                      <div className="p-3 rounded-full bg-purple-100/50 dark:bg-purple-900/30 shadow-glow w-fit">
                        <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="mt-4 gradient-text">Chat-based Builder</CardTitle>
                      <CardDescription>Build your resume through a guided conversation with AI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Perfect for those who prefer a conversational approach. Our AI will ask you questions and build
                        your resume step by step.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full btn-gradient">
                        <Plus className="h-4 w-4 mr-2" /> Start Chat Builder
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link href="/builder/form" className="block h-full">
                  <Card className="h-full glass card-hover">
                    <CardHeader>
                      <div className="p-3 rounded-full bg-fuchsia-100/50 dark:bg-fuchsia-900/30 shadow-glow w-fit">
                        <FileText className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400" />
                      </div>
                      <CardTitle className="mt-4 gradient-text">Form-based Generator</CardTitle>
                      <CardDescription>Fill in structured forms to generate your resume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ideal for those who know exactly what information they want to include. Fill in forms and let AI
                        format it professionally.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full btn-gradient">
                        <Plus className="h-4 w-4 mr-2" /> Start Form Builder
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link href="/builder/upload" className="block h-full">
                  <Card className="h-full glass card-hover">
                    <CardHeader>
                      <div className="p-3 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 shadow-glow w-fit">
                        <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle className="mt-4 gradient-text">Auto-scan AI</CardTitle>
                      <CardDescription>Upload existing resume or LinkedIn profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Already have a resume or LinkedIn profile? Upload it and our AI will enhance and reformat it to
                        be ATS-friendly.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full btn-gradient">
                        <Plus className="h-4 w-4 mr-2" /> Upload Existing
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="my-resumes">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block rounded-full h-12 w-12 border-4 border-t-purple-600 border-purple-200 animate-spin"></div>
                <p className="text-sm text-gray-500 mt-4">Loading your resumes...</p>
              </div>
            ) : resumes.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    handleDeleteResume={handleDeleteResume}
                    onSelect={() => setSelectedResume(resume)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 rounded-full bg-purple-100/50 dark:bg-purple-900/30 shadow-glow w-fit mx-auto mb-6">
                  <FileText className="h-12 w-12 text-purple-300 dark:text-purple-600" />
                </div>
                <h3 className="text-lg font-medium mb-2 gradient-text">No resumes yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  You haven&apos;t created any resumes yet. Choose one of our builder methods to get started.
                </p>
                <Button onClick={() => setActiveTab("create")} className="btn-gradient">
                  Create Your First Resume
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <CoverLetterGenerator
                  resumeData={
                    // Mock resume data for demo purposes
                    {
                      personalInfo: {
                        fullName: "John Doe",
                        email: "john.doe@example.com",
                        phone: "(555) 123-4567",
                        location: "San Francisco, CA",
                        linkedin: "linkedin.com/in/johndoe",
                        website: "johndoe.com",
                      },
                      summary: "Experienced software engineer with a passion for building scalable web applications.",
                      experiences: [
                        {
                          id: "exp-1",
                          company: "Tech Company",
                          position: "Senior Software Engineer",
                          startDate: "Jan 2020",
                          endDate: "Present",
                          description: "Led development of key features and mentored junior developers.",
                        },
                      ],
                      education: [
                        {
                          id: "edu-1",
                          institution: "University of Technology",
                          degree: "Bachelor of Science",
                          field: "Computer Science",
                          startDate: "2014",
                          endDate: "2018",
                        },
                      ],
                      skills: "JavaScript, React, Node.js, TypeScript, AWS",
                    }
                  }
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <LinkedInImport onImportSuccess={handleLinkedInImport} />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <ResumeStrengthMeter
                resumeData={
                  // Mock resume data for demo purposes
                  {
                    personalInfo: {
                      fullName: "John Doe",
                      email: "john.doe@example.com",
                      phone: "(555) 123-4567",
                      location: "San Francisco, CA",
                      linkedin: "linkedin.com/in/johndoe",
                      website: "johndoe.com",
                    },
                    summary: "Experienced software engineer with a passion for building scalable web applications.",
                    experiences: [
                      {
                        id: "exp-1",
                        company: "Tech Company",
                        position: "Senior Software Engineer",
                        startDate: "Jan 2020",
                        endDate: "Present",
                        description: "Led development of key features and mentored junior developers.",
                      },
                    ],
                    education: [
                      {
                        id: "edu-1",
                        institution: "University of Technology",
                        degree: "Bachelor of Science",
                        field: "Computer Science",
                        startDate: "2014",
                        endDate: "2018",
                      },
                    ],
                    skills: "JavaScript, React, Node.js, TypeScript, AWS",
                  }
                }
                jobTitle="Software Engineer"
              />
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

function ResumeCard({
  resume,
  handleDeleteResume,
  onSelect,
}: {
  resume: Resume
  handleDeleteResume: (id: string) => void
  onSelect: () => void
}) {
  const methodIcons = {
    chat: <MessageSquare className="h-4 w-4" />,
    form: <FileText className="h-4 w-4" />,
    upload: <Upload className="h-4 w-4" />,
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="glass card-hover overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600"></div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg gradient-text">{resume.title}</CardTitle>
            <div className="flex items-center gap-1 text-xs glass px-2 py-1 rounded-full">
              {methodIcons[resume.method]}
              <span className="capitalize">{resume.method}</span>
            </div>
          </div>
          <CardDescription>Last updated: {new Date(resume.lastUpdated).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSelect} className="btn-outline-glow">
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-white hover:bg-red-500 border-red-500"
              onClick={() => handleDeleteResume(resume.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="btn-outline-glow">
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
            <Button size="sm" className="btn-gradient">
              <FileEdit className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

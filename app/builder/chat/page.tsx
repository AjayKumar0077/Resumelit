"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, FileText, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import { generatePDF } from "@/lib/pdf-generator"
import VoiceInput from "@/components/voice-input"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function ChatBuilderPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are an expert resume builder assistant. Guide the user through creating an ATS-friendly resume step by step.",
    },
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI resume assistant. I'll help you create an ATS-friendly resume step by step. Let's start with the basics. What's your full name?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resumeComplete, setResumeComplete] = useState(false)
  const [resumeContent, setResumeContent] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add a state for the template
  const [template, setTemplate] = useState("modern")

  // Track conversation state
  const [conversationState, setConversationState] = useState({
    hasName: false,
    hasExperience: false,
    hasEducation: false,
    hasSkills: false,
    name: "",
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Use mock responses for preview (no API dependency)
      const responseText = generateMockResponse(input, conversationState)

      // Update conversation state based on user input and current state
      const newState = { ...conversationState }

      if (!newState.hasName) {
        newState.hasName = true
        newState.name = input
      } else if (!newState.hasExperience) {
        newState.hasExperience = true
      } else if (!newState.hasEducation) {
        newState.hasEducation = true
      } else if (!newState.hasSkills) {
        newState.hasSkills = true
      }

      setConversationState(newState)

      // Check if the resume is complete based on conversation state
      if (newState.hasName && newState.hasExperience && newState.hasEducation && newState.hasSkills) {
        setResumeComplete(true)
        // Generate the resume content
        setResumeContent(generateSampleResume(newState.name))
      }

      // Add a small delay to simulate AI thinking
      setTimeout(() => {
        const assistantMessage: Message = { role: "assistant", content: responseText }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
      setIsLoading(false)
    }
  }

  // Function to generate mock responses for preview purposes
  function generateMockResponse(userInput: string, state: typeof conversationState): string {
    // Basic conversation flow based on state
    if (!state.hasName) {
      return "Great! Now, tell me about your most recent work experience. What was your job title, company name, and what were your main responsibilities?"
    } else if (!state.hasExperience) {
      return "Excellent! Now let's add your education. What's your highest level of education, the institution name, and graduation year?"
    } else if (!state.hasEducation) {
      return "Great! Now, what are your key skills and technical proficiencies that you'd like to highlight on your resume?"
    } else if (!state.hasSkills) {
      return "Perfect! I've gathered all the necessary information. Here's your completed resume based on what you've shared. You can download it as a PDF or make further edits if needed."
    }

    // Default response
    return "Thank you for that information. What else would you like to add to your resume?"
  }

  // Add a function to handle PDF download
  const handleDownloadPDF = async () => {
    try {
      // Dynamically import generatePDF to avoid SSR issues
      const { generatePDF } = await import("../../../lib/pdf-generator")
      // Use name from state for filename
      const name = conversationState.name || "Resume"
      await generatePDF("resume-preview", `${name.replace(/\s+/g, "_")}_Resume.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript)
    setIsListening(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader onLogout={() => console.log("User logged out")} />

      <main className="flex-1 container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Chat-based Resume Builder</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col">
            <Card className="flex-1 p-4 mb-4 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages
                  .filter((m) => m.role !== "system")
                  .map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "assistant"
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading || resumeComplete}
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <VoiceInput
                      onTranscript={handleVoiceInput}
                      isListening={isListening}
                      disabled={isLoading || resumeComplete}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim() || resumeComplete}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? "..." : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-emerald-600" />
                <h2 className="font-semibold">Resume Preview</h2>
              </div>

              {resumeComplete ? (
                <div className="space-y-4">
                  <div id="resume-preview" className="border rounded-md p-4 h-96 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: resumeContent }} />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline">Edit</Button>
                    <Button onClick={handleDownloadPDF} className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>Your resume preview will appear here once you complete the chat process.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Helper function to generate a sample resume based on name
function generateSampleResume(name: string): string {
  // Use the provided name or default to John Doe
  const displayName = name.trim() ? name : "John Doe"

  return `
    <div style="font-family: Arial, sans-serif;">
      <h1 style="color: #333; margin-bottom: 5px;">${displayName}</h1>
      <p style="color: #666; margin-top: 0;">Software Engineer</p>
      <p>Email: ${displayName.toLowerCase().replace(/\s+/g, ".")}@example.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/${displayName.toLowerCase().replace(/\s+/g, "")}</p>
      
      <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Summary</h2>
      <p>Experienced software engineer with 5+ years of experience in full-stack development. Proficient in JavaScript, React, and Node.js.</p>
      
      <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Experience</h2>
      <h3 style="margin-bottom: 5px;">Senior Software Engineer - Tech Company</h3>
      <p style="color: #666; margin-top: 0;">January 2020 - Present</p>
      <ul>
        <li>Developed and maintained web applications using React and Node.js</li>
        <li>Improved application performance by 40% through code optimization</li>
        <li>Led a team of 5 developers on a major product launch</li>
      </ul>
      
      <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Education</h2>
      <h3 style="margin-bottom: 5px;">Bachelor of Science in Computer Science</h3>
      <p style="color: #666; margin-top: 0;">University of Technology, 2018</p>
      
      <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Skills</h2>
      <p>JavaScript, React, Node.js, TypeScript, HTML, CSS, Git, AWS</p>
    </div>
  `
}

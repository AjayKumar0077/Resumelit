"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Loader2, Sparkles } from "lucide-react"
import { generateCoverLetterWithGemini } from "@/lib/ai-service"
import { motion } from "framer-motion"

interface CoverLetterGeneratorProps {
  resumeData: any
}

export default function CoverLetterGenerator({ resumeData }: CoverLetterGeneratorProps) {
  const [jobTitle, setJobTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const generateCoverLetter = async () => {
    setIsGenerating(true)
    setError("")
    setCoverLetter("")

    try {
      if (!resumeData) {
        setError("No resume data available.")
        return
      }

      const resumeText = `
        Name: ${resumeData.personalInfo.fullName}
        Summary: ${resumeData.summary}
        
        Experience:
        ${resumeData.experiences
          .map(
            (exp: any) =>
              `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})
           ${exp.description}`,
          )
          .join("\n\n")}
        
        Education:
        ${resumeData.education
          .map(
            (edu: any) => `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`,
          )
          .join("\n")}
        
        Skills:
        ${resumeData.skills}
      `

      const generatedLetter = await generateCoverLetterWithGemini(
        resumeText,
        jobTitle,
        companyName,
        "", // jobDescription
        recipientName,
        additionalInfo,
      )

      setCoverLetter(generatedLetter)
    } catch (err: any) {
      console.error("Error generating cover letter:", err)
      setError(err.message || "Failed to generate cover letter. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          <span className="gradient-text">Cover Letter Generator</span>
        </CardTitle>
        <CardDescription>Generate a personalized cover letter based on your resume and job details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="jobTitle" className="text-sm font-medium block">
              Job Title
            </label>
            <Input
              type="text"
              id="jobTitle"
              placeholder="e.g., Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="glass"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium block">
              Company Name
            </label>
            <Input
              type="text"
              id="companyName"
              placeholder="e.g., Google"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="glass"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="recipientName" className="text-sm font-medium block">
              Recipient Name (Optional)
            </label>
            <Input
              type="text"
              id="recipientName"
              placeholder="e.g., Hiring Manager"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="glass"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="additionalInfo" className="text-sm font-medium block">
            Additional Information (Optional)
          </label>
          <Textarea
            id="additionalInfo"
            placeholder="e.g., Specific achievements, projects, or skills"
            rows={3}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="glass"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 text-sm bg-red-50/50 text-red-600 rounded-md glass"
          >
            {error}
          </motion.div>
        )}

        {coverLetter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-2 glass border border-purple-200/30 dark:border-purple-800/30 rounded-md p-4"
          >
            <h3 className="text-sm font-medium gradient-text">Generated Cover Letter</h3>
            <Textarea
              readOnly
              value={coverLetter}
              className="min-h-[200px] font-mono text-sm glass"
              style={{ whiteSpace: "pre-wrap" }}
            />
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={generateCoverLetter}
          disabled={isGenerating || !jobTitle || !companyName}
          className="w-full btn-gradient"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Cover Letter
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

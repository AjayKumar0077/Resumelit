"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChartIcon as ChartBar, AlertCircle, CheckCircle, Info } from "lucide-react"
import { analyzeResumeWithGemini } from "@/lib/ai-service"
import { motion } from "framer-motion"

interface ResumeStrengthMeterProps {
  resumeData: any
  jobTitle?: string
}

interface StrengthAnalysis {
  overallScore: number
  categoryScores: {
    content: number
    format: number
    impact: number
    relevance: number
    keywords: number
  }
  strengths: string[]
  weaknesses: string[]
  keywords: string[]
}

export default function ResumeStrengthMeter({ resumeData, jobTitle }: ResumeStrengthMeterProps) {
  const [analysis, setAnalysis] = useState<StrengthAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (resumeData && Object.keys(resumeData).length > 0) {
      analyzeResume()
    }
  }, [resumeData])

  const analyzeResume = async () => {
    setIsAnalyzing(true)
    setError("")

    try {
      // Format resume data for the AI
      const resumeText = `
        Name: ${resumeData.personalInfo.fullName}
        Email: ${resumeData.personalInfo.email}
        Phone: ${resumeData.personalInfo.phone}
        Location: ${resumeData.personalInfo.location}
        
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

      // Add a small delay to simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      try {
        const result = await analyzeResumeWithGemini(resumeText, jobTitle)
        setAnalysis(result)
      } catch (e) {
        console.error("Failed to analyze with AI:", e)
        throw e
      }
    } catch (err) {
      console.error("Error analyzing resume strength:", err)
      setError("Failed to analyze resume strength. Using sample analysis instead.")
      // Use mock data as fallback
      setAnalysis(getMockAnalysis())
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getMockAnalysis = (): StrengthAnalysis => {
    return {
      overallScore: 78,
      categoryScores: {
        content: 85,
        format: 70,
        impact: 75,
        relevance: 80,
        keywords: 80,
      },
      strengths: [
        "Strong technical skills section with relevant technologies",
        "Quantifiable achievements in work experience",
        "Clear progression of career growth",
        "Well-structured education section",
      ],
      weaknesses: [
        "Summary could be more targeted to specific roles",
        "Some bullet points lack specific metrics or outcomes",
        "Could use more industry-specific keywords",
        "Experience descriptions could highlight more soft skills",
      ],
      keywords: [
        "JavaScript",
        "React",
        "Node.js",
        "Software Engineer",
        "Full Stack",
        "API",
        "Optimization",
        "Development",
        "Agile",
      ],
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500"
    if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-amber-500"
    return "bg-gradient-to-r from-red-500 to-rose-500"
  }

  if (isAnalyzing) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-purple-600" />
            Resume Strength Analysis
          </CardTitle>
          <CardDescription>Analyzing your resume...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <div className="text-center">
            <motion.div
              className="inline-block rounded-full h-12 w-12 border-4 border-t-purple-600 border-purple-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-sm text-gray-500 mt-4">This may take a moment</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error && !analysis) {
    return (
      <Card className="glass border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-purple-600" />
            Resume Strength Analysis
          </CardTitle>
          <CardDescription>There was an error analyzing your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-red-600 mb-4">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
          <Button onClick={analyzeResume} className="btn-gradient">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return null
  }

  return (
    <Card className="glass overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50/30 to-indigo-50/30 dark:from-purple-950/30 dark:to-indigo-950/30">
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-purple-600" />
          Resume Strength Analysis
        </CardTitle>
        <CardDescription>AI-powered analysis of your resume's effectiveness</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className={`text-4xl font-bold mb-2 flex items-center gap-2 ${getScoreColor(analysis.overallScore)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            >
              {analysis.overallScore}
              <span className="text-base font-normal text-gray-500">/100</span>
            </motion.div>
            <motion.div
              className="absolute -z-10 inset-0 blur-lg rounded-full opacity-20"
              style={{
                backgroundColor:
                  analysis.overallScore >= 80 ? "#22c55e" : analysis.overallScore >= 60 ? "#eab308" : "#ef4444",
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">Overall Resume Strength</p>
          <motion.div
            className="w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Progress
              value={analysis.overallScore}
              className="w-full h-2"
              indicatorClassName={getScoreProgressColor(analysis.overallScore)}
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-medium mb-3 gradient-text">Category Scores</h3>
            <div className="space-y-3">
              {Object.entries(analysis.categoryScores).map(([category, score], index) => (
                <motion.div
                  key={category}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-sm capitalize">{category}</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={score as number}
                      className="w-24 h-2"
                      indicatorClassName={getScoreProgressColor(score as number)}
                    />
                    <span className={`text-sm font-medium ${getScoreColor(score as number)}`}>{score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-medium mb-3 gradient-text">Keywords Found</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-purple-50/50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                  >
                    {keyword}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium flex items-center gap-1 mb-3 gradient-text">
              <CheckCircle className="h-4 w-4 text-green-500" /> Strengths
            </h3>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {analysis.strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  {strength}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="glass p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium flex items-center gap-1 mb-3 gradient-text">
              <Info className="h-4 w-4 text-amber-500" /> Areas for Improvement
            </h3>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {analysis.weaknesses.map((weakness, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  {weakness}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

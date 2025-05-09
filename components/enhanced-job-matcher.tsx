"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Target, Zap, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface EnhancedJobMatcherProps {
  resumeData: any
}

interface MatchResult {
  score: number
  matches: string[]
  missingSkills: string[]
  suggestions: string[]
  keywordMatches: Record<string, boolean>
  tailoringTips: string[]
  competitiveAnalysis?: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
  }
}

export default function EnhancedJobMatcher({ resumeData }: EnhancedJobMatcherProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResults, setMatchResults] = useState<MatchResult | null>(null)
  const [savedJobs, setSavedJobs] = useState<{ id: string; title: string; company: string }[]>([])
  const [activeTab, setActiveTab] = useState("analysis")

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    const savedJobsData = localStorage.getItem("savedJobs")
    if (savedJobsData) {
      try {
        setSavedJobs(JSON.parse(savedJobsData))
      } catch (e) {
        console.error("Failed to parse saved jobs:", e)
      }
    }
  }, [])

  const analyzeMatch = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)

    try {
      // Format resume data for the AI
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

      try {
        // In a real implementation, this would call the OpenAI API
        // For demo purposes, we'll simulate a response after a delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock response for preview
        const mockResult: MatchResult = {
          score: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
          matches: [
            "JavaScript development",
            "React experience",
            "Team collaboration",
            "Problem-solving skills",
            "Project management",
          ],
          missingSkills: ["TypeScript", "GraphQL", "CI/CD experience", "AWS cloud services"],
          suggestions: [
            "Highlight your React project experience more prominently",
            "Quantify your achievements with specific metrics",
            "Add more details about your collaborative work style",
            "Mention any TypeScript exposure you might have",
            "Include relevant certifications if available",
          ],
          keywordMatches: {
            JavaScript: true,
            React: true,
            "Node.js": true,
            TypeScript: false,
            GraphQL: false,
            AWS: false,
            "CI/CD": false,
            Agile: true,
            "Team player": true,
          },
          tailoringTips: [
            "Reorganize your experience section to prioritize React development",
            "Use more industry-specific terminology from the job description",
            "Adapt your summary to specifically address the company's needs",
            "Consider adding a projects section highlighting relevant work",
          ],
        }

        // Add competitive analysis if company name is provided
        if (company) {
          mockResult.competitiveAnalysis = {
            strengths: [
              "Strong technical foundation in required technologies",
              "Proven experience in similar roles",
              "Demonstrated problem-solving abilities",
            ],
            weaknesses: [
              "Missing some specific technical skills mentioned",
              "Experience level might be different from ideal candidate",
            ],
            opportunities: [
              "Company is expanding their technical team",
              "Your unique background in both development and design is valuable",
              "Your experience with similar products is relevant",
            ],
          }
        }

        setMatchResults(mockResult)

        // Save job for historical tracking
        if (jobTitle && company) {
          const newJob = {
            id: Date.now().toString(),
            title: jobTitle,
            company: company,
          }

          const updatedJobs = [...savedJobs, newJob]
          setSavedJobs(updatedJobs)
          localStorage.setItem("savedJobs", JSON.stringify(updatedJobs))

          // Save match result in localStorage
          localStorage.setItem(
            `jobMatch_${newJob.id}`,
            JSON.stringify({
              date: new Date().toISOString(),
              score: mockResult.score,
              jobDescription,
              jobTitle,
              company,
            }),
          )
        }
      } catch (e) {
        console.error("Failed to analyze job match:", e)
      }
    } catch (error) {
      console.error("Error analyzing job match:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500"
    if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-amber-500"
    return "bg-gradient-to-r from-red-500 to-rose-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-600" />
          Enhanced Job Description Matcher
        </CardTitle>
        <CardDescription>Analyze how well your resume matches specific job descriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="analysis">New Analysis</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="e.g. Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mb-4"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste job description here..."
                className="min-h-[150px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {matchResults && (
              <motion.div
                className="space-y-4 border rounded-md p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Match Analysis</h3>
                  <div className="flex items-center gap-2">
                    <span>Match Score:</span>
                    <span className={`font-bold text-lg ${getScoreColor(matchResults.score)}`}>
                      {matchResults.score}%
                    </span>
                  </div>
                </div>

                <Progress
                  value={matchResults.score}
                  className="h-2 w-full"
                  indicatorClassName={getScoreProgressColor(matchResults.score)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Matching Skills & Experience
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResults.matches.length > 0 ? (
                        matchResults.matches.map((match, i) => (
                          <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {match}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No significant matches found</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResults.missingSkills.length > 0 ? (
                        matchResults.missingSkills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No significant gaps found</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Tailoring Tips
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {matchResults.tailoringTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Keyword Analysis</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(matchResults.keywordMatches).map(([keyword, matched], i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={
                          matched
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {keyword} {matched ? "✓" : "✗"}
                      </Badge>
                    ))}
                  </div>
                </div>

                {matchResults.competitiveAnalysis && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <FileText className="h-4 w-4 text-blue-500" />
                      Competitive Analysis for {company}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">Strengths</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {matchResults.competitiveAnalysis.strengths.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-1">Challenges</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {matchResults.competitiveAnalysis.weaknesses.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-600 mb-1">Opportunities</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {matchResults.competitiveAnalysis.opportunities.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {savedJobs.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Previous Job Analyses</h3>
                <div className="grid grid-cols-1 gap-3">
                  {savedJobs.map((job) => {
                    // Get saved match data
                    const matchDataStr = localStorage.getItem(`jobMatch_${job.id}`)
                    const matchData = matchDataStr ? JSON.parse(matchDataStr) : null

                    return (
                      <div
                        key={job.id}
                        className="p-3 border rounded-md flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          if (matchData) {
                            setJobTitle(matchData.jobTitle)
                            setCompany(matchData.company)
                            setJobDescription(matchData.jobDescription)
                            setActiveTab("analysis")
                          }
                        }}
                      >
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-500">{job.company}</p>
                          {matchData && (
                            <p className="text-xs text-gray-400">{new Date(matchData.date).toLocaleDateString()}</p>
                          )}
                        </div>
                        {matchData && (
                          <Badge className={getScoreColor(matchData.score)}>{matchData.score}% Match</Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No job analyses saved yet</p>
                <p className="text-sm">Analyze a job description to start tracking your matches</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          onClick={analyzeMatch}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Match...
            </>
          ) : (
            "Analyze Match"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

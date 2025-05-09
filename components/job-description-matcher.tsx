"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Target } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface JobDescriptionMatcherProps {
  resumeData: any
}

export default function JobDescriptionMatcher({ resumeData }: JobDescriptionMatcherProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResults, setMatchResults] = useState<{
    score: number
    matches: string[]
    missingSkills: string[]
    suggestions: string[]
  } | null>(null)

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

      // Send to OpenAI for analysis
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Analyze how well the following resume matches the job description. 
          
          RESUME:
          ${resumeText}
          
          JOB DESCRIPTION:
          ${jobDescription}
          
          Provide your analysis in the following JSON format:
          {
            "score": [a number between 0-100 representing match percentage],
            "matches": [array of skills and experiences that match well],
            "missingSkills": [array of skills or qualifications mentioned in the job description that are missing from the resume],
            "suggestions": [array of specific improvements to make the resume more appealing for this job]
          }
          
          Return ONLY the JSON with no additional text.
        `,
        system:
          "You are an expert ATS system and resume analyzer that helps job seekers match their resumes to job descriptions.",
      })

      // Parse the response
      try {
        const result = JSON.parse(text)
        setMatchResults(result)
      } catch (e) {
        console.error("Failed to parse AI response:", e)
        setMatchResults({
          score: 0,
          matches: [],
          missingSkills: [],
          suggestions: ["Failed to analyze match. Please try again."],
        })
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-600" />
          Job Description Matcher
        </CardTitle>
        <CardDescription>Paste a job description to see how well your resume matches</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste job description here..."
          className="min-h-[150px]"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        {matchResults && (
          <div className="space-y-4 border rounded-md p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Match Analysis</h3>
              <div className="flex items-center gap-2">
                <span>Match Score:</span>
                <span className={`font-bold text-lg ${getScoreColor(matchResults.score)}`}>{matchResults.score}%</span>
              </div>
            </div>

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

            <div>
              <h4 className="text-sm font-medium mb-2">Improvement Suggestions</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {matchResults.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
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

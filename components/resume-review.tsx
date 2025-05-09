"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FileText, CheckCircle2 } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface ResumeReviewProps {
  resumeData: any
}

export default function ResumeReview({ resumeData }: ResumeReviewProps) {
  const [resumeText, setResumeText] = useState("")
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResults, setReviewResults] = useState<{
    strengths: string[]
    weaknesses: string[]
    suggestions: string[]
  } | null>(null)

  const handlePasteResume = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value)
  }

  const useCurrentResume = () => {
    // Format current resume data as text
    const formattedResume = `
      ${resumeData.personalInfo.fullName}
      ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
      ${resumeData.personalInfo.linkedin ? resumeData.personalInfo.linkedin : ""}
      ${resumeData.personalInfo.website ? resumeData.personalInfo.website : ""}

      PROFESSIONAL SUMMARY
      ${resumeData.summary}

      EXPERIENCE
      ${resumeData.experiences
        .map(
          (exp: any) =>
            `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})
         ${exp.description}`,
        )
        .join("\n\n")}

      EDUCATION
      ${resumeData.education
        .map((edu: any) => `${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`)
        .join("\n")}

      SKILLS
      ${resumeData.skills}
    `

    setResumeText(formattedResume)
  }

  const reviewResume = async () => {
    if (!resumeText.trim()) return

    setIsReviewing(true)

    try {
      // Send to OpenAI for review
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Review the following resume and provide feedback:
          
          ${resumeText}
          
          Provide your analysis in the following JSON format:
          {
            "strengths": [array of resume strengths],
            "weaknesses": [array of resume weaknesses or areas for improvement],
            "suggestions": [array of specific suggestions to improve the resume]
          }
          
          Return ONLY the JSON with no additional text.
        `,
        system:
          "You are an expert resume reviewer with years of experience in HR and recruiting. Provide honest, constructive feedback to help job seekers improve their resumes.",
      })

      // Parse the response
      try {
        const result = JSON.parse(text)
        setReviewResults(result)
      } catch (e) {
        console.error("Failed to parse AI response:", e)
        setReviewResults({
          strengths: [],
          weaknesses: [],
          suggestions: ["Failed to analyze resume. Please try again."],
        })
      }
    } catch (error) {
      console.error("Error reviewing resume:", error)
    } finally {
      setIsReviewing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          Resume Review
        </CardTitle>
        <CardDescription>Get professional feedback on your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={useCurrentResume}>
            Use Current Resume
          </Button>
        </div>

        <Textarea
          placeholder="Paste your resume text here for review..."
          className="min-h-[200px]"
          value={resumeText}
          onChange={handlePasteResume}
        />

        {reviewResults && (
          <div className="space-y-4 border rounded-md p-4">
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Resume Strengths
              </h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {reviewResults.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">Areas for Improvement</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {reviewResults.weaknesses.map((weakness, i) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Suggestions</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {reviewResults.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={reviewResume}
          disabled={isReviewing || !resumeText.trim()}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {isReviewing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reviewing Resume...
            </>
          ) : (
            "Get Resume Feedback"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sparkles } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface SkillSuggestionsProps {
  jobTitle: string
  currentSkills: string
  onAddSkill: (skill: string) => void
}

export default function SkillSuggestions({ jobTitle, currentSkills, onAddSkill }: SkillSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Static fallback suggestions by job category
  const fallbackSuggestions = {
    developer: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Git",
      "REST APIs",
      "GraphQL",
      "AWS",
      "Docker",
      "CI/CD",
      "Agile",
      "Problem Solving",
    ],
    designer: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "UI/UX",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Visual Design",
      "Typography",
      "Color Theory",
      "Accessibility",
    ],
    manager: [
      "Team Leadership",
      "Project Management",
      "Agile/Scrum",
      "Stakeholder Management",
      "Strategic Planning",
      "Budgeting",
      "Performance Reviews",
      "Conflict Resolution",
    ],
    marketing: [
      "SEO",
      "Content Marketing",
      "Social Media",
      "Email Marketing",
      "Google Analytics",
      "A/B Testing",
      "Marketing Automation",
      "CRM",
      "Copywriting",
      "Brand Strategy",
    ],
    default: [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Time Management",
      "Adaptability",
      "Critical Thinking",
      "Attention to Detail",
      "Microsoft Office",
    ],
  }

  const generateSuggestions = async () => {
    if (!jobTitle) return

    setIsLoading(true)
    setError("")

    try {
      // Get current skills as an array
      const currentSkillsArray = currentSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0)

      // Generate AI suggestions
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate 10 relevant skills for a ${jobTitle} position that would look good on a resume. 
                Current skills: ${currentSkillsArray.join(", ")}
                Return only the skills as a comma-separated list, no numbering or explanation.
                Focus on both technical and soft skills that are highly relevant and would help pass ATS systems.`,
        system:
          "You are an expert resume writer who knows exactly what skills are most valuable for different job positions.",
      })

      // Parse the response
      const newSuggestions = text
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0 && !currentSkillsArray.includes(skill))

      setSuggestions(newSuggestions)
    } catch (err) {
      console.error("Error generating skill suggestions:", err)
      setError("Failed to generate suggestions")

      // Use fallback suggestions based on job title
      let category = "default"
      const jobTitleLower = jobTitle.toLowerCase()

      if (
        jobTitleLower.includes("develop") ||
        jobTitleLower.includes("engineer") ||
        jobTitleLower.includes("program")
      ) {
        category = "developer"
      } else if (jobTitleLower.includes("design")) {
        category = "designer"
      } else if (jobTitleLower.includes("manager") || jobTitleLower.includes("director")) {
        category = "manager"
      } else if (jobTitleLower.includes("market")) {
        category = "marketing"
      }

      setSuggestions(fallbackSuggestions[category as keyof typeof fallbackSuggestions])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Reset suggestions when job title changes
    setSuggestions([])
  }, [jobTitle])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 ml-auto"
          onClick={() => {
            if (suggestions.length === 0) {
              generateSuggestions()
            }
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          <span>Suggest Skills</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Suggested Skills</h4>
            <Button variant="ghost" size="sm" onClick={generateSuggestions} disabled={isLoading || !jobTitle}>
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4 text-sm text-gray-500">Generating suggestions...</div>
          ) : error ? (
            <div className="text-center py-2 text-sm text-red-500">{error}</div>
          ) : suggestions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  onClick={() => onAddSkill(skill)}
                >
                  + {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center py-2 text-sm text-gray-500">
              {jobTitle ? "Click refresh to generate suggestions" : "Enter a job title first"}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Settings, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export interface AnalysisCriteria {
  content: boolean
  format: boolean
  impact: boolean
  relevance: boolean
  keywords: boolean
  ats: boolean
  readability: boolean
  grammar: boolean
  industryFit: boolean
  careerLevel: boolean
}

interface CustomAnalysisCriteriaProps {
  defaultCriteria?: Partial<AnalysisCriteria>
  onCriteriaChange: (criteria: AnalysisCriteria) => void
}

const criteriaDescriptions = {
  content: "Evaluates the quality and completeness of your resume content",
  format: "Analyzes the structure, layout, and visual organization",
  impact: "Measures how effectively your achievements are presented",
  relevance: "Assesses how well your experience matches job requirements",
  keywords: "Checks for important industry and role-specific terms",
  ats: "Evaluates compatibility with Applicant Tracking Systems",
  readability: "Measures how easy your resume is to scan and understand",
  grammar: "Checks for spelling, grammar, and punctuation issues",
  industryFit: "Analyzes alignment with industry-specific expectations",
  careerLevel: "Evaluates appropriateness for your career stage",
}

export default function CustomAnalysisCriteria({ defaultCriteria, onCriteriaChange }: CustomAnalysisCriteriaProps) {
  const [criteria, setCriteria] = useState<AnalysisCriteria>({
    content: true,
    format: true,
    impact: true,
    relevance: true,
    keywords: true,
    ats: defaultCriteria?.ats ?? false,
    readability: defaultCriteria?.readability ?? false,
    grammar: defaultCriteria?.grammar ?? false,
    industryFit: defaultCriteria?.industryFit ?? false,
    careerLevel: defaultCriteria?.careerLevel ?? false,
  })

  const handleCriteriaChange = (key: keyof AnalysisCriteria) => {
    const newCriteria = { ...criteria, [key]: !criteria[key] }
    setCriteria(newCriteria)
    onCriteriaChange(newCriteria)
  }

  const handleSelectAll = () => {
    const allSelected: AnalysisCriteria = {
      content: true,
      format: true,
      impact: true,
      relevance: true,
      keywords: true,
      ats: true,
      readability: true,
      grammar: true,
      industryFit: true,
      careerLevel: true,
    }
    setCriteria(allSelected)
    onCriteriaChange(allSelected)
  }

  const handleClearAll = () => {
    // Keep at least the basic criteria selected
    const minimal = {
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
    }
    setCriteria(minimal)
    onCriteriaChange(minimal)
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-600" />
          Custom Analysis Criteria
        </CardTitle>
        <CardDescription>Select which aspects of your resume to analyze</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Object.entries(criteria).map(([key, checked], index) => (
            <motion.div
              key={key}
              className="flex items-start space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Checkbox
                id={`criteria-${key}`}
                checked={checked}
                onCheckedChange={() => handleCriteriaChange(key as keyof AnalysisCriteria)}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <div className="flex items-center gap-1">
                  <Label htmlFor={`criteria-${key}`} className="text-sm font-medium capitalize">
                    {key === "ats" ? "ATS Compatibility" : key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>{criteriaDescriptions[key as keyof AnalysisCriteria]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleClearAll} className="text-gray-500">
          Reset to Default
        </Button>
        <Button variant="outline" size="sm" onClick={handleSelectAll} className="btn-outline-glow">
          Select All
        </Button>
      </CardFooter>
    </Card>
  )
}

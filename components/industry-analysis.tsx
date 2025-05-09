"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Briefcase, TrendingUp, Award, AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface IndustryAnalysisProps {
  resumeData: any
}

interface IndustryInsight {
  industry: string
  relevance: number
  keyTrends: string[]
  inDemandSkills: string[]
  resumeStrengths: string[]
  improvementAreas: string[]
  salaryRange: string
  competitionLevel: "Low" | "Medium" | "High"
}

// Industry data for demo purposes
const industryData: Record<string, IndustryInsight> = {
  tech: {
    industry: "Technology",
    relevance: 85,
    keyTrends: [
      "AI and Machine Learning integration",
      "Remote-first work environments",
      "Microservices architecture",
      "DevOps and CI/CD adoption",
      "Cloud-native development",
    ],
    inDemandSkills: [
      "React/Next.js",
      "TypeScript",
      "Cloud platforms (AWS/Azure/GCP)",
      "CI/CD pipelines",
      "Containerization (Docker/Kubernetes)",
      "AI/ML frameworks",
    ],
    resumeStrengths: [
      "Strong technical skill set",
      "Project-based experience",
      "Collaborative development background",
      "Problem-solving focus",
    ],
    improvementAreas: [
      "Add more quantifiable achievements",
      "Highlight cloud platform experience",
      "Include CI/CD pipeline experience",
      "Mention any AI/ML exposure",
    ],
    salaryRange: "$90,000 - $150,000",
    competitionLevel: "High",
  },
  finance: {
    industry: "Finance",
    relevance: 70,
    keyTrends: [
      "Fintech integration",
      "Blockchain and cryptocurrency",
      "Automated compliance systems",
      "Data-driven decision making",
      "Digital transformation",
    ],
    inDemandSkills: [
      "Financial analysis",
      "Regulatory compliance",
      "Data visualization",
      "Python/R for financial modeling",
      "SQL and database management",
      "Risk assessment",
    ],
    resumeStrengths: [
      "Analytical approach",
      "Attention to detail",
      "Problem-solving abilities",
      "Technical foundation",
    ],
    improvementAreas: [
      "Highlight any financial domain knowledge",
      "Add financial software experience",
      "Include compliance understanding",
      "Emphasize data analysis capabilities",
    ],
    salaryRange: "$85,000 - $140,000",
    competitionLevel: "Medium",
  },
  healthcare: {
    industry: "Healthcare",
    relevance: 65,
    keyTrends: [
      "Telehealth expansion",
      "Electronic health records",
      "Healthcare data security",
      "AI in diagnostics",
      "Patient experience platforms",
    ],
    inDemandSkills: [
      "HIPAA compliance",
      "Healthcare data systems",
      "Security protocols",
      "UI/UX for patient interfaces",
      "Integration with medical devices",
      "Health data analytics",
    ],
    resumeStrengths: [
      "Technical foundation applicable to healthcare",
      "Problem-solving approach",
      "Attention to detail",
      "Collaborative work style",
    ],
    improvementAreas: [
      "Add any healthcare domain knowledge",
      "Highlight security and compliance experience",
      "Emphasize user-centered design for patients",
      "Include any relevant certifications",
    ],
    salaryRange: "$80,000 - $130,000",
    competitionLevel: "Medium",
  },
  ecommerce: {
    industry: "E-commerce",
    relevance: 80,
    keyTrends: [
      "Headless commerce",
      "Personalization engines",
      "Mobile-first shopping experiences",
      "Omnichannel integration",
      "AI-powered recommendations",
    ],
    inDemandSkills: [
      "Frontend frameworks (React/Vue)",
      "Payment gateway integration",
      "Performance optimization",
      "A/B testing",
      "Analytics implementation",
      "User experience design",
    ],
    resumeStrengths: [
      "Frontend development skills",
      "Performance optimization experience",
      "User-focused approach",
      "Technical versatility",
    ],
    improvementAreas: [
      "Highlight e-commerce platform experience",
      "Add conversion optimization examples",
      "Include mobile commerce experience",
      "Mention any payment system integration",
    ],
    salaryRange: "$85,000 - $140,000",
    competitionLevel: "Medium",
  },
  marketing: {
    industry: "Marketing",
    relevance: 60,
    keyTrends: [
      "Marketing automation",
      "Data-driven campaigns",
      "Content personalization",
      "Interactive experiences",
      "Cross-channel analytics",
    ],
    inDemandSkills: [
      "Marketing automation tools",
      "Analytics platforms",
      "A/B testing frameworks",
      "CRM integration",
      "Interactive content development",
      "Performance marketing",
    ],
    resumeStrengths: [
      "Technical foundation for MarTech",
      "Data-oriented approach",
      "Problem-solving abilities",
      "User experience focus",
    ],
    improvementAreas: [
      "Highlight any marketing technology experience",
      "Add analytics implementation examples",
      "Include campaign optimization experience",
      "Mention any CRM or automation tool knowledge",
    ],
    salaryRange: "$75,000 - $125,000",
    competitionLevel: "Medium",
  },
}

export default function IndustryAnalysis({ resumeData }: IndustryAnalysisProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<IndustryInsight | null>(null)

  const analyzeIndustry = async () => {
    if (!selectedIndustry) return

    setIsAnalyzing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Get industry data from our mock database
    setAnalysis(industryData[selectedIndustry])
    setIsAnalyzing(false)
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getCompetitionColor = (level: string) => {
    if (level === "Low") return "bg-green-100 text-green-800"
    if (level === "Medium") return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-purple-600" />
          Industry-Specific Analysis
        </CardTitle>
        <CardDescription>Get tailored insights for your target industry</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {analysis && (
          <motion.div
            className="space-y-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{analysis.industry} Industry</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Resume Relevance:</span>
                <span className={`font-bold ${getRelevanceColor(analysis.relevance)}`}>{analysis.relevance}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    Key Industry Trends
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {analysis.keyTrends.map((trend, i) => (
                      <li key={i}>{trend}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    In-Demand Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.inDemandSkills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Resume Strengths for This Industry
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {analysis.resumeStrengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Areas for Improvement
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {analysis.improvementAreas.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium mb-1">Typical Salary Range</h4>
                <p className="text-lg font-semibold text-green-700">{analysis.salaryRange}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium mb-1">Competition Level</h4>
                <Badge className={getCompetitionColor(analysis.competitionLevel)}>{analysis.competitionLevel}</Badge>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={analyzeIndustry}
          disabled={isAnalyzing || !selectedIndustry}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Industry Fit...
            </>
          ) : (
            "Analyze Industry Fit"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

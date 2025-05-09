"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { History, TrendingUp, BarChart, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { format } from "date-fns"

interface HistoricalAnalysisProps {
  resumeId: string
}

interface AnalysisRecord {
  id: string
  date: string
  overallScore: number
  categoryScores: {
    content: number
    format: number
    impact: number
    relevance: number
    keywords: number
    [key: string]: number
  }
}

export default function HistoricalAnalysis({ resumeId }: HistoricalAnalysisProps) {
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCategory, setSelectedCategory] = useState("overall")

  useEffect(() => {
    // In a real app, this would fetch from an API or database
    // For demo purposes, we'll generate mock data
    const mockHistory = generateMockHistory()
    setAnalysisHistory(mockHistory)
  }, [resumeId])

  const generateMockHistory = (): AnalysisRecord[] => {
    // Generate 6 records over the past 3 months
    const records: AnalysisRecord[] = []
    const now = new Date()

    // Initial scores (lower)
    let overallScore = 65
    let contentScore = 60
    let formatScore = 70
    let impactScore = 55
    let relevanceScore = 65
    let keywordsScore = 75

    // Generate records with gradually improving scores
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setDate(now.getDate() - i * 15) // Every 15 days

      // Gradually improve scores
      overallScore += Math.floor(Math.random() * 3) + 1
      contentScore += Math.floor(Math.random() * 4)
      formatScore += Math.floor(Math.random() * 3)
      impactScore += Math.floor(Math.random() * 5)
      relevanceScore += Math.floor(Math.random() * 3)
      keywordsScore += Math.floor(Math.random() * 2)

      // Cap at 100
      overallScore = Math.min(overallScore, 100)
      contentScore = Math.min(contentScore, 100)
      formatScore = Math.min(formatScore, 100)
      impactScore = Math.min(impactScore, 100)
      relevanceScore = Math.min(relevanceScore, 100)
      keywordsScore = Math.min(keywordsScore, 100)

      records.push({
        id: `analysis-${i}`,
        date: date.toISOString(),
        overallScore,
        categoryScores: {
          content: contentScore,
          format: formatScore,
          impact: impactScore,
          relevance: relevanceScore,
          keywords: keywordsScore,
        },
      })
    }

    return records
  }

  const getChartData = () => {
    return analysisHistory.map((record) => ({
      date: format(new Date(record.date), "MMM dd"),
      overall: record.overallScore,
      content: record.categoryScores.content,
      format: record.categoryScores.format,
      impact: record.categoryScores.impact,
      relevance: record.categoryScores.relevance,
      keywords: record.categoryScores.keywords,
    }))
  }

  const getCategoryChartData = () => {
    if (selectedCategory === "overall") {
      return analysisHistory.map((record) => ({
        date: format(new Date(record.date), "MMM dd"),
        score: record.overallScore,
      }))
    }

    return analysisHistory.map((record) => ({
      date: format(new Date(record.date), "MMM dd"),
      score: record.categoryScores[selectedCategory],
    }))
  }

  const getImprovementPercentage = () => {
    if (analysisHistory.length < 2) return 0

    const firstScore = analysisHistory[0].overallScore
    const latestScore = analysisHistory[analysisHistory.length - 1].overallScore

    return Math.round(((latestScore - firstScore) / firstScore) * 100)
  }

  const getMostImprovedCategory = () => {
    if (analysisHistory.length < 2) return { category: "none", improvement: 0 }

    const first = analysisHistory[0].categoryScores
    const latest = analysisHistory[analysisHistory.length - 1].categoryScores

    let maxImprovement = 0
    let maxCategory = ""

    Object.keys(first).forEach((category) => {
      const improvement = latest[category] - first[category]
      if (improvement > maxImprovement) {
        maxImprovement = improvement
        maxCategory = category
      }
    })

    return {
      category: maxCategory,
      improvement: maxImprovement,
    }
  }

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-purple-600" />
          Resume Improvement Tracking
        </CardTitle>
        <CardDescription>Track your resume's improvement over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {analysisHistory.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-medium text-gray-500 mb-1">Current Score</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {analysisHistory[analysisHistory.length - 1].overallScore}%
                </p>
              </motion.div>

              <motion.div
                className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-sm font-medium text-gray-500 mb-1">Overall Improvement</h3>
                <p className="text-2xl font-bold text-green-600">+{getImprovementPercentage()}%</p>
              </motion.div>

              <motion.div
                className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-500 mb-1">Most Improved</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCategoryName(getMostImprovedCategory().category)}
                </p>
                <p className="text-sm text-blue-500">+{getMostImprovedCategory().improvement} points</p>
              </motion.div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">By Category</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      overall: {
                        label: "Overall Score",
                        color: "hsl(var(--chart-1))",
                      },
                      content: {
                        label: "Content",
                        color: "hsl(var(--chart-2))",
                      },
                      format: {
                        label: "Format",
                        color: "hsl(var(--chart-3))",
                      },
                      impact: {
                        label: "Impact",
                        color: "hsl(var(--chart-4))",
                      },
                      relevance: {
                        label: "Relevance",
                        color: "hsl(var(--chart-5))",
                      },
                      keywords: {
                        label: "Keywords",
                        color: "hsl(var(--chart-6))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="overall"
                          stroke="var(--color-overall)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="content" stroke="var(--color-content)" />
                        <Line type="monotone" dataKey="format" stroke="var(--color-format)" />
                        <Line type="monotone" dataKey="impact" stroke="var(--color-impact)" />
                        <Line type="monotone" dataKey="relevance" stroke="var(--color-relevance)" />
                        <Line type="monotone" dataKey="keywords" stroke="var(--color-keywords)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === "overall" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("overall")}
                    >
                      Overall
                    </Button>
                    {Object.keys(analysisHistory[0].categoryScores).map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {formatCategoryName(category)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      score: {
                        label: `${selectedCategory === "overall" ? "Overall" : formatCategoryName(selectedCategory)} Score`,
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getCategoryChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="var(--color-score)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <div className="space-y-4">
                  {analysisHistory.map((record, index) => (
                    <motion.div
                      key={record.id}
                      className="p-4 border rounded-lg relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {index > 0 && (
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border flex items-center justify-center">
                          <TrendingUp
                            className={
                              record.overallScore > analysisHistory[index - 1].overallScore
                                ? "h-4 w-4 text-green-500"
                                : "h-4 w-4 text-red-500"
                            }
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{format(new Date(record.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">{record.overallScore}%</div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                        {Object.entries(record.categoryScores).map(([category, score]) => (
                          <div key={category} className="flex flex-col items-center p-2 bg-gray-50 rounded">
                            <span className="text-gray-500 capitalize">{category}</span>
                            <span className="font-medium">{score}%</span>
                          </div>
                        ))}
                      </div>

                      {index > 0 && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Change: </span>
                          <span
                            className={
                              record.overallScore > analysisHistory[index - 1].overallScore
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {record.overallScore - analysisHistory[index - 1].overallScore > 0 ? "+" : ""}
                            {record.overallScore - analysisHistory[index - 1].overallScore}%
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-8">
            <BarChart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Analysis History</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              You haven't analyzed this resume yet or there's no historical data available.
            </p>
            <Button>Run First Analysis</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

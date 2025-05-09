"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface LinkedInImportProps {
  onImportSuccess: (data: any) => void
}

export default function LinkedInImport({ onImportSuccess }: LinkedInImportProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [authWindow, setAuthWindow] = useState<Window | null>(null)

  // Mock LinkedIn API credentials - in a real app, these would be environment variables
  const CLIENT_ID = "your-linkedin-client-id"
  const REDIRECT_URI = window.location.origin + "/api/linkedin/callback"

  const handleLinkedInImport = () => {
    setIsLoading(true)
    setError("")

    try {
      // In a real implementation, we would use the LinkedIn OAuth flow
      // For this demo, we'll simulate the process with a mock response

      // This would be the actual LinkedIn OAuth URL
      // const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${generateRandomState()}&scope=r_liteprofile%20r_emailaddress`;

      // Simulate opening the auth window
      // const newWindow = window.open(authUrl, "LinkedIn Login", "width=600,height=700");
      // setAuthWindow(newWindow);

      // For demo purposes, we'll just simulate a successful import after a delay
      setTimeout(() => {
        const mockLinkedInData = getMockLinkedInData()
        onImportSuccess(mockLinkedInData)
        setIsLoading(false)
      }, 2000)
    } catch (err) {
      console.error("LinkedIn import error:", err)
      setError("Failed to connect to LinkedIn. Please try again.")
      setIsLoading(false)
    }
  }

  // This function would be called when the OAuth redirect happens
  const handleOAuthCallback = (code: string) => {
    // Close the auth window
    if (authWindow) {
      authWindow.close()
    }

    // Exchange the code for an access token
    // In a real app, this would be done server-side
    fetchLinkedInData(code)
      .then((data) => {
        onImportSuccess(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("LinkedIn data fetch error:", err)
        setError("Failed to fetch LinkedIn data. Please try again.")
        setIsLoading(false)
      })
  }

  // Mock function to simulate fetching LinkedIn data
  const fetchLinkedInData = async (code: string): Promise<any> => {
    // In a real app, this would make API calls to LinkedIn
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockLinkedInData())
      }, 1000)
    })
  }

  // Generate mock LinkedIn data for demo purposes
  const getMockLinkedInData = () => {
    return {
      personalInfo: {
        fullName: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "(555) 987-6543",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/alexjohnson",
        website: "alexjohnson.dev",
      },
      summary:
        "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Skilled in JavaScript, React, and Node.js with a track record of delivering high-quality products.",
      experiences: [
        {
          id: "exp-1",
          company: "Tech Innovations Inc.",
          position: "Senior Software Engineer",
          startDate: "Jan 2021",
          endDate: "Present",
          description:
            "• Led development of a microservices architecture that improved system reliability by 40%\n• Mentored junior developers and implemented code review processes\n• Optimized database queries resulting in 60% faster page load times\n• Collaborated with product and design teams to implement new features",
        },
        {
          id: "exp-2",
          company: "WebSolutions Co.",
          position: "Software Engineer",
          startDate: "Mar 2018",
          endDate: "Dec 2020",
          description:
            "• Developed and maintained RESTful APIs using Node.js and Express\n• Implemented responsive UI components with React and TypeScript\n• Participated in agile development processes and sprint planning\n• Reduced bug count by 30% through implementation of comprehensive test suite",
        },
        {
          id: "exp-3",
          company: "StartupLaunch",
          position: "Junior Developer",
          startDate: "Jun 2016",
          endDate: "Feb 2018",
          description:
            "• Built and maintained features for customer-facing web application\n• Collaborated with UX designers to implement responsive designs\n• Participated in code reviews and contributed to technical documentation\n• Assisted in migration from monolith to microservices architecture",
        },
      ],
      education: [
        {
          id: "edu-1",
          institution: "University of California, Berkeley",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2014",
          endDate: "2016",
        },
        {
          id: "edu-2",
          institution: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Engineering",
          startDate: "2010",
          endDate: "2014",
        },
      ],
      skills:
        "JavaScript, TypeScript, React, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, CI/CD, Git, Agile, Jest, GraphQL, Redis",
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Linkedin className="h-5 w-5 text-[#0077B5]" />
          LinkedIn Import
        </CardTitle>
        <CardDescription>Import your professional details directly from LinkedIn</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4 glass">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Connect your LinkedIn profile to automatically import your work experience, education, and skills. This will
          save you time and ensure your resume is up-to-date with your LinkedIn profile.
        </p>
        <div className="glass p-4 rounded-md mb-4">
          <h4 className="font-medium text-sm mb-2 gradient-text">What we import:</h4>
          <ul className="text-sm text-gray-500 space-y-1 list-disc pl-5">
            <li>Profile information (name, contact details)</li>
            <li>Work experience</li>
            <li>Education history</li>
            <li>Skills and endorsements</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLinkedInImport}
          disabled={isLoading}
          className="w-full bg-[#0077B5] hover:bg-[#005e8c] shadow-glow"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting to LinkedIn...
            </>
          ) : (
            <>
              <Linkedin className="mr-2 h-4 w-4" />
              Import from LinkedIn
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

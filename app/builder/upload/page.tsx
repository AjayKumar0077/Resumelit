"use client";

import React, { useState } from "react";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ResumeTemplateType } from "@/components/resume-templates";

export default function UploadBuilderPage() {
  const [activeTab, setActiveTab] = useState("resume");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [resumeHtml, setResumeHtml] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [language, setLanguage] = useState("en");
  const [template, setTemplate] = useState<ResumeTemplateType>("modern");
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
    },
  });

  const updatePersonalInfo = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value,
      },
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const processResume = async () => {
    setIsProcessing(true);
    try {
      // Simulate file processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const extractedText = `
John Doe
Software Engineer
john.doe@example.com | (555) 123-4567 | San Francisco, CA

EXPERIENCE
Software Engineer, Tech Company (2020-Present)
- Developed web applications using React and Node.js
- Implemented CI/CD pipelines for automated testing and deployment
- Collaborated with cross-functional teams to deliver features

Junior Developer, Startup Inc. (2018-2020)
- Built responsive user interfaces using HTML, CSS, and JavaScript
- Assisted in database design and implementation
- Participated in code reviews and agile development processes

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2014-2018)

SKILLS
JavaScript, React, Node.js, HTML, CSS, Git, AWS, Python
      `;

      setResumeText(extractedText);

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Improve the following resume to make it more ATS-friendly and professional. Format it in clean HTML:
        
        ${extractedText}`,
        system:
          "You are an expert resume builder. Improve the provided resume to be more ATS-friendly, highlighting key achievements and using strong action verbs. Format the result in clean, professional HTML.",
      });

      setResumeHtml(text);
      setIsComplete(true);
    } catch (error) {
      console.error("Error processing resume:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processLinkedin = async () => {
    setIsProcessing(true);
    try {
      // Simulate LinkedIn data processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const extractedText = `
John Doe
Software Engineer at Tech Company
San Francisco Bay Area

About
Experienced Software Engineer with a passion for building scalable web applications and solving complex problems.

Experience
Tech Company
Software Engineer
Jan 2020 - Present
- Led development of key features for the company's main product
- Implemented performance optimizations that improved load times by 40%
- Mentored junior developers and conducted code reviews

Startup Inc.
Junior Developer
Jun 2018 - Dec 2019
- Developed responsive web interfaces using modern JavaScript frameworks
- Collaborated with UX designers to implement user-friendly interfaces
- Participated in agile development processes

Education
University of Technology
Bachelor of Science - Computer Science
2014 - 2018

Skills
JavaScript • React • Node.js • TypeScript • HTML • CSS • Git • AWS • Python
      `;

      setResumeText(extractedText);

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Convert the following LinkedIn profile information into a professional, ATS-friendly resume in HTML format:
        
        ${extractedText}`,
        system:
          "You are an expert resume builder. Convert LinkedIn profile information into a professional, ATS-friendly resume. Format the result in clean, professional HTML with appropriate sections and formatting.",
      });

      setResumeHtml(text);
      setIsComplete(true);
    } catch (error) {
      console.error("Error processing LinkedIn profile:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const filename = resumeFile?.name || "resume";

      const element = document.createElement("a");
      const file = new Blob([resumeHtml], { type: "application/pdf" });
      element.href = URL.createObjectURL(file);
      element.download = `${filename}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Resume Builder</h1>
      </header>
      <main className="flex-1 container mx-auto py-6">
        <div className="mb-4">
          <label htmlFor="resumeUpload" className="sr-only">Upload Resume</label>
          <input
            id="resumeUpload"
            type="file"
            title="Upload your resume"
            onChange={handleResumeUpload}
          />
          <button
            onClick={processResume}
            disabled={isProcessing}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isProcessing ? "Processing..." : "Process Resume"}
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter LinkedIn URL"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="border px-2 py-1"
          />
          <button
            onClick={processLinkedin}
            disabled={isProcessing}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            {isProcessing ? "Processing..." : "Process LinkedIn"}
          </button>
        </div>
        <div className="mb-4">
          {/* Option 1: Using a label */}
          <label htmlFor="username">Username</label>
          <input id="username" />

          {/* Option 2: Using a placeholder */}
          <input placeholder="Enter your username" />

          {/* Option 3: Using a title */}
          <input title="Enter your username" />

          {/* Suggested code change */}
          <input
            id="fullName"
            placeholder="Enter your full name" // Replace with localized text if needed
            value={formData?.personalInfo?.fullName || ""}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
            className="border px-2 py-1"
          />
        </div>
        {isComplete && (
          <div>
            <h2 className="text-lg font-bold mb-2">Generated Resume</h2>
            <div
              className="border p-4"
              dangerouslySetInnerHTML={{ __html: resumeHtml }}
            />
            <button
              onClick={handleDownloadPDF}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Download as PDF
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
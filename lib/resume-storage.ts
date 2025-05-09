// This is a mock implementation for demo purposes
// In a real app, this would connect to a database like Firebase or MongoDB

import { v4 as uuidv4 } from "uuid"

// Define resume types
export type ResumeData = {
  id: string
  userId: string
  title: string
  createdAt: string
  lastUpdated: string
  method: "chat" | "form" | "upload"
  data: any // The actual resume content
}

// Mock storage using localStorage
export const saveResume = async (
  userId: string,
  title: string,
  method: "chat" | "form" | "upload",
  data: any,
): Promise<ResumeData> => {
  // In a real app, this would save to a database
  const now = new Date().toISOString()

  const resume: ResumeData = {
    id: uuidv4(),
    userId,
    title,
    createdAt: now,
    lastUpdated: now,
    method,
    data,
  }

  try {
    // Get existing resumes from localStorage
    const existingResumesStr = localStorage.getItem("resumes") || "[]"
    const existingResumes = JSON.parse(existingResumesStr)

    // Add new resume
    const updatedResumes = [...existingResumes, resume]

    // Save back to localStorage
    localStorage.setItem("resumes", JSON.stringify(updatedResumes))

    return resume
  } catch (error) {
    console.error("Error saving resume:", error)
    throw new Error("Failed to save resume")
  }
}

export const updateResume = async (
  resumeId: string,
  updates: Partial<Omit<ResumeData, "id" | "userId" | "createdAt">>,
): Promise<ResumeData> => {
  try {
    // Get existing resumes from localStorage
    const existingResumesStr = localStorage.getItem("resumes") || "[]"
    const existingResumes: ResumeData[] = JSON.parse(existingResumesStr)

    // Find the resume to update
    const resumeIndex = existingResumes.findIndex((r) => r.id === resumeId)

    if (resumeIndex === -1) {
      throw new Error("Resume not found")
    }

    // Update the resume
    const updatedResume = {
      ...existingResumes[resumeIndex],
      ...updates,
      lastUpdated: new Date().toISOString(),
    }

    // Replace in the array
    existingResumes[resumeIndex] = updatedResume

    // Save back to localStorage
    localStorage.setItem("resumes", JSON.stringify(existingResumes))

    return updatedResume
  } catch (error) {
    console.error("Error updating resume:", error)
    throw new Error("Failed to update resume")
  }
}

export const deleteResume = async (resumeId: string): Promise<void> => {
  try {
    // Get existing resumes from localStorage
    const existingResumesStr = localStorage.getItem("resumes") || "[]"
    const existingResumes: ResumeData[] = JSON.parse(existingResumesStr)

    // Filter out the resume to delete
    const updatedResumes = existingResumes.filter((r) => r.id !== resumeId)

    // Save back to localStorage
    localStorage.setItem("resumes", JSON.stringify(updatedResumes))
  } catch (error) {
    console.error("Error deleting resume:", error)
    throw new Error("Failed to delete resume")
  }
}

export const getResumeById = async (resumeId: string): Promise<ResumeData | null> => {
  try {
    // Get existing resumes from localStorage
    const existingResumesStr = localStorage.getItem("resumes") || "[]"
    const existingResumes: ResumeData[] = JSON.parse(existingResumesStr)

    // Find the resume
    const resume = existingResumes.find((r) => r.id === resumeId)

    return resume || null
  } catch (error) {
    console.error("Error getting resume:", error)
    throw new Error("Failed to get resume")
  }
}

export const getResumesByUserId = async (userId: string): Promise<ResumeData[]> => {
  try {
    // Get existing resumes from localStorage
    const existingResumesStr = localStorage.getItem("resumes") || "[]"
    const existingResumes: ResumeData[] = JSON.parse(existingResumesStr)

    // Filter by userId
    return existingResumes.filter((r) => r.userId === userId)
  } catch (error) {
    console.error("Error getting resumes:", error)
    throw new Error("Failed to get resumes")
  }
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveResume } from "@/lib/resume-storage"

interface SaveResumeDialogProps {
  isOpen: boolean
  onClose: () => void
  resumeData: any
  method: "chat" | "form" | "upload"
  onSaveSuccess?: (resumeId: string) => void
}

export default function SaveResumeDialog({
  isOpen,
  onClose,
  resumeData,
  method,
  onSaveSuccess,
}: SaveResumeDialogProps) {
  const [title, setTitle] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter a title for your resume")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      // In a real app, we would get the actual user ID from auth context
      const userId = "user-1" // Mock user ID

      const savedResume = await saveResume(userId, title, method, resumeData)

      if (onSaveSuccess) {
        onSaveSuccess(savedResume.id)
      }

      onClose()
    } catch (err) {
      console.error("Error saving resume:", err)
      setError("Failed to save resume. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Resume</DialogTitle>
          <DialogDescription>Give your resume a title so you can find it later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">{error}</div>}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume-title" className="text-right">
              Title
            </Label>
            <Input
              id="resume-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Software Engineer Resume"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
            {isSaving ? "Saving..." : "Save Resume"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

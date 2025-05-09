"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  isListening?: boolean
  disabled?: boolean
  placeholder?: string
}

// Declare SpeechRecognition type
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition
    webkitSpeechRecognition: SpeechRecognition
    SpeechGrammarList: SpeechGrammarList
    SpeechRecognitionEvent: SpeechRecognitionEvent
  }

  interface SpeechRecognition {
    continuous: boolean
    interimResults: boolean
    lang: string
    onstart: () => void
    onend: () => void
    onresult: (event: SpeechRecognitionEvent) => void
    onerror: (event: SpeechRecognitionErrorEvent) => void
    start: () => void
    stop: () => void
    abort: () => void
  }

  interface SpeechGrammarList {
    [index: number]: SpeechGrammar
    length: number
    addFromString(string: string, weight?: number): void
    addFromURI(uri: string, weight?: number): void
    item(index: number): SpeechGrammar
  }

  interface SpeechGrammar {}

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number
    readonly results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    length: number
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean
    readonly length: number
    item(index: number): SpeechRecognitionAlternative
  }

  interface SpeechRecognitionAlternative {
    readonly confidence: number
    readonly transcript: string
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionError
    readonly message?: string
  }

  type SpeechRecognitionError =
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "bad-grammar"
    | "language-not-supported"
}

export default function VoiceInput({
  onTranscript,
  isListening: externalIsListening,
  disabled = false,
  placeholder = "Click to speak",
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  // Use external isListening state if provided
  const listening = externalIsListening !== undefined ? externalIsListening : isListening

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.")
      return
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognitionInstance = new SpeechRecognition()

    recognitionInstance.continuous = false
    recognitionInstance.interimResults = true
    recognitionInstance.lang = "en-US"

    recognitionInstance.onstart = () => {
      setIsListening(true)
      setError("")
    }

    recognitionInstance.onend = () => {
      setIsListening(false)
    }

    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")

      // Only send final results
      if (event.results[0].isFinal) {
        onTranscript(transcript)
      }
    }

    recognitionInstance.onerror = (event) => {
      setError(`Error occurred in recognition: ${event.error}`)
      setIsListening(false)
    }

    setRecognition(recognitionInstance)

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort()
      }
    }
  }, [onTranscript])

  const toggleListening = () => {
    if (!recognition) {
      setError("Speech recognition is not available.")
      return
    }

    if (listening) {
      recognition.stop()
      setIsListening(false)
    } else {
      setIsProcessing(true)
      // Small delay to show processing state
      setTimeout(() => {
        try {
          recognition.start()
          setIsProcessing(false)
        } catch (err) {
          console.error("Error starting speech recognition:", err)
          setError("Failed to start speech recognition.")
          setIsProcessing(false)
        }
      }, 300)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant={listening ? "default" : "outline"}
            onClick={toggleListening}
            disabled={disabled || isProcessing || !!error}
            className={`h-8 w-8 rounded-full ${
              listening ? "bg-red-500 hover:bg-red-600 text-white" : "text-gray-500"
            } ${error ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : listening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">{error ? error : listening ? "Stop recording" : placeholder}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

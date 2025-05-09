"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void
  currentLanguage?: string
}

export default function LanguageSelector({ onLanguageChange, currentLanguage = "en" }: LanguageSelectorProps) {
  const [selected, setSelected] = useState(currentLanguage)

  useEffect(() => {
    setSelected(currentLanguage)
  }, [currentLanguage])

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ru", name: "Русский" },
    { code: "ar", name: "العربية" },
  ]

  const handleSelect = (code: string) => {
    setSelected(code)
    onLanguageChange(code)
  }

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.code === code)?.name || "English"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{getLanguageName(selected)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleSelect(language.code)}
            className={selected === language.code ? "bg-accent" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

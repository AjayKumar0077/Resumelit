"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  header?: ReactNode
  footer?: ReactNode
  title?: ReactNode
  description?: ReactNode
  content?: ReactNode
  delay?: number
  hoverEffect?: boolean
  glowEffect?: boolean
  gradientBorder?: boolean
}

export default function AnimatedCard({
  children,
  className,
  header,
  footer,
  title,
  description,
  content,
  delay = 0,
  hoverEffect = true,
  glowEffect = false,
  gradientBorder = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn("relative", className)}
    >
      <Card
        className={cn(
          "glass",
          hoverEffect && "card-hover",
          glowEffect && "shadow-glow hover:shadow-neon",
          "overflow-hidden",
        )}
      >
        {gradientBorder && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600"></div>
        )}

        {header || title || description ? (
          <CardHeader>
            {title && <CardTitle className={cn("gradient-text")}>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
            {header}
          </CardHeader>
        ) : null}

        {content ? <CardContent>{content}</CardContent> : <CardContent>{children}</CardContent>}

        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  )
}

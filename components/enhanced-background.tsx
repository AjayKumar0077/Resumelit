"use client"

import { useEffect, useRef, useState } from "react"

interface EnhancedBackgroundProps {
  className?: string
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  interactive?: boolean
}

export default function EnhancedBackground({
  className = "",
  density = "medium",
  speed = "medium",
  interactive = true,
}: EnhancedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle density based on prop
    const particleDensity = {
      low: Math.min(30, Math.floor(window.innerWidth / 50)),
      medium: Math.min(60, Math.floor(window.innerWidth / 30)),
      high: Math.min(100, Math.floor(window.innerWidth / 20)),
    }

    // Speed factor based on prop
    const speedFactor = {
      slow: 0.3,
      medium: 0.6,
      fast: 1.0,
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = particleDensity[density]
    const particleSpeed = speedFactor[speed]

    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      hue: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 3 + 1
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * particleSpeed
        this.speedY = (Math.random() - 0.5) * particleSpeed
        this.hue = Math.random() * 60 + 240 // Purple to blue hues
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`
      }

      update(mouseX: number, mouseY: number, isHovering: boolean) {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Interactive effect when mouse is near
        if (interactive && isHovering) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            // Particles grow and change color near mouse
            const factor = 1 - distance / maxDistance
            this.size = this.baseSize + factor * 2
            this.color = `hsla(${this.hue + factor * 60}, 80%, 60%, ${this.opacity + factor * 0.2})`

            // Gentle push away from mouse
            const angle = Math.atan2(dy, dx)
            const pushFactor = factor * 0.5
            this.x += Math.cos(angle) * pushFactor
            this.y += Math.sin(angle) * pushFactor
          } else {
            this.size = this.baseSize
            this.color = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function connect(ctx: CanvasRenderingContext2D) {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 120

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            const hue = (particlesArray[a].hue + particlesArray[b].hue) / 2
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mousePosition.x, mousePosition.y, isHovering)
        particlesArray[i].draw(ctx)
      }

      connect(ctx)
      requestAnimationFrame(animate)
    }

    init()
    animate()

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [density, speed, interactive])

  return (
    <>
      <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`} />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-radial from-transparent to-background opacity-70 pointer-events-none z-0" />
    </>
  )
}

"use client"

import { useEffect, useRef } from "react"
import {
  GRAVITY,
  INITIAL_VELOCITY_X,
  INITIAL_VELOCITY_Y,
  INITIAL_VELOCITY_Z,
  FRICTION,
  SCROLL_SENSITIVITY,
  SHAPE_COUNT,
} from "../lib/background-animation-constants";

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )

      canvas.width = window.innerWidth
      canvas.height = docHeight

      canvas.style.height = `${docHeight}px`
    }

    // Initial setup
    setCanvasDimensions()

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout | null = null
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions()
      }, 200)
    }

    // Mouse position tracking with physics
    let mouseX = -100
    let mouseY = -100
    const mouseRadius = 180
    const mouseForce = 2
    let mouseActive = false

    // Throttled mouse move handler
    let lastMouseMove = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseMove < 16) return // Throttle to ~60fps
      lastMouseMove = now

      mouseX = e.clientX
      mouseY = e.clientY + window.scrollY
      mouseActive = true
    }

    const handleMouseLeave = () => {
      mouseActive = false
    }

    const handleMouseEnter = () => {
      mouseActive = true
    }

    // For touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY + window.scrollY
        mouseActive = true
      }
    }

    const handleTouchEnd = () => {
      mouseActive = false
    }

    // Event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    // Neobrutalism color palette - more vibrant and high contrast
    const colors = [
      "oklch(67.47% 0.1726 259.49)", // Main blue
      "oklch(93.46% 0.0305 255.11)", // Light blue
      "oklch(75% 0.15 290)", // Purple variant
      "oklch(80% 0.12 230)", // Sky blue variant
      "oklch(85% 0.18 130)", // Green variant
      "oklch(90% 0.14 60)", // Yellow variant
    ]

    // 3D shapes with physics
    class Shape3D {
      x: number
      y: number
      z: number
      size: number
      type: "cube" | "pyramid" | "sphere" | "cylinder" | "prism"
      color: string
      borderWidth: number
      borderColor: string
      velocityX: number
      velocityY: number
      velocityZ: number
      rotationX: number
      rotationY: number
      rotationZ: number
      rotationVelocityX: number
      rotationVelocityY: number
      rotationVelocityZ: number
      mass: number
      restitution: number // Bounciness
      tilt: number // Neobrutalism tilt
      isAffectedByMouse: boolean
      mouseEffectIntensity: number
      prevScrollY?: number
      initialVelocityX: number
      initialVelocityY: number
      initialVelocityZ: number

      constructor(x?: number, y?: number) {
        this.x = x ?? Math.random() * (canvas?.width || 0);
        this.y = y ?? Math.random() * (canvas?.height || 0);
        this.z = Math.random() * 200 - 100; // Z position for 3D effect
        this.size = Math.random() * 70 + 50; // Larger for neobrutalism style
        this.type = ["cube", "pyramid", "sphere", "cylinder", "prism"][Math.floor(Math.random() * 5)] as any;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.borderWidth = 3; // Thick borders for neobrutalism
        this.borderColor = "black";
        this.velocityX = (Math.random() - 0.5) * 2 * INITIAL_VELOCITY_X;
        this.velocityY = (Math.random() - 0.5) * 2 * INITIAL_VELOCITY_Y;
        this.velocityZ = (Math.random() - 0.5) * 2 * INITIAL_VELOCITY_Z;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.rotationVelocityX = (Math.random() - 0.5) * 0.01;
        this.rotationVelocityY = (Math.random() - 0.5) * 0.01;
        this.rotationVelocityZ = (Math.random() - 0.5) * 0.01;
        this.mass = this.size * 0.1; // Mass proportional to size
        this.restitution = 0.7 + Math.random() * 0.3; // Random bounciness
        this.tilt = (Math.random() - 0.5) * 0.1; // Slight random tilt for neobrutalism
        this.isAffectedByMouse = false;
        this.mouseEffectIntensity = 0;
        this.initialVelocityX = this.velocityX; // Preserve initial velocity X
        this.initialVelocityY = this.velocityY; // Preserve initial velocity Y
        this.initialVelocityZ = this.velocityZ; // Preserve initial velocity Z
      }

      update(shapes: Shape3D[]) {
        if (!ctx) return
        if (!canvas) return
        // Apply physics
        this.x += this.velocityX
        this.y += this.velocityY
        this.z += this.velocityZ

        // Apply gravity
        this.velocityY += GRAVITY;

        // Apply rotation
        this.rotationX += this.rotationVelocityX
        this.rotationY += this.rotationVelocityY
        this.rotationZ += this.rotationVelocityZ

        // Apply friction/damping
        this.velocityX *= FRICTION
        this.velocityY *= FRICTION
        this.velocityZ *= FRICTION
        this.rotationVelocityX *= FRICTION
        this.rotationVelocityY *= FRICTION
        this.rotationVelocityZ *= FRICTION

        // Mouse interaction - more realistic physics
        if (mouseActive) {
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius) {
            // Calculate force (stronger when closer)
            const force = ((mouseRadius - distance) / mouseRadius) * mouseForce

            // Direction away from mouse
            const angle = Math.atan2(dy, dx)

            // Apply acceleration away from mouse
            this.velocityX -= Math.cos(angle) * force * (0.1 + Math.random() * 0.1)
            this.velocityY -= Math.sin(angle) * force * (0.1 + Math.random() * 0.1)

            // Add some random rotation when affected by mouse
            this.rotationVelocityZ += (Math.random() - 0.5) * 0.02 * force

            // Visual feedback
            this.isAffectedByMouse = true
            this.mouseEffectIntensity = Math.min(1, this.mouseEffectIntensity + 0.1)
          } else {
            // Gradually reduce effect
            this.mouseEffectIntensity *= 0.95
            if (this.mouseEffectIntensity < 0.05) {
              this.isAffectedByMouse = false
              this.mouseEffectIntensity = 0
            }
          }
        } else {
          // Gradually reduce effect when mouse is inactive
          this.mouseEffectIntensity *= 0.95
          if (this.mouseEffectIntensity < 0.05) {
            this.isAffectedByMouse = false
            this.mouseEffectIntensity = 0
          }
        }

        // Add velocity on mouse scroll while keeping initial velocity
        const scrollVelocity = window.scrollY - (this.prevScrollY || 0)
        this.velocityY += scrollVelocity * SCROLL_SENSITIVITY // Adjust the multiplier for sensitivity
        this.prevScrollY = window.scrollY

        // Collision detection with other shapes
        for (const otherShape of shapes) {
          if (otherShape === this) continue

          const dx = otherShape.x - this.x
          const dy = otherShape.y - this.y
          const dz = otherShape.z - this.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const minDistance = (this.size + otherShape.size) / 2

          if (distance < minDistance) {
            // Collision detected!
            // Calculate collision normal
            const nx = dx / distance
            const ny = dy / distance
            const nz = dz / distance

            // Calculate relative velocity
            const relVelocityX = otherShape.velocityX - this.velocityX
            const relVelocityY = otherShape.velocityY - this.velocityY
            const relVelocityZ = otherShape.velocityZ - this.velocityZ

            // Calculate relative velocity in terms of the normal direction
            const velocityAlongNormal = relVelocityX * nx + relVelocityY * ny + relVelocityZ * nz

            // Do not resolve if velocities are separating
            if (velocityAlongNormal > 0) continue

            // Calculate restitution (bounciness)
            const e = Math.min(this.restitution, otherShape.restitution)

            // Calculate impulse scalar
            let j = -(1 + e) * velocityAlongNormal
            j /= 1 / this.mass + 1 / otherShape.mass

            // Apply impulse
            const impulseX = j * nx
            const impulseY = j * ny
            const impulseZ = j * nz

            // Apply impulse based on mass
            this.velocityX -= impulseX / this.mass
            this.velocityY -= impulseY / this.mass
            this.velocityZ -= impulseZ / this.mass
            otherShape.velocityX += impulseX / otherShape.mass
            otherShape.velocityY += impulseY / otherShape.mass
            otherShape.velocityZ += impulseZ / otherShape.mass

            // Add some rotation on collision
            this.rotationVelocityX += (Math.random() - 0.5) * 0.02
            this.rotationVelocityY += (Math.random() - 0.5) * 0.02
            this.rotationVelocityZ += (Math.random() - 0.5) * 0.02

            // Separate the shapes to prevent sticking
            const correction = (minDistance - distance) * 0.5
            const correctionX = nx * correction
            const correctionY = ny * correction
            const correctionZ = nz * correction

            this.x -= correctionX
            this.y -= correctionY
            this.z -= correctionZ
            otherShape.x += correctionX
            otherShape.y += correctionY
            otherShape.z += correctionZ
          }
        }

        // Bounce off edges
        if (this.x > canvas.width - this.size / 2) {
          this.x = canvas.width - this.size / 2
          this.velocityX = -Math.abs(this.velocityX) * this.restitution
          this.rotationVelocityZ += (Math.random() - 0.5) * 0.05 // Add some spin on collision
        } else if (this.x < this.size / 2) {
          this.x = this.size / 2
          this.velocityX = Math.abs(this.velocityX) * this.restitution
          this.rotationVelocityZ += (Math.random() - 0.5) * 0.05
        }

        // Bounce off edges and reverse velocity
        if (this.y > canvas.height - this.size / 2) {
          this.y = canvas.height - this.size / 2;
          this.velocityY = -Math.abs(this.velocityY) * this.restitution; // Reverse velocity upwards
          this.rotationVelocityX += (Math.random() - 0.5) * 0.05;
        } else if (this.y < this.size / 2) {
          this.y = this.size / 2;
          this.velocityY = Math.abs(this.velocityY) * this.restitution; // Reverse velocity downwards
          this.rotationVelocityX += (Math.random() - 0.5) * 0.05;
        }

        // Z-axis boundaries
        if (this.z > 100) {
          this.z = 100
          this.velocityZ = -Math.abs(this.velocityZ) * this.restitution
        } else if (this.z < -100) {
          this.z = -100
          this.velocityZ = Math.abs(this.velocityZ) * this.restitution
        }
      }

      draw() {
        if (!ctx) return

        // Only draw if within or near the viewport
        const scrollY = window.scrollY
        if (this.y < scrollY - 300 || this.y > scrollY + window.innerHeight + 300) {
          return // Skip drawing if far outside viewport
        }

        ctx.save()
        ctx.translate(this.x, this.y)

        // Apply 3D rotation
        ctx.rotate(this.rotationX)
        ctx.rotate(this.rotationY)
        ctx.rotate(this.rotationZ)

        const size = this.size
        const halfSize = size / 2

        // Remove border highlight on hover
        const borderWidth = this.borderWidth

        if (this.type === "cube") {
          // Fix cube rendering
          ctx.fillStyle = this.color
          ctx.strokeStyle = this.borderColor
          ctx.lineWidth = borderWidth
          ctx.beginPath()
          ctx.rect(-halfSize, -halfSize, size, size)
          ctx.fill()
          ctx.stroke()
        } else if (this.type === "sphere") {
          // Fix sphere rendering
          ctx.fillStyle = this.color
          ctx.strokeStyle = this.borderColor
          ctx.lineWidth = borderWidth
          ctx.beginPath()
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        } else if (this.type === "pyramid") {
          // Fix pyramid rendering
          ctx.fillStyle = this.color
          ctx.strokeStyle = this.borderColor
          ctx.lineWidth = borderWidth
          ctx.beginPath()
          ctx.moveTo(0, -halfSize)
          ctx.lineTo(-halfSize, halfSize)
          ctx.lineTo(halfSize, halfSize)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }

        ctx.restore()
      }
    }

    // Preload all shapes - distribute them throughout the document height
    const shapes: Shape3D[] = []
    const shapeCount = SHAPE_COUNT // More shapes for better distribution and collision opportunities

    // Create shapes with proper spacing to avoid initial overlaps
    const gridCols = 8
    const gridRows = Math.ceil(shapeCount / gridCols)
    const cellWidth = canvas.width / gridCols
    const cellHeight = canvas.height / gridRows

    for (let i = 0; i < shapeCount; i++) {
      const col = i % gridCols
      const row = Math.floor(i / gridCols)

      // Position within cell with some randomness
      const x = col * cellWidth + cellWidth * (0.3 + Math.random() * 0.4)
      const y = row * cellHeight + cellHeight * (0.3 + Math.random() * 0.4)

      shapes.push(new Shape3D(x, y))
    }

    // Draw grid pattern like squared paper
    function drawGridPattern() {
      if (!ctx) return
      if (!canvas) return

      const gridSize = 70
      const gridColor = "rgba(200, 200, 200, 0.5)"

      // Only draw grid in the visible area plus some margin
      const startY = Math.max(0, window.scrollY - 100)
      const endY = window.scrollY + window.innerHeight + 100

      ctx.strokeStyle = gridColor
      ctx.lineWidth = 0.5

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x, endY)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = Math.floor(startY / gridSize) * gridSize; y < endY; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      // Clear only the visible portion of the canvas for better performance
      const visibleTop = window.scrollY
      const visibleBottom = visibleTop + window.innerHeight

      ctx.fillStyle = "oklch(93.46% 0.0305 255.11)" // Light blue background
      ctx.fillRect(0, visibleTop, canvas.width, window.innerHeight)

      // Draw grid pattern only in visible area
      drawGridPattern()

      // Update and draw shapes
      for (const shape of shapes) {
        shape.update(shapes)
        shape.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full"
      style={{
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}

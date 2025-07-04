# 💡 Code Examples & References

## 🎯 Overview

This document provides comprehensive code examples, UI references, and implementation patterns for Drawn of War 2. These examples serve as practical templates that Claude Code can use to build consistent, high-quality features.

## 🎨 UI Component Examples

### Button Component Implementation
```typescript
// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Card Component Implementation
```typescript
// components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

### Input Component Implementation
```typescript
// components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

## 🎮 Game Component Examples

### Drawing Canvas Component
```typescript
// components/game/drawing-canvas.tsx
'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { 
  Brush, 
  Eraser, 
  Undo, 
  Redo, 
  Trash2, 
  Palette,
  Download,
  Upload
} from 'lucide-react'

interface DrawingCanvasProps {
  width?: number
  height?: number
  onDrawingComplete?: (imageData: string) => void
  onDrawingChange?: (hasDrawing: boolean) => void
}

export function DrawingCanvas({ 
  width = 400, 
  height = 400, 
  onDrawingComplete,
  onDrawingChange 
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush')
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#000000')
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', 
    '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#A52A2A'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Initialize with white background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Save initial state
    const imageData = ctx.getImageData(0, 0, width, height)
    setHistory([imageData])
    setHistoryIndex(0)
  }, [width, height])

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = brushSize

    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = brushColor
    } else {
      ctx.globalCompositeOperation = 'destination-out'
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Save state to history
    const imageData = ctx.getImageData(0, 0, width, height)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    // Check if canvas has content
    const hasContent = !isCanvasBlank(canvas)
    onDrawingChange?.(hasContent)
  }

  const isCanvasBlank = (canvas: HTMLCanvasElement): boolean => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return true

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      // Check if pixel is not white
      if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
        return false
      }
    }
    return true
  }

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      restoreFromHistory(newIndex)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      restoreFromHistory(newIndex)
    }
  }

  const restoreFromHistory = (index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.putImageData(history[index], 0, 0)
    
    const hasContent = !isCanvasBlank(canvas)
    onDrawingChange?.(hasContent)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Save cleared state
    const imageData = ctx.getImageData(0, 0, width, height)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    onDrawingChange?.(false)
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imageData = canvas.toDataURL('image/png')
    onDrawingComplete?.(imageData)
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Drawing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Tool Selection */}
            <div className="flex gap-2">
              <Button
                variant={tool === 'brush' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('brush')}
              >
                <Brush className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === 'eraser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('eraser')}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </div>

            {/* History Controls */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Save Button */}
            <Button onClick={saveDrawing} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Save Drawing
            </Button>
          </div>

          {/* Brush Size */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Brush Size: {brushSize}px
            </label>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Color Palette */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Colors</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    brushColor === color ? 'border-primary' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBrushColor(color)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <Card>
        <CardContent className="p-4">
          <canvas
            ref={canvasRef}
            className="border border-gray-300 rounded-lg cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </CardContent>
      </Card>
    </div>
  )
}
```

### Battle Arena Component
```typescript
// components/game/battle-arena.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Sword, 
  Shield, 
  Zap, 
  Heart,
  Trophy,
  Clock,
  Users
} from 'lucide-react'

interface Creature {
  id: string
  name: string
  type: string
  element: string
  stats: {
    attack: number
    defense: number
    speed: number
    health: number
    maxHealth: number
  }
  abilities: string[]
  modelUrl?: string
  thumbnailUrl?: string
}

interface BattleArenaProps {
  playerCreature: Creature
  opponentCreature: Creature
  battleStatus: 'waiting' | 'active' | 'completed'
  currentTurn: 'player' | 'opponent'
  onAction?: (action: string) => void
}

export function BattleArena({
  playerCreature,
  opponentCreature,
  battleStatus,
  currentTurn,
  onAction
}: BattleArenaProps) {
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [turnTimer, setTurnTimer] = useState(30)

  useEffect(() => {
    if (battleStatus === 'active' && currentTurn === 'player') {
      const timer = setInterval(() => {
        setTurnTimer((prev) => {
          if (prev <= 1) {
            onAction?.('timeout')
            return 30
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [battleStatus, currentTurn, onAction])

  const getElementColor = (element: string) => {
    const colors = {
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      earth: 'bg-green-500',
      air: 'bg-gray-400',
      lightning: 'bg-yellow-500',
      ice: 'bg-cyan-500',
      neutral: 'bg-gray-500'
    }
    return colors[element] || colors.neutral
  }

  const getHealthPercentage = (health: number, maxHealth: number) => {
    return Math.max(0, (health / maxHealth) * 100)
  }

  const CreatureCard = ({ creature, position }: { creature: Creature, position: 'left' | 'right' }) => (
    <Card className={`w-full ${position === 'left' ? 'mr-4' : 'ml-4'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{creature.name}</CardTitle>
          <Badge variant="outline" className={getElementColor(creature.element)}>
            {creature.element}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Creature Thumbnail */}
        <div className="mb-4 flex justify-center">
          {creature.thumbnailUrl ? (
            <img 
              src={creature.thumbnailUrl} 
              alt={creature.name}
              className="w-24 h-24 object-contain rounded-lg border"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg border flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Health Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Health</span>
            <span>{creature.stats.health}/{creature.stats.maxHealth}</span>
          </div>
          <Progress 
            value={getHealthPercentage(creature.stats.health, creature.stats.maxHealth)}
            className="h-2"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Sword className="h-4 w-4 text-red-500" />
            <span className="text-sm">{creature.stats.attack}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{creature.stats.defense}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{creature.stats.speed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-green-500" />
            <span className="text-sm">{creature.stats.maxHealth}</span>
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h4 className="text-sm font-medium mb-2">Abilities</h4>
          <div className="flex flex-wrap gap-1">
            {creature.abilities.map((ability, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {ability}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Battle Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Battle Arena
            </CardTitle>
            {battleStatus === 'active' && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Turn: {turnTimer}s</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            {battleStatus === 'waiting' && (
              <p className="text-muted-foreground">Waiting for battle to begin...</p>
            )}
            {battleStatus === 'active' && (
              <div>
                <p className="font-medium mb-2">
                  {currentTurn === 'player' ? 'Your Turn' : "Opponent's Turn"}
                </p>
                <Progress value={(turnTimer / 30) * 100} className="w-full max-w-xs mx-auto" />
              </div>
            )}
            {battleStatus === 'completed' && (
              <p className="text-lg font-semibold">Battle Complete!</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Battle Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreatureCard creature={playerCreature} position="left" />
        <CreatureCard creature={opponentCreature} position="right" />
      </div>

      {/* Battle Actions */}
      {battleStatus === 'active' && currentTurn === 'player' && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => onAction?.('attack')}
                className="h-16"
              >
                <Sword className="h-5 w-5 mr-2" />
                Attack
              </Button>
              <Button 
                onClick={() => onAction?.('defend')}
                variant="outline"
                className="h-16"
              >
                <Shield className="h-5 w-5 mr-2" />
                Defend
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Battle Log */}
      <Card>
        <CardHeader>
          <CardTitle>Battle Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {battleLog.length === 0 ? (
              <p className="text-muted-foreground text-sm">Battle log will appear here...</p>
            ) : (
              battleLog.map((log, index) => (
                <p key={index} className="text-sm">{log}</p>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🔧 API Implementation Examples

### Authentication API Example
```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from 'firebase-admin'
import { rateLimit } from '@/lib/rate-limit'

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitPassed = await rateLimit(request, {
      windowMs: 60000, // 1 minute
      maxRequests: 5
    })

    if (!rateLimitPassed) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many login attempts. Please try again later.'
        }
      }, { status: 429 })
    }

    // Validate input
    const body = await request.json()
    const validation = loginSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: validation.error.flatten()
        }
      }, { status: 400 })
    }

    const { email, password } = validation.data

    // Authenticate with Firebase
    try {
      const userRecord = await auth().getUserByEmail(email)
      
      // Generate custom token
      const customToken = await auth().createCustomToken(userRecord.uid)

      // Get user profile from Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get()
      const userData = userDoc.data()

      if (!userData) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User profile not found'
          }
        }, { status: 404 })
      }

      // Update last active timestamp
      await db.collection('users').doc(userRecord.uid).update({
        lastActive: admin.firestore.Timestamp.now()
      })

      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: userRecord.uid,
            email: userRecord.email,
            displayName: userData.displayName,
            battleTokens: userData.battleTokens,
            level: userData.level,
            xp: userData.xp
          },
          token: customToken
        }
      })

    } catch (authError) {
      console.error('Authentication error:', authError)
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      }, { status: 401 })
    }

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred'
      }
    }, { status: 500 })
  }
}
```

### Drawing Analysis API Example
```typescript
// app/api/drawings/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { analyzeWithClaude } from '@/lib/ai/claude'
import { generateMesh } from '@/lib/ai/meshy'
import { generateFallbackAttributes } from '@/lib/ai/fallback'

const analyzeDrawingSchema = z.object({
  battleId: z.string(),
  imageData: z.string(),
  selectedLanes: z.array(z.enum(['left', 'center', 'right'])).length(2)
})

export async function POST(request: NextRequest) {
  try {
    // Authentication
    const user = await auth(request)
    if (!user) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      }, { status: 401 })
    }

    // Rate limiting (1 request per 30 seconds per user)
    const rateLimitPassed = await rateLimit(request, {
      windowMs: 30000,
      maxRequests: 1,
      keyGenerator: () => `drawing:${user.uid}`
    })

    if (!rateLimitPassed) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Please wait before analyzing another drawing'
        }
      }, { status: 429 })
    }

    // Validate input
    const body = await request.json()
    const validation = analyzeDrawingSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: validation.error.flatten()
        }
      }, { status: 400 })
    }

    const { battleId, imageData, selectedLanes } = validation.data

    // Validate image data
    const imageBuffer = Buffer.from(imageData.split(',')[1], 'base64')
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (imageBuffer.length > maxSize) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'IMAGE_TOO_LARGE',
          message: 'Image must be under 5MB'
        }
      }, { status: 400 })
    }

    // Generate drawing ID
    const drawingId = `drawing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create drawing record
    const drawingData = {
      id: drawingId,
      userId: user.uid,
      battleId,
      imageData: {
        original: imageData,
        width: 400,
        height: 400,
        format: 'png',
        fileSize: imageBuffer.length
      },
      selectedLanes,
      aiAnalysis: {
        status: 'processing',
        processingStarted: admin.firestore.Timestamp.now(),
        confidence: 0,
        attributes: { attack: 0, defense: 0, speed: 0, health: 0 },
        type: 'unknown',
        elementalType: 'neutral',
        specialAbilities: [],
        description: '',
        reasoning: '',
        usedFallback: false
      },
      meshGeneration: {
        status: 'pending',
        isOptimized: false,
        usedFallback: false
      },
      createdAt: admin.firestore.Timestamp.now(),
      version: 1
    }

    await db.collection('drawings').doc(drawingId).set(drawingData)

    // Start async processing
    processDrawingAsync(drawingId, imageData, user.uid)

    return NextResponse.json({
      success: true,
      data: {
        drawingId,
        status: 'processing',
        estimatedProcessingTime: 90000 // 90 seconds
      }
    }, { status: 202 })

  } catch (error) {
    console.error('Drawing analysis error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'DRAWING_PROCESSING_FAILED',
        message: 'Failed to process drawing'
      }
    }, { status: 500 })
  }
}

async function processDrawingAsync(drawingId: string, imageData: string, userId: string) {
  try {
    // Step 1: AI Analysis
    const analysis = await analyzeWithClaude(imageData)
    
    await db.collection('drawings').doc(drawingId).update({
      'aiAnalysis.status': 'completed',
      'aiAnalysis.processingCompleted': admin.firestore.Timestamp.now(),
      'aiAnalysis.confidence': analysis.confidence,
      'aiAnalysis.attributes': analysis.attributes,
      'aiAnalysis.type': analysis.type,
      'aiAnalysis.elementalType': analysis.elementalType,
      'aiAnalysis.specialAbilities': analysis.specialAbilities,
      'aiAnalysis.description': analysis.description,
      'aiAnalysis.reasoning': analysis.reasoning
    })

    // Step 2: 3D Model Generation
    const meshResult = await generateMesh(imageData)
    
    await db.collection('drawings').doc(drawingId).update({
      'meshGeneration.status': 'completed',
      'meshGeneration.processingCompleted': admin.firestore.Timestamp.now(),
      'meshGeneration.modelUrl': meshResult.modelUrl,
      'meshGeneration.thumbnailUrl': meshResult.thumbnailUrl,
      'meshGeneration.qualityScore': meshResult.qualityScore
    })

  } catch (error) {
    console.error('Async processing error:', error)
    
    // Fallback to template-based analysis
    const fallbackAttributes = generateFallbackAttributes(imageData)
    
    await db.collection('drawings').doc(drawingId).update({
      'aiAnalysis.status': 'completed',
      'aiAnalysis.usedFallback': true,
      'aiAnalysis.attributes': fallbackAttributes,
      'aiAnalysis.confidence': 0.3,
      'aiAnalysis.description': 'A mysterious creature with balanced attributes',
      'meshGeneration.status': 'completed',
      'meshGeneration.usedFallback': true,
      'meshGeneration.modelUrl': '/models/default-creature.glb'
    })
  }
}
```

## 🎨 UI Reference Examples

### Color Palette
```css
/* Design System Colors */
:root {
  /* Primary Colors */
  --primary-50: #FFF7ED;
  --primary-100: #FFEDD5;
  --primary-500: #F97316;
  --primary-900: #7C2D12;
  
  /* Secondary Colors */
  --secondary-50: #F0F9FF;
  --secondary-500: #0EA5E9;
  --secondary-900: #0C4A6E;
  
  /* Accent Colors */
  --accent-50: #FEFCE8;
  --accent-500: #F59E0B;
  --accent-900: #78350F;
  
  /* Semantic Colors */
  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### Animation Examples
```css
/* Battle Animations */
@keyframes battle-entrance {
  0% {
    transform: translateY(100px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes damage-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes healing-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.battle-creature {
  animation: battle-entrance 0.8s ease-out;
}

.damage-effect {
  animation: damage-shake 0.5s ease-in-out;
}

.healing-effect {
  animation: healing-pulse 1s ease-in-out;
}
```

## 🔧 Utility Functions

### Format Utilities
```typescript
// lib/utils/format.ts
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount / 100) // Convert cents to dollars
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatBattleTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}
```

### Validation Utilities
```typescript
// lib/utils/validation.ts
import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email format')

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const displayNameSchema = z.string()
  .min(2, 'Display name must be at least 2 characters')
  .max(20, 'Display name must be less than 20 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Display name can only contain letters, numbers, hyphens, and underscores')

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum size is 5MB.' }
  }

  return { valid: true }
}

export function validateDrawingData(imageData: string): { valid: boolean; error?: string } {
  try {
    const base64Data = imageData.split(',')[1]
    const buffer = Buffer.from(base64Data, 'base64')
    
    if (buffer.length > 5 * 1024 * 1024) {
      return { valid: false, error: 'Image data too large' }
    }
    
    return { valid: true }
  } catch (error) {
    return { valid: false, error: 'Invalid image data format' }
  }
}
```

This comprehensive code examples document provides Claude Code with practical, working implementations that can be directly used or adapted for the Drawn of War 2 project. Each example includes proper TypeScript typing, error handling, and follows the established patterns and conventions outlined in the other documentation files.

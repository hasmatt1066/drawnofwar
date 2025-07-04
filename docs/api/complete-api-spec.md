# 🔌 Complete API Documentation

## 🎯 API Architecture Overview

Drawn of War 2 uses a **hybrid API architecture** combining:
- **Next.js API Routes** for server-side business logic
- **Firebase Client SDK** for real-time data synchronization
- **Socket.io** for real-time multiplayer communication
- **External AI Services** for drawing analysis and 3D generation

### API Design Principles
- **RESTful Design**: Clear resource-based endpoints with proper HTTP methods
- **Type Safety**: Full TypeScript interfaces and validation
- **Real-time First**: Socket.io for game state updates
- **Security**: Authentication and authorization on all endpoints
- **Performance**: Optimized responses with caching strategies
- **Reliability**: Comprehensive error handling and fallbacks

## 🔐 Authentication & Security

### Authentication Flow
```typescript
interface AuthenticationFlow {
  registration: {
    endpoint: 'POST /api/auth/register',
    provider: 'Firebase Auth',
    validation: 'Email + password strength',
    response: 'User object + JWT token'
}

interface DeployWaveCreatureResponse {
  deployment: {
    creatureId: string
    lanes: [number, number]
    positions: [number, number] // Starting positions in each lane
    waveNumber: number
  }
  battleState: {
    territoryControl: TerritoryState
    activeCreatures: ActiveCreature[]
    nextWaveCountdown: number
  }
}
```

### Territorial Control API

#### Get Real-time Territory State
```typescript
// GET /api/battles/territorial/{battleId}/territory
interface TerritoryStateResponse {
  territoryMap: TerritoryState
  laneStates: LaneState[]
  aggregateControl: {
    player1: number // 0-100%
    player2: number // 0-100%
  }
  lastUpdate: string
  victoryProgress: {
    player1: {
      lanesControlled: number
      totalTerritory: number
      closeToVictory: boolean
    }
    player2: {
      lanesControlled: number
      totalTerritory: number
      closeToVictory: boolean
    }
  }
}
```

#### Execute Flanking Maneuver
```typescript
// POST /api/battles/territorial/{battleId}/creatures/{creatureId}/flank
interface FlankingManeuverRequest {
  battleId: string
  creatureId: string
  targetLane: number // Adjacent lane only
  flankingType: 'aggressive' | 'defensive' | 'supportive'
}

interface FlankingManeuverResponse {
  success: boolean
  maneuver: {
    fromLane: number
    toLane: number
    successRate: number
    damageBonus: number
    completed: boolean
  }
  territoryImpact: {
    territoryGained: number
    laneAdvantage: boolean
  }
}
```

### Territorial Socket.io Events

#### Real-time Territory Updates
```typescript
// Server to Client Events
interface TerritorialSocketEvents {
  // Wave Management
  'wave:countdown': {
    waveNumber: number
    timeRemaining: number // seconds
    phase: 'drawing' | 'deployment' | 'combat'
  }
  
  'wave:spawn': {
    waveNumber: number
    creatures: CreatureDeployment[]
    lanes: number[]
    playerId: string
  }
  
  // Territory Control Updates
  'territory:update': {
    territoryMap: TerritoryState
    timestamp: number
    aggregateControl: { player1: number, player2: number }
  }
  
  'territory:lane:progress': {
    lane: number
    player1Control: number // 0-100%
    player2Control: number // 0-100%
    contested: boolean
  }
  
  'territory:lane:captured': {
    lane: number
    capturedBy: string
    timestamp: number
  }
  
  // Combat Actions
  'combat:creature:advance': {
    creatureId: string
    position: number // 0-100 along lane
    lane: number
    territoryCapture: number // territory gained
  }
  
  'combat:creature:flank': {
    creatureId: string
    fromLane: number
    toLane: number
    success: boolean
    damageBonus?: number
  }
  
  'combat:ranged:support': {
    attackerId: string
    targetLane: number
    damage: number // 75% of normal damage
    targets: string[] // affected creature IDs
  }
  
  // Victory Conditions
  'victory:immediate': {
    winner: string
    reason: 'all_lanes_captured'
    finalTerritoryState: TerritoryState
    waveNumber: number
  }
  
  'victory:territorial': {
    winner: string
    reason: 'most_territory'
    finalScores: {
      player1: { totalTerritory: number, laneControls: number[] }
      player2: { totalTerritory: number, laneControls: number[] }
    }
    territoryAdvantage: number // percentage difference
  }
}
```

### Territorial Data Models

#### Core Territorial Structures
```typescript
interface TerritorialBattleConfig {
  waveCount: 3 | 5 | 7 | 10 // Based on battle type
  waveInterval: 120 | 150 | 180 // seconds per wave
  laneCount: 3
  battlefieldLength: number // for territorial advancement
  allowCrossLaneMovement: boolean
  allowRangedSupport: boolean
  earlyDeploymentEnabled: boolean
  territorialVictoryThreshold: number // percentage for victory
}

interface TerritoryState {
  lanes: LaneState[] // 3 lanes
  aggregateControl: {
    player1: number // 0-100%
    player2: number // 0-100%
  }
  timestamp: number
  lastSignificantChange: string
}

interface LaneState {
  laneIndex: number // 0, 1, 2
  player1Control: number // 0-100%
  player2Control: number // 0-100%
  contested: boolean
  closed: boolean // true when 100% captured
  creatures: CreatureInLane[]
  lastUpdate: number
}

interface CreatureInLane {
  id: string
  playerId: string
  waveNumber: number
  position: number // 0-100 along lane
  health: number
  maxHealth: number
  stats: CreatureStats
  isAdvancing: boolean
  canFlank: boolean
  isRanged: boolean
  abilities: SpecialAbility[]
  deployedAt: number
}

interface WaveState {
  currentWave: number // 1-5 (or more for special modes)
  timeRemaining: number // 0-180 seconds
  phase: 'preparation' | 'drawing' | 'deployment' | 'combat'
  playerDeployments: {
    [playerId: string]: {
      lanes: [number, number]
      creature: Creature
      deployed: boolean
      deployedAt?: number
    }
  }
  reinforcementAvailable: boolean
}
```

### Error Handling for Territorial System

#### Territorial-Specific Error Codes
```typescript
enum TerritorialErrorCode {
  // Wave Management
  INVALID_WAVE_PHASE = 'INVALID_WAVE_PHASE',
  WAVE_NOT_FOUND = 'WAVE_NOT_FOUND',
  WAVE_ALREADY_COMPLETED = 'WAVE_ALREADY_COMPLETED',
  DRAWING_TIME_EXPIRED = 'DRAWING_TIME_EXPIRED',
  
  // Lane Selection
  INVALID_LANE_SELECTION = 'INVALID_LANE_SELECTION',
  LANE_ALREADY_OCCUPIED = 'LANE_ALREADY_OCCUPIED',
  INSUFFICIENT_LANE_COUNT = 'INSUFFICIENT_LANE_COUNT',
  
  // Territory Control
  TERRITORY_CALCULATION_ERROR = 'TERRITORY_CALCULATION_ERROR',
  INVALID_TERRITORY_STATE = 'INVALID_TERRITORY_STATE',
  TERRITORY_SYNC_FAILED = 'TERRITORY_SYNC_FAILED',
  
  // Cross-Lane Actions
  INVALID_FLANK_TARGET = 'INVALID_FLANK_TARGET',
  FLANKING_NOT_AVAILABLE = 'FLANKING_NOT_AVAILABLE',
  CROSS_LANE_ATTACK_FAILED = 'CROSS_LANE_ATTACK_FAILED',
  
  // Deployment
  NO_CREATURE_READY = 'NO_CREATURE_READY',
  DEPLOYMENT_TIMEOUT = 'DEPLOYMENT_TIMEOUT',
  INVALID_DEPLOYMENT_STRATEGY = 'INVALID_DEPLOYMENT_STRATEGY',
  
  // Victory Conditions
  VICTORY_CONDITION_ERROR = 'VICTORY_CONDITION_ERROR',
  TERRITORIAL_CALCULATION_FAILED = 'TERRITORIAL_CALCULATION_FAILED'
}
```

### Performance Considerations

#### Territorial System Optimization
```typescript
interface TerritorialPerformanceTargets {
  territoryUpdates: {
    frequency: '10 updates/second (100ms intervals)',
    latency: '< 50ms territory state synchronization',
    accuracy: '99.9% territory calculation accuracy'
  }
  
  waveManagement: {
    drawingPhase: '< 5ms drawing stroke processing',
    deployment: '< 100ms creature deployment',
    analysis: '< 15s AI analysis per creature'
  }
  
  visualPerformance: {
    colorBlending: '60 FPS territorial color transitions',
    progressBars: '< 16ms progress bar updates',
    animations: '60 FPS creature advancement'
  }
  
  scalability: {
    concurrentBattles: '1000+ simultaneous territorial battles',
    playersPerBattle: '2 players with real-time sync',
    waveCoordination: '5+ waves active simultaneously'
  }
}
```

---

*This territorial wave combat API provides comprehensive coverage of the sophisticated territorial advancement system, multi-wave coordination, and cross-lane tactical interactions that define the strategic depth of Drawn of War 2.*
  
  login: {
    endpoint: 'POST /api/auth/login',
    provider: 'Firebase Auth',
    validation: 'Email + password',
    response: 'User object + JWT token'
  }
  
  tokenRefresh: {
    endpoint: 'POST /api/auth/refresh',
    trigger: 'Automatic when token expires',
    response: 'New JWT token'
  }
  
  logout: {
    endpoint: 'POST /api/auth/logout',
    action: 'Invalidate client token',
    response: 'Success confirmation'
  }
}
```

### Authorization Middleware
```typescript
// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from 'firebase-admin'

export async function authMiddleware(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED', message: 'No token provided' },
        { status: 401 }
      )
    }
    
    const decodedToken = await auth().verifyIdToken(token)
    
    // Add user info to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', decodedToken.uid)
    requestHeaders.set('x-user-email', decodedToken.email || '')
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'INVALID_TOKEN', message: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}
```

### Rate Limiting
```typescript
// lib/rate-limit.ts
import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  keyGenerator?: (req: NextRequest) => string
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<boolean> {
  const key = config.keyGenerator ? 
    config.keyGenerator(request) : 
    request.ip || 'anonymous'
  
  const window = Math.floor(Date.now() / config.windowMs)
  const redisKey = `rate_limit:${key}:${window}`
  
  try {
    const current = await redis.incr(redisKey)
    
    if (current === 1) {
      await redis.expire(redisKey, Math.ceil(config.windowMs / 1000))
    }
    
    return current <= config.maxRequests
  } catch (error) {
    // Fail open - allow request if Redis is down
    console.error('Rate limiting error:', error)
    return true
  }
}

// Usage in API routes
export const defaultRateLimit = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100
}

export const strictRateLimit = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5
}
```

## 📝 Standard API Response Format

### Response Interface
```typescript
interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
  meta?: {
    timestamp: string
    requestId: string
    version: string
    pagination?: {
      page: number
      limit: number
      total: number
      hasMore: boolean
    }
  }
}

// Success response example
const successResponse: APIResponse<User> = {
  success: true,
  data: {
    id: 'user123',
    email: 'player@example.com',
    displayName: 'Player One',
    battleTokens: 5,
    level: 3
  },
  meta: {
    timestamp: '2024-01-15T10:30:00Z',
    requestId: 'req_abc123',
    version: '1.0.0'
  }
}

// Error response example
const errorResponse: APIResponse = {
  success: false,
  error: {
    code: 'INSUFFICIENT_TOKENS',
    message: 'You need at least 1 battle token to start a battle',
    details: {
      required: 1,
      available: 0,
      suggestedAction: 'Purchase tokens or wait for daily bonus'
    }
  },
  meta: {
    timestamp: '2024-01-15T10:30:00Z',
    requestId: 'req_abc123',
    version: '1.0.0'
  }
}
```

### Error Codes
```typescript
enum APIErrorCode {
  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  // User Management
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  INVALID_EMAIL = 'INVALID_EMAIL',
  
  // Battle System
  BATTLE_NOT_FOUND = 'BATTLE_NOT_FOUND',
  BATTLE_FULL = 'BATTLE_FULL',
  BATTLE_ALREADY_STARTED = 'BATTLE_ALREADY_STARTED',
  NOT_YOUR_TURN = 'NOT_YOUR_TURN',
  INSUFFICIENT_TOKENS = 'INSUFFICIENT_TOKENS',
  MATCHMAKING_TIMEOUT = 'MATCHMAKING_TIMEOUT',
  
  // Drawing & AI
  DRAWING_PROCESSING_FAILED = 'DRAWING_PROCESSING_FAILED',
  INVALID_IMAGE_FORMAT = 'INVALID_IMAGE_FORMAT',
  IMAGE_TOO_LARGE = 'IMAGE_TOO_LARGE',
  AI_SERVICE_UNAVAILABLE = 'AI_SERVICE_UNAVAILABLE',
  AI_ANALYSIS_TIMEOUT = 'AI_ANALYSIS_TIMEOUT',
  
  // Payment
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INVALID_PAYMENT_METHOD = 'INVALID_PAYMENT_METHOD',
  PAYMENT_ALREADY_PROCESSED = 'PAYMENT_ALREADY_PROCESSED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  
  // General
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  NETWORK_ERROR = 'NETWORK_ERROR'
}
```

## 👤 User Management API

### POST /api/users/register
```typescript
interface RegisterRequest {
  email: string
  password: string
  displayName: string
  acceptTerms: boolean
}

interface RegisterResponse {
  user: {
    id: string
    email: string
    displayName: string
    battleTokens: number
    level: number
    xp: number
    emailVerified: boolean
    createdAt: string
  }
  token: string
}

// Implementation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = registerSchema.safeParse(body)
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
    
    const { email, password, displayName, acceptTerms } = validation.data
    
    // Check terms acceptance
    if (!acceptTerms) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'TERMS_NOT_ACCEPTED',
          message: 'You must accept the terms of service'
        }
      }, { status: 400 })
    }
    
    // Create Firebase user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false
    })
    
    // Create user document in Firestore
    const userData = {
      uid: userRecord.uid,
      email,
      displayName,
      battleTokens: 0,
      level: 1,
      xp: 0,
      stats: {
        totalBattles: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        favoriteCreatureType: null,
        averageBattleTime: 0
      },
      preferences: {
        theme: 'light',
        soundEnabled: true,
        musicEnabled: true,
        notificationsEnabled: true,
        language: 'en',
        autoSaveDrawings: true
      },
      achievements: [],
      isActive: true,
      isPremium: false,
      createdAt: admin.firestore.Timestamp.now(),
      lastActive: admin.firestore.Timestamp.now(),
      version: 1
    }
    
    await db.collection('users').doc(userRecord.uid).set(userData)
    
    // Generate custom token
    const token = await admin.auth().createCustomToken(userRecord.uid)
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: userRecord.uid,
          email,
          displayName,
          battleTokens: 0,
          level: 1,
          xp: 0,
          emailVerified: false,
          createdAt: userData.createdAt.toDate().toISOString()
        },
        token
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email already exists'
        }
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create account'
      }
    }, { status: 500 })
  }
}
```

### GET /api/users/profile
```typescript
interface ProfileResponse {
  user: {
    id: string
    email: string
    displayName: string
    battleTokens: number
    level: number
    xp: number
    xpToNextLevel: number
    stats: UserStats
    preferences: UserPreferences
    achievements: Achievement[]
    createdAt: string
    lastActive: string
  }
}

// Implementation with authentication middleware
export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  
  if (!userId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    }, { status: 401 })
  }
  
  try {
    const userDoc = await db.collection('users').doc(userId).get()
    
    if (!userDoc.exists) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User profile not found'
        }
      }, { status: 404 })
    }
    
    const userData = userDoc.data()!
    
    // Calculate XP to next level
    const currentLevel = userData.level
    const xpToNextLevel = (currentLevel * 150) + ((currentLevel - 1) * 50) - userData.xp
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          battleTokens: userData.battleTokens,
          level: userData.level,
          xp: userData.xp,
          xpToNextLevel,
          stats: userData.stats,
          preferences: userData.preferences,
          achievements: userData.achievements,
          createdAt: userData.createdAt.toDate().toISOString(),
          lastActive: userData.lastActive.toDate().toISOString()
        }
      }
    })
    
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch profile'
      }
    }, { status: 500 })
  }
}
```

## 💰 Payment API

### POST /api/payments/create-intent
```typescript
interface CreatePaymentIntentRequest {
  tokenCount: number // 1, 5, or 10
  currency?: string // defaults to 'usd'
}

interface CreatePaymentIntentResponse {
  clientSecret: string
  paymentIntentId: string
  amount: number
  currency: string
  tokenCount: number
  discount?: {
    type: string
    amount: number
    percentage: number
  }
}

// Token pricing with bulk discounts
const TOKEN_PRICING = {
  1: { amount: 500, discount: 0 },     // $5.00
  5: { amount: 2000, discount: 500 },  // $20.00 (was $25.00, 20% off)
  10: { amount: 3500, discount: 1500 } // $35.00 (was $50.00, 30% off)
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  
  if (!userId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    }, { status: 401 })
  }
  
  try {
    const body = await request.json()
    const { tokenCount, currency = 'usd' } = body
    
    // Validate token count
    if (!TOKEN_PRICING[tokenCount]) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid token count. Must be 1, 5, or 10.',
          details: { validCounts: [1, 5, 10] }
        }
      }, { status: 400 })
    }
    
    const { amount, discount } = TOKEN_PRICING[tokenCount]
    
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        userId,
        tokenCount: tokenCount.toString(),
        discount: discount.toString()
      },
      description: `${tokenCount} Battle Token${tokenCount > 1 ? 's' : ''}`,
      automatic_payment_methods: {
        enabled: true
      }
    })
    
    // Create payment record in Firestore
    const paymentData = {
      id: paymentIntent.id,
      userId,
      stripePaymentIntentId: paymentIntent.id,
      amount,
      currency,
      tokenCount,
      discount,
      status: 'pending',
      description: `${tokenCount} Battle Token${tokenCount > 1 ? 's' : ''}`,
      fulfillment: {
        status: 'pending',
        tokensGranted: 0
      },
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    }
    
    await db.collection('payments').doc(paymentIntent.id).set(paymentData)
    
    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amount,
        currency,
        tokenCount,
        ...(discount > 0 && {
          discount: {
            type: 'bulk',
            amount: discount,
            percentage: Math.round((discount / (amount + discount)) * 100)
          }
        })
      }
    })
    
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'PAYMENT_FAILED',
        message: 'Failed to create payment intent'
      }
    }, { status: 500 })
  }
}
```

### POST /api/payments/webhook
```typescript
// Stripe webhook handler
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const paymentId = paymentIntent.id
  const userId = paymentIntent.metadata.userId
  const tokenCount = parseInt(paymentIntent.metadata.tokenCount)
  
  // Update payment record
  await db.collection('payments').doc(paymentId).update({
    status: 'succeeded',
    completedAt: admin.firestore.Timestamp.now(),
    stripeData: {
      receiptUrl: paymentIntent.charges.data[0]?.receipt_url,
      paymentMethod: paymentIntent.payment_method
    }
  })
  
  // Grant tokens to user
  await db.collection('users').doc(userId).update({
    battleTokens: admin.firestore.FieldValue.increment(tokenCount),
    lifetimeTokensPurchased: admin.firestore.FieldValue.increment(tokenCount),
    lastPurchaseAt: admin.firestore.Timestamp.now()
  })
  
  // Update fulfillment status
  await db.collection('payments').doc(paymentId).update({
    'fulfillment.status': 'completed',
    'fulfillment.tokensGranted': tokenCount,
    'fulfillment.grantedAt': admin.firestore.Timestamp.now()
  })
  
  console.log(`Payment ${paymentId} succeeded: ${tokenCount} tokens granted to user ${userId}`)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const paymentId = paymentIntent.id
  
  await db.collection('payments').doc(paymentId).update({
    status: 'failed',
    failedAt: admin.firestore.Timestamp.now(),
    failureReason: paymentIntent.last_payment_error?.message || 'Unknown error'
  })
  
  console.log(`Payment ${paymentId} failed`)
}
```

## 🎨 Drawing & AI API

### POST /api/drawings/analyze
```typescript
interface AnalyzeDrawingRequest {
  battleId: string
  imageData: string // base64 encoded image
  selectedLanes: ('left' | 'center' | 'right')[]
}

interface AnalyzeDrawingResponse {
  drawingId: string
  status: 'processing' | 'completed' | 'failed'
  analysis?: {
    attributes: {
      attack: number
      defense: number
      speed: number
      health: number
    }
    type: string
    elementalType: string
    specialAbilities: string[]
    confidence: number
    description: string
    reasoning: string
  }
  meshGeneration?: {
    status: 'processing' | 'completed' | 'failed'
    modelUrl?: string
    thumbnailUrl?: string
  }
  estimatedProcessingTime: number
}

// Rate limiting: 1 request per 30 seconds per user
const DRAWING_RATE_LIMIT = {
  windowMs: 30 * 1000, // 30 seconds
  maxRequests: 1
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  
  if (!userId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    }, { status: 401 })
  }
  
  // Check rate limit
  const rateLimitPassed = await rateLimit(request, {
    ...DRAWING_RATE_LIMIT,
    keyGenerator: (req) => `drawing:${userId}`
  })
  
  if (!rateLimitPassed) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Please wait before analyzing another drawing',
        details: { retryAfter: DRAWING_RATE_LIMIT.windowMs }
      }
    }, { status: 429 })
  }
  
  try {
    const body = await request.json()
    const { battleId, imageData, selectedLanes } = body
    
    // Validate input
    if (!battleId || !imageData || !selectedLanes || selectedLanes.length !== 2) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: {
            battleId: 'required',
            imageData: 'required base64 string',
            selectedLanes: 'required array of 2 lanes'
          }
        }
      }, { status: 400 })
    }
    
    // Validate image data
    const imageBuffer = Buffer.from(imageData.split(',')[1], 'base64')
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (imageBuffer.length > maxSize) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'IMAGE_TOO_LARGE',
          message: 'Image must be under 5MB',
          details: { maxSize: '5MB', currentSize: `${Math.round(imageBuffer.length / 1024 / 1024)}MB` }
        }
      }, { status: 400 })
    }
    
    // Generate drawing ID
    const drawingId = `drawing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create drawing record
    const drawingData = {
      id: drawingId,
      userId,
      battleId,
      imageData: {
        original: imageData,
        format: 'png',
        width: 400,
        height: 400,
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
    
    // Start AI processing asynchronously
    processDrawingAsync(drawingId, imageData, userId)
    
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

// Async processing function
async function processDrawingAsync(drawingId: string, imageData: string, userId: string) {
  try {
    // Step 1: Claude Vision Analysis
    const analysis = await analyzeWithClaude(imageData)
    
    // Update drawing with analysis
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
    
    // Update drawing with mesh generation
    await db.collection('drawings').doc(drawingId).update({
      'meshGeneration.status': 'completed',
      'meshGeneration.processingCompleted': admin.firestore.Timestamp.now(),
      'meshGeneration.modelUrl': meshResult.modelUrl,
      'meshGeneration.thumbnailUrl': meshResult.thumbnailUrl,
      'meshGeneration.qualityScore': meshResult.qualityScore
    })
    
  } catch (error) {
    console.error('Async processing error:', error)
    
    // Generate fallback attributes
    const fallbackAttributes = generateFallbackAttributes(imageData)
    
    // Update with fallback data
    await db.collection('drawings').doc(drawingId).update({
      'aiAnalysis.status': 'completed',
      'aiAnalysis.usedFallback': true,
      'aiAnalysis.attributes': fallbackAttributes,
      'aiAnalysis.type': 'unknown',
      'aiAnalysis.elementalType': 'neutral',
      'aiAnalysis.confidence': 0.3,
      'aiAnalysis.description': 'A mysterious creature with balanced attributes',
      'aiAnalysis.reasoning': 'Used fallback analysis due to AI service unavailability',
      'meshGeneration.status': 'completed',
      'meshGeneration.usedFallback': true,
      'meshGeneration.modelUrl': '/models/default-creature.glb'
    })
  }
}

// Claude Vision API integration
async function analyzeWithClaude(imageData: string): Promise<any> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CLAUDE_API_KEY}`,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this hand-drawn creature for a battle game. Provide stats based on visual elements:
              - Size/bulk for health/defense
              - Sharp elements for attack
              - Limbs/body shape for speed
              - Overall design for special abilities
              
              Return JSON with:
              - attack (1-100)
              - defense (1-100)
              - speed (1-100)
              - health (50-150)
              - type (beast, dragon, humanoid, mechanical, elemental, cosmic)
              - elementalType (fire, water, earth, air, lightning, ice, nature, neutral)
              - specialAbilities (array of ability names)
              - confidence (0-1)
              - description (brief creature description)
              - reasoning (explanation of attribute assignments)`
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: imageData.split(',')[1]
              }
            }
          ]
        }
      ]
    })
  })
  
  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`)
  }
  
  const result = await response.json()
  return JSON.parse(result.content[0].text)
}

// Fallback attribute generation
function generateFallbackAttributes(imageData: string): any {
  // Simple hash-based attribute generation for consistent results
  const hash = simpleHash(imageData)
  
  return {
    attack: 30 + (hash % 40),
    defense: 30 + ((hash >> 8) % 40),
    speed: 30 + ((hash >> 16) % 40),
    health: 70 + ((hash >> 24) % 60)
  }
}

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}
```

### GET /api/drawings/[drawingId]/status
```typescript
interface DrawingStatusResponse {
  drawingId: string
  status: 'processing' | 'completed' | 'failed'
  progress: number // 0-100
  analysis?: AIAnalysis
  meshGeneration?: MeshGeneration
  estimatedTimeRemaining?: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: { drawingId: string } }
) {
  const userId = request.headers.get('x-user-id')
  const { drawingId } = params
  
  if (!userId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    }, { status: 401 })
  }
  
  try {
    const drawingDoc = await db.collection('drawings').doc(drawingId).get()
    
    if (!drawingDoc.exists) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'DRAWING_NOT_FOUND',
          message: 'Drawing not found'
        }
      }, { status: 404 })
    }
    
    const drawingData = drawingDoc.data()!
    
    // Check ownership
    if (drawingData.userId !== userId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied'
        }
      }, { status: 403 })
    }
    
    // Calculate progress
    let progress = 0
    let status: 'processing' | 'completed' | 'failed' = 'processing'
    
    if (drawingData.aiAnalysis.status === 'completed') {
      progress += 50
    }
    if (drawingData.meshGeneration.status === 'completed') {
      progress += 50
    }
    
    if (progress === 100) {
      status = 'completed'
    } else if (drawingData.aiAnalysis.status === 'failed' || drawingData.meshGeneration.status === 'failed') {
      status = 'failed'
    }
    
    // Calculate estimated time remaining
    let estimatedTimeRemaining: number | undefined
    if (progress < 100) {
      const processingTime = Date.now() - drawingData.aiAnalysis.processingStarted.toDate().getTime()
      const avgProcessingTime = 90000 // 90 seconds
      estimatedTimeRemaining = Math.max(0, avgProcessingTime - processingTime)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        drawingId: drawingData.id,
        status,
        progress,
        analysis: drawingData.aiAnalysis,
        meshGeneration: drawingData.meshGeneration,
        estimatedTimeRemaining
      }
    })
    
  } catch (error) {
    console.error('Drawing status error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to get drawing status'
      }
    }, { status: 500 })
  }
}
```

## ⚔️ Battle System API

### POST /api/battles/create
```typescript
interface CreateBattleRequest {
  type: 'casual' | 'ranked' | 'practice' | 'tournament'
  isPrivate?: boolean
  inviteCode?: string
}

interface CreateBattleResponse {
  battleId: string
  status: 'waiting' | 'matched' | 'starting'
  estimatedWaitTime?: number
  opponent?: {
    id: string
    displayName: string
    level: number
    stats: {
      wins: number
      losses: number
      winRate: number
    }
  }
  roomCode?: string
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  
  if (!userId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    }, { status: 401 })
  }
  
  try {
    const body = await request.json()
    const { type, isPrivate, inviteCode } = body
    
    // Validate battle type
    const validTypes = ['casual', 'ranked', 'practice', 'tournament']
    if (!validTypes.includes(type)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid battle type',
          details: { validTypes }
        }
      }, { status: 400 })
    }
    
    // Get user data
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()!
    
    // Check battle tokens for non-practice battles
    if (type !== 'practice') {
      const tokensRequired = type === 'ranked' ? 2 : 1
      
      if (userData.battleTokens < tokensRequired) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'INSUFFICIENT_TOKENS',
            message: `You need ${tokensRequired} battle token${tokensRequired > 1 ? 's' : ''} to start a ${type} battle`,
            details: {
              required: tokensRequired,
              available: userData.battleTokens
            }
          }
        }, { status: 400 })
      }
    }
    
    // Handle private battles with invite codes
    if (isPrivate && inviteCode) {
      const existingBattle = await findBattleByInviteCode(inviteCode)
      if (existingBattle) {
        return await joinPrivateBattle(existingBattle.id, userId)
      }
    }
    
    // Check for existing waiting battles (matchmaking)
    if (!isPrivate && type !== 'practice') {
      const existingBattle = await findWaitingBattle(userId, type)
      if (existingBattle) {
        return await joinExistingBattle(existingBattle.id, userId)
      }
    }
    
    // Create new battle
    const battleId = `battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const roomCode = isPrivate ? generateRoomCode() : undefined
    
    const battleData = {
      id: battleId,
      type,
      status: type === 'practice' ? 'starting' : 'waiting',
      isPrivate: isPrivate || false,
      roomCode,
      players: {
        player1: {
          uid: userId,
          displayName: userData.displayName,
          level: userData.level,
          stats: userData.stats,
          ready: false,
          connected: true
        },
        player2: type === 'practice' ? {
          uid: 'ai',
          displayName: 'AI Opponent',
          level: userData.level,
          stats: { wins: 0, losses: 0, winRate: 0 },
          ready: true,
          connected: true
        } : null
      },
      gameState: {
        phase: 'waiting',
        turn: 1,
        currentPlayer: 'player1',
        timeLimit: 120000, // 2 minutes per turn
        turnStartTime: null
      },
      drawings: {
        player1: null,
        player2: null
      },
      results: null,
      tokensConsumed: type === 'practice' ? 0 : (type === 'ranked' ? 2 : 1),
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    }
    
    await db.collection('battles').doc(battleId).set(battleData)
    
    // Deduct tokens for non-practice battles
    if (type !== 'practice') {
      await db.collection('users').doc(userId).update({
        battleTokens: admin.firestore.FieldValue.increment(-battleData.tokensConsumed)
      })
    }
    
    return NextResponse.json({
      success: true,
      data: {
        battleId,
        status: battleData.status,
        estimatedWaitTime: type === 'practice' ? 0 : 30000, // 30 seconds
        ...(roomCode && { roomCode })
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Battle creation error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create battle'
      }
    }, { status: 500 })
  }
}

// Helper functions
async function findWaitingBattle(userId: string, type: string) {
  const waitingBattles = await db.collection('battles')
    .where('type', '==', type)
    .where('status', '==', 'waiting')
    .where('isPrivate', '==', false)
    .where('players.player1.uid', '!=', userId)
    .limit(1)
    .get()
  
  return waitingBattles.empty ? null : waitingBattles.docs[0].data()
}

async function joinExistingBattle(battleId: string, userId: string) {
  const userDoc = await db.collection('users').doc(userId).get()
  const userData = userDoc.data()!
  
  await db.collection('battles').doc(battleId).update({
    'players.player2': {
      uid: userId,
      displayName: userData.displayName,
      level: userData.level,
      stats: userData.stats,
      ready: false,
      connected: true
    },
    status: 'matched',
    updatedAt: admin.firestore.Timestamp.now()
  })
  
  return NextResponse.json({
    success: true,
    data: {
      battleId,
      status: 'matched'
    }
  })
}

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
```

### GET /api/battles/[battleId]
```typescript
interface BattleResponse {
  battle: Battle
  canJoin: boolean
  isPlayer: boolean
  role?: 'player1' | 'player2' | 'spectator'
  playerStats?: {
    tokensSpent: number
    battlesWon: number
    currentStreak: number
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { battleId: string } }
) {
  const userId = request.headers.get('x-user-id')
  const { battleId } = params
  
  try {
    const battleDoc = await db.collection('battles').doc(battleId).get()
    
    if (!battleDoc.exists) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'BATTLE_NOT_FOUND',
          message: 'Battle not found'
        }
      }, { status: 404 })
    }
    
    const battleData = battleDoc.data()! as Battle
    
    // Determine user's role
    let role: 'player1' | 'player2' | 'spectator' = 'spectator'
    let isPlayer = false
    
    if (battleData.players.player1.uid === userId) {
      role = 'player1'
      isPlayer = true
    } else if (battleData.players.player2?.uid === userId) {
      role = 'player2'
      isPlayer = true
    }
    
    // Check if user can join
    const canJoin = !isPlayer && 
                   battleData.status === 'waiting' && 
                   !battleData.players.player2 &&
                   battleData.type !== 'practice'
    
    // Get player stats if authenticated
    let playerStats: any = undefined
    if (userId && isPlayer) {
      const userDoc = await db.collection('users').doc(userId).get()
      const userData = userDoc.data()!
      
      playerStats = {
        tokensSpent: userData.lifetimeTokensPurchased || 0,
        battlesWon: userData.stats.wins,
        currentStreak: userData.stats.currentStreak
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        battle: battleData,
        canJoin,
        isPlayer,
        role,
        playerStats
      }
    })
    
  } catch (error) {
    console.error('Battle fetch error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch battle'
      }
    }, { status: 500 })
  }
}
```

## 🔄 Socket.io Real-Time Events

### Event Interface Definitions
```typescript
interface ClientToServerEvents {
  // Connection events
  'join-battle': (data: { battleId: string }) => void
  'leave-battle': (data: { battleId: string }) => void
  'player-ready': (data: { battleId: string, ready: boolean }) => void
  
  // Battle events
  'submit-drawing': (data: { battleId: string, drawingId: string }) => void
  'request-rematch': (data: { battleId: string }) => void
  'spectate-battle': (data: { battleId: string }) => void
  
  // Communication events
  'send-emote': (data: { battleId: string, emote: string }) => void
  'typing-status': (data: { battleId: string, isTyping: boolean }) => void
  
  // System events
  'ping': () => void
  'reconnect-battle': (data: { battleId: string, lastEventId?: string }) => void
}

interface ServerToClientEvents {
  // Battle state events
  'battle-state': (data: { battle: Battle, timestamp: number }) => void
  'player-joined': (data: { player: PlayerInBattle, battleId: string }) => void
  'player-left': (data: { playerId: string, battleId: string }) => void
  'player-ready-changed': (data: { playerId: string, ready: boolean }) => void
  
  // Game phase events
  'phase-changed': (data: { phase: string, timeLimit?: number }) => void
  'turn-started': (data: { turn: 'player1' | 'player2', timeLimit: number }) => void
  'turn-timer': (data: { timeRemaining: number }) => void
  'turn-ended': (data: { reason: 'timeout' | 'submitted' | 'disconnected' }) => void
  
  // Drawing events
  'drawing-submitted': (data: { playerId: string, drawingId: string }) => void
  'drawing-analyzed': (data: { playerId: string, analysis: AIAnalysis }) => void
  'drawing-processing': (data: { playerId: string, progress: number }) => void
  
  // Battle events
  'battle-started': (data: { battleId: string, participants: Player[] }) => void
  'battle-action': (data: { action: BattleAction, result: ActionResult }) => void
  'battle-ended': (data: { result: BattleResult, rewards: BattleRewards }) => void
  
  // Communication events
  'emote-received': (data: { fromPlayer: string, emote: string, timestamp: number }) => void
  'typing-indicator': (data: { playerId: string, isTyping: boolean }) => void
  
  // System events
  'error': (data: { code: string, message: string, details?: any }) => void
  'pong': () => void
  'reconnected': (data: { battleId: string, missedEvents: any[] }) => void
}
```

### Socket.io Server Implementation
```typescript
// pages/api/socket.ts
import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io server...')
    
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? process.env.NEXT_PUBLIC_APP_URL 
          : 'http://localhost:3000',
        methods: ['GET', 'POST']
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000
    })
    
    // Middleware for authentication
    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token
        if (!token) {
          return next(new Error('Authentication required'))
        }
        
        const decodedToken = await admin.auth().verifyIdToken(token)
        socket.userId = decodedToken.uid
        socket.userEmail = decodedToken.email
        
        next()
      } catch (error) {
        next(new Error('Invalid token'))
      }
    })
    
    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.userId}`)
      
      // Join battle room
      socket.on('join-battle', async (data) => {
        try {
          const { battleId } = data
          
          // Verify battle exists and user can join
          const battle = await getBattleById(battleId)
          if (!battle) {
            socket.emit('error', { 
              code: 'BATTLE_NOT_FOUND', 
              message: 'Battle not found' 
            })
            return
          }
          
          // Check if user is a participant
          const isParticipant = 
            battle.players.player1.uid === socket.userId || 
            battle.players.player2?.uid === socket.userId
          
          if (!isParticipant && battle.type !== 'spectate') {
            socket.emit('error', { 
              code: 'FORBIDDEN', 
              message: 'You are not a participant in this battle' 
            })
            return
          }
          
          // Join battle room
          socket.join(battleId)
          socket.currentBattle = battleId
          
          // Send current battle state
          socket.emit('battle-state', { 
            battle, 
            timestamp: Date.now() 
          })
          
          // Notify other players
          socket.to(battleId).emit('player-joined', {
            player: await getPlayerInfo(socket.userId),
            battleId
          })
          
          // Update player connection status
          await updatePlayerConnection(battleId, socket.userId, true)
          
        } catch (error) {
          console.error('Join battle error:', error)
          socket.emit('error', { 
            code: 'INTERNAL_SERVER_ERROR', 
            message: 'Failed to join battle' 
          })
        }
      })
      
      // Leave battle room
      socket.on('leave-battle', async (data) => {
        try {
          const { battleId } = data
          
          socket.leave(battleId)
          socket.currentBattle = null
          
          // Notify other players
          socket.to(battleId).emit('player-left', {
            playerId: socket.userId,
            battleId
          })
          
          // Update player connection status
          await updatePlayerConnection(battleId, socket.userId, false)
          
        } catch (error) {
          console.error('Leave battle error:', error)
        }
      })
      
      // Player ready status
      socket.on('player-ready', async (data) => {
        try {
          const { battleId, ready } = data
          
          // Update player ready status
          await updatePlayerReadyStatus(battleId, socket.userId, ready)
          
          // Notify all players
          io.to(battleId).emit('player-ready-changed', {
            playerId: socket.userId,
            ready
          })
          
          // Check if both players are ready
          const battle = await getBattleById(battleId)
          if (battle && areAllPlayersReady(battle)) {
            await startBattle(battleId)
            io.to(battleId).emit('battle-started', {
              battleId,
              participants: [battle.players.player1, battle.players.player2]
            })
          }
          
        } catch (error) {
          console.error('Player ready error:', error)
          socket.emit('error', { 
            code: 'INTERNAL_SERVER_ERROR', 
            message: 'Failed to update ready status' 
          })
        }
      })
      
      // Drawing submission
      socket.on('submit-drawing', async (data) => {
        try {
          const { battleId, drawingId } = data
          
          // Verify it's the player's turn
          const battle = await getBattleById(battleId)
          if (!battle || !isPlayerTurn(battle, socket.userId)) {
            socket.emit('error', { 
              code: 'NOT_YOUR_TURN', 
              message: 'It is not your turn' 
            })
            return
          }
          
          // Update battle with drawing
          await updateBattleDrawing(battleId, socket.userId, drawingId)
          
          // Notify all players
          io.to(battleId).emit('drawing-submitted', {
            playerId: socket.userId,
            drawingId
          })
          
          // Check if battle can proceed
          const updatedBattle = await getBattleById(battleId)
          if (updatedBattle && canProceedToBattle(updatedBattle)) {
            await processBattleCalculations(battleId)
          }
          
        } catch (error) {
          console.error('Submit drawing error:', error)
          socket.emit('error', { 
            code: 'INTERNAL_SERVER_ERROR', 
            message: 'Failed to submit drawing' 
          })
        }
      })
      
      // Emote sending
      socket.on('send-emote', async (data) => {
        try {
          const { battleId, emote } = data
          
          // Validate emote
          const validEmotes = ['👍', '👎', '😄', '😮', '😢', '🎉', '🔥', '⚡']
          if (!validEmotes.includes(emote)) {
            socket.emit('error', { 
              code: 'INVALID_EMOTE', 
              message: 'Invalid emote' 
            })
            return
          }
          
          // Broadcast to battle room
          socket.to(battleId).emit('emote-received', {
            fromPlayer: socket.userId,
            emote,
            timestamp: Date.now()
          })
          
        } catch (error) {
          console.error('Send emote error:', error)
        }
      })
      
      // Ping/pong for connection health
      socket.on('ping', () => {
        socket.emit('pong')
      })
      
      // Handle disconnection
      socket.on('disconnect', async (reason) => {
        console.log(`User disconnected: ${socket.userId}, reason: ${reason}`)
        
        if (socket.currentBattle) {
          // Update connection status
          await updatePlayerConnection(socket.currentBattle, socket.userId, false)
          
          // Notify other players
          socket.to(socket.currentBattle).emit('player-left', {
            playerId: socket.userId,
            battleId: socket.currentBattle
          })
          
          // Handle battle abandonment
          if (reason === 'client namespace disconnect') {
            await handleBattleAbandonment(socket.currentBattle, socket.userId)
          }
        }
      })
    })
    
    res.socket.server.io = io
  }
  
  res.end()
}

// Helper functions
async function getBattleById(battleId: string) {
  const battleDoc = await db.collection('battles').doc(battleId).get()
  return battleDoc.exists ? battleDoc.data() : null
}

async function updatePlayerConnection(battleId: string, playerId: string, connected: boolean) {
  const playerField = `players.${getPlayerRole(battleId, playerId)}.connected`
  await db.collection('battles').doc(battleId).update({
    [playerField]: connected,
    updatedAt: admin.firestore.Timestamp.now()
  })
}

async function updatePlayerReadyStatus(battleId: string, playerId: string, ready: boolean) {
  const playerField = `players.${getPlayerRole(battleId, playerId)}.ready`
  await db.collection('battles').doc(battleId).update({
    [playerField]: ready,
    updatedAt: admin.firestore.Timestamp.now()
  })
}

function areAllPlayersReady(battle: any): boolean {
  return battle.players.player1.ready && 
         battle.players.player2?.ready === true
}

function isPlayerTurn(battle: any, playerId: string): boolean {
  const currentPlayer = battle.gameState.currentPlayer
  return battle.players[currentPlayer].uid === playerId
}

async function processBattleCalculations(battleId: string) {
  // This would contain the battle calculation logic
  // For now, just emit battle updates
  const io = res.socket.server.io
  io.to(battleId).emit('battle-action', {
    action: { type: 'calculate_battle' },
    result: { winner: 'player1', damage: 25 }
  })
}
```

## 🎯 API Performance & Monitoring

### Performance Targets
```typescript
interface PerformanceTargets {
  responseTime: {
    p50: '< 200ms',
    p95: '< 500ms',
    p99: '< 1000ms'
  }
  
  throughput: {
    requests: '1000+ requests/minute',
    concurrent: '100+ concurrent users',
    websocket: '10,000+ concurrent connections'
  }
  
  availability: {
    uptime: '99.9%',
    errorRate: '< 0.1%',
    timeout: '< 1%'
  }
}
```

### Monitoring & Logging
```typescript
interface MonitoringSetup {
  metrics: {
    tool: 'Vercel Analytics + Custom Metrics',
    dashboards: ['API Performance', 'Error Rates', 'User Behavior'],
    alerts: ['High Error Rate', 'Slow Response Times', 'Service Down']
  }
  
  logging: {
    format: 'Structured JSON logging',
    levels: ['ERROR', 'WARN', 'INFO', 'DEBUG'],
    correlation: 'Request ID tracking',
    retention: '30 days'
  }
  
  tracing: {
    tool: 'Custom trace headers',
    spans: ['API Routes', 'Database Calls', 'External APIs'],
    sampling: '100% development, 10% production'
  }
}
```

---

*This API documentation provides complete coverage of all endpoints, real-time events, and integration patterns needed to build a robust multiplayer gaming experience.*

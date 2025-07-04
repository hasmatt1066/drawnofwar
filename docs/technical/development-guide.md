# 🛠️ Development Guidelines & Best Practices

## 🎯 Development Philosophy

Drawn of War 2 follows **modern development practices** that prioritize:
- **Code Quality**: Clean, maintainable, and testable code
- **Developer Experience**: Fast feedback loops and intuitive tooling
- **Performance**: Optimized for speed and scalability
- **Accessibility**: Inclusive design from the ground up
- **Security**: Secure by default with defense in depth

## 🏗️ Project Structure

### Directory Organization
```
drawn-of-war-2/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── profile/
│   │   │   ├── battles/
│   │   │   └── gallery/
│   │   ├── (battles)/         # Battle routes
│   │   │   ├── create/
│   │   │   ├── [battleId]/
│   │   │   └── history/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── battles/
│   │   │   ├── drawings/
│   │   │   ├── payments/
│   │   │   └── socket/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── modal.tsx
│   │   ├── forms/            # Form components
│   │   │   ├── auth-forms.tsx
│   │   │   ├── profile-form.tsx
│   │   │   └── payment-form.tsx
│   │   ├── game/             # Game-specific components
│   │   │   ├── drawing-canvas.tsx
│   │   │   ├── battle-arena.tsx
│   │   │   ├── creature-viewer.tsx
│   │   │   └── battle-results.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   └── providers/        # Context providers
│   │       ├── auth-provider.tsx
│   │       ├── theme-provider.tsx
│   │       └── socket-provider.tsx
│   ├── lib/                  # Utility libraries
│   │   ├── ai/               # AI integration
│   │   │   ├── claude.ts
│   │   │   ├── meshy.ts
│   │   │   └── fallback.ts
│   │   ├── auth/             # Authentication
│   │   │   ├── firebase.ts
│   │   │   ├── middleware.ts
│   │   │   └── session.ts
│   │   ├── database/         # Database utilities
│   │   │   ├── firestore.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── payments/         # Payment processing
│   │   │   ├── stripe.ts
│   │   │   ├── webhooks.ts
│   │   │   └── types.ts
│   │   ├── realtime/         # Socket.io utilities
│   │   │   ├── socket.ts
│   │   │   ├── events.ts
│   │   │   └── types.ts
│   │   ├── utils/            # General utilities
│   │   │   ├── cn.ts
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   └── game/             # Game logic
│   │       ├── battle-engine.ts
│   │       ├── creature-stats.ts
│   │       └── matchmaking.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-battle.ts
│   │   ├── use-drawing.ts
│   │   ├── use-socket.ts
│   │   └── use-local-storage.ts
│   ├── stores/               # State management
│   │   ├── auth-store.ts
│   │   ├── battle-store.ts
│   │   ├── drawing-store.ts
│   │   └── ui-store.ts
│   ├── types/                # TypeScript types
│   │   ├── auth.ts
│   │   ├── battle.ts
│   │   ├── drawing.ts
│   │   ├── payment.ts
│   │   ├── socket.ts
│   │   └── api.ts
│   └── styles/               # Styling
│       ├── globals.css
│       ├── components.css
│       └── utilities.css
├── tests/                    # Test files
│   ├── __mocks__/           # Mock files
│   ├── components/          # Component tests
│   ├── pages/               # Page tests
│   ├── api/                 # API tests
│   ├── e2e/                 # End-to-end tests
│   └── utils/               # Test utilities
├── public/                   # Static assets
│   ├── images/
│   ├── models/
│   ├── sounds/
│   └── icons/
├── docs/                     # Documentation
├── .github/                  # GitHub workflows
├── .next/                    # Next.js build output
├── node_modules/             # Dependencies
└── package.json              # Package configuration
```

## 📝 Code Style Guidelines

### TypeScript Best Practices
```typescript
// ✅ Good: Use explicit types and interfaces
interface User {
  id: string
  email: string
  displayName: string
  battleTokens: number
  createdAt: Date
}

// ✅ Good: Use const assertions for immutable data
const BATTLE_TYPES = ['casual', 'ranked', 'practice'] as const
type BattleType = typeof BATTLE_TYPES[number]

// ✅ Good: Use utility types for transformations
type CreateUserRequest = Omit<User, 'id' | 'createdAt'>
type UpdateUserRequest = Partial<Pick<User, 'displayName' | 'battleTokens'>>

// ✅ Good: Use discriminated unions for state
type BattleState = 
  | { status: 'waiting'; estimatedTime: number }
  | { status: 'active'; currentTurn: string }
  | { status: 'completed'; winner: string }

// ❌ Bad: Using any type
// function processData(data: any): any { ... }

// ✅ Good: Use generics for reusable functions
function createAPIResponse<T>(data: T): APIResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  }
}
```

### React Component Patterns
```typescript
// ✅ Good: Functional components with proper typing
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  onClick,
  children 
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'danger',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-base': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        }
      )}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

// ✅ Good: Custom hooks for complex logic
export function useBattle(battleId: string) {
  const [battle, setBattle] = useState<Battle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchBattle = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/battles/${battleId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch battle')
        }
        const data = await response.json()
        setBattle(data.battle)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBattle()
  }, [battleId])
  
  return { battle, loading, error }
}

// ✅ Good: Error boundaries for graceful error handling
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

### API Route Patterns
```typescript
// ✅ Good: Proper API route structure with validation
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/database'
import { rateLimit } from '@/lib/rate-limit'

const createBattleSchema = z.object({
  type: z.enum(['casual', 'ranked', 'practice']),
  isPrivate: z.boolean().optional(),
  inviteCode: z.string().optional()
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
          message: 'Too many requests'
        }
      }, { status: 429 })
    }
    
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
    
    // Validation
    const body = await request.json()
    const validation = createBattleSchema.safeParse(body)
    
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
    
    // Business logic
    const battle = await createBattle(user.id, validation.data)
    
    return NextResponse.json({
      success: true,
      data: battle
    }, { status: 201 })
    
  } catch (error) {
    console.error('Create battle error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create battle'
      }
    }, { status: 500 })
  }
}

// ✅ Good: Separate business logic from API routes
async function createBattle(userId: string, data: CreateBattleData) {
  // Check user tokens
  const user = await db.users.findById(userId)
  if (user.battleTokens < 1) {
    throw new Error('Insufficient battle tokens')
  }
  
  // Create battle
  const battle = await db.battles.create({
    ...data,
    createdBy: userId,
    status: 'waiting'
  })
  
  // Deduct tokens
  await db.users.updateTokens(userId, -1)
  
  return battle
}
```

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices
```typescript
// ✅ Good: Use utility classes with cn() helper
import { cn } from '@/lib/utils'

function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ✅ Good: Use CSS variables for theming
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}

// ✅ Good: Responsive design with mobile-first approach
function ResponsiveLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Sidebar />
          </aside>
          <main className="lg:col-span-9">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

// ✅ Good: Custom CSS for complex animations
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

.battle-creature {
  animation: battle-entrance 0.8s ease-out;
}
```

## 🔧 State Management

### Zustand Store Patterns
```typescript
// ✅ Good: Typed Zustand store with actions
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      error: null,
      
      // Actions
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          
          if (!response.ok) {
            throw new Error('Login failed')
          }
          
          const data = await response.json()
          set({ user: data.user, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
        }
      },
      
      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
          set({ user: null })
        } catch (error) {
          console.error('Logout error:', error)
        }
      },
      
      register: async (data) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          
          if (!response.ok) {
            throw new Error('Registration failed')
          }
          
          const result = await response.json()
          set({ user: result.user, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
        }
      }
    }),
    { name: 'auth-store' }
  )
)

// ✅ Good: Battle store with real-time updates
interface BattleState {
  currentBattle: Battle | null
  battles: Battle[]
  socket: Socket | null
  isConnected: boolean
}

interface BattleActions {
  setBattle: (battle: Battle) => void
  updateBattle: (battleId: string, updates: Partial<Battle>) => void
  connectSocket: (battleId: string) => void
  disconnectSocket: () => void
  submitDrawing: (battleId: string, drawingId: string) => void
}

export const useBattleStore = create<BattleState & BattleActions>()(
  devtools(
    (set, get) => ({
      // State
      currentBattle: null,
      battles: [],
      socket: null,
      isConnected: false,
      
      // Actions
      setBattle: (battle) => set({ currentBattle: battle }),
      
      updateBattle: (battleId, updates) => {
        const { currentBattle, battles } = get()
        
        if (currentBattle?.id === battleId) {
          set({ currentBattle: { ...currentBattle, ...updates } })
        }
        
        set({
          battles: battles.map(battle => 
            battle.id === battleId 
              ? { ...battle, ...updates }
              : battle
          )
        })
      },
      
      connectSocket: (battleId) => {
        const { socket } = get()
        if (socket) {
          socket.disconnect()
        }
        
        const newSocket = io('/api/socket', {
          auth: { token: getAuthToken() }
        })
        
        newSocket.on('connect', () => {
          set({ isConnected: true })
          newSocket.emit('join-battle', { battleId })
        })
        
        newSocket.on('battle-state', (data) => {
          set({ currentBattle: data.battle })
        })
        
        newSocket.on('disconnect', () => {
          set({ isConnected: false })
        })
        
        set({ socket: newSocket })
      },
      
      disconnectSocket: () => {
        const { socket } = get()
        if (socket) {
          socket.disconnect()
          set({ socket: null, isConnected: false })
        }
      },
      
      submitDrawing: (battleId, drawingId) => {
        const { socket } = get()
        if (socket) {
          socket.emit('submit-drawing', { battleId, drawingId })
        }
      }
    }),
    { name: 'battle-store' }
  )
)
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// ✅ Good: Component tests with React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })
  
  test('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  test('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveClass('opacity-50')
  })
  
  test('applies correct variant classes', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})

// ✅ Good: Hook testing
import { renderHook, act } from '@testing-library/react'
import { useBattle } from '@/hooks/use-battle'

// Mock the fetch function
global.fetch = vi.fn()

describe('useBattle Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  test('fetches battle data successfully', async () => {
    const mockBattle = {
      id: 'battle123',
      status: 'waiting',
      players: { player1: { uid: 'user1' } }
    }
    
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { battle: mockBattle } })
    })
    
    const { result } = renderHook(() => useBattle('battle123'))
    
    expect(result.current.loading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.battle).toEqual(mockBattle)
    expect(result.current.error).toBeNull()
  })
  
  test('handles fetch error', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404
    })
    
    const { result } = renderHook(() => useBattle('nonexistent'))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.error).toBe('Failed to fetch battle')
    expect(result.current.battle).toBeNull()
  })
})
```

### API Testing
```typescript
// ✅ Good: API route testing
import { GET, POST } from '@/app/api/battles/route'
import { NextRequest } from 'next/server'

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  auth: vi.fn()
}))

vi.mock('@/lib/database', () => ({
  db: {
    battles: {
      create: vi.fn(),
      findById: vi.fn()
    }
  }
}))

describe('/api/battles', () => {
  describe('POST', () => {
    test('creates battle successfully', async () => {
      const mockUser = { id: 'user123', battleTokens: 5 }
      const mockBattle = { id: 'battle123', status: 'waiting' }
      
      ;(auth as any).mockResolvedValue(mockUser)
      ;(db.battles.create as any).mockResolvedValue(mockBattle)
      
      const request = new NextRequest('http://localhost/api/battles', {
        method: 'POST',
        body: JSON.stringify({
          type: 'casual',
          isPrivate: false
        })
      })
      
      const response = await POST(request)
      const data = await response.json()
      
      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockBattle)
    })
    
    test('returns 401 for unauthenticated user', async () => {
      ;(auth as any).mockResolvedValue(null)
      
      const request = new NextRequest('http://localhost/api/battles', {
        method: 'POST',
        body: JSON.stringify({ type: 'casual' })
      })
      
      const response = await POST(request)
      const data = await response.json()
      
      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('UNAUTHORIZED')
    })
    
    test('validates request data', async () => {
      const mockUser = { id: 'user123', battleTokens: 5 }
      ;(auth as any).mockResolvedValue(mockUser)
      
      const request = new NextRequest('http://localhost/api/battles', {
        method: 'POST',
        body: JSON.stringify({
          type: 'invalid_type'
        })
      })
      
      const response = await POST(request)
      const data = await response.json()
      
      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('VALIDATION_ERROR')
    })
  })
})
```

### E2E Testing
```typescript
// ✅ Good: End-to-end tests with Playwright
import { test, expect } from '@playwright/test'

test.describe('Battle Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })
  
  test('complete battle flow', async ({ page }) => {
    // Start battle
    await page.click('text=Start Battle')
    await page.click('text=Casual Battle')
    
    // Wait for matchmaking
    await page.waitForSelector('text=Battle Found', { timeout: 10000 })
    
    // Drawing phase
    await page.waitForSelector('canvas')
    
    // Draw something on canvas
    const canvas = page.locator('canvas')
    await canvas.click({ position: { x: 100, y: 100 } })
    await canvas.dragTo(canvas, { 
      sourcePosition: { x: 100, y: 100 },
      targetPosition: { x: 200, y: 200 }
    })
    
    // Submit drawing
    await page.click('text=Analyze Drawing')
    
    // Wait for AI analysis
    await page.waitForSelector('text=Analysis Complete', { timeout: 60000 })
    
    // Enter battle
    await page.click('text=Enter Battle')
    
    // Wait for battle results
    await page.waitForSelector('text=Battle Complete', { timeout: 30000 })
    
    // Check results are displayed
    await expect(page.locator('text=Victory')).toBeVisible()
    await expect(page.locator('text=+50 XP')).toBeVisible()
  })
  
  test('handles battle timeout', async ({ page }) => {
    await page.goto('/battles/create')
    
    // Start battle but don't draw
    await page.click('text=Start Battle')
    await page.click('text=Casual Battle')
    
    // Wait for timeout message
    await page.waitForSelector('text=Time expired', { timeout: 125000 })
    
    // Check forfeit behavior
    await expect(page.locator('text=Battle forfeited')).toBeVisible()
  })
})
```

## 🔒 Security Guidelines

### Input Validation
```typescript
// ✅ Good: Comprehensive input validation with Zod
import { z } from 'zod'

const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(20, 'Display name must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Display name can only contain letters, numbers, hyphens, and underscores'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms of service')
})

// ✅ Good: Sanitize user input
import DOMPurify from 'dompurify'

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input)
}

// ✅ Good: Validate file uploads
function validateImageUpload(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
  }
  
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.')
  }
  
  return true
}
```

### Authentication Security
```typescript
// ✅ Good: Secure authentication patterns
import { NextRequest } from 'next/server'
import { auth } from 'firebase-admin'

async function authenticateUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header')
  }
  
  const token = authHeader.substring(7)
  
  try {
    const decodedToken = await auth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    throw new Error('Invalid authentication token')
  }
}

// ✅ Good: CSRF protection
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const headersList = headers()
  const referer = headersList.get('referer')
  const origin = headersList.get('origin')
  
  const expectedOrigin = process.env.NEXT_PUBLIC_APP_URL
  
  if (!referer || !origin || origin !== expectedOrigin) {
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403 }
    )
  }
  
  // Continue with request processing
}
```

## 📊 Performance Guidelines

### Code Splitting
```typescript
// ✅ Good: Dynamic imports for code splitting
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const BattleArena = lazy(() => import('@/components/game/battle-arena'))
const DrawingCanvas = lazy(() => import('@/components/game/drawing-canvas'))

function BattlePage() {
  return (
    <div className="battle-page">
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <BattleArena />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <DrawingCanvas />
      </Suspense>
    </div>
  )
}

// ✅ Good: Route-based code splitting
import { Metadata } from 'next'

// This will be automatically code-split by Next.js
export const metadata: Metadata = {
  title: 'Battle Arena - Drawn of War 2',
  description: 'Engage in epic battles with your drawn creatures'
}

export default function BattleArenaPage() {
  return <BattleArena />
}
```

### Memory Management
```typescript
// ✅ Good: Proper cleanup in useEffect
function BattleComponent({ battleId }: { battleId: string }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  
  useEffect(() => {
    const newSocket = io('/api/socket')
    setSocket(newSocket)
    
    newSocket.on('battle-update', handleBattleUpdate)
    
    // Cleanup function
    return () => {
      newSocket.off('battle-update', handleBattleUpdate)
      newSocket.disconnect()
    }
  }, [battleId])
  
  // Component implementation
}

// ✅ Good: Debounced input handling
import { useDebouncedCallback } from 'use-debounce'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const debouncedSearch = useDebouncedCallback(
    async (term: string) => {
      if (term.length > 2) {
        await searchBattles(term)
      }
    },
    300 // 300ms delay
  )
  
  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search battles..."
    />
  )
}
```

## 🔧 Development Tools

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "analyze": "ANALYZE=true npm run build",
    "db:seed": "tsx scripts/seed-database.ts",
    "db:migrate": "tsx scripts/migrate-database.ts",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "pre-commit": "lint-staged",
    "postinstall": "prisma generate || true"
  }
}
```

### IDE Configuration
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Git Hooks
```bash
#!/bin/sh
# .husky/pre-commit
. "$(dirname "$0")/_/husky.sh"

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Run prettier
npm run format:check
```

## 🎯 Performance Targets

### Code Quality Metrics
```typescript
interface CodeQualityTargets {
  coverage: {
    lines: '>= 80%'
    functions: '>= 85%'
    branches: '>= 75%'
    statements: '>= 80%'
  }
  
  complexity: {
    cyclomatic: '<= 10 per function'
    cognitive: '<= 15 per function'
    maintainability: '>= 70'
  }
  
  bundleSize: {
    initial: '<= 250KB'
    total: '<= 2MB'
    chunkSizes: '<= 500KB per chunk'
  }
  
  performance: {
    buildTime: '<= 3 minutes'
    testExecution: '<= 30 seconds'
    lintTime: '<= 10 seconds'
  }
}
```

### Development KPIs
```typescript
interface DevelopmentKPIs {
  codeQuality: {
    bugRate: '<= 0.5 bugs per 1000 lines'
    codeReviewTime: '<= 2 hours average'
    prMergeTime: '<= 24 hours'
    technicalDebt: '<= 10% of total development time'
  }
  
  productivity: {
    deploymentFrequency: '>= 5 deployments per week'
    leadTimeForChanges: '<= 2 days'
    meanTimeToRestore: '<= 4 hours'
    changeFailureRate: '<= 5%'
  }
  
  collaboration: {
    codeReviewParticipation: '>= 90%'
    documentationCoverage: '>= 80%'
    knowledgeSharing: '>= 2 sessions per month'
  }
}
```

---

*This development guide provides the foundation for building high-quality, maintainable code that scales with the project's growth while maintaining excellent developer experience.*

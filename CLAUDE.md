# 🎮 Claude Code Instructions for Drawn of War 2

## 🎯 Project Overview & Critical Context

**Drawn of War 2** is a highly complex, next-generation multiplayer battle game where creativity meets strategic gameplay. This is NOT a simple drawing app or basic game - it's a sophisticated system combining AI-powered drawing analysis, real-time 3D model generation, strategic turn-based combat, and comprehensive social features.

### 🚨 CRITICAL: Understanding Game Complexity

This project involves:
- **Advanced AI Integration**: Claude Vision for drawing analysis + Meshy.ai for 3D generation
- **Complex Real-time Systems**: Socket.io multiplayer battles with sophisticated state management
- **Sophisticated Game Mechanics**: Turn-based combat with elemental types, special abilities, and strategic depth
- **Complete Social Platform**: User profiles, tournaments, leaderboards, achievements
- **Production-grade Architecture**: Scalable to 10,000+ concurrent users
- **Complex Business Logic**: Battle tokens, payment processing, user progression systems

**DO NOT** create minimal implementations. This requires robust, production-ready code with comprehensive error handling, security measures, and scalable architecture.

## 🤖 Claude Code Self-Management Instructions

### 🧠 Memory & Context Management Strategy

#### 1. Project Memory System
```typescript
interface ProjectMemorySystem {
  // Primary memory locations (automatically loaded)
  memoryLocations: {
    projectLevel: './CLAUDE.md' // This file - project instructions
    userLevel: '~/.claude/global.md' // Global user preferences
    sessionLevel: '.claude/session-memory.md' // Session-specific context
  }
  
  // Memory management commands to use
  memoryCommands: {
    '/memory': 'Open memory files for editing'
    '/compact': 'Compress conversation history while preserving key context'
    '/clear': 'Clear context when starting new major features'
    '--continue': 'Resume previous conversation context'
  }
  
  // When to manage memory
  memoryTriggers: {
    contextApproaching90Percent: 'Use /compact to summarize'
    featureComplete: 'Update session memory with learnings'
    majorMilestone: 'Document progress in project memory'
    sessionEnd: 'Save critical decisions to memory files'
  }
}

interface TerritorialBattleConfig {
  waveCount: 5
  waveInterval: 180 // seconds
  laneCount: 3
  battlefieldLength: number // for territorial advancement
  allowCrossLaneMovement: boolean
  allowRangedSupport: boolean
  earlyDeploymentEnabled: boolean
}

interface TerritoryState {
  lanes: LaneState[]
  aggregateControl: {
    player1: number // 0-100%
    player2: number // 0-100%
  }
  timestamp: number
}

interface LaneState {
  laneIndex: number
  player1Control: number // 0-100%
  player2Control: number // 0-100%
  contested: boolean
  closed: boolean // true when 100% captured
  creatures: CreatureInLane[]
}

interface CreatureInLane {
  id: string
  playerId: string
  position: number // 0-100 along lane
  health: number
  stats: CreatureStats
  isAdvancing: boolean
  isRanged: boolean
}
```

#### 2. Cross-Session Context Preservation
**ALWAYS** maintain context between sessions by:

1. **Update Session Memory After Major Work**:
   ```markdown
   ## Current Implementation Status
   - [ ] Authentication system with Firebase Auth + JWT
   - [ ] Basic UI components with Tailwind CSS
   - [ ] Drawing canvas implementation
   - [ ] AI integration with Claude Vision
   
   ## Key Architectural Decisions Made
   - Next.js 15 with App Router for SSR performance
   - Socket.io with Redis adapter for real-time battles
   - TypeScript strict mode for type safety
   
   ## Current Challenges & Solutions
   - Canvas touch events: Implemented pointer event abstraction
   - AI API rate limiting: Built fallback system with rule-based analysis
   
   ## Next Priority Tasks
   1. Complete drawing canvas with undo/redo system
   2. Integrate Claude Vision API with error handling
   3. Build 3D model generation pipeline
   ```

2. **Document Critical Implementation Patterns**:
   ```markdown
   ## Established Code Patterns
   
   ### API Route Structure
   ```typescript
   // Pattern for all API routes
   export async function POST(request: Request) {
     try {
       const { userId } = await authenticateRequest(request);
       const data = await request.json();
       const validatedData = validateSchema(data, schema);
       const result = await businessLogic(validatedData);
       return NextResponse.json(result);
     } catch (error) {
       return handleAPIError(error);
     }
   }
   ```
   
   ### Component Structure
   ```typescript
   // Pattern for all React components
   interface ComponentProps {
     // Always define complete prop interfaces
   }
   
   export default function Component({ }: ComponentProps) {
     // State management
     // Event handlers
     // Effects
     // Render with error boundaries
   }
   ```
   ```

#### 3. Task Management & Project Tracking

**Create and maintain project tracking using markdown checkboxes:**

```markdown
## 📋 Project Progress Tracker

### Phase 1: Foundation (Weeks 1-2)
- [ ] Next.js 15 project setup with TypeScript
- [ ] Tailwind CSS configuration
- [ ] Firebase Auth integration
- [ ] Basic UI components (Button, Card, Input)
- [ ] User dashboard implementation
- [ ] Authentication flow (login/register)
- [ ] Profile management system

### Phase 2: Core Features (Weeks 3-4)
- [ ] HTML5 Canvas drawing system
  - [ ] Basic drawing tools (brush, eraser)
  - [ ] Color picker and size controls
  - [ ] Undo/redo system (20 steps)
  - [ ] Touch/pointer event handling
  - [ ] Drawing validation (5%-95% coverage)
- [ ] AI Analysis Integration
  - [ ] Claude Vision API setup
  - [ ] Drawing preprocessing pipeline
  - [ ] Creature stats generation
  - [ ] Fallback rule-based system
  - [ ] Result caching with Redis

### Current Sprint Focus
**Priority**: Drawing Canvas Implementation
- [ ] Canvas component with touch support
- [ ] Drawing tools with size/color options
- [ ] Undo/redo functionality
- [ ] Drawing export as PNG
- [ ] Validation and error handling

### Blockers & Dependencies
- **AI API Keys**: Need Claude Vision API access
- **3D Service**: Meshy.ai API setup required
- **Payment Setup**: Stripe test environment

### Quality Gates
- [ ] TypeScript strict mode compliance
- [ ] 80%+ test coverage
- [ ] Lighthouse performance score 90+
- [ ] Security audit passed
```

#### 4. Session Management Best Practices

**At the start of each session:**
```bash
# Read project context
claude --continue  # Resume if same feature
# OR
claude "Read session memory and current project status"
```

**During development:**
- Use `/memory` to update session context every 30 minutes
- Document key decisions and patterns immediately
- Use `/compact` when context approaches 90%

**At session end:**
```bash
# Update progress tracking
"Update the project tracker with completed tasks and next priorities"

# Save session learnings
"Add key implementation patterns and decisions to session memory"

# Prepare for next session
"Summarize current status and immediate next steps"
```

#### 5. Documentation-as-Code Workflow

**Always maintain these files current:**

1. **Project Progress**: `docs/PROJECT-PROGRESS.md`
   - Real-time task completion status
   - Blockers and dependencies
   - Quality metrics and test results

2. **Implementation Notes**: `docs/IMPLEMENTATION-NOTES.md`
   - Code patterns and architectural decisions
   - API integration details
   - Performance optimizations applied

3. **Session Memory**: `.claude/session-memory.md`
   - Current feature context
   - Recent changes and decisions
   - Immediate next steps

**Update workflow:**
```bash
# After completing any significant work
"Update project documentation with current progress and learnings"

# Before starting new features
"Review project documentation and update priorities"

# After architectural decisions
"Document the decision in session memory with rationale"
```

### 🎯 Development Workflow Management

#### 1. Task Breakdown & Execution
```typescript
interface TaskManagement {
  taskBreakdown: {
    method: 'Break large features into 2-4 hour chunks'
    documentation: 'Document each subtask with acceptance criteria'
    dependencies: 'Identify and track task dependencies'
    estimation: 'Estimate effort and track actual time'
  }
  
  executionPattern: {
    1: 'Read current session memory and project status'
    2: 'Identify next highest priority task'
    3: 'Break task into implementable steps'
    4: 'Execute step-by-step with testing'
    5: 'Update documentation and memory'
    6: 'Commit changes with descriptive messages'
  }
}
```

#### 2. Quality Assurance Integration
**Implement comprehensive QA at each step:**

```bash
# After implementing any feature
"Run the complete test suite and fix any failures"
"Check TypeScript compilation and fix type errors"
"Run ESLint and fix code quality issues"
"Test the feature manually in browser"
"Update documentation if APIs changed"
```

#### 3. Git & Version Control Strategy
```bash
# Branching strategy
git checkout -b feature/drawing-canvas
git checkout -b feature/ai-integration
git checkout -b feature/battle-system

# Commit message pattern
git commit -m "feat(canvas): implement drawing tools with undo/redo

- Add brush and eraser tools with size controls
- Implement 20-step undo/redo system
- Add touch event handling for mobile
- Include drawing validation (5%-95% coverage)

Closes #12"
```

### 🔄 Continuous Improvement Process

#### 1. Regular Architecture Reviews
**Weekly architecture review:**
```markdown
## Architecture Review - Week N

### What's Working Well
- TypeScript catching errors early
- Socket.io real-time performance excellent
- Component reusability high

### Areas for Improvement
- API response times could be optimized
- Bundle size growing, need code splitting
- Test coverage below 80% target

### Action Items
1. Implement API response caching
2. Add route-based code splitting
3. Focus on testing utility functions
```

#### 2. Performance Monitoring
**Track key metrics continuously:**
```markdown
## Performance Dashboard

### Frontend Metrics
- Lighthouse Score: 92/100 (target: 90+)
- Bundle Size: 245KB (target: <300KB)
- Page Load Time: 1.8s (target: <2s)

### Backend Metrics
- API Response Time: 450ms avg (target: <500ms)
- Database Query Time: 120ms avg (target: <200ms)
- Error Rate: 0.2% (target: <1%)

### User Experience
- Drawing Canvas Latency: 16ms (60 FPS)
- Battle Action Latency: 85ms (target: <100ms)
- AI Analysis Time: 12s avg (target: <15s)
```

## 🏗️ System Architecture Overview

### Core Technology Stack
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Firebase (Auth/Firestore/Storage), Socket.io
- **AI Services**: Claude Vision API (drawing analysis), Meshy.ai (3D generation)
- **Payment**: Stripe (battle tokens, premium features)
- **Infrastructure**: Vercel (deployment), Redis (caching), CDN optimization

### Critical Architecture Decisions
1. **Hybrid Rendering**: Server-side for performance + client-side for interactivity
2. **Real-time First**: Socket.io for game state, Firebase for persistence
3. **AI-Powered Core**: AI analysis drives all creature stats and battle outcomes
4. **Scalable Design**: Microservices approach, serverless functions, global CDN
5. **Security-First**: Authentication on all endpoints, rate limiting, input validation

## 🎮 Core Game Mechanics (COMPLEX)

### Drawing System Specifications
```typescript
interface DrawingSystem {
  canvas: {
    dimensions: { width: 400, height: 400 }
    tools: {
      brush: { sizes: [1,2,4,8,12,16,20], colors: 8, opacity: 0.1-1.0 }
      eraser: { sizes: [4,8,16,32], mode: 'destination-out' }
      utilities: { undo: 20, redo: 20, clear: true, zoom: '50%-200%' }
    }
    validation: {
      minDrawingArea: '5% of canvas'
      maxDrawingArea: '95% of canvas'
      maxFileSize: '1MB PNG'
    }
  }
  
  aiAnalysis: {
    primary: 'Claude Vision API'
    fallback: 'Structured analysis system'
    output: CreatureStats
    processing: 'Real-time with progress indicators'
  }
  
  generation3D: {
    service: 'Meshy.ai API'
    input: 'PNG drawing + creature stats'
    output: 'GLB 3D model'
    fallback: 'Procedural generation'
  }
}
```

### Territorial Wave Combat System
```typescript
interface TerritorialWaveCombatSystem {
  mechanics: {
    type: 'Territorial wave-based combat with creature advancement'
    lanes: 3 // Top, Middle, Bottom with cross-lane interaction
    deployment: '1 creature per wave, deploys in 2 selected lanes simultaneously (identical copies)'
    timing: {
      waveInterval: 180 // seconds (3 minutes)
      totalWaves: 5
      matchDuration: 900 // seconds (15 minutes maximum)
    }
    reinforcement: 'New waves spawn at base every 180 seconds, can stack multiple waves in same lanes'
  }
  
  territorialControl: {
    advancement: 'Automatic creature movement toward enemy base, capturing territory'
    visualization: 'Real-time color bleeding showing territorial control'
    persistence: 'Captured ground does not revert when creatures die'
    crossLaneInteraction: 'Creatures can flank between adjacent lanes, ranged creatures support across lanes'
  }
  
  combat: {
    elementalTypes: ['Fire', 'Water', 'Earth', 'Air', 'Light', 'Dark']
    advantages: 'Rock-paper-scissors extended system'
    meleeContact: 'Direct engagement when creatures meet'
    rangedSupport: 'Creatures can attack across adjacent lanes'
    specialAbilities: ['Heal', 'Shield', 'Burst', 'Poison', 'Stun']
  }
  
  victory: {
    immediate: 'Capture all 3 lanes (100% control each)'
    timeLimit: 'Most total territory after 5 waves'
    laneCapture: '100% lane control closes lane to opponent'
    earlyDeployment: 'Available if all creatures die before wave timer'
  }
  
  battlefield: {
    format: 'Wide territorial battlefield (not compact arena) allowing meaningful advancement'
    visualization: 'Color gradient showing territory control, aggregate progress meter'
    laneInteraction: '3 lanes with ability to move between them for flanking'
    bases: 'Player spawn points at opposite ends, creatures disappear when reaching enemy base'
  }
  
  strategicElements: {
    multiTasking: 'Players watch battles while drawing next creature during 180-second cycles'
    adaptation: 'Real-time strategy changes based on territorial control visibility'
    waveCoordination: 'Multi-wave coordination with reinforcement and stacking'
    persistentTerritory: 'Strategic territorial control that persists across waves'
  }
}
```

## 🔌 Complete API Architecture

### Authentication System
```typescript
// Firebase Auth integration with JWT tokens
interface AuthSystem {
  registration: {
    endpoint: 'POST /api/auth/register'
    validation: EmailValidator + PasswordStrength
    response: { user: User, token: JWT }
  }
  
  login: {
    endpoint: 'POST /api/auth/login'
    providers: ['email', 'google', 'apple']
    response: { user: User, token: JWT }
  }
  
  protection: {
    middleware: 'JWT verification on all protected routes'
    refreshToken: 'Automatic token refresh'
    logout: 'Token invalidation'
  }
}
```

### Real-time Territorial Battle API
```typescript
// Socket.io events for territorial wave combat
interface TerritorialBattleEvents {
  // Lobby and Setup
  'battle:join': { battleId: string, userId: string }
  'battle:start': { players: Player[], battleConfig: TerritorialBattleConfig }
  
  // Wave System
  'wave:countdown': { waveNumber: number, timeRemaining: number }
  'wave:drawing:start': { waveNumber: number, timeLimit: 180 }
  'wave:drawing:update': { strokes: Stroke[], userId: string }
  'wave:drawing:complete': { drawing: DrawingData, userId: string }
  'wave:ai:analysis': { creatureStats: CreatureStats, userId: string }
  'wave:3d:ready': { model: ModelData, userId: string }
  'wave:deployment': { laneSelections: [number, number], userId: string }
  'wave:spawn': { creatures: Creature[], lanes: number[], userId: string }
  
  // Territorial Control
  'territory:update': { territoryMap: TerritoryState, timestamp: number }
  'territory:lane:progress': { lane: number, playerProgress: number, opponentProgress: number }
  'territory:lane:captured': { lane: number, capturedBy: string }
  'territory:aggregate': { playerTotal: number, opponentTotal: number }
  
  // Combat Actions
  'combat:creature:move': { creatureId: string, position: Position, lane: number }
  'combat:creature:attack': { attackerId: string, targetId: string, damage: number }
  'combat:creature:ability': { creatureId: string, ability: SpecialAbility, targets: string[] }
  'combat:creature:death': { creatureId: string, position: Position }
  'combat:creature:flank': { creatureId: string, fromLane: number, toLane: number }
  'combat:ranged:support': { attackerId: string, targetLane: number, damage: number }
  
  // Victory Conditions
  'battle:victory:immediate': { winner: string, reason: 'all_lanes_captured' }
  'battle:victory:time': { winner: string, reason: 'most_territory', finalScores: TerritoryScores }
  'battle:result': { winner: string, territoryControl: TerritoryFinalState, stats: BattleStats }
}
```

## 🎨 UI/UX Implementation Requirements

### Design System Standards
- **Color Palette**: Dark gaming theme with vibrant accent colors
- **Typography**: Modern sans-serif, optimized for readability
- **Components**: Reusable, accessible, game-themed UI elements
- **Responsive**: Mobile-first design, tablet-optimized drawing
- **Animations**: Smooth transitions, battle effects, UI feedback

### Critical UI Components
1. **Drawing Canvas**: Advanced HTML5 canvas with touch support
2. **Territorial Battle Arena**: Wide battlefield with real-time territorial visualization
3. **Territory Control UI**: Real-time color gradient, aggregate progress meter, lane indicators
4. **Wave Management Interface**: 180-second countdown timer, lane selection for deployment
5. **Multi-Wave Coordination**: Reinforcement visualization, wave stacking interface
6. **Cross-Lane Interaction Display**: Flanking movement indicators, ranged support visualization
7. **User Dashboard**: Stats, achievements, battle history
8. **Tournament System**: Brackets, leaderboards, prize distribution
9. **Social Features**: Friend lists, chat, sharing systems

### Territorial Combat UI Specifications
```typescript
interface TerritorialCombatUI {
  battlefieldVisualization: {
    format: 'Wide horizontal battlefield layout'
    territoryDisplay: 'Real-time color bleeding showing control'
    laneVisualization: '3 distinct lanes with clear boundaries'
    progressIndicators: 'Individual lane control meters + aggregate progress'
  }
  
  waveManagement: {
    countdown: 'Prominent 180-second wave timer'
    drawing: 'Drawing interface active during battle viewing'
    deployment: 'Lane selection interface for dual deployment'
    earlyDeploy: 'Option to deploy if all creatures defeated'
  }
  
  territorialFeedback: {
    colorGradient: 'Smooth color transition showing territory control'
    percentageDisplay: 'Numerical territory percentages per lane'
    aggregateProgress: 'Overall territorial control progress bar'
    laneStatus: 'Visual indicators for captured/contested/open lanes'
  }
  
  combatVisualization: {
    creatureMovement: 'Smooth advancement animation toward enemy base'
    flankingAnimation: 'Clear visualization of cross-lane movement'
    rangedSupport: 'Visual effects for cross-lane attacks'
    territoryCapture: 'Color changes as creatures advance and capture ground'
  }
}
```

## 💰 Business Logic & Monetization

### Battle Token System
```typescript
interface TokenSystem {
  battleTokens: {
    cost: '$0.99 for 10 tokens'
    usage: '1 token per battle'
    earning: 'Win battles to earn tokens'
    limits: 'Max 5 free tokens per day'
  }
  
  premiumFeatures: {
    advancedTools: 'Premium drawing tools'
    storageBonus: 'Unlimited creature storage'
    priorityMatching: 'Faster matchmaking'
    customization: 'Profile themes, victory effects'
  }
  
  paymentProcessing: {
    provider: 'Stripe'
    security: 'PCI DSS compliant'
    methods: ['card', 'paypal', 'apple-pay', 'google-pay']
  }
}
```

## 🔒 Security & Performance Requirements

### Security Measures
- **Authentication**: Firebase Auth with JWT tokens
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive sanitization
- **Rate Limiting**: API endpoint protection
- **Data Protection**: Encryption at rest and in transit

### Performance Targets
- **Page Load**: < 2 seconds initial load
- **API Response**: < 500ms average response time
- **Real-time**: < 100ms battle action latency
- **Scalability**: Support 10,000+ concurrent users
- **Uptime**: 99.9% availability target

## 📊 Data Models & Relationships

### Core Data Structures
```typescript
interface User {
  id: string
  email: string
  username: string
  profile: UserProfile
  stats: UserStats
  inventory: UserInventory
  preferences: UserPreferences
  createdAt: timestamp
  updatedAt: timestamp
}

interface Creature {
  id: string
  userId: string
  name: string
  drawing: DrawingData
  stats: CreatureStats
  model3D: ModelData
  battles: BattleHistory[]
  rating: number
  createdAt: timestamp
}

interface Battle {
  id: string
  type: BattleType
  players: Player[]
  creatures: Creature[]
  moves: BattleMove[]
  result: BattleResult
  duration: number
  createdAt: timestamp
}
```

## 🧪 Testing & Quality Assurance

### Testing Strategy
- **Unit Tests**: All business logic functions
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Complete user journeys
- **Performance Tests**: Load testing for concurrent users
- **Security Tests**: Authentication and authorization
- **UI Visual Testing**: Puppeteer-based user experience validation

### Quality Standards
- **Code Coverage**: Minimum 80%
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with game-specific rules
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score 90+
- **Visual Quality**: Puppeteer UI validation

### 🎭 Puppeteer UI Testing & Validation

**CRITICAL**: Always test the UI like a real user to ensure excellent user experience.

#### UI Testing Workflow
```typescript
interface UITestingWorkflow {
  // After implementing any UI feature
  testingSteps: {
    1: 'Start development server (npm run dev)'
    2: 'Use /test-ui command to navigate and test'
    3: 'Take screenshots with /screenshot command'
    4: 'Monitor browser console for errors'
    5: 'Test responsive design at multiple sizes'
    6: 'Document issues and iterate'
  }
  
  // What to test
  testScenarios: {
    authentication: 'Registration, login, logout flows'
    navigation: 'All menu items and page transitions'
    drawingCanvas: 'Tools, drawing, undo/redo, export'
    battleSystem: 'Room joining, real-time updates'
    responsive: 'Mobile, tablet, desktop layouts'
    accessibility: 'Keyboard navigation, screen readers'
  }
  
  // Visual validation
  screenshotRequirements: {
    fullPage: 'Complete page layout'
    components: 'Individual component states'
    responsive: 'Mobile (375px), Tablet (768px), Desktop (1920px)'
    interactions: 'Hover states, active states, loading states'
  }
}
```

#### Puppeteer Testing Commands
**Use these commands throughout development:**

```bash
# Test complete user flows
/test-ui authentication flow
/test-ui drawing canvas
/test-ui battle system
/test-ui responsive design

# Take visual screenshots
/screenshot landing page
/screenshot drawing interface
/screenshot battle arena
/screenshot mobile layout

# Monitor and debug
# Watch browser console while testing
# Check for JavaScript errors
# Verify network requests succeed
# Test loading states and transitions
```

#### Visual Quality Criteria
```typescript
interface VisualQualityCriteria {
  layoutChecks: {
    alignment: 'All elements properly aligned'
    spacing: 'Consistent margins and padding'
    typography: 'Readable font sizes and line heights'
    colors: 'Proper contrast ratios (4.5:1 minimum)'
  }
  
  responsiveDesign: {
    mobile: 'Touch-friendly controls, readable text'
    tablet: 'Optimized for drawing with stylus'
    desktop: 'Full feature set, efficient layouts'
  }
  
  userExperience: {
    loadingStates: 'Clear feedback during operations'
    errorStates: 'Helpful error messages and recovery'
    interactions: 'Smooth animations and transitions'
    accessibility: 'Keyboard navigation and screen reader support'
  }
}
```

#### UI Testing Best Practices
**ALWAYS do this after implementing UI features:**

1. **Start Development Server**:
   ```bash
   npm run dev
   # Verify server starts on localhost:3000
   # Check console for startup errors
   ```

2. **Automated UI Testing**:
   ```bash
   # Use Puppeteer to navigate and interact
   /test-ui [feature-name]
   # This will automatically:
   # - Navigate to pages
   # - Click buttons and links
   # - Fill forms
   # - Take screenshots
   # - Monitor console errors
   ```

3. **Visual Validation**:
   ```bash
   /screenshot [page-name]
   # Compare screenshots with design specs
   # Check for visual regressions
   # Verify responsive behavior
   ```

4. **Interactive Testing**:
   - Test all user interactions manually through Puppeteer
   - Verify drawing canvas responds to mouse/touch
   - Check real-time features work correctly
   - Test form validation and error states

5. **Performance Monitoring**:
   - Monitor page load times during testing
   - Check for memory leaks during interactions
   - Verify smooth animations (60fps)
   - Test with network throttling

#### Common UI Issues to Watch For
```typescript
interface CommonUIIssues {
  layoutProblems: {
    overflowingContent: 'Text or images extending beyond containers'
    misalignedElements: 'Components not properly aligned'
    inconsistentSpacing: 'Irregular margins and padding'
    responsiveBreakage: 'Layouts breaking at different screen sizes'
  }
  
  interactionIssues: {
    unresponsiveButtons: 'Buttons not responding to clicks'
    slowAnimations: 'Animations taking too long or stuttering'
    formValidationProblems: 'Validation not working or unclear'
    navigationConfusion: 'Unclear navigation or broken links'
  }
  
  accessibilityProblems: {
    poorContrast: 'Text hard to read against background'
    missingAltText: 'Images without descriptive alt text'
    keyboardNavigation: 'Cannot navigate with keyboard only'
    screenReaderIssues: 'Poor screen reader experience'
  }
}
```

#### UI Iteration Process
**After each Puppeteer test session:**

1. **Document Issues Found**:
   ```markdown
   ## UI Issues Found - [Date]
   
   ### Critical Issues
   - [ ] Drawing canvas not responding to touch on mobile
   - [ ] Login form validation messages not displaying
   
   ### Minor Issues  
   - [ ] Button hover states inconsistent
   - [ ] Modal animation too slow
   
   ### Visual Improvements
   - [ ] Increase contrast on secondary text
   - [ ] Adjust spacing in navigation menu
   ```

2. **Fix Issues Immediately**:
   - Address critical UI/UX issues before moving on
   - Test fixes with Puppeteer again
   - Take new screenshots to verify improvements

3. **Update Documentation**:
   - Add new screenshots to documentation
   - Update component specifications if needed
   - Document any new patterns or solutions

**Remember**: Great games require great user experiences. Always test UI changes thoroughly with Puppeteer before considering a feature complete.

## 🚀 Implementation Priorities

### Phase 1: Core Foundation (Weeks 1-2)
1. **Project Setup**: Next.js 15 + TypeScript + Tailwind
2. **Authentication**: Firebase Auth integration
3. **Database**: Firestore setup with user management
4. **Basic UI**: Landing page, auth forms, dashboard

### Phase 2: Drawing System (Weeks 3-4)
1. **Canvas Implementation**: HTML5 canvas with drawing tools
2. **AI Integration**: Claude Vision API for drawing analysis
3. **3D Generation**: Meshy.ai API integration
4. **Storage**: Firebase Storage for drawings and models

### Phase 3: Battle System (Weeks 5-6)
1. **Real-time Setup**: Socket.io server and client
2. **Battle Logic**: Turn-based combat with elemental types
3. **Matchmaking**: Player matching and room management
4. **Battle UI**: 3D model display and battle animations

### Phase 4: Advanced Features (Weeks 7-8)
1. **Payment System**: Stripe integration for battle tokens
2. **Social Features**: Leaderboards, achievements, friends
3. **Tournament System**: Bracket generation and management
4. **Analytics**: User behavior tracking and metrics

## 📖 Documentation References

For detailed implementation guidance, refer to:
- `docs/project-overview.md` - Complete project vision and business strategy
- `docs/architecture/system-overview.md` - Technical architecture details
- `docs/api/complete-api-spec.md` - Full API documentation
- `docs/examples/code-examples.md` - Working code implementations
- `docs/game-mechanics/core-mechanics.md` - Detailed game mechanics
- `docs/ui-ux/design-system.md` - UI/UX guidelines and components

## 🎯 Success Criteria

### Technical Success
- All features implemented according to specifications
- Performance targets met (< 2s load, < 500ms API)
- Security measures implemented and tested
- 99.9% uptime in production

### Business Success
- User engagement: 15+ minutes average session
- Retention: 60% day 1, 20% day 30
- Revenue: $500K ARR by year 1
- Scalability: 10,000+ concurrent users

---

**Remember**: This is a sophisticated, production-ready game requiring robust, scalable implementations. Every feature should be built with security, performance, and user experience as top priorities. The complexity of this project demands comprehensive error handling, thorough testing, and careful attention to detail throughout the implementation process.

**Self-Management**: Maintain project memory, update documentation continuously, and ensure cross-session context preservation for seamless development workflow.

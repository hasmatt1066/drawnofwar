# 🎯 Detailed Feature Specifications for AI Implementation

## 🎮 Core Game Features - Complete Specifications

### 1. Advanced Drawing System

#### Drawing Canvas Implementation
```typescript
interface DrawingCanvasSpecs {
  // Canvas Configuration
  canvas: {
    width: 400
    height: 400
    backgroundColor: '#ffffff'
    layerSupport: false // Single layer for simplicity
    exportFormat: 'PNG'
    maxFileSize: 1048576 // 1MB in bytes
  }
  
  // Drawing Tools
  brushTool: {
    sizes: [1, 2, 4, 8, 12, 16, 20] // pixels
    colors: [
      '#000000', // Black
      '#FF0000', // Red
      '#00FF00', // Green
      '#0000FF', // Blue
      '#FFFF00', // Yellow
      '#FF00FF', // Magenta
      '#00FFFF', // Cyan
      '#FFFFFF'  // White
    ]
    opacity: {
      min: 0.1
      max: 1.0
      step: 0.1
    }
    shape: 'round'
    spacing: 1.0
  }
  
  eraserTool: {
    sizes: [4, 8, 16, 32] // pixels
    mode: 'destination-out'
    shape: 'round'
  }
  
  utilities: {
    undo: {
      maxSteps: 20
      storage: 'memory-based'
    }
    redo: {
      maxSteps: 20
      storage: 'memory-based'
    }
    clear: {
      confirmation: true
      message: 'Are you sure you want to clear your drawing?'
    }
    zoom: {
      min: 0.5
      max: 2.0
      step: 0.1
      fitToScreen: true
    }
  }
}
```

#### Drawing Validation Rules
```typescript
interface DrawingValidation {
  minimumDrawing: {
    pixelThreshold: 0.05 // 5% of canvas must be drawn
    calculation: 'Count non-transparent pixels'
    errorMessage: 'Please draw something more substantial'
  }
  
  maximumDrawing: {
    pixelThreshold: 0.95 // 95% of canvas maximum
    calculation: 'Count non-transparent pixels'
    errorMessage: 'Drawing covers too much of the canvas'
  }
  
  fileSize: {
    maxBytes: 1048576 // 1MB
    compression: 'PNG with optimization'
    errorMessage: 'Drawing file too large'
  }
  
  contentPolicy: {
    aiModeration: true
    blockedContent: ['explicit', 'hateful', 'violent']
    errorMessage: 'Drawing contains inappropriate content'
  }
}
```

### 2. AI Analysis System - Claude Vision Integration

#### AI Analysis Workflow
```typescript
interface AIAnalysisSpecs {
  primaryService: {
    provider: 'Claude Vision API'
    endpoint: 'https://api.anthropic.com/v1/messages'
    model: 'claude-3-sonnet-20240229'
    timeout: 30000 // 30 seconds
  }
  
  analysisPrompt: {
    systemPrompt: `You are an expert creature analyst for a fantasy battle game. 
    Analyze this drawing and provide creature stats based on:
    
    1. COMPLEXITY: How detailed and intricate is the drawing?
    2. RECOGNIZABILITY: How clearly does this represent a creature?
    3. POWER INDICATORS: What visual elements suggest strength/abilities?
    4. ELEMENTAL AFFINITY: What element does this creature represent?
    
    Respond with valid JSON only.`
    
    userPrompt: `Analyze this creature drawing and provide stats in this exact format:
    {
      "name": "creature name based on appearance",
      "elementalType": "Fire|Water|Earth|Air|Light|Dark",
      "stats": {
        "health": 50-150,
        "attack": 20-80,
        "defense": 10-50,
        "speed": 5-25
      },
      "abilities": ["ability1", "ability2"],
      "description": "brief description of the creature"
    }`
  }
  
  fallbackSystem: {
    trigger: 'API failure or timeout'
    method: 'Rule-based analysis'
    calculations: {
      complexity: 'Pixel density + stroke count'
      recognizability: 'Shape detection algorithms'
      baseStats: 'Randomized within ranges'
    }
  }
  
  caching: {
    enabled: true
    duration: 3600 // 1 hour in seconds
    key: 'drawing-hash'
    storage: 'Redis'
  }
}
```

#### Creature Stats Generation
```typescript
interface CreatureStatsSpecs {
  elementalTypes: {
    Fire: {
      advantages: ['Earth', 'Air']
      disadvantages: ['Water', 'Light']
      neutral: ['Dark']
      statModifiers: {
        attack: '+10%'
        speed: '+5%'
        defense: '-5%'
      }
    }
    Water: {
      advantages: ['Fire', 'Earth']
      disadvantages: ['Air', 'Dark']
      neutral: ['Light']
      statModifiers: {
        health: '+10%'
        defense: '+5%'
        attack: '-5%'
      }
    }
    Earth: {
      advantages: ['Air', 'Light']
      disadvantages: ['Fire', 'Water']
      neutral: ['Dark']
      statModifiers: {
        health: '+15%'
        defense: '+10%'
        speed: '-10%'
      }
    }
    Air: {
      advantages: ['Water', 'Dark']
      disadvantages: ['Earth', 'Light']
      neutral: ['Fire']
      statModifiers: {
        speed: '+15%'
        attack: '+5%'
        defense: '-10%'
      }
    }
    Light: {
      advantages: ['Dark', 'Fire']
      disadvantages: ['Earth', 'Air']
      neutral: ['Water']
      statModifiers: {
        health: '+5%'
        attack: '+5%'
        defense: '+5%'
      }
    }
    Dark: {
      advantages: ['Light', 'Air']
      disadvantages: ['Water', 'Fire']
      neutral: ['Earth']
      statModifiers: {
        attack: '+15%'
        health: '-5%'
        speed: '+5%'
      }
    }
  }
  
  specialAbilities: {
    Heal: {
      description: 'Restore 20% health'
      cooldown: 3 // turns
      usageCondition: 'health < 50%'
    }
    Shield: {
      description: 'Reduce damage by 50% for 2 turns'
      cooldown: 4 // turns
      duration: 2 // turns
    }
    Burst: {
      description: 'Deal 150% damage next attack'
      cooldown: 3 // turns
      duration: 1 // turn
    }
    Poison: {
      description: 'Deal 10 damage per turn for 3 turns'
      cooldown: 4 // turns
      duration: 3 // turns
    }
    Stun: {
      description: 'Skip opponent next turn'
      cooldown: 5 // turns
      duration: 1 // turn
    }
  }
}
```

### 3. Territorial Wave Combat System

#### Territorial Battle State Management
```typescript
interface TerritorialBattleSystemSpecs {
  battleStructure: {
    totalWaves: 5
    waveInterval: 180 // seconds (3 minutes)
    maxBattleDuration: 900 // seconds (15 minutes)
    deployment: '1 creature per wave, deploys in 2 selected lanes simultaneously'
  }
  
  battlePhases: {
    preparation: {
      duration: 15 // seconds
      actions: ['join', 'ready', 'lane-preview']
    }
    
    wavePhase: {
      duration: 180 // seconds per wave
      concurrentActions: {
        drawing: {
          timeLimit: 165 // seconds (draw while watching battle)
          actions: ['draw', 'undo', 'redo', 'clear']
          autoSubmit: true
        }
        combat: {
          continuous: true // ongoing throughout wave
          actions: ['advance', 'engage', 'flank', 'support']
        }
        territorialControl: {
          realTime: true
          updates: 'Every 100ms'
          persistence: true // territory remains after creature death
        }
      }
    }
    
    deployment: {
      duration: 10 // seconds between waves
      actions: ['lane-selection', 'creature-placement', 'ai-analysis']
      laneSelection: {
        availableLanes: 3 // Top, Middle, Bottom
        selectionLimit: 2 // Must select exactly 2 lanes
        preview: true // Show lane status before selection
      }
      earlyDeployment: {
        trigger: 'All player creatures defeated'
        timeBonus: 'Remaining wave time added to next wave'
      }
    }
    
    results: {
      duration: 20 // seconds
      actions: ['territorial-summary', 'wave-breakdown', 'rematch', 'share']
    }
  }
  
  territorialMechanics: {
    advancement: {
      baseSpeed: '1% territory per second'
      speedModifier: 'Creature speed affects advancement rate'
      automaticMovement: true
      pathToBase: 'Straight line toward enemy base'
    }
    
    territoryCapture: {
      captureRate: 'Based on creature advancement'
      persistence: 'Territory remains after creature death'
      contestedRate: '50% when enemies present'
      visualization: 'Real-time color bleeding'
    }
    
    crossLaneInteractions: {
      flanking: {
        adjacentOnly: true // Only adjacent lanes
        speedBased: 'Success rate based on creature speed'
        damageBonus: '+25% damage when flanking'
      }
      rangedSupport: {
        crossLaneDamage: '75% of normal damage'
        adjacentOnly: true
        rangeLimit: 'Adjacent lanes only'
      }
    }
    
    victoryConditions: {
      immediate: {
        condition: '100% control of all 3 lanes'
        rarity: 'Rare but decisive victory'
      }
      territorial: {
        condition: 'Most territory after 5 waves'
        calculation: 'Aggregate territorial control percentage'
        tiebreaker: 'Individual lane control comparison'
      }
    }
  }
  
  combatMechanics: {
    engagement: {
      trigger: 'Creatures meet during advancement'
      meleeContact: 'Direct combat when creatures encounter'
      winner: 'Continues advancement, loser removed'
    }
    
    damageCalculation: {
      baseDamage: 'attacker.attack - defender.defense'
      minimumDamage: 1
      typeModifiers: {
        fire_vs_ice: 1.5
        water_vs_fire: 1.5
        earth_vs_lightning: 1.5
        air_vs_earth: 1.5
      }
      criticalHit: {
        chance: '5% base chance'
        multiplier: 1.5
      }
    }
    
    specialAbilities: {
      activation: 'Automatic when conditions met'
      territorialEffects: 'Some abilities affect capture rate'
      cooldowns: 'Ability-specific cooldown periods'
    }
  }
  
  waveCoordination: {
    reinforcement: {
      stacking: 'Multiple waves can operate in same lanes'
      cooperation: 'Creatures from different waves work together'
      baseSpawning: 'All creatures spawn from player base'
    }
    
    strategicElements: {
      multiTasking: 'Draw while watching battle'
      adaptation: 'Real-time strategy changes'
      laneStrategy: 'Choose optimal lane combinations'
      timing: 'Balance immediate vs. long-term territorial gains'
    }
  }
}
```

#### Territorial Socket.io Event Specifications
```typescript
interface TerritorialBattleEventSpecs {
  // Client to Server Events
  clientEvents: {
    'battle:join': {
      payload: { battleId: string, userId: string }
      validation: 'JWT token required'
      response: 'battle:joined' | 'battle:error'
    }
    
    'battle:ready': {
      payload: { battleId: string, userId: string }
      validation: 'Player in battle'
      response: 'battle:start' | 'battle:waiting'
    }
    
    'wave:drawing:stroke': {
      payload: { 
        battleId: string, 
        userId: string, 
        waveNumber: number,
        stroke: StrokeData 
      }
      validation: 'Drawing phase active'
      broadcast: true
    }
    
    'wave:drawing:complete': {
      payload: { 
        battleId: string, 
        userId: string,
        waveNumber: number,
        drawing: DrawingData 
      }
      validation: 'Drawing meets requirements'
      response: 'wave:analysis:start'
    }
    
    'wave:lane:select': {
      payload: {
        battleId: string,
        userId: string,
        waveNumber: number,
        selectedLanes: [number, number] // Must be exactly 2 lanes
      }
      validation: 'Valid lane selection (2 adjacent or non-adjacent lanes)'
      response: 'wave:deployment:confirmed'
    }
    
    'wave:early:deploy': {
      payload: {
        battleId: string,
        userId: string,
        waveNumber: number
      }
      validation: 'All player creatures defeated'
      response: 'wave:early:deployment'
    }
  }
  
  // Server to Client Events
  serverEvents: {
    'battle:start': {
      payload: {
        battleId: string,
        players: Player[],
        battleConfig: TerritorialBattleConfig,
        initialWave: 1
      }
      broadcast: 'battle participants'
    }
    
    'wave:countdown': {
      payload: {
        waveNumber: number,
        timeRemaining: number, // seconds
        phase: 'drawing' | 'deployment' | 'combat'
      }
      broadcast: 'battle participants'
      frequency: 'Every second'
    }
    
    'wave:spawn': {
      payload: {
        waveNumber: number,
        creatures: CreatureDeployment[],
        lanes: number[],
        playerId: string
      }
      broadcast: 'battle participants'
    }
    
    'territory:update': {
      payload: {
        territoryMap: TerritoryState,
        timestamp: number,
        aggregateControl: { player1: number, player2: number }
      }
      broadcast: 'battle participants'
      frequency: 'Every 100ms during combat'
    }
    
    'territory:lane:progress': {
      payload: {
        lane: number,
        player1Control: number, // 0-100%
        player2Control: number, // 0-100%
        contested: boolean
      }
      broadcast: 'battle participants'
    }
    
    'territory:lane:captured': {
      payload: {
        lane: number,
        capturedBy: string,
        timestamp: number
      }
      broadcast: 'battle participants'
    }
    
    'combat:creature:advance': {
      payload: {
        creatureId: string,
        position: number, // 0-100 along lane
        lane: number,
        territoryCapture: number // territory gained
      }
      broadcast: 'battle participants'
    }
    
    'combat:creature:engage': {
      payload: {
        attackerId: string,
        defenderId: string,
        lane: number,
        damage: number,
        result: 'victory' | 'defeat' | 'ongoing'
      }
      broadcast: 'battle participants'
    }
    
    'combat:creature:flank': {
      payload: {
        creatureId: string,
        fromLane: number,
        toLane: number,
        success: boolean,
        damageBonus?: number
      }
      broadcast: 'battle participants'
    }
    
    'combat:ranged:support': {
      payload: {
        attackerId: string,
        targetLane: number,
        damage: number, // 75% of normal damage
        targets: string[] // affected creature IDs
      }
      broadcast: 'battle participants'
    }
    
    'victory:immediate': {
      payload: {
        winner: string,
        reason: 'all_lanes_captured',
        finalTerritoryState: TerritoryState,
        waveNumber: number
      }
      broadcast: 'battle participants'
    }
    
    'victory:territorial': {
      payload: {
        winner: string,
        reason: 'most_territory',
        finalScores: {
          player1: { totalTerritory: number, laneControls: number[] },
          player2: { totalTerritory: number, laneControls: number[] }
        },
        territoryAdvantage: number // percentage difference
      }
      broadcast: 'battle participants'
    }
    
    'battle:result': {
      payload: {
        winner: string,
        battleStats: TerritorialBattleStats,
        rewards: BattleRewards,
        territoryBreakdown: TerritoryFinalState
      }
      broadcast: 'battle participants'
    }
}
```

#### Territorial Data Structures
```typescript
interface TerritorialDataStructures {
  TerritoryState: {
    lanes: LaneState[] // 3 lanes
    aggregateControl: { player1: number, player2: number } // 0-100%
    timestamp: number
  }
  
  LaneState: {
    laneIndex: number // 0, 1, 2
    player1Control: number // 0-100%
    player2Control: number // 0-100%
    contested: boolean
    closed: boolean // true when 100% captured
    creatures: CreatureInLane[]
  }
  
  CreatureInLane: {
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
  }
  
  WaveState: {
    currentWave: number // 1-5
    timeRemaining: number // 0-180 seconds
    phase: 'preparation' | 'drawing' | 'deployment' | 'combat'
    playerDeployments: {
      [playerId: string]: {
        lanes: [number, number]
        creature: Creature
        deployed: boolean
      }
    }
    reinforcementAvailable: boolean
  }
  
  TerritorialBattleConfig: {
    waveCount: 5
    waveInterval: 180 // seconds
    laneCount: 3
    battlefieldLength: number // for territorial advancement
    allowCrossLaneMovement: boolean
    allowRangedSupport: boolean
    earlyDeploymentEnabled: boolean
    territorialVictoryThreshold: number // percentage for victory
  }
  
  TerritorialBattleStats: {
    totalDuration: number // seconds
    wavesCompleted: number
    territoryControlHistory: TerritorySnapshot[]
    creatureDeployments: CreatureDeploymentRecord[]
    crossLaneActions: CrossLaneActionRecord[]
    finalTerritoryControl: TerritoryState
    victoryCondition: 'immediate' | 'territorial' | 'timeout'
  }
  
  CreatureDeployment: {
    creatureId: string
    playerId: string
    waveNumber: number
    lanes: [number, number] // exactly 2 lanes
    timestamp: number
    stats: CreatureStats
  }
}
      payload: { 
        battleId: string, 
        userId: string, 
        action: BattleAction 
      }
      validation: 'Player turn active'
      response: 'action:result'
    }
  }
  
  // Server to Client Events
  serverEvents: {
    'battle:joined': {
      payload: { players: Player[], battleConfig: BattleConfig }
      recipients: 'all players in battle'
    }
    
    'battle:phase': {
      payload: { phase: BattlePhase, duration: number }
      recipients: 'all players in battle'
    }
    
    'drawing:update': {
      payload: { userId: string, stroke: StrokeData }
      recipients: 'all players in battle'
    }
    
    'creature:generated': {
      payload: { userId: string, creature: Creature }
      recipients: 'all players in battle'
    }
    
    'battle:turn': {
      payload: { 
        turn: number, 
        activePlayer: string, 
        gameState: BattleState 
      }
      recipients: 'all players in battle'
    }
    
    'battle:result': {
      payload: { 
        winner: string, 
        stats: BattleStats, 
        rewards: Rewards 
      }
      recipients: 'all players in battle'
    }
  }
}
```

### 4. 3D Model Generation System

#### Meshy.ai Integration
```typescript
interface ModelGenerationSpecs {
  meshyConfig: {
    apiEndpoint: 'https://api.meshy.ai/v1/image-to-3d'
    apiKey: process.env.MESHY_API_KEY
    model: 'image-to-3d'
    timeout: 180000 // 3 minutes
  }
  
  generationParameters: {
    imageInput: {
      format: 'PNG'
      maxSize: 1048576 // 1MB
      dimensions: '400x400'
    }
    
    outputSettings: {
      format: 'GLB'
      quality: 'medium'
      textureResolution: 512
      polygonCount: 'auto'
    }
    
    processingOptions: {
      enablePBR: true
      enableAnimation: false
      enableLOD: false
      backgroundColor: 'transparent'
    }
  }
  
  fallbackSystem: {
    trigger: 'API failure or timeout'
    method: 'Procedural generation'
    models: {
      basic: 'Simple geometric shapes'
      template: 'Pre-built creature templates'
      customization: 'Color and texture mapping'
    }
  }
  
  caching: {
    enabled: true
    duration: 86400 // 24 hours
    storage: 'Firebase Storage'
    key: 'creature-id'
  }
}
```

### 5. User Progression System

#### Experience and Leveling
```typescript
interface ProgressionSpecs {
  experience: {
    sources: {
      battleWin: 100
      battleLoss: 25
      firstBattleOfDay: 50
      creativeBonus: 25 // for complex drawings
      streakBonus: 10 // per consecutive win
    }
    
    levelFormula: 'Math.floor(100 * Math.pow(1.5, level - 1))'
    maxLevel: 100
    
    rewards: {
      levelUp: {
        battleTokens: 5
        notification: true
        celebrationEffect: true
      }
      
      milestones: {
        level5: { reward: 'Advanced drawing tools' }
        level10: { reward: 'Custom creature names' }
        level25: { reward: 'Tournament access' }
        level50: { reward: 'Premium features trial' }
      }
    }
  }
  
  achievements: {
    combat: [
      { id: 'first-win', name: 'First Victory', xp: 50 }
      { id: 'win-streak-5', name: 'Winning Streak', xp: 100 }
      { id: 'elemental-master', name: 'Elemental Master', xp: 200 }
    ]
    
    creative: [
      { id: 'artist', name: 'True Artist', xp: 75 }
      { id: 'diverse-creator', name: 'Diverse Creator', xp: 150 }
      { id: 'master-craftsman', name: 'Master Craftsman', xp: 300 }
    ]
    
    social: [
      { id: 'first-friend', name: 'Social Butterfly', xp: 25 }
      { id: 'tournament-participant', name: 'Competitor', xp: 100 }
      { id: 'leaderboard-top10', name: 'Elite Player', xp: 500 }
    ]
  }
}
```

### 6. Payment and Monetization System

#### Battle Token Economy
```typescript
interface MonetizationSpecs {
  battleTokens: {
    packages: [
      { tokens: 10, price: 0.99, bonus: 0 }
      { tokens: 50, price: 4.99, bonus: 5 }
      { tokens: 100, price: 9.99, bonus: 15 }
      { tokens: 500, price: 39.99, bonus: 100 }
    ]
    
    earning: {
      battleWin: 2
      battleLoss: 0
      dailyLogin: 1
      weeklyChallenge: 5
      achievement: 'varies'
    }
    
    usage: {
      casualBattle: 1
      rankedBattle: 2
      tournamentEntry: 5
      premiumFeatures: 'varies'
    }
  }
  
  premiumFeatures: {
    subscriptionTiers: {
      basic: {
        price: 4.99 // monthly
        benefits: [
          'Advanced drawing tools',
          'Unlimited creature storage',
          'Priority matchmaking',
          'Custom victory effects'
        ]
      }
      
      premium: {
        price: 9.99 // monthly
        benefits: [
          'All basic features',
          'Exclusive tournaments',
          'Custom creature models',
          'Advanced statistics',
          'Ad-free experience'
        ]
      }
    }
  }
  
  stripeIntegration: {
    webhookEvents: [
      'payment_intent.succeeded',
      'payment_intent.payment_failed',
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted'
    ]
    
    security: {
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
      idempotencyKeys: true
      errorHandling: 'comprehensive'
    }
  }
}
```

## 🎯 User Interface Specifications

### Component Design System
```typescript
interface ComponentSpecs {
  designTokens: {
    colors: {
      primary: '#FF6B35'
      secondary: '#004E89'
      accent: '#FFD23F'
      background: '#1A1A1A'
      surface: '#2D2D2D'
      text: '#FFFFFF'
      textSecondary: '#B0B0B0'
      success: '#4CAF50'
      warning: '#FF9800'
      error: '#F44336'
    }
    
    typography: {
      fontFamily: 'Inter, sans-serif'
      sizes: {
        xs: '0.75rem'
        sm: '0.875rem'
        base: '1rem'
        lg: '1.125rem'
        xl: '1.25rem'
        '2xl': '1.5rem'
        '3xl': '1.875rem'
        '4xl': '2.25rem'
      }
    }
    
    spacing: {
      xs: '0.25rem'
      sm: '0.5rem'
      md: '1rem'
      lg: '1.5rem'
      xl: '2rem'
      '2xl': '3rem'
    }
    
    borderRadius: {
      sm: '0.125rem'
      md: '0.375rem'
      lg: '0.5rem'
      xl: '0.75rem'
      full: '9999px'
    }
  }
  
  animations: {
    transitions: {
      fast: '150ms ease-in-out'
      medium: '250ms ease-in-out'
      slow: '500ms ease-in-out'
    }
    
    keyframes: {
      fadeIn: '@keyframes fadeIn'
      slideIn: '@keyframes slideIn'
      bounce: '@keyframes bounce'
      pulse: '@keyframes pulse'
    }
  }
}
```

### Page Layout Specifications
```typescript
interface PageLayoutSpecs {
  responsive: {
    breakpoints: {
      mobile: '320px - 768px'
      tablet: '768px - 1024px'
      desktop: '1024px+'
    }
    
    layouts: {
      mobile: 'Single column, bottom navigation'
      tablet: 'Optimized for drawing, side panels'
      desktop: 'Multi-column, full feature set'
    }
  }
  
  navigation: {
    header: {
      height: '64px'
      components: ['logo', 'nav-menu', 'user-profile', 'tokens']
      sticky: true
    }
    
    sidebar: {
      width: '280px'
      collapsible: true
      components: ['main-nav', 'quick-battle', 'social-feed']
    }
    
    footer: {
      height: '200px'
      components: ['links', 'social', 'legal']
      sticky: false
    }
  }
}
```

## 🔒 Security and Performance Requirements

### Security Implementation
```typescript
interface SecuritySpecs {
  authentication: {
    jwtExpiration: 3600 // 1 hour
    refreshTokenExpiration: 604800 // 7 days
    passwordPolicy: {
      minLength: 8
      requireUppercase: true
      requireLowercase: true
      requireNumbers: true
      requireSymbols: true
    }
  }
  
  dataProtection: {
    encryptionAtRest: 'AES-256'
    encryptionInTransit: 'TLS 1.3'
    personalDataHashing: 'bcrypt'
    tokenSigningAlgorithm: 'RS256'
  }
  
  inputValidation: {
    sanitization: 'DOMPurify for user inputs'
    imageValidation: 'File type and size checks'
    apiValidation: 'Joi schema validation'
    sqlInjectionPrevention: 'Parameterized queries'
  }
  
  rateLimiting: {
    api: '100 requests per minute per user'
    auth: '5 attempts per minute per IP'
    drawing: '1 submission per 30 seconds'
    battle: '10 battles per hour per user'
  }
}
```

### Performance Optimization
```typescript
interface PerformanceSpecs {
  targetMetrics: {
    firstContentfulPaint: '< 1.5s'
    largestContentfulPaint: '< 2.5s'
    cumulativeLayoutShift: '< 0.1'
    firstInputDelay: '< 100ms'
    timeToInteractive: '< 3s'
  }
  
  optimizations: {
    codesplitting: 'Route-based and component-based'
    imageOptimization: 'Next.js Image component'
    caching: {
      staticAssets: '1 year'
      apiResponses: '5 minutes'
      userSessions: '1 hour'
    }
    
    bundleOptimization: {
      treeshaking: true
      minification: true
      compression: 'gzip + brotli'
    }
  }
  
  monitoring: {
    realUserMonitoring: 'Vercel Analytics'
    errorTracking: 'Sentry integration'
    performanceMetrics: 'Web Vitals'
    uptime: '99.9% target'
  }
}
```

---

This comprehensive specification provides Claude Code with the detailed information needed to implement each feature robustly. Each section includes specific parameters, error handling, validation rules, and implementation details necessary for production-ready code.

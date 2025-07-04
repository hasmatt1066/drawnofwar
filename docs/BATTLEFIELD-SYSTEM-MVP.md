# 🏟️ Territorial Battlefield System Specifications - MVP

## 🎯 Territorial Wave Combat Battlefield Design

**Wide Territorial Battlefield System** - Designed for territorial advancement, multi-wave combat, and strategic lane control.

### Territorial Lane System
```typescript
interface TerritorialBattlefieldLayout {
  format: 'Wide horizontal battlefield (not compact arena)'
  
  lanes: {
    topLane: {
      position: 'y: 4'
      width: 'Full battlefield width for advancement'
      territorySegments: 100 // 1% territory per segment
      crossLaneAccess: 'Can flank to middle lane'
    }
    middleLane: {
      position: 'y: 0' 
      width: 'Full battlefield width for advancement'
      territorySegments: 100 // 1% territory per segment
      crossLaneAccess: 'Can flank to top or bottom lanes'
    }
    bottomLane: {
      position: 'y: -4'
      width: 'Full battlefield width for advancement' 
      territorySegments: 100 // 1% territory per segment
      crossLaneAccess: 'Can flank to middle lane'
    }
  }
  
  bases: {
    playerBase: {
      position: 'Left side of battlefield'
      spawnPoints: 'Creature spawn locations for all lanes'
      visualization: 'Player color-coded base structure'
    }
    enemyBase: {
      position: 'Right side of battlefield'
      spawnPoints: 'Enemy creature spawn locations'
      visualization: 'Enemy color-coded base structure'
    }
  }
  
  territorialControl: {
    visualization: 'Real-time color bleeding from captured territory'
    persistence: 'Territory remains captured when creatures die'
    capture: 'Automatic as creatures advance toward enemy base'
    victory: 'Reach 100% control of all lanes OR most territory after 5 waves'
  }
}
```

### Wave Deployment System
```typescript
interface WaveDeploymentSystem {
  waveStructure: {
    totalWaves: 5
    waveInterval: 180 // seconds (3 minutes)
    deployment: '1 creature per wave, deploys in 2 selected lanes simultaneously'
    reinforcement: 'New waves can reinforce existing creatures in same lanes'
  }
  
  deployment: {
    laneSelection: 'Player selects 2 out of 3 lanes for creature deployment'
    creatureCopies: 'Identical creature copies placed in both selected lanes'
    spawnLocation: 'Player base at left side of battlefield'
    advancement: 'Creatures automatically move toward enemy base'
    earlyDeployment: 'Available if all creatures defeated before wave timer'
  }
  
  coordination: {
    stackingWaves: 'Multiple waves can operate in same lanes'
    crossLaneSupport: 'Ranged creatures can support adjacent lanes'
    flanking: 'Creatures can move between adjacent lanes'
    territoryControl: 'Captured ground persists across waves'
  }
}
```

## 🎨 Visual Design & Territorial Feedback

### Territorial Visualization System
```typescript
interface TerritorialVisualization {
  colorBleeding: {
    playerTerritory: 'Dynamic color gradient showing player control'
    enemyTerritory: 'Contrasting color showing enemy control'
    contestedAreas: 'Blended colors in areas with both forces'
    neutralGround: 'Default color for uncaptured territory'
  }
  
  progressIndicators: {
    laneMeters: 'Individual lane control percentages (0-100%)'
    aggregateProgress: 'Overall territorial control progress bar'
    laneStatus: 'Visual indicators for captured/contested/open lanes'
    realTimeUpdates: 'Smooth transitions as territory changes'
  }
  
  advancementVisualization: {
    creatureMovement: 'Smooth forward progression animation'
    territoryCapture: 'Color changes following creature advancement'
    persistentControl: 'Territory color remains after creature death'
    baseApproach: 'Creatures disappear when reaching enemy base'
  }
  
  crossLaneInteractions: {
    flankingAnimation: 'Clear movement between adjacent lanes'
    rangedSupport: 'Visual effects for cross-lane attacks'
    adjacencyRules: 'Visual restrictions showing valid movements'
    tacticalAdvantage: 'Highlighting for flanking bonuses'
  }
}
```

### 3D Battlefield Environment
```typescript
interface TerritorialBattlefieldVisuals {
  battlefieldDesign: {
    format: 'Wide horizontal landscape (not circular arena)'
    theme: 'Epic territorial warfare environment'
    scale: 'Large enough for meaningful advancement visualization'
    lanes: 'Clear visual separation with distinct paths'
  }
  
  environmentElements: {
    terrain: 'Varied landscape supporting territorial theme'
    bases: 'Distinct player and enemy base structures'
    laneMarkers: 'Subtle but clear lane boundary indicators'
    background: 'Expansive environment supporting wide battlefield'
  }
  
  lighting: {
    setup: 'Optimized for territorial color visualization'
    contrast: 'High contrast for clear territory boundaries'
    creatures: 'Proper lighting for 3D creature visibility'
    atmosphere: 'Epic but not distracting from gameplay'
  }
  
  cameraSystem: {
    overview: 'Wide camera angle showing full territorial battlefield'
    tracking: 'Smooth following of creature advancement'
    zoomLevels: 'Multiple zoom levels for tactical overview'
    transitions: 'Cinematic camera movements for wave deployment'
  }
}
```

## ⚡ Performance & Technical Requirements

### Real-Time Territorial Updates
```typescript
interface TerritorialPerformance {
  updateFrequency: {
    territoryCalculation: '60 FPS territory updates'
    colorBleeding: 'Smooth gradient transitions'
    creatureMovement: '60 FPS advancement animation'
    crossLaneActions: 'Real-time flanking and support visualization'
  }
  
  optimization: {
    territoryMap: 'Efficient grid-based territory tracking'
    colorRendering: 'GPU-optimized color blending'
    creatureCount: 'Optimized for multiple waves in play'
    networkSync: 'Minimal latency territorial state synchronization'
  }
  
  scalability: {
    multipleWaves: 'Support for 5+ creatures per lane'
    persistentState: 'Maintain territory state across waves'
    realTimeUpdates: 'Smooth updates for both players'
    mobileOptimization: 'Efficient rendering on mobile devices'
  }
}
```

### Socket.io Integration for Territorial System
```typescript
interface TerritorialNetworking {
  territoryEvents: {
    'territory:update': 'Real-time territory control changes'
    'territory:lane:progress': 'Individual lane advancement updates'
    'territory:aggregate': 'Overall territorial control updates'
    'territory:lane:captured': 'Lane closure notifications'
  }
  
  waveEvents: {
    'wave:countdown': 'Wave timer updates'
    'wave:deployment': 'Lane selection and creature deployment'
    'wave:spawn': 'Creature spawning at bases'
    'wave:reinforcement': 'New wave reinforcement notifications'
  }
  
  combatEvents: {
    'combat:creature:advance': 'Creature movement and territory capture'
    'combat:creature:flank': 'Cross-lane movement'
    'combat:ranged:support': 'Cross-lane attack visualization'
    'combat:creature:engage': 'Direct combat when creatures meet'
  }
  
  victoryEvents: {
    'victory:lane:captured': 'Individual lane capture (100%)'
    'victory:all:lanes': 'Immediate victory condition'
    'victory:territorial': 'Time-based territorial victory'
  }
}
```

## 🎮 User Interface for Territorial Control

### Wave Management Interface
```typescript
interface WaveManagementUI {
  waveTimer: {
    display: 'Prominent countdown showing time remaining'
    urgency: 'Visual and audio cues as time runs low'
    phases: 'Clear indication of drawing vs. deployment phases'
  }
  
  laneSelection: {
    interface: 'Interactive lane selection for creature deployment'
    preview: 'Show selected lanes before deployment'
    constraints: 'Visual indication of 2-lane limit'
    strategy: 'Show current lane status to inform decisions'
  }
  
  drawingIntegration: {
    concurrent: 'Drawing interface available during battle watching'
    progress: 'Drawing progress indicator during battle'
    completion: 'Clear transition from drawing to deployment'
    earlyDeployment: 'Option if all creatures defeated early'
  }
}
```

### Territorial Control Feedback
```typescript
interface TerritorialControlUI {
  territoryDisplay: {
    laneMeters: 'Individual lane control meters (0-100%)'
    aggregateBar: 'Overall territorial control progress'
    colorCoding: 'Player vs enemy territory colors'
    percentages: 'Numerical display of control percentages'
  }
  
  laneStatus: {
    openLanes: 'Available for creature deployment'
    contestedLanes: 'Active combat and advancement'
    capturedLanes: 'Lanes with 100% control (closed to opponent)'
    neutralLanes: 'Uncaptured territory areas'
  }
  
  strategicInformation: {
    battlefieldOverview: 'Mini-map showing full territorial state'
    waveCoordination: 'Visual indication of wave reinforcement opportunities'
    flankingOpportunities: 'Highlighting for tactical cross-lane movement'
    victoryProgress: 'Progress toward territorial victory conditions'
  }
}
```

## 🏗️ Implementation Architecture

### Territorial System Components
```typescript
interface TerritorialSystemArchitecture {
  territoryEngine: {
    gridSystem: 'Grid-based territory tracking (100 segments per lane)'
    captureLogic: 'Territory capture based on creature advancement'
    persistenceLogic: 'Territory remains after creature death'
    victoryCalculation: 'Real-time victory condition evaluation'
  }
  
  waveManagement: {
    timingSystem: '180-second wave intervals with countdown'
    deploymentLogic: 'Dual-lane creature deployment'
    reinforcementSystem: 'Wave stacking and coordination'
    earlyDeployment: 'Emergency deployment when all creatures defeated'
  }
  
  crossLaneSystem: {
    flankingMechanics: 'Adjacent lane movement for creatures'
    rangedSupport: 'Cross-lane attack capabilities'
    adjacencyRules: 'Movement constraints and tactical bonuses'
    visualFeedback: 'Clear indication of cross-lane interactions'
  }
  
  visualEngine: {
    colorBlending: 'Real-time territorial color visualization'
    progressBars: 'Smooth updating of control indicators'
    creatureAnimation: 'Advancement and combat animations'
    cameraControl: 'Dynamic camera for optimal viewing'
  }
}
```

### Data Structures for Territorial Combat
```typescript
interface TerritorialDataStructures {
  TerritoryState: {
    lanes: LaneState[] // 3 lanes
    aggregateControl: { player1: number, player2: number }
    timestamp: number
  }
  
  LaneState: {
    laneIndex: number
    player1Control: number // 0-100%
    player2Control: number // 0-100%
    contested: boolean
    closed: boolean // 100% captured
    creatures: CreatureInLane[]
  }
  
  CreatureInLane: {
    id: string
    playerId: string
    position: number // 0-100 along lane
    health: number
    stats: CreatureStats
    isAdvancing: boolean
    canFlank: boolean
    isRanged: boolean
  }
  
  WaveState: {
    currentWave: number // 1-5
    timeRemaining: number // 0-180 seconds
    phase: 'drawing' | 'deployment' | 'combat'
    playerDeployment: { lanes: [number, number], creature: Creature }
    reinforcementAvailable: boolean
  }
}
```

## 🎯 Success Metrics for Territorial System

### Performance Targets
```typescript
interface TerritorialPerformanceTargets {
  visualPerformance: {
    territoryUpdates: '60 FPS smooth color transitions'
    creatureMovement: '60 FPS advancement animation'
    uiResponsiveness: '<100ms UI interaction response'
    networkLatency: '<50ms territory state synchronization'
  }
  
  gameplayMetrics: {
    averageBattleLength: '12-15 minutes (5 waves × 3 minutes)'
    territorialEngagement: 'Clear territorial progress in 90% of battles'
    strategicDepth: 'Multiple viable lane strategies'
    comebackPotential: '30% of battles decided in final 2 waves'
  }
  
  userExperience: {
    territorialClarity: 'Players understand territory control at all times'
    strategicOptions: 'Clear tactical choices for lane selection'
    visualFeedback: 'Immediate understanding of territorial changes'
    victoryConditions: 'Clear progress toward victory conditions'
  }
}
```

---

*This territorial battlefield system provides a sophisticated, strategic, and visually engaging foundation for the territorial wave combat experience, emphasizing territorial advancement, multi-wave coordination, and strategic lane control.*

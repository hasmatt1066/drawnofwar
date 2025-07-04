# 🌊 Territorial Wave Combat System - Complete Specifications

## 🎯 Core Game Mechanics

### **Wave-Based Territory Control**
```typescript
interface TerritorialCombatSystem {
  gameFlow: {
    waveInterval: 180 // seconds (3 minutes)
    totalWaves: 5
    matchDuration: 900 // seconds (15 minutes maximum)
    earlyDeployment: 'Available if all creatures dead'
  }
  
  deployment: {
    creaturesPerWave: 1
    laneDeployment: 2 // Same creature deploys in 2 selected lanes
    copies: 'Identical stats, independent health/status'
    selection: 'Players choose 2 of 3 lanes per wave'
  }
  
  victory: {
    immediate: 'Capture all 3 lanes (100% control each)'
    timeLimit: 'Most total territory after 5 waves'
    laneCapture: '100% lane control closes lane to opponent'
  }
}
```

### **Territory Control Mechanics**
```typescript
interface TerritorySystem {
  battlefield: {
    layout: 'Wide format allowing flanking'
    length: 'Long enough for meaningful advancement'
    lanes: 3 // Top, Middle, Bottom with interaction
    bases: 'Player spawn points at opposite ends'
  }
  
  advancement: {
    movement: 'Automatic forward progression toward enemy base'
    combat: 'Stop to fight when encountering enemies'
    victory: 'Continue advancing after defeating enemies'
    capture: 'Creatures disappear upon reaching enemy base'
  }
  
  visualization: {
    colorGradient: 'Real-time color bleeding across battlefield'
    progressBar: 'Aggregate territorial control meter'
    laneStatus: 'Visual indication of lane control percentage'
  }
}
```

### **Multi-Wave Lane Dynamics**
```typescript
interface LaneInteraction {
  reinforcement: {
    stacking: 'Multiple waves can occupy same lane'
    cooperation: 'Creatures from different waves work together'
    positioning: 'New waves spawn at base, advance to join'
  }
  
  crossLaneActions: {
    flanking: 'Creatures can move between adjacent lanes'
    rangedSupport: 'Ranged creatures can attack targets in adjacent lanes'
    strategicMovement: 'Players can direct creatures to switch lanes'
  }
  
  territorialControl: {
    persistence: 'Captured territory doesn\'t revert when creatures die'
    accumulation: 'Territory builds up over multiple waves'
    completion: '100% lane control closes lane permanently'
  }
}
```

## 🎨 Battlefield Design Specifications

### **Wide Territory Battlefield**
```typescript
interface BattlefieldLayout {
  dimensions: {
    width: 20 // units (wide enough for flanking)
    length: 30 // units (long enough for meaningful advancement)
    laneWidth: 6 // units each (allowing some overlap)
  }
  
  zones: {
    playerBase: 'Starting spawn area (0-2 units from edge)'
    combatZone: 'Main battlefield (2-28 units)'
    enemyBase: 'Victory zone (28-30 units from edge)'
  }
  
  visualElements: {
    laneMarkers: 'Subtle boundaries allowing movement between'
    territoryGradient: 'Color blend showing control (blue → neutral → red)'
    advancementMarkers: 'Distance indicators every 5 units'
  }
}
```

### **Real-time Territory Visualization**
```typescript
interface TerritoryVisualization {
  colorSystem: {
    player1: '#0066CC' // Blue
    neutral: '#666666' // Gray
    player2: '#CC0000' // Red
    transition: 'Smooth gradient blending'
  }
  
  progressIndicators: {
    aggregateMeter: 'Total territorial control bar (0-100%)'
    laneProgress: 'Individual lane control indicators'
    captureThreshold: 'Visual indicator at 100% lane control'
  }
  
  realTimeUpdates: {
    frequency: 'Update every 0.5 seconds'
    smoothing: 'Animated transitions for territory changes'
    emphasis: 'Pulse effect when lane fully captured'
  }
}
```

## ⚔️ Combat & Movement System

### **Creature Advancement Rules**
```typescript
interface CreatureMovement {
  automaticAdvancement: {
    speed: 'Based on creature speed stat (1-3 units/second)'
    direction: 'Always toward enemy base unless engaging'
    obstacles: 'Stop to fight when encountering enemies'
  }
  
  combatEngagement: {
    meleeRange: '1 unit proximity triggers combat'
    rangedRange: '3-5 units depending on creature stats'
    combatDuration: 'Until one creature defeated'
    advancement: 'Winner continues toward enemy base'
  }
  
  crossLaneMovement: {
    flankingOption: 'Move to adjacent lane if beneficial'
    rangedSupport: 'Attack enemies in adjacent lanes'
    playerControl: 'Optional manual direction during drawing phase'
  }
}
```

### **Wave Reinforcement Mechanics**
```typescript
interface WaveReinforcement {
  deployment: {
    location: 'Always spawn at player base'
    advancement: 'Move to join existing forces'
    cooperation: 'Support existing creatures in combat'
  }
  
  multiWaveEffects: {
    stacking: 'Multiple creatures can occupy same lane'
    synergy: 'Creatures work together in combat'
    overwhelming: 'Superior numbers provide combat advantage'
  }
  
  strategicOptions: {
    reinforcement: 'Deploy to lanes with existing creatures'
    flanking: 'Deploy to uncontested lanes'
    breakthrough: 'Mass deployment to single lane'
  }
}
```

## 🎭 Enhanced Combat Animations

### **Territorial Advancement Animation**
```typescript
interface AdvancementAnimations {
  movement: {
    forward: 'Smooth sliding toward enemy base'
    flanking: 'Diagonal movement between lanes'
    formation: 'Multiple creatures maintain spacing'
  }
  
  combatAnimations: {
    engagement: 'Creatures stop and face each other'
    melee: 'Move into contact, scale/color effects'
    ranged: 'Stay at distance, projectile effects'
    victory: 'Winner continues advancing'
  }
  
  territoryEffects: {
    colorAdvancement: 'Ground color follows creature advancement'
    capture: 'Burst effect when reaching enemy base'
    domination: 'Lane glow when 100% captured'
  }
}
```

### **Multi-Wave Visual Coordination**
```typescript
interface MultiWaveVisuals {
  spacing: {
    formation: 'Creatures maintain tactical spacing'
    reinforcement: 'New waves join existing formations'
    overlap: 'Handle visual clarity with multiple creatures'
  }
  
  identification: {
    waveMarkers: 'Subtle indicators showing wave number'
    health: 'Individual health bars for each creature'
    status: 'Visual effects for buffs/debuffs'
  }
}
```

## 🎮 Strategic Drawing System

### **Real-time Strategy Adaptation**
```typescript
interface StrategyAdaptation {
  informationAvailable: {
    territorialControl: 'Real-time territory percentages'
    laneStatus: 'Which lanes are winning/losing'
    creaturePositions: 'Where active battles are occurring'
    timeRemaining: 'Countdown to next wave deployment'
  }
  
  drawingStrategy: {
    counterplay: 'Draw creatures to counter opponent strategy'
    reinforcement: 'Strengthen winning lanes'
    breakthrough: 'Overwhelm specific lanes'
    adaptation: 'Respond to territorial changes'
  }
  
  aiProgression: {
    baselineStats: 'Consistent AI analysis approach'
    waveProgression: 'Slight average stat increase per wave'
    variability: 'Maintain randomness and creativity rewards'
  }
}
```

## 📱 UI/UX for Territorial Combat

### **Multi-tasking Interface**
```typescript
interface TerritorialUI {
  battlefield: {
    mainView: 'Wide battlefield showing all lanes'
    zoomControls: 'Zoom in to watch specific battles'
    cameraOptions: 'Pan to follow creature advancement'
  }
  
  territoryDisplay: {
    progressBar: 'Aggregate territory control (prominent)'
    laneIndicators: 'Individual lane control percentages'
    captureAlerts: 'Notifications when lanes fully captured'
  }
  
  dualPhaseInterface: {
    combatWatch: 'Primary focus on battlefield'
    drawingCanvas: 'Secondary panel for next creature'
    deployment: 'Lane selection for next wave'
    timer: 'Countdown to next deployment opportunity'
  }
}
```

### **Strategic Information Display**
```typescript
interface StrategyUI {
  battleOverview: {
    waveStatus: 'Current wave number (1-5)'
    activeCreatures: 'Count of living creatures per lane'
    territoryBreakdown: 'Detailed territorial control stats'
  }
  
  deploymentPlanning: {
    laneSelection: 'Visual lane picker for next deployment'
    preview: 'Ghost creature preview in selected lanes'
    earlyDeploy: 'Option available if all creatures dead'
  }
}
```

## 🎯 MVP Implementation Priority

### **Phase 1: Core Territory System** (Week 1-2)
- Wide battlefield with 3 lanes
- Basic creature advancement mechanics
- Real-time territory color visualization
- Aggregate progress bar

### **Phase 2: Wave Mechanics** (Week 3-4)
- 180-second wave cycles
- Dual-lane creature deployment
- Multi-wave reinforcement
- Territory persistence

### **Phase 3: Combat & Animation** (Week 5-6)
- Melee vs ranged combat mechanics
- Cross-lane flanking and support
- Territory capture animations
- Victory conditions

### **Phase 4: Strategic Polish** (Week 7-8)
- Enhanced drawing strategy feedback
- Camera controls and zoom
- Visual effects and polish
- Performance optimization

## 🏆 Victory Scenarios

### **Immediate Victory**
- **All Lanes Captured**: First player to achieve 100% control of all 3 lanes
- **Lane Closure**: When opponent can no longer deploy to any lanes

### **Time-Based Victory**
- **Territory Advantage**: Most aggregate territory after 5 waves
- **Tiebreaker**: Number of lanes with >50% control
- **Final Tiebreaker**: Total creatures surviving

---

**This territorial wave system creates deep strategic gameplay where players must balance offensive pushes, defensive reinforcement, and creative adaptation while maintaining the core drawing innovation.**

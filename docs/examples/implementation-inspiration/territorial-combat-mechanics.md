# 🗺️ Territorial/Lane-based Combat Mechanics - Implementation Inspiration

## Overview
Research-based examples for implementing territorial control and lane-based combat systems suitable for real-time multiplayer strategy games. These examples serve as starting points for developing our custom territorial wave combat system.

## 🔍 Key Reference Games and Systems

### 1. Paper.io Style Territory Control
**Inspiration**: Real-time territory capture with visual feedback  
**Focus**: Dynamic territory visualization and contested zones

#### Why It's Relevant
- Real-time territory changes with immediate visual feedback
- Simple but engaging territorial control mechanics
- Smooth gradient-based territory visualization
- Risk/reward gameplay through vulnerable expansion

#### Key Mechanical Patterns
```javascript
// Research pattern: Real-time territory control
class TerritoryControlSystem {
  constructor(mapWidth, mapHeight) {
    this.territoryMap = new Uint8Array(mapWidth * mapHeight);
    this.controlStrength = new Float32Array(mapWidth * mapHeight);
    this.playerColors = ['red', 'blue', 'green', 'yellow'];
    this.updateQueue = [];
  }
  
  // Research: Efficient territory updates
  updateTerritoryControl(x, y, playerId, strength = 1.0) {
    const index = y * this.mapWidth + x;
    
    // Research: Gradual territory capture
    if (this.territoryMap[index] === 0 || this.territoryMap[index] === playerId) {
      this.territoryMap[index] = playerId;
      this.controlStrength[index] = Math.min(1.0, this.controlStrength[index] + strength * 0.1);
    } else {
      // Research: Contested territory mechanics
      this.controlStrength[index] = Math.max(0.0, this.controlStrength[index] - strength * 0.05);
      if (this.controlStrength[index] <= 0) {
        this.territoryMap[index] = playerId;
        this.controlStrength[index] = 0.1;
      }
    }
    
    this.queueVisualizationUpdate(x, y);
  }
  
  // Research: Territory visualization with smooth gradients
  renderTerritory(ctx) {
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const index = y * this.mapWidth + x;
        const playerId = this.territoryMap[index];
        const strength = this.controlStrength[index];
        
        if (playerId > 0) {
          const color = this.playerColors[playerId - 1];
          ctx.fillStyle = this.hexToRgba(color, strength);
          ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }
  
  // Research: Calculating territorial advantage
  calculateControlPercentage(playerId) {
    let controlledCells = 0;
    let totalCells = 0;
    
    for (let i = 0; i < this.territoryMap.length; i++) {
      if (this.territoryMap[i] === playerId) {
        controlledCells += this.controlStrength[i];
      }
      if (this.territoryMap[i] > 0) {
        totalCells++;
      }
    }
    
    return totalCells > 0 ? (controlledCells / totalCells) * 100 : 0;
  }
}
```

#### Research Focus Areas
- **Smooth territory visualization** with gradient effects
- **Contested zone mechanics** for strategic depth
- **Real-time updates** without performance degradation
- **Territory persistence** after unit removal

### 2. Tower Defense Lane Systems
**Inspiration**: Plants vs. Zombies, Kingdom Rush  
**Focus**: Multi-lane unit progression with strategic depth

#### Lane-Based Movement Pattern
```javascript
// Research pattern: Lane-based unit movement
class LaneMovementSystem {
  constructor(laneCount = 3) {
    this.lanes = Array(laneCount).fill().map((_, index) => ({
      id: index,
      units: [],
      waypoints: this.generateWaypoints(index),
      isBlocked: false,
      controlPercentage: { player1: 0, player2: 0 }
    }));
  }
  
  // Research: Waypoint-based movement along lanes
  generateWaypoints(laneIndex) {
    const laneY = (laneIndex + 0.5) * (this.mapHeight / this.lanes.length);
    const waypoints = [];
    
    for (let x = 0; x <= this.mapWidth; x += this.waypointSpacing) {
      waypoints.push({ x, y: laneY });
    }
    
    return waypoints;
  }
  
  // Research: Unit progression along lanes
  updateUnitMovement(deltaTime) {
    this.lanes.forEach(lane => {
      lane.units.forEach(unit => {
        if (!unit.isEngaged && !unit.isDestroyed) {
          this.moveUnitAlongLane(unit, lane, deltaTime);
          this.updateTerritoryCapture(unit, lane);
        }
      });
    });
  }
  
  moveUnitAlongLane(unit, lane, deltaTime) {
    const speed = unit.stats.speed;
    const currentWaypoint = lane.waypoints[unit.currentWaypointIndex];
    const nextWaypoint = lane.waypoints[unit.currentWaypointIndex + 1];
    
    if (!nextWaypoint) {
      // Research: Unit reaches end of lane
      this.handleUnitReachesEnd(unit, lane);
      return;
    }
    
    // Research: Smooth movement between waypoints
    const direction = {
      x: nextWaypoint.x - currentWaypoint.x,
      y: nextWaypoint.y - currentWaypoint.y
    };
    
    const distance = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    const normalizedDirection = {
      x: direction.x / distance,
      y: direction.y / distance
    };
    
    unit.position.x += normalizedDirection.x * speed * deltaTime;
    unit.position.y += normalizedDirection.y * speed * deltaTime;
    
    // Research: Check if reached next waypoint
    if (this.distanceToPoint(unit.position, nextWaypoint) < this.waypointThreshold) {
      unit.currentWaypointIndex++;
    }
  }
  
  // Research: Territory capture as units advance
  updateTerritoryCapture(unit, lane) {
    const captureRate = 0.1; // Territory captured per second
    const progressPercentage = unit.currentWaypointIndex / (lane.waypoints.length - 1);
    
    // Research: Update lane control based on unit progression
    if (unit.playerId === 1) {
      lane.controlPercentage.player1 = Math.max(lane.controlPercentage.player1, progressPercentage);
    } else {
      lane.controlPercentage.player2 = Math.max(lane.controlPercentage.player2, progressPercentage);
    }
  }
}
```

### 3. MOBA-Style Multi-Lane Combat
**Inspiration**: League of Legends, Dota 2  
**Focus**: Cross-lane interactions and strategic positioning

#### Cross-Lane Interaction System
```typescript
// Research pattern: Cross-lane combat interactions
class CrossLaneInteractionSystem {
  constructor(lanes: Lane[]) {
    this.lanes = lanes;
    this.interactionRange = 50; // Units can interact across this distance
    this.flankingBonus = 1.25; // Damage multiplier for flanking
  }
  
  // Research: Detecting cross-lane opportunities
  detectCrossLaneInteractions(): CrossLaneAction[] {
    const interactions: CrossLaneAction[] = [];
    
    for (let i = 0; i < this.lanes.length; i++) {
      const currentLane = this.lanes[i];
      const adjacentLanes = this.getAdjacentLanes(i);
      
      currentLane.units.forEach(unit => {
        if (unit.hasRangedCapability || unit.canFlank) {
          const targets = this.findCrossLaneTargets(unit, adjacentLanes);
          targets.forEach(target => {
            interactions.push({
              type: unit.hasRangedCapability ? 'ranged_support' : 'flanking',
              attacker: unit,
              target: target,
              sourceLane: i,
              targetLane: target.laneIndex
            });
          });
        }
      });
    }
    
    return interactions;
  }
  
  // Research: Flanking mechanics for strategic advantage
  executeFlanking(attacker: Unit, target: Unit): FlankingResult {
    const flankingSuccess = this.calculateFlankingSuccess(attacker, target);
    
    if (flankingSuccess) {
      const damage = attacker.stats.attack * this.flankingBonus;
      const result = this.applyDamage(target, damage);
      
      // Research: Territory bonus for successful flanking
      this.applyTerritorialBonus(attacker, target.laneIndex);
      
      return {
        success: true,
        damage: damage,
        territoryGained: this.calculateTerritoryGain(attacker, target)
      };
    }
    
    return { success: false, damage: 0, territoryGained: 0 };
  }
  
  calculateFlankingSuccess(attacker: Unit, target: Unit): boolean {
    // Research: Speed-based flanking success rate
    const speedAdvantage = attacker.stats.speed / target.stats.speed;
    const baseSuccessRate = 0.6;
    const speedBonus = Math.min(0.3, (speedAdvantage - 1) * 0.2);
    
    return Math.random() < (baseSuccessRate + speedBonus);
  }
  
  // Research: Ranged support across lanes
  executeRangedSupport(attacker: Unit, target: Unit): RangedSupportResult {
    const range = this.calculateEffectiveRange(attacker, target);
    const damage = attacker.stats.attack * 0.75; // Reduced damage for ranged support
    
    if (range <= attacker.rangedAttackRange) {
      const result = this.applyDamage(target, damage);
      
      return {
        hit: true,
        damage: damage,
        range: range
      };
    }
    
    return { hit: false, damage: 0, range: range };
  }
}
```

## 🎯 Drawn of War 2 Specific Adaptations

### Territorial Wave Combat System
```typescript
// Research pattern: Wave-based territorial combat
class TerritorialWaveCombat {
  constructor() {
    this.battlefield = new TerritorialBattlefield(3); // 3 lanes
    this.waveManager = new WaveManager(5, 180000); // 5 waves, 3 minutes each
    this.territoryTracker = new TerritoryTracker();
    this.combatResolver = new CombatResolver();
  }
  
  // Research: Wave deployment with territorial implications
  deployWave(waveNumber: number, playerDeployments: WaveDeployment[]) {
    playerDeployments.forEach(deployment => {
      const creature = this.createCreatureFromDrawing(deployment.drawing);
      
      // Research: Dual-lane deployment strategy
      deployment.selectedLanes.forEach(laneIndex => {
        const creatureInstance = creature.clone();
        creatureInstance.laneIndex = laneIndex;
        creatureInstance.waveNumber = waveNumber;
        
        this.spawnCreatureInLane(creatureInstance, laneIndex);
        this.trackTerritorialAdvancement(creatureInstance);
      });
    });
    
    this.updateTerritorialState();
  }
  
  // Research: Continuous territorial advancement
  updateTerritorialAdvancement(deltaTime: number) {
    this.battlefield.lanes.forEach((lane, laneIndex) => {
      lane.creatures.forEach(creature => {
        if (creature.isAlive && !creature.isEngaged) {
          // Research: Movement-based territory capture
          const advancement = this.calculateAdvancement(creature, deltaTime);
          this.advanceCreaturePosition(creature, advancement);
          this.updateTerritoryControl(laneIndex, creature.playerId, advancement);
        }
      });
    });
    
    // Research: Check for lane completion
    this.checkLaneCompletionConditions();
  }
  
  calculateAdvancement(creature: Creature, deltaTime: number): number {
    const baseSpeed = 0.1; // Base advancement rate
    const speedMultiplier = creature.stats.speed / 15; // Normalize speed stat
    const territoryResistance = this.calculateTerritoryResistance(creature);
    
    return baseSpeed * speedMultiplier * (1 - territoryResistance) * deltaTime;
  }
  
  // Research: Territory resistance based on enemy control
  calculateTerritoryResistance(creature: Creature): number {
    const lane = this.battlefield.lanes[creature.laneIndex];
    const enemyControl = this.getEnemyControlAtPosition(creature);
    
    // Research: Higher enemy control = more resistance
    return enemyControl * 0.3; // Max 30% speed reduction
  }
  
  // Research: Lane completion detection
  checkLaneCompletionConditions() {
    this.battlefield.lanes.forEach((lane, laneIndex) => {
      const player1Control = this.territoryTracker.getLaneControl(laneIndex, 1);
      const player2Control = this.territoryTracker.getLaneControl(laneIndex, 2);
      
      if (player1Control >= 100) {
        this.completeLane(laneIndex, 1);
      } else if (player2Control >= 100) {
        this.completeLane(laneIndex, 2);
      }
    });
  }
  
  completeLane(laneIndex: number, playerId: number) {
    const lane = this.battlefield.lanes[laneIndex];
    lane.isCompleted = true;
    lane.completedBy = playerId;
    
    // Research: Lane completion bonuses
    this.applyLaneCompletionBonus(playerId);
    
    // Research: Check for immediate victory
    this.checkImmediateVictory();
  }
}
```

### Real-Time Territory Visualization
```javascript
// Research pattern: Dynamic territory visualization
class TerritorialVisualization {
  constructor(canvas, battlefield) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.battlefield = battlefield;
    this.gradientCache = new Map();
    this.animationFrame = null;
  }
  
  // Research: Smooth territory gradient rendering
  renderTerritorialControl() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.battlefield.lanes.forEach((lane, laneIndex) => {
      this.renderLaneTerritory(lane, laneIndex);
      this.renderLaneProgress(lane, laneIndex);
      this.renderCreatures(lane, laneIndex);
    });
    
    this.renderAggregateControl();
  }
  
  renderLaneTerritory(lane, laneIndex) {
    const laneHeight = this.canvas.height / this.battlefield.lanes.length;
    const laneY = laneIndex * laneHeight;
    
    // Research: Territory gradient based on control percentages
    const player1Control = lane.territoryControl.player1;
    const player2Control = lane.territoryControl.player2;
    
    // Research: Create dynamic gradient
    const gradient = this.createTerritoryGradient(player1Control, player2Control);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, laneY, this.canvas.width, laneHeight);
    
    // Research: Contested zone visualization
    if (player1Control > 0 && player2Control > 0) {
      this.renderContestedZone(laneY, laneHeight);
    }
  }
  
  createTerritoryGradient(player1Control, player2Control) {
    const cacheKey = `${player1Control}-${player2Control}`;
    
    if (this.gradientCache.has(cacheKey)) {
      return this.gradientCache.get(cacheKey);
    }
    
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    
    // Research: Dynamic gradient stops based on control
    const player1End = player1Control / 100;
    const player2Start = 1 - (player2Control / 100);
    
    gradient.addColorStop(0, 'rgba(0, 100, 255, 0.6)'); // Player 1 blue
    gradient.addColorStop(player1End, 'rgba(0, 100, 255, 0.2)');
    gradient.addColorStop(player2Start, 'rgba(255, 100, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0.6)'); // Player 2 red
    
    this.gradientCache.set(cacheKey, gradient);
    return gradient;
  }
  
  // Research: Contested zone visual effects
  renderContestedZone(laneY, laneHeight) {
    const contestedPattern = this.createContestedPattern();
    this.ctx.fillStyle = contestedPattern;
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillRect(0, laneY, this.canvas.width, laneHeight);
    this.ctx.globalAlpha = 1.0;
  }
  
  createContestedPattern() {
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 20;
    patternCanvas.height = 20;
    const patternCtx = patternCanvas.getContext('2d');
    
    // Research: Diagonal stripe pattern for contested zones
    patternCtx.strokeStyle = '#FFD700';
    patternCtx.lineWidth = 2;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 0);
    patternCtx.lineTo(20, 20);
    patternCtx.moveTo(0, 20);
    patternCtx.lineTo(20, 0);
    patternCtx.stroke();
    
    return this.ctx.createPattern(patternCanvas, 'repeat');
  }
  
  // Research: Real-time progress visualization
  renderAggregateControl() {
    const totalPlayer1 = this.calculateTotalControl(1);
    const totalPlayer2 = this.calculateTotalControl(2);
    
    // Research: Progress bar at top of battlefield
    const barHeight = 20;
    const player1Width = (totalPlayer1 / 100) * this.canvas.width;
    const player2Width = (totalPlayer2 / 100) * this.canvas.width;
    
    this.ctx.fillStyle = 'rgba(0, 100, 255, 0.8)';
    this.ctx.fillRect(0, 0, player1Width, barHeight);
    
    this.ctx.fillStyle = 'rgba(255, 100, 0, 0.8)';
    this.ctx.fillRect(this.canvas.width - player2Width, 0, player2Width, barHeight);
  }
}
```

## 🚀 Implementation Research Roadmap

### Phase 1: Territory Foundation Research (Week 1)
- **Study real-time territory control algorithms** from Paper.io and similar games
- **Research efficient canvas rendering** for smooth territory visualization
- **Investigate territory persistence mechanisms** after unit destruction
- **Prototype basic territorial control with gradients**

### Phase 2: Lane-Based Combat Research (Week 2)
- **Analyze tower defense lane systems** for unit progression patterns
- **Research waypoint-based movement** for smooth unit advancement
- **Study multi-lane balancing** to prevent single-lane strategies
- **Prototype creature movement with territory capture**

### Phase 3: Cross-Lane Interactions (Week 3)
- **Research flanking mechanics** from MOBA and RTS games
- **Study ranged support systems** for strategic depth
- **Investigate adjacency rules** for cross-lane actions
- **Prototype cross-lane combat mechanics**

### Phase 4: Victory Conditions Research (Week 4)
- **Research immediate victory conditions** for complete control
- **Study time-based victory systems** for balanced outcomes
- **Investigate tiebreaker mechanisms** for close matches
- **Test victory condition balance**

## 🔧 Technical Research Areas

### Performance Optimization for Territory Updates
```javascript
// Research pattern: Efficient territory state management
class TerritoryStateManager {
  constructor(width, height, laneCount) {
    this.width = width;
    this.height = height;
    this.laneCount = laneCount;
    
    // Research: Efficient data structures for territory
    this.territoryData = new Float32Array(width * height);
    this.dirtyRegions = new Set();
    this.updateQueue = [];
    this.lastUpdateTime = 0;
  }
  
  // Research: Batched territory updates for performance
  queueTerritoryUpdate(x, y, playerId, strength) {
    this.updateQueue.push({ x, y, playerId, strength, timestamp: Date.now() });
    this.markDirtyRegion(x, y);
  }
  
  processTerritoryUpdates() {
    if (this.updateQueue.length === 0) return;
    
    // Research: Batch process updates for efficiency
    const batchedUpdates = this.batchUpdatesByRegion();
    
    batchedUpdates.forEach(batch => {
      this.applyBatchedUpdate(batch);
    });
    
    this.updateQueue = [];
    this.dirtyRegions.clear();
  }
  
  // Research: Spatial partitioning for large battlefields
  batchUpdatesByRegion() {
    const regionSize = 32; // 32x32 pixel regions
    const regionMap = new Map();
    
    this.updateQueue.forEach(update => {
      const regionX = Math.floor(update.x / regionSize);
      const regionY = Math.floor(update.y / regionSize);
      const regionKey = `${regionX},${regionY}`;
      
      if (!regionMap.has(regionKey)) {
        regionMap.set(regionKey, []);
      }
      
      regionMap.get(regionKey).push(update);
    });
    
    return Array.from(regionMap.values());
  }
}
```

### Lane Balance and Fairness
```typescript
// Research pattern: Dynamic lane balancing
class LaneBalancingSystem {
  constructor(laneCount: number) {
    this.laneCount = laneCount;
    this.laneMetrics = new Map();
    this.balanceThreshold = 0.3; // 30% imbalance triggers rebalancing
  }
  
  // Research: Monitoring lane usage patterns
  trackLaneUsage(laneIndex: number, playerId: number, deploymentStrength: number) {
    const key = `${laneIndex}-${playerId}`;
    
    if (!this.laneMetrics.has(key)) {
      this.laneMetrics.set(key, {
        totalDeployments: 0,
        averageStrength: 0,
        lastDeployment: 0
      });
    }
    
    const metrics = this.laneMetrics.get(key);
    metrics.totalDeployments++;
    metrics.averageStrength = (metrics.averageStrength + deploymentStrength) / 2;
    metrics.lastDeployment = Date.now();
  }
  
  // Research: Detecting lane imbalances
  detectImbalances(): LaneImbalance[] {
    const imbalances: LaneImbalance[] = [];
    
    for (let i = 0; i < this.laneCount; i++) {
      const player1Usage = this.getLaneUsage(i, 1);
      const player2Usage = this.getLaneUsage(i, 2);
      
      const imbalanceRatio = Math.abs(player1Usage - player2Usage) / Math.max(player1Usage, player2Usage);
      
      if (imbalanceRatio > this.balanceThreshold) {
        imbalances.push({
          laneIndex: i,
          imbalanceRatio: imbalanceRatio,
          favoredPlayer: player1Usage > player2Usage ? 1 : 2
        });
      }
    }
    
    return imbalances;
  }
  
  // Research: Suggesting strategic adjustments
  suggestBalancingActions(imbalances: LaneImbalance[]): BalancingAction[] {
    return imbalances.map(imbalance => ({
      type: 'lane_incentive',
      laneIndex: imbalance.laneIndex,
      incentiveType: imbalance.favoredPlayer === 1 ? 'player2_bonus' : 'player1_bonus',
      bonusAmount: imbalance.imbalanceRatio * 0.1 // Small stat bonus for underused lanes
    }));
  }
}
```

### Cross-Lane Interaction Logic
```javascript
// Research pattern: Cross-lane combat resolution
class CrossLaneCombatResolver {
  constructor() {
    this.interactionTypes = ['flanking', 'ranged_support', 'area_effect'];
    this.effectivenessModifiers = new Map();
    this.cooldownTracker = new Map();
  }
  
  // Research: Resolving flanking attempts
  resolveFlanking(attacker, target, sourceLane, targetLane) {
    const flankingKey = `${attacker.id}-flanking`;
    
    // Research: Cooldown system for cross-lane actions
    if (this.isOnCooldown(flankingKey)) {
      return { success: false, reason: 'cooldown' };
    }
    
    const adjacencyBonus = this.calculateAdjacencyBonus(sourceLane, targetLane);
    const speedAdvantage = attacker.stats.speed / target.stats.speed;
    
    // Research: Multi-factor success calculation
    const baseSuccessRate = 0.4;
    const speedBonus = Math.min(0.3, (speedAdvantage - 1) * 0.15);
    const finalSuccessRate = baseSuccessRate + speedBonus + adjacencyBonus;
    
    const success = Math.random() < finalSuccessRate;
    
    if (success) {
      this.setCooldown(flankingKey, 5000); // 5 second cooldown
      
      return {
        success: true,
        damage: attacker.stats.attack * 1.25, // 25% flanking bonus
        territoryBonus: 0.1, // Extra territory capture
        cooldownDuration: 5000
      };
    }
    
    return { success: false, reason: 'failed_attempt' };
  }
  
  // Research: Range-based support calculations
  resolveRangedSupport(attacker, target, sourceLane, targetLane) {
    const distance = Math.abs(sourceLane - targetLane);
    const maxRange = attacker.rangedCapability?.maxRange || 1;
    
    if (distance > maxRange) {
      return { success: false, reason: 'out_of_range' };
    }
    
    // Research: Distance-based damage falloff
    const damageMultiplier = 1 - (distance * 0.25); // 25% reduction per lane
    const finalDamage = attacker.stats.attack * damageMultiplier * 0.75; // Base ranged penalty
    
    return {
      success: true,
      damage: finalDamage,
      range: distance,
      effectiveness: damageMultiplier
    };
  }
  
  calculateAdjacencyBonus(sourceLane, targetLane) {
    const distance = Math.abs(sourceLane - targetLane);
    
    // Research: Adjacent lanes get bonus, distant lanes get penalty
    switch (distance) {
      case 1: return 0.1; // 10% bonus for adjacent lanes
      case 2: return -0.1; // 10% penalty for distant lanes
      default: return -0.2; // 20% penalty for very distant lanes
    }
  }
}
```

## 📱 Mobile-Specific Research

### Touch-Friendly Territory Interaction
```javascript
// Research pattern: Mobile-optimized territory controls
class MobileTerritoryControls {
  constructor(canvas, touchSensitivity = 1.0) {
    this.canvas = canvas;
    this.touchSensitivity = touchSensitivity;
    this.gestureRecognizer = new GestureRecognizer();
    this.setupTouchHandlers();
  }
  
  setupTouchHandlers() {
    // Research: Gesture-based lane selection
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Research: Pinch-to-zoom for battlefield overview
    this.gestureRecognizer.on('pinch', this.handlePinchZoom.bind(this));
    this.gestureRecognizer.on('swipe', this.handleSwipeGesture.bind(this));
  }
  
  // Research: Lane selection through touch
  handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const y = touch.clientY - rect.top;
    
    // Research: Determine which lane was touched
    const laneHeight = this.canvas.height / this.laneCount;
    const selectedLane = Math.floor(y / laneHeight);
    
    this.startLaneSelection(selectedLane, touch);
  }
  
  // Research: Multi-touch lane selection
  handleMultiTouchSelection(touches) {
    const selectedLanes = [];
    
    Array.from(touches).forEach(touch => {
      const rect = this.canvas.getBoundingClientRect();
      const y = touch.clientY - rect.top;
      const laneHeight = this.canvas.height / this.laneCount;
      const laneIndex = Math.floor(y / laneHeight);
      
      if (!selectedLanes.includes(laneIndex)) {
        selectedLanes.push(laneIndex);
      }
    });
    
    // Research: Validate dual-lane selection requirement
    if (selectedLanes.length === 2) {
      this.confirmLaneSelection(selectedLanes);
    }
  }
  
  // Research: Swipe gestures for quick commands
  handleSwipeGesture(gesture) {
    switch (gesture.direction) {
      case 'left':
        this.executeQuickCommand('retreat');
        break;
      case 'right':
        this.executeQuickCommand('advance');
        break;
      case 'up':
        this.executeQuickCommand('focus_top_lane');
        break;
      case 'down':
        this.executeQuickCommand('focus_bottom_lane');
        break;
    }
  }
}
```

### Performance Optimization for Mobile
```typescript
// Research pattern: Mobile-optimized territory rendering
class MobileTerritoryRenderer {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.renderLevel = this.detectRenderLevel();
    this.frameSkipCounter = 0;
  }
  
  // Research: Adaptive rendering based on device performance
  detectRenderLevel(): string {
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    if (deviceMemory < 2 || hardwareConcurrency < 4) {
      return 'low'; // Simplified rendering for low-end devices
    } else if (deviceMemory < 4 || hardwareConcurrency < 8) {
      return 'medium'; // Balanced rendering
    } else {
      return 'high'; // Full quality rendering
    }
  }
  
  // Research: Frame skipping for performance
  renderFrame() {
    this.frameSkipCounter++;
    
    const skipFrames = this.renderLevel === 'low' ? 2 : 1;
    
    if (this.frameSkipCounter % skipFrames === 0) {
      this.renderTerritoryState();
      this.frameSkipCounter = 0;
    }
  }
}
```

## 🎮 Game-Specific Research Areas

### Wave Coordination with Territory
```javascript
// Research pattern: Coordinating waves with territorial control
class WaveTerritoryCoordinator {
  constructor(waveManager, territorySystem) {
    this.waveManager = waveManager;
    this.territorySystem = territorySystem;
    this.reinforcementBonuses = new Map();
  }
  
  // Research: Territory-based wave bonuses
  calculateWaveDeploymentBonus(waveNumber, laneIndex, playerId) {
    const currentControl = this.territorySystem.getLaneControl(laneIndex, playerId);
    
    // Research: Bonus for reinforcing controlled territory
    if (currentControl > 50) {
      return {
        type: 'reinforcement',
        statBonus: 0.1, // 10% stat bonus
        speedBonus: 0.15, // 15% speed bonus
        description: 'Territory advantage'
      };
    }
    
    // Research: Bonus for contesting enemy territory
    const enemyControl = this.territorySystem.getLaneControl(laneIndex, playerId === 1 ? 2 : 1);
    if (enemyControl > 70) {
      return {
        type: 'disruption',
        attackBonus: 0.2, // 20% attack bonus
        description: 'Disruption tactics'
      };
    }
    
    return null;
  }
  
  // Research: Dynamic wave timing based on territorial state
  adjustWaveTimingForTerritory(baseWaveInterval) {
    const territorialPressure = this.calculateTerritorialPressure();
    
    // Research: Faster waves when territory is contested
    if (territorialPressure > 0.7) {
      return baseWaveInterval * 0.8; // 20% faster waves
    } else if (territorialPressure < 0.3) {
      return baseWaveInterval * 1.1; // 10% slower waves
    }
    
    return baseWaveInterval;
  }
  
  calculateTerritorialPressure() {
    let totalPressure = 0;
    const laneCount = this.territorySystem.getLaneCount();
    
    for (let i = 0; i < laneCount; i++) {
      const player1Control = this.territorySystem.getLaneControl(i, 1);
      const player2Control = this.territorySystem.getLaneControl(i, 2);
      
      // Research: Higher pressure when control is contested
      const contestedRatio = Math.min(player1Control, player2Control) / Math.max(player1Control, player2Control);
      totalPressure += contestedRatio;
    }
    
    return totalPressure / laneCount;
  }
}
```

### Victory Condition Research
```typescript
// Research pattern: Multiple victory condition system
class VictoryConditionManager {
  constructor(battlefield: Battlefield) {
    this.battlefield = battlefield;
    this.victoryThresholds = {
      immediateControl: 100, // 100% control of all lanes
      territorialAdvantage: 60, // 60% total territory
      timeBasedControl: 50, // 50% control at time limit
      laneCompletion: 3 // All 3 lanes completed
    };
  }
  
  // Research: Checking for immediate victory conditions
  checkImmediateVictory(): VictoryResult | null {
    const laneControls = this.battlefield.lanes.map(lane => ({
      player1: lane.territoryControl.player1,
      player2: lane.territoryControl.player2
    }));
    
    // Research: All lanes controlled
    const player1Lanes = laneControls.filter(control => control.player1 >= 100).length;
    const player2Lanes = laneControls.filter(control => control.player2 >= 100).length;
    
    if (player1Lanes === this.battlefield.lanes.length) {
      return {
        type: 'immediate',
        winner: 1,
        condition: 'all_lanes_controlled',
        finalScore: this.calculateFinalScore()
      };
    }
    
    if (player2Lanes === this.battlefield.lanes.length) {
      return {
        type: 'immediate',
        winner: 2,
        condition: 'all_lanes_controlled',
        finalScore: this.calculateFinalScore()
      };
    }
    
    return null;
  }
  
  // Research: Time-based victory calculation
  checkTimeBasedVictory(): VictoryResult {
    const totalTerritoryControl = this.calculateTotalTerritoryControl();
    
    if (totalTerritoryControl.player1 > totalTerritoryControl.player2) {
      return {
        type: 'territorial',
        winner: 1,
        condition: 'most_territory',
        territoryAdvantage: totalTerritoryControl.player1 - totalTerritoryControl.player2,
        finalScore: this.calculateFinalScore()
      };
    } else if (totalTerritoryControl.player2 > totalTerritoryControl.player1) {
      return {
        type: 'territorial',
        winner: 2,
        condition: 'most_territory',
        territoryAdvantage: totalTerritoryControl.player2 - totalTerritoryControl.player1,
        finalScore: this.calculateFinalScore()
      };
    } else {
      // Research: Tiebreaker system
      return this.resolveTiebreaker();
    }
  }
  
  // Research: Comprehensive tiebreaker system
  resolveTiebreaker(): VictoryResult {
    const tiebreakers = [
      this.compareLaneCompletions(),
      this.compareCreaturesRemaining(),
      this.compareCreatureQuality(),
      this.compareBattlePerformance()
    ];
    
    for (const tiebreaker of tiebreakers) {
      if (tiebreaker.winner !== 0) {
        return {
          type: 'tiebreaker',
          winner: tiebreaker.winner,
          condition: tiebreaker.condition,
          finalScore: this.calculateFinalScore()
        };
      }
    }
    
    // Research: True draw condition
    return {
      type: 'draw',
      winner: 0,
      condition: 'perfect_tie',
      finalScore: this.calculateFinalScore()
    };
  }
}
```

## 🔄 Next Steps for Implementation

### Research Priorities
1. **Deep dive into Paper.io territory mechanics** - understand smooth territorial transitions
2. **Study tower defense lane balancing** - prevent single-lane dominance strategies
3. **Research MOBA cross-lane systems** - implement strategic depth through flanking
4. **Investigate mobile touch controls** - optimize for territorial combat on mobile

### Custom Development Areas
1. **Wave-based territorial progression** - unique mechanics for our game's wave system
2. **Dual-lane creature deployment** - strategic decision-making for lane selection
3. **Real-time territory visualization** - smooth gradients and contested zone effects
4. **Cross-lane interaction systems** - flanking and ranged support mechanics

### Testing and Validation
1. **Territory balance testing** - ensure fair and competitive territorial control
2. **Performance optimization** - maintain smooth rendering during intense battles
3. **Mobile touch interaction testing** - validate touch controls for territorial commands
4. **Victory condition balance** - test multiple victory paths for strategic depth

---

*These examples provide proven patterns for territorial control and lane-based combat that can be adapted for our unique wave-based system. Focus on understanding the core principles of territory visualization, cross-lane mechanics, and victory conditions rather than copying implementations directly.*

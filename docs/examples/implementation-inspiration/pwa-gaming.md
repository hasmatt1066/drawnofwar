# 📱 Progressive Web App Gaming - Implementation Inspiration

## Overview
Research-based examples for implementing PWA features, offline gameplay, and mobile optimization suitable for browser-based multiplayer games. These examples serve as starting points for developing our mobile-first gaming experience.

## 🔍 Key Reference Implementations

### 1. Service Worker Architecture for Games
**Inspiration**: 2048, Chrome Dino Game, Wordle  
**Focus**: Offline gameplay and asset caching strategies

#### Why It's Relevant
- Instant loading on repeat visits
- Offline gameplay capabilities during network issues
- Background sync for multiplayer state
- App-like experience on mobile devices

#### Key Implementation Patterns
```javascript
// Research pattern: Gaming-optimized service worker
class GameServiceWorker {
  constructor() {
    this.CACHE_VERSION = 'v1.0.0';
    this.CACHE_NAMES = {
      static: `drawn-of-war-static-${this.CACHE_VERSION}`,
      dynamic: `drawn-of-war-dynamic-${this.CACHE_VERSION}`,
      images: `drawn-of-war-images-${this.CACHE_VERSION}`,
      api: `drawn-of-war-api-${this.CACHE_VERSION}`
    };
    
    this.STATIC_ASSETS = [
      '/',
      '/static/css/main.css',
      '/static/js/bundle.js',
      '/static/js/game-engine.js',
      '/static/fonts/inter.woff2',
      '/manifest.json'
    ];
    
    this.API_CACHE_STRATEGY = {
      userProfile: 'cache-first',
      gameStats: 'network-first',
      battleHistory: 'cache-first',
      realTimeBattle: 'network-only'
    };
  }
  
  // Research: Install event for caching critical assets
  async handleInstall(event) {
    console.log('Service Worker installing');
    
    event.waitUntil(
      Promise.all([
        this.cacheStaticAssets(),
        this.preloadCriticalGameAssets(),
        this.setupBackgroundSync()
      ])
    );
    
    // Research: Skip waiting to activate immediately
    self.skipWaiting();
  }
  
  async cacheStaticAssets() {
    const cache = await caches.open(this.CACHE_NAMES.static);
    return cache.addAll(this.STATIC_ASSETS);
  }
  
  // Research: Preload game-specific assets
  async preloadCriticalGameAssets() {
    const gameAssets = [
      '/assets/ui/battle-interface.png',
      '/assets/audio/battle-music.mp3',
      '/assets/models/fallback-creatures.glb',
      '/assets/shaders/territory-gradient.glsl'
    ];
    
    const cache = await caches.open(this.CACHE_NAMES.images);
    return cache.addAll(gameAssets);
  }
  
  // Research: Network-first strategy for dynamic content
  async handleFetch(event) {
    const { request } = event;
    const url = new URL(request.url);
    
    // Research: Route different request types appropriately
    if (this.isAPIRequest(url)) {
      event.respondWith(this.handleAPIRequest(request));
    } else if (this.isImageRequest(url)) {
      event.respondWith(this.handleImageRequest(request));
    } else if (this.isStaticAsset(url)) {
      event.respondWith(this.handleStaticAssetRequest(request));
    } else {
      event.respondWith(this.handleDynamicRequest(request));
    }
  }
  
  // Research: API caching with different strategies
  async handleAPIRequest(request) {
    const url = new URL(request.url);
    const endpoint = this.getAPIEndpoint(url.pathname);
    const strategy = this.API_CACHE_STRATEGY[endpoint] || 'network-first';
    
    switch (strategy) {
      case 'cache-first':
        return this.cacheFirstStrategy(request);
      case 'network-first':
        return this.networkFirstStrategy(request);
      case 'network-only':
        return fetch(request);
      default:
        return this.networkFirstStrategy(request);
    }
  }
  
  async cacheFirstStrategy(request) {
    const cache = await caches.open(this.CACHE_NAMES.api);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Research: Background update for fresh data
      this.updateCacheInBackground(request, cache);
      return cachedResponse;
    }
    
    return this.fetchAndCache(request, cache);
  }
  
  async networkFirstStrategy(request) {
    const cache = await caches.open(this.CACHE_NAMES.api);
    
    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    } catch (error) {
      console.log('Network failed, trying cache:', error);
      return cache.match(request) || this.createOfflineResponse();
    }
  }
}
```

### 2. IndexedDB for Game State Storage
**Focus**: Persistent game data and offline synchronization

#### Game State Management Pattern
```javascript
// Research pattern: IndexedDB for game data persistence
class GameStateStorage {
  constructor() {
    this.dbName = 'DrawnOfWarDB';
    this.dbVersion = 1;
    this.db = null;
    this.stores = {
      userProfile: 'userProfile',
      battleHistory: 'battleHistory',
      drawings: 'drawings',
      creatures: 'creatures',
      syncQueue: 'syncQueue'
    };
  }
  
  // Research: Database initialization with game-specific stores
  async initializeDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Research: User profile store
        if (!db.objectStoreNames.contains(this.stores.userProfile)) {
          const userStore = db.createObjectStore(this.stores.userProfile, { keyPath: 'userId' });
          userStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }
        
        // Research: Battle history with searchable indexes
        if (!db.objectStoreNames.contains(this.stores.battleHistory)) {
          const battleStore = db.createObjectStore(this.stores.battleHistory, { keyPath: 'battleId' });
          battleStore.createIndex('userId', 'userId', { unique: false });
          battleStore.createIndex('completedAt', 'completedAt', { unique: false });
          battleStore.createIndex('battleType', 'battleType', { unique: false });
        }
        
        // Research: Drawings with metadata
        if (!db.objectStoreNames.contains(this.stores.drawings)) {
          const drawingStore = db.createObjectStore(this.stores.drawings, { keyPath: 'drawingId' });
          drawingStore.createIndex('userId', 'userId', { unique: false });
          drawingStore.createIndex('createdAt', 'createdAt', { unique: false });
          drawingStore.createIndex('syncStatus', 'syncStatus', { unique: false });
        }
        
        // Research: Sync queue for offline actions
        if (!db.objectStoreNames.contains(this.stores.syncQueue)) {
          const syncStore = db.createObjectStore(this.stores.syncQueue, { keyPath: 'actionId' });
          syncStore.createIndex('priority', 'priority', { unique: false });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }
  
  // Research: Efficient drawing storage with compression
  async saveDrawing(drawingData) {
    const transaction = this.db.transaction([this.stores.drawings], 'readwrite');
    const store = transaction.objectStore(this.stores.drawings);
    
    // Research: Compress drawing data for storage efficiency
    const compressedDrawing = {
      drawingId: drawingData.id,
      userId: drawingData.userId,
      imageData: await this.compressImageData(drawingData.imageData),
      metadata: {
        width: drawingData.width,
        height: drawingData.height,
        strokeCount: drawingData.strokes?.length || 0,
        complexity: this.calculateComplexity(drawingData)
      },
      aiAnalysis: drawingData.aiAnalysis,
      syncStatus: 'pending',
      createdAt: Date.now(),
      lastModified: Date.now()
    };
    
    return store.put(compressedDrawing);
  }
  
  // Research: Battle state synchronization
  async saveBattleState(battleData) {
    const transaction = this.db.transaction([this.stores.battleHistory], 'readwrite');
    const store = transaction.objectStore(this.stores.battleHistory);
    
    const battleRecord = {
      battleId: battleData.id,
      userId: battleData.userId,
      opponent: battleData.opponent,
      battleType: battleData.type,
      result: battleData.result,
      duration: battleData.duration,
      territorialControl: battleData.territorialControl,
      creatureStats: battleData.creatures,
      completedAt: battleData.completedAt || Date.now(),
      syncStatus: battleData.syncStatus || 'pending'
    };
    
    return store.put(battleRecord);
  }
  
  // Research: Offline action queuing
  async queueOfflineAction(action) {
    const transaction = this.db.transaction([this.stores.syncQueue], 'readwrite');
    const store = transaction.objectStore(this.stores.syncQueue);
    
    const queuedAction = {
      actionId: `${action.type}-${Date.now()}-${Math.random()}`,
      type: action.type,
      payload: action.payload,
      priority: this.getActionPriority(action.type),
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: 3
    };
    
    return store.put(queuedAction);
  }
  
  getActionPriority(actionType) {
    const priorities = {
      'battle_result': 1, // Highest priority
      'drawing_save': 2,
      'profile_update': 3,
      'analytics_event': 4 // Lowest priority
    };
    
    return priorities[actionType] || 5;
  }
}
```

### 3. Background Sync for Multiplayer Data
**Focus**: Reliable data synchronization when connectivity returns

#### Background Sync Pattern
```javascript
// Research pattern: Background sync for game data
class GameBackgroundSync {
  constructor() {
    this.syncManager = null;
    this.syncTags = {
      battleResult: 'battle-result-sync',
      drawingUpload: 'drawing-upload-sync',
      profileUpdate: 'profile-update-sync'
    };
    
    this.initializeBackgroundSync();
  }
  
  async initializeBackgroundSync() {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      this.syncManager = registration.sync;
      
      // Research: Register sync event handlers
      this.registerSyncHandlers();
    }
  }
  
  // Research: Queue battle results for sync
  async syncBattleResult(battleData) {
    try {
      // Research: Try immediate sync first
      await this.uploadBattleResult(battleData);
    } catch (error) {
      console.log('Immediate sync failed, queuing for background sync');
      
      // Research: Store for background sync
      await this.storeForBackgroundSync('battle_result', battleData);
      
      if (this.syncManager) {
        await this.syncManager.register(this.syncTags.battleResult);
      }
    }
  }
  
  // Research: Background sync event handling
  registerSyncHandlers() {
    self.addEventListener('sync', async (event) => {
      console.log('Background sync triggered:', event.tag);
      
      switch (event.tag) {
        case this.syncTags.battleResult:
          event.waitUntil(this.processBattleResultSync());
          break;
        case this.syncTags.drawingUpload:
          event.waitUntil(this.processDrawingUploadSync());
          break;
        case this.syncTags.profileUpdate:
          event.waitUntil(this.processProfileUpdateSync());
          break;
      }
    });
  }
  
  async processBattleResultSync() {
    const storage = new GameStateStorage();
    await storage.initializeDB();
    
    // Research: Get all pending battle results
    const pendingBattles = await this.getPendingSyncItems('battle_result');
    
    for (const battle of pendingBattles) {
      try {
        await this.uploadBattleResult(battle.payload);
        await this.markSyncComplete(battle.actionId);
        console.log('Battle result synced successfully:', battle.actionId);
      } catch (error) {
        console.error('Battle result sync failed:', error);
        await this.incrementRetryCount(battle.actionId);
      }
    }
  }
  
  // Research: Progressive sync with retry logic
  async uploadBattleResult(battleData, retryCount = 0) {
    const maxRetries = 3;
    const backoffDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
    
    try {
      const response = await fetch('/api/battles/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify(battleData)
      });
      
      if (!response.ok) {
        throw new Error(`Sync failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        return this.uploadBattleResult(battleData, retryCount + 1);
      }
      
      throw error;
    }
  }
}
```

## 🎯 Drawn of War 2 Specific Adaptations

### Game-Specific PWA Manifest
```json
// Research pattern: Gaming PWA manifest
{
  "name": "Drawn of War 2",
  "short_name": "DrawnOfWar2",
  "description": "Real-time multiplayer battle game where creativity meets strategy",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#FF6B35",
  "background_color": "#1A1A1A",
  "categories": ["games", "entertainment"],
  "lang": "en",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/battle-screen.png",
      "sizes": "1280x720",
      "type": "image/png",
      "platform": "wide",
      "label": "Territorial battle interface"
    },
    {
      "src": "/screenshots/drawing-screen.png",
      "sizes": "640x1136",
      "type": "image/png",
      "platform": "narrow",
      "label": "Creature drawing interface"
    }
  ],
  "shortcuts": [
    {
      "name": "Quick Battle",
      "short_name": "Battle",
      "description": "Start a quick casual battle",
      "url": "/battle/quick",
      "icons": [
        {
          "src": "/icons/shortcut-battle.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Draw Creature",
      "short_name": "Draw",
      "description": "Create a new creature",
      "url": "/draw",
      "icons": [
        {
          "src": "/icons/shortcut-draw.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "share_target": {
    "action": "/share-creature",
    "method": "POST",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url"
    }
  }
}
```

### Offline Game State Management
```typescript
// Research pattern: Offline-first game state
class OfflineGameState {
  constructor() {
    this.storage = new GameStateStorage();
    this.syncManager = new GameBackgroundSync();
    this.offlineCapabilities = {
      drawing: true,
      practiceMode: true,
      creatureManagement: true,
      battleReplay: true,
      statistics: true,
      multiplayerBattle: false
    };
  }
  
  // Research: Detecting online/offline state
  setupConnectivityHandlers() {
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
    
    // Research: Initial connectivity check
    this.updateConnectivityState(navigator.onLine);
  }
  
  async handleOffline() {
    console.log('App went offline, enabling offline mode');
    
    // Research: Switch to offline mode
    this.enableOfflineMode();
    
    // Research: Cache current game state
    await this.cacheCurrentGameState();
    
    // Research: Show offline indicator
    this.showOfflineIndicator();
  }
  
  async handleOnline() {
    console.log('App back online, syncing data');
    
    // Research: Sync pending data
    await this.syncPendingData();
    
    // Research: Re-enable online features
    this.enableOnlineMode();
    
    // Research: Hide offline indicator
    this.hideOfflineIndicator();
  }
  
  // Research: Offline drawing functionality
  async enableOfflineDrawing() {
    const offlineDrawingState = {
      canvasTools: await this.loadCanvasTools(),
      colorPalettes: await this.loadColorPalettes(),
      brushPresets: await this.loadBrushPresets(),
      fallbackAnalysis: await this.loadFallbackAnalysis()
    };
    
    // Research: Enable drawing with offline analysis
    this.initializeOfflineDrawingMode(offlineDrawingState);
  }
  
  // Research: Practice mode against AI
  async enablePracticeMode() {
    const practiceAssets = {
      aiOpponents: await this.loadAIOpponents(),
      practiceScenarios: await this.loadPracticeScenarios(),
      localBattleEngine: await this.loadLocalBattleEngine()
    };
    
    this.initializePracticeMode(practiceAssets);
  }
  
  // Research: Offline creature management
  async enableOfflineCreatureManagement() {
    const userCreatures = await this.storage.getAllUserCreatures();
    const creatureStats = await this.storage.getCreatureStats();
    
    // Research: Enable creature viewing and organization
    this.initializeOfflineCreatureGallery({
      creatures: userCreatures,
      stats: creatureStats,
      canEdit: true,
      canShare: false // Requires online connection
    });
  }
}
```

## 🚀 Implementation Research Roadmap

### Phase 1: PWA Foundation Research (Week 1)
- **Study service worker architectures** for gaming applications
- **Research IndexedDB patterns** for game state storage
- **Investigate background sync** for multiplayer data
- **Prototype basic PWA functionality**

### Phase 2: Offline Capabilities Research (Week 2)
- **Analyze offline gaming strategies** from successful PWAs
- **Research offline drawing and AI analysis** fallback systems
- **Study practice mode implementations** for offline play
- **Prototype offline game features**

### Phase 3: Mobile Optimization Research (Week 3)
- **Research mobile PWA performance** optimization techniques
- **Study touch interface optimization** for gaming
- **Investigate mobile-specific features** (shortcuts, share targets)
- **Prototype mobile-optimized interfaces**

### Phase 4: Sync and Performance (Week 4)
- **Research data synchronization** strategies for games
- **Study PWA installation** and user engagement
- **Investigate performance monitoring** for PWAs
- **Test and optimize sync performance**

## 🔧 Technical Research Areas

### Performance Optimization for PWAs
```javascript
// Research pattern: PWA performance optimization
class PWAPerformanceOptimizer {
  constructor() {
    this.performanceMetrics = new Map();
    this.resourceHints = new ResourceHintManager();
    this.bundleOptimizer = new BundleOptimizer();
  }
  
  // Research: Critical resource prioritization
  optimizeCriticalRenderingPath() {
    const criticalResources = [
      { resource: '/static/css/critical.css', priority: 'high' },
      { resource: '/static/js/game-core.js', priority: 'high' },
      { resource: '/static/fonts/inter-subset.woff2', priority: 'medium' },
      { resource: '/assets/ui/game-icons.svg', priority: 'medium' }
    ];
    
    criticalResources.forEach(({ resource, priority }) => {
      this.resourceHints.preload(resource, priority);
    });
  }
  
  // Research: Code splitting for game features
  implementCodeSplitting() {
    const featureChunks = {
      drawing: () => import('./features/drawing-engine'),
      battle: () => import('./features/battle-system'),
      ai: () => import('./features/ai-analysis'),
      models: () => import('./features/3d-models')
    };
    
    return featureChunks;
  }
  
  // Research: Service worker caching strategies
  optimizeCachingStrategy() {
    const cacheStrategies = {
      static: 'cache-first', // CSS, JS, fonts
      images: 'cache-first', // Game assets, UI images
      api: 'network-first',  // User data, battle state
      realtime: 'network-only' // Live battle updates
    };
    
    return cacheStrategies;
  }
  
  // Research: Memory management for long gaming sessions
  implementMemoryManagement() {
    const memoryManager = {
      maxCanvasHistory: 20, // Limit undo/redo history
      maxBattleHistory: 50, // Limit stored battles
      imageCompression: 0.8, // Compress stored images
      gcInterval: 300000 // Force GC every 5 minutes
    };
    
    // Research: Periodic cleanup
    setInterval(() => {
      this.performMemoryCleanup();
    }, memoryManager.gcInterval);
    
    return memoryManager;
  }
}
```

### Mobile Touch Optimization
```typescript
// Research pattern: Mobile touch optimization for PWAs
class MobileTouchOptimizer {
  constructor() {
    this.touchHandlers = new Map();
    this.gestureRecognizer = new GestureRecognizer();
    this.hapticFeedback = new HapticFeedback();
  }
  
  // Research: Optimized touch events for drawing
  optimizeDrawingTouch() {
    const canvas = document.getElementById('drawing-canvas');
    
    // Research: Use passive event listeners for performance
    canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    
    // Research: Prevent default behaviors
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent scrolling while drawing
    }, { passive: false });
  }
  
  handleTouchStart(event: TouchEvent) {
    // Research: Multi-touch handling for drawing
    Array.from(event.touches).forEach((touch, index) => {
      const pressure = (touch as any).force || 0.5;
      const touchData = {
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        pressure: pressure,
        timestamp: Date.now()
      };
      
      this.touchHandlers.set(touch.identifier, touchData);
      this.startDrawingStroke(touchData);
    });
    
    // Research: Haptic feedback for touch confirmation
    this.hapticFeedback.light();
  }
  
  // Research: Gesture recognition for game controls
  implementGameGestures() {
    const gameGestures = {
      'swipe-up': () => this.showBattleMenu(),
      'swipe-down': () => this.hideBattleMenu(),
      'swipe-left': () => this.switchToDrawingMode(),
      'swipe-right': () => this.switchToBattleMode(),
      'pinch-in': () => this.zoomOut(),
      'pinch-out': () => this.zoomIn(),
      'double-tap': () => this.toggleFullscreen(),
      'long-press': () => this.showContextMenu()
    };
    
    Object.entries(gameGestures).forEach(([gesture, handler]) => {
      this.gestureRecognizer.on(gesture, handler);
    });
  }
  
  // Research: Responsive layout for different screen sizes
  implementResponsiveGameLayout() {
    const breakpoints = {
      mobile: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      desktop: '(min-width: 1024px)'
    };
    
    Object.entries(breakpoints).forEach(([device, query]) => {
      const mediaQuery = window.matchMedia(query);
      
      const handleLayoutChange = (mq: MediaQueryList) => {
        if (mq.matches) {
          this.applyLayoutForDevice(device);
        }
      };
      
      mediaQuery.addListener(handleLayoutChange);
      handleLayoutChange(mediaQuery); // Initial check
    });
  }
  
  applyLayoutForDevice(device: string) {
    const layouts = {
      mobile: {
        drawingCanvasSize: { width: '100vw', height: '60vh' },
        buttonSize: 'large',
        menuPosition: 'bottom',
        orientation: 'portrait'
      },
      tablet: {
        drawingCanvasSize: { width: '50vw', height: '70vh' },
        buttonSize: 'medium',
        menuPosition: 'side',
        orientation: 'landscape'
      },
      desktop: {
        drawingCanvasSize: { width: '400px', height: '400px' },
        buttonSize: 'small',
        menuPosition: 'top',
        orientation: 'landscape'
      }
    };
    
    const layout = layouts[device];
    this.applyLayout(layout);
  }
}
```

### Installation and Engagement
```javascript
// Research pattern: PWA installation and user engagement
class PWAInstallationManager {
  constructor() {
    this.installPrompt = null;
    this.installMetrics = new InstallMetrics();
    this.engagementTracker = new EngagementTracker();
  }
  
  // Research: Install prompt handling
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('Install prompt available');
      
      // Research: Prevent immediate prompt
      event.preventDefault();
      this.installPrompt = event;
      
      // Research: Show custom install UI
      this.showCustomInstallButton();
      
      // Research: Track prompt availability
      this.installMetrics.trackPromptAvailable();
    });
    
    // Research: Track installation success
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
      this.installMetrics.trackInstallSuccess();
      this.hideCustomInstallButton();
      this.showInstallSuccessMessage();
    });
  }
  
  // Research: Strategic install prompt timing
  async promptInstallAtOptimalTime() {
    const userEngagement = await this.engagementTracker.getEngagementScore();
    const sessionCount = await this.engagementTracker.getSessionCount();
    const timeSpent = await this.engagementTracker.getTotalTimeSpent();
    
    // Research: Install prompt criteria
    const installCriteria = {
      minEngagementScore: 0.6,
      minSessions: 3,
      minTimeSpent: 300000 // 5 minutes
    };
    
    const shouldPrompt = userEngagement >= installCriteria.minEngagementScore &&
                        sessionCount >= installCriteria.minSessions &&
                        timeSpent >= installCriteria.minTimeSpent;
    
    if (shouldPrompt && this.installPrompt) {
      this.showInstallPrompt();
    }
  }
  
  async showInstallPrompt() {
    if (!this.installPrompt) return;
    
    try {
      const result = await this.installPrompt.prompt();
      console.log('Install prompt result:', result.outcome);
      
      this.installMetrics.trackPromptResult(result.outcome);
      
      if (result.outcome === 'accepted') {
        this.installMetrics.trackInstallAccepted();
      }
      
      this.installPrompt = null;
    } catch (error) {
      console.error('Install prompt failed:', error);
      this.installMetrics.trackPromptError(error);
    }
  }
  
  // Research: App shortcuts for quick access
  setupAppShortcuts() {
    const shortcuts = [
      {
        name: 'Quick Battle',
        action: () => this.startQuickBattle(),
        icon: '/icons/battle-shortcut.png'
      },
      {
        name: 'Draw Creature',
        action: () => this.openDrawingMode(),
        icon: '/icons/draw-shortcut.png'
      },
      {
        name: 'View Stats',
        action: () => this.openStatsPage(),
        icon: '/icons/stats-shortcut.png'
      }
    ];
    
    // Research: Handle shortcut activation
    if ('shortcuts' in navigator) {
      shortcuts.forEach(shortcut => {
        navigator.shortcuts.add(shortcut);
      });
    }
  }
}
```

## 📱 Mobile-Specific Research

### Battery and Performance Optimization
```javascript
// Research pattern: Mobile battery optimization
class MobileBatteryOptimizer {
  constructor() {
    this.batteryManager = null;
    this.performanceMode = 'auto';
    this.initializeBatteryAPI();
  }
  
  async initializeBatteryAPI() {
    if ('getBattery' in navigator) {
      try {
        this.batteryManager = await navigator.getBattery();
        this.setupBatteryMonitoring();
      } catch (error) {
        console.log('Battery API not available:', error);
      }
    }
  }
  
  setupBatteryMonitoring() {
    if (!this.batteryManager) return;
    
    // Research: Adjust performance based on battery level
    const checkBatteryLevel = () => {
      const batteryLevel = this.batteryManager.level;
      const isCharging = this.batteryManager.charging;
      
      if (batteryLevel < 0.2 && !isCharging) {
        this.enableBatterySaverMode();
      } else if (batteryLevel > 0.5 || isCharging) {
        this.enableNormalMode();
      }
    };
    
    this.batteryManager.addEventListener('levelchange', checkBatteryLevel);
    this.batteryManager.addEventListener('chargingchange', checkBatteryLevel);
    
    // Initial check
    checkBatteryLevel();
  }
  
  enableBatterySaverMode() {
    console.log('Enabling battery saver mode');
    
    // Research: Reduce game performance for battery saving
    const batterySaverSettings = {
      frameRate: 30, // Reduce from 60 FPS
      animationQuality: 'low',
      particleEffects: false,
      backgroundSync: false,
      autoSave: 'reduced'
    };
    
    this.applyPerformanceSettings(batterySaverSettings);
    this.showBatterySaverNotification();
  }
  
  enableNormalMode() {
    console.log('Enabling normal performance mode');
    
    const normalSettings = {
      frameRate: 60,
      animationQuality: 'high',
      particleEffects: true,
      backgroundSync: true,
      autoSave: 'normal'
    };
    
    this.applyPerformanceSettings(normalSettings);
  }
}
```

### Network Optimization
```typescript
// Research pattern: Network optimization for mobile gaming
class MobileNetworkOptimizer {
  constructor() {
    this.connection = (navigator as any).connection;
    this.networkState = 'unknown';
    this.setupNetworkMonitoring();
  }
  
  setupNetworkMonitoring() {
    if (this.connection) {
      this.updateNetworkState();
      
      this.connection.addEventListener('change', () => {
        this.updateNetworkState();
        this.adaptToNetworkConditions();
      });
    }
  }
  
  updateNetworkState() {
    if (!this.connection) return;
    
    const effectiveType = this.connection.effectiveType;
    const downlink = this.connection.downlink;
    const rtt = this.connection.rtt;
    
    this.networkState = {
      type: effectiveType,
      downlink: downlink,
      rtt: rtt,
      quality: this.calculateNetworkQuality(effectiveType, downlink, rtt)
    };
    
    console.log('Network state updated:', this.networkState);
  }
  
  calculateNetworkQuality(effectiveType: string, downlink: number, rtt: number): string {
    // Research: Network quality classification
    if (effectiveType === '4g' && downlink > 10 && rtt < 100) {
      return 'excellent';
    } else if (effectiveType === '4g' && downlink > 5) {
      return 'good';
    } else if (effectiveType === '3g' || downlink > 1) {
      return 'fair';
    } else {
      return 'poor';
    }
  }
  
  adaptToNetworkConditions() {
    const quality = this.networkState.quality;
    
    switch (quality) {
      case 'excellent':
        this.enableHighQualityMode();
        break;
      case 'good':
        this.enableStandardMode();
        break;
      case 'fair':
        this.enableLowBandwidthMode();
        break;
      case 'poor':
        this.enableOfflineMode();
        break;
    }
  }
  
  enableLowBandwidthMode() {
    console.log('Enabling low bandwidth mode');
    
    const lowBandwidthSettings = {
      imageQuality: 0.6,
      updateFrequency: 'reduced',
      backgroundSync: 'essential-only',
      preloading: false,
      compression: 'aggressive'
    };
    
    this.applyNetworkSettings(lowBandwidthSettings);
  }
}
```

## 🎮 Game-Specific Research Areas

### Offline AI Analysis
```javascript
// Research pattern: Offline creature analysis fallback
class OfflineAIAnalysis {
  constructor() {
    this.fallbackModel = null;
    this.analysisCache = new Map();
    this.initializeFallbackModel();
  }
  
  async initializeFallbackModel() {
    // Research: Load lightweight AI model for offline analysis
    try {
      if (typeof tf !== 'undefined') {
        this.fallbackModel = await tf.loadLayersModel('/models/creature-analysis-lite.json');
        console.log('Offline AI model loaded');
      }
    } catch (error) {
      console.log('Offline AI model not available, using rule-based analysis');
    }
  }
  
  // Research: Offline creature analysis
  async analyzeCreatureOffline(imageData) {
    const analysisKey = this.generateImageHash(imageData);
    
    // Research: Check cache first
    if (this.analysisCache.has(analysisKey)) {
      return this.analysisCache.get(analysisKey);
    }
    
    let analysis;
    
    if (this.fallbackModel) {
      analysis = await this.tfAnalysis(imageData);
    } else {
      analysis = await this.ruleBasedAnalysis(imageData);
    }
    
    // Research: Cache result
    this.analysisCache.set(analysisKey, analysis);
    
    return analysis;
  }
  
  async ruleBasedAnalysis(imageData) {
    // Research: Simple rule-based creature analysis
    const complexity = this.calculateComplexity(imageData);
    const coverage = this.calculateCoverage(imageData);
    const symmetry = this.calculateSymmetry(imageData);
    
    const baseStats = {
      health: Math.max(50, Math.min(150, 60 + complexity * 40)),
      attack: Math.max(20, Math.min(80, 30 + coverage * 30)),
      defense: Math.max(10, Math.min(50, 15 + symmetry * 25)),
      speed: Math.max(5, Math.min(25, 20 - coverage * 10))
    };
    
    return {
      stats: baseStats,
      element: this.guessElement(imageData),
      type: this.guessCreatureType(complexity, coverage),
      confidence: 0.6,
      isOfflineAnalysis: true
    };
  }
  
  calculateComplexity(imageData) {
    // Research: Analyze stroke complexity and detail level
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    
    ctx.putImageData(imageData, 0, 0);
    
    // Simple edge detection for complexity
    const pixels = imageData.data;
    let edgeCount = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = pixels[i + 3];
      const nextAlpha = pixels[i + 7] || 0;
      
      if (Math.abs(alpha - nextAlpha) > 50) {
        edgeCount++;
      }
    }
    
    return Math.min(1, edgeCount / 10000);
  }
}
```

### Share and Social Features
```typescript
// Research pattern: PWA sharing and social integration
class PWASocialFeatures {
  constructor() {
    this.shareAPI = 'share' in navigator;
    this.clipboardAPI = 'clipboard' in navigator;
  }
  
  // Research: Share creature creations
  async shareCreature(creatureData: CreatureData) {
    const shareData = {
      title: `Check out my ${creatureData.name}!`,
      text: `I created this awesome creature in Drawn of War 2: ${creatureData.description}`,
      url: `${window.location.origin}/creature/${creatureData.id}`,
      files: creatureData.imageFile ? [creatureData.imageFile] : undefined
    };
    
    if (this.shareAPI && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        this.trackShareSuccess('creature', 'native');
      } catch (error) {
        console.log('Native share cancelled or failed');
        this.fallbackShare(shareData);
      }
    } else {
      this.fallbackShare(shareData);
    }
  }
  
  // Research: Fallback sharing options
  fallbackShare(shareData: ShareData) {
    const shareOptions = [
      {
        name: 'Copy Link',
        action: () => this.copyToClipboard(shareData.url),
        icon: 'copy'
      },
      {
        name: 'Share on Twitter',
        action: () => this.shareToTwitter(shareData),
        icon: 'twitter'
      },
      {
        name: 'Share on Facebook',
        action: () => this.shareToFacebook(shareData),
        icon: 'facebook'
      },
      {
        name: 'Share on Reddit',
        action: () => this.shareToReddit(shareData),
        icon: 'reddit'
      }
    ];
    
    this.showShareModal(shareOptions);
  }
  
  async copyToClipboard(text: string) {
    if (this.clipboardAPI) {
      try {
        await navigator.clipboard.writeText(text);
        this.showCopySuccessNotification();
        this.trackShareSuccess('creature', 'clipboard');
      } catch (error) {
        this.fallbackCopyToClipboard(text);
      }
    } else {
      this.fallbackCopyToClipboard(text);
    }
  }
  
  // Research: Battle replay sharing
  async shareBattleReplay(battleData: BattleData) {
    const replayUrl = await this.generateBattleReplayUrl(battleData);
    
    const shareData = {
      title: `Epic Battle Replay - ${battleData.result}!`,
      text: `Watch my territorial battle in Drawn of War 2! Duration: ${battleData.duration}s`,
      url: replayUrl
    };
    
    if (this.shareAPI) {
      await navigator.share(shareData);
    } else {
      this.fallbackShare(shareData);
    }
  }
}
```

## 🔄 Next Steps for Implementation

### Research Priorities
1. **Deep dive into gaming PWA architectures** - understand service worker patterns for games
2. **Study offline game state management** - research IndexedDB and synchronization strategies
3. **Research mobile gaming optimization** - investigate touch controls and performance
4. **Investigate PWA installation strategies** - understand user engagement and install prompts

### Custom Development Areas
1. **Game-specific offline features** - drawing tools and practice mode without internet
2. **Efficient battle state synchronization** - handle multiplayer data during connectivity issues
3. **Mobile-optimized touch controls** - territorial combat interface for touch devices
4. **Progressive enhancement** - ensure core features work across all device capabilities

### Testing and Validation
1. **Offline functionality testing** - validate all offline features work correctly
2. **Cross-device compatibility** - test PWA features across different mobile devices
3. **Performance optimization** - measure and optimize loading times and responsiveness
4. **Installation flow testing** - validate PWA installation experience across platforms

---

*These examples provide proven patterns for PWA gaming implementation that can be adapted for our specific territorial battle game. Focus on understanding the core principles of offline-first architecture, mobile optimization, and progressive enhancement rather than copying implementations directly.*

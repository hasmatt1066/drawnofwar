# 🎭 Puppeteer UI Testing Specifications

## 🎯 Overview

This document provides comprehensive guidelines for using Puppeteer to test the Drawn of War 2 UI like a real user. The goal is to ensure excellent user experience through automated visual testing, interaction validation, and continuous UI quality monitoring.

## 🔧 Puppeteer Setup & Configuration

### Required Tools
```typescript
interface PuppeteerTestingStack {
  puppeteer: 'Latest version for browser automation'
  devServer: 'Next.js development server on localhost:3000'
  viewport: 'Multiple screen sizes for responsive testing'
  console: 'Browser console monitoring for errors'
}
```

### Testing Environment
```bash
# Development server must be running
npm run dev
# Server should be accessible at http://localhost:3000

# Puppeteer will automatically:
# - Launch headless Chrome browser
# - Navigate to application pages
# - Interact with UI elements
# - Take screenshots for visual validation
# - Monitor console for errors and warnings
```

## 📱 Responsive Testing Strategy

### Screen Size Testing Matrix
```typescript
interface ResponsiveTestMatrix {
  mobile: {
    width: 375
    height: 667
    description: 'iPhone SE / Mobile portrait'
    focusAreas: ['Touch interactions', 'Readable text', 'Accessible buttons']
  }
  
  tablet: {
    width: 768
    height: 1024
    description: 'iPad / Tablet portrait'
    focusAreas: ['Drawing canvas optimization', 'Two-column layouts']
  }
  
  desktop: {
    width: 1920
    height: 1080
    description: 'Desktop / Full HD'
    focusAreas: ['Full feature set', 'Multi-column layouts', 'Sidebar navigation']
  }
  
  wide: {
    width: 2560
    height: 1440
    description: 'Wide desktop / 1440p'
    focusAreas: ['Ultra-wide layouts', 'Content scaling']
  }
}
```

## 🎮 Game-Specific UI Testing Scenarios

### 1. Authentication Flow Testing
```typescript
interface AuthenticationTesting {
  scenarios: {
    registration: {
      steps: [
        'Navigate to registration page',
        'Fill email and password fields',
        'Submit form and verify validation',
        'Check for success/error messages',
        'Verify redirect to dashboard'
      ]
      screenshots: ['Form empty', 'Form filled', 'Validation errors', 'Success state']
    }
    
    login: {
      steps: [
        'Navigate to login page',
        'Test valid credentials',
        'Test invalid credentials',
        'Test password reset flow',
        'Verify session persistence'
      ]
      screenshots: ['Login form', 'Error states', 'Loading states', 'Success redirect']
    }
  }
}
```

### 2. Drawing Canvas Testing
```typescript
interface DrawingCanvasTesting {
  interactions: {
    toolSelection: {
      test: 'Click each drawing tool (brush, eraser)'
      verify: 'Tool becomes active, cursor changes'
      screenshot: 'Each tool selected state'
    }
    
    drawingActions: {
      test: 'Draw strokes with mouse and touch simulation'
      verify: 'Strokes appear on canvas, undo/redo works'
      screenshot: 'Canvas with drawings, tool panels'
    }
    
    responsiveCanvas: {
      test: 'Test canvas on mobile, tablet, desktop sizes'
      verify: 'Canvas scales properly, touch works on mobile'
      screenshot: 'Canvas at each screen size'
    }
  }
  
  performanceChecks: {
    smoothDrawing: 'Monitor frame rate during drawing (target: 60fps)'
    memoryUsage: 'Check for memory leaks during extended drawing'
    canvasExport: 'Test PNG export functionality and file size'
  }
}
```

### 3. Battle System UI Testing
```typescript
interface BattleSystemTesting {
  realTimeFeatures: {
    roomJoining: {
      test: 'Join battle room, wait for opponent'
      verify: 'Room state updates, player list shows'
      screenshot: 'Lobby state, waiting state, battle ready'
    }
    
    battleInterface: {
      test: 'Navigate through battle phases'
      verify: 'Phase transitions smooth, timers work'
      screenshot: 'Drawing phase, analysis phase, combat phase'
    }
    
    battleActions: {
      test: 'Click battle action buttons'
      verify: 'Actions register, real-time updates work'
      screenshot: 'Action buttons, battle animations'
    }
  }
}
```

### 4. 3D Model Display Testing
```typescript
interface ModelDisplayTesting {
  rendering: {
    modelLoading: {
      test: 'Load 3D models in battle arena'
      verify: 'Models render correctly, no WebGL errors'
      screenshot: 'Model loading states, rendered models'
    }
    
    modelAnimations: {
      test: 'Trigger battle animations'
      verify: 'Smooth 60fps animations, no stuttering'
      screenshot: 'Animation keyframes, battle effects'
    }
  }
  
  performanceMonitoring: {
    webglPerformance: 'Monitor WebGL performance metrics'
    memoryUsage: 'Check for GPU memory leaks'
    frameRate: 'Verify consistent frame rates'
  }
}
```

## 📸 Screenshot Strategy

### Systematic Screenshot Collection
```typescript
interface ScreenshotStrategy {
  pageScreenshots: {
    fullPage: 'Complete page including scrollable content'
    aboveFold: 'Visible area without scrolling'
    components: 'Individual component isolation'
  }
  
  stateScreenshots: {
    default: 'Normal component state'
    hover: 'Hover interactions'
    active: 'Active/pressed states'
    disabled: 'Disabled component states'
    loading: 'Loading and skeleton states'
    error: 'Error states and validation'
  }
  
  interactionScreenshots: {
    beforeClick: 'State before user interaction'
    afterClick: 'State after interaction completes'
    duringAnimation: 'Mid-animation states'
    transitionStates: 'Page/component transitions'
  }
}
```

### Screenshot Organization
```bash
# Screenshot naming convention
screenshots/
├── desktop/
│   ├── homepage-default.png
│   ├── homepage-logged-in.png
│   ├── drawing-canvas-empty.png
│   ├── drawing-canvas-with-drawing.png
│   └── battle-arena-combat.png
├── tablet/
│   ├── drawing-canvas-portrait.png
│   └── battle-interface-tablet.png
└── mobile/
    ├── homepage-mobile.png
    ├── navigation-menu-mobile.png
    └── drawing-canvas-mobile.png
```

## 🔍 Console Monitoring & Error Detection

### Error Monitoring Strategy
```typescript
interface ConsoleMonitoring {
  errorTypes: {
    javascript: 'Runtime JavaScript errors'
    network: 'Failed API requests or resource loading'
    console: 'Console warnings and errors'
    performance: 'Performance warnings and metrics'
  }
  
  monitoringActions: {
    capture: 'Capture all console messages during testing'
    categorize: 'Sort by error severity (error, warn, info)'
    report: 'Generate error reports with context'
    fix: 'Address critical errors immediately'
  }
}
```

### Performance Monitoring
```typescript
interface PerformanceMonitoring {
  metrics: {
    pageLoad: 'First contentful paint, largest contentful paint'
    interaction: 'Input delay, interaction responsiveness'
    animation: 'Frame rate during animations and transitions'
    memory: 'Memory usage during extended sessions'
  }
  
  thresholds: {
    pageLoad: '< 2 seconds'
    apiResponse: '< 500ms'
    frameRate: '> 55fps average'
    memoryGrowth: '< 10MB per hour'
  }
}
```

## 🎯 Testing Workflow Integration

### Development Workflow
```bash
# 1. After implementing any UI feature
npm run dev                 # Start development server
/test-ui [feature-name]     # Run automated UI tests
/screenshot [component]     # Take visual screenshots

# 2. Review results
# - Check screenshots for visual issues
# - Review console output for errors
# - Verify responsive behavior
# - Test user interactions

# 3. Fix issues and retest
# - Address any UI problems found
# - Re-run tests to verify fixes
# - Update screenshots for documentation

# 4. Document and commit
# - Update session memory with findings
# - Commit fixes with descriptive messages
# - Add screenshots to documentation
```

### Quality Gates
```typescript
interface QualityGates {
  beforeCommit: {
    noConsoleErrors: 'Zero JavaScript errors during testing'
    responsiveLayout: 'Proper layout at all screen sizes'
    accessibleContrast: 'Minimum 4.5:1 contrast ratio'
    smoothInteractions: 'All buttons and links responsive'
  }
  
  beforeDeployment: {
    completeUserFlow: 'Full user journey works end-to-end'
    performanceTargets: 'Lighthouse score 90+ on all pages'
    crossBrowserTesting: 'Works in Chrome, Firefox, Safari'
    mobileOptimization: 'Excellent mobile user experience'
  }
}
```

## 🔄 Continuous UI Improvement

### UI Issue Tracking
```markdown
## UI Testing Results - [Date]

### ✅ Passed Tests
- Authentication flow works smoothly
- Drawing canvas responsive across devices
- Battle interface loads without errors

### ❌ Issues Found
- [ ] **Critical**: Mobile navigation menu not opening
- [ ] **Major**: Drawing canvas laggy on tablet
- [ ] **Minor**: Button hover states inconsistent

### 📸 Screenshots Captured
- Desktop homepage (looks good)
- Mobile drawing interface (needs improvement)
- Battle arena (excellent)

### 🎯 Next Actions
1. Fix mobile navigation menu
2. Optimize canvas performance for tablet
3. Standardize button hover states
```

### Visual Regression Prevention
```typescript
interface VisualRegression {
  baseline: {
    establish: 'Take screenshots of correct UI states'
    version: 'Track with Git for change management'
    compare: 'Compare new screenshots with baseline'
  }
  
  automation: {
    ciIntegration: 'Run visual tests in CI pipeline'
    alerting: 'Alert on visual changes'
    approval: 'Manual approval process for intentional changes'
  }
}
```

## 🎮 Game-Specific Quality Criteria

### Drawing Experience Quality
- **Smooth Drawing**: 60fps during drawing interactions
- **Touch Responsiveness**: <16ms input latency on touch devices
- **Canvas Performance**: No lag during complex drawings
- **Tool Feedback**: Immediate visual feedback for tool changes

### Battle System Quality
- **Real-time Updates**: <100ms battle action latency
- **3D Performance**: Smooth model rendering and animations
- **State Synchronization**: Consistent UI state across players
- **Error Handling**: Graceful handling of connection issues

### Overall User Experience
- **Loading States**: Clear feedback during all async operations
- **Error Messages**: Helpful, actionable error messages
- **Accessibility**: Full keyboard navigation support
- **Responsive Design**: Excellent experience on all devices

---

**Remember**: Great games require great user interfaces. Use Puppeteer testing to ensure every user interaction is smooth, intuitive, and visually appealing. Test early, test often, and fix issues immediately to maintain high quality throughout development.

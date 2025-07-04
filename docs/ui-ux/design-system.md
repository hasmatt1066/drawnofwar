# 🎨 UI/UX Design System & Guidelines

## 🎯 Design Philosophy

Drawn of War 2's design emphasizes **creative expression** through a **modern, accessible interface** that feels both **playful and professional**. Our design principles:

- **Creativity First**: Tools that inspire and don't intimidate
- **Accessibility**: Inclusive design for all players
- **Performance**: 60fps interactions with smooth animations
- **Consistency**: Unified experience across all devices
- **Delight**: Micro-interactions that bring joy

## 🎨 Design System Foundation

### Color Palette
```typescript
interface ColorSystem {
  primary: {
    50: '#FFF7ED',   // Lightest - backgrounds
    100: '#FFEDD5',  // Very light - hover states
    200: '#FED7AA',  // Light - disabled states
    300: '#FDBA74',  // Medium light - borders
    400: '#FB923C',  // Medium - text on dark
    500: '#F97316',  // Base - primary actions
    600: '#EA580C',  // Dark - hover primary
    700: '#C2410C',  // Darker - active primary
    800: '#9A3412',  // Very dark - text
    900: '#7C2D12'   // Darkest - headings
  }
  
  secondary: {
    50: '#F0F9FF',   // Ice blue tints
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',  // Base secondary
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E'
  }
  
  accent: {
    50: '#FEFCE8',   // Gold accents
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Base accent
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F'
  }
  
  neutral: {
    50: '#FAFAFA',   // Pure whites
    100: '#F5F5F5',  // Light grays
    200: '#E5E5E5',  // Borders
    300: '#D4D4D4',  // Disabled text
    400: '#A3A3A3',  // Placeholder text
    500: '#737373',  // Body text
    600: '#525252',  // Headings
    700: '#404040',  // Dark text
    800: '#262626',  // Darker text
    900: '#171717'   // Darkest text
  }
  
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  }
}
```

### Typography Scale
```typescript
interface TypographySystem {
  fontFamilies: {
    display: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'JetBrains Mono, "Fira Code", Consolas, monospace'
  }
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem'   // 72px
  }
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  }
  
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  }
}
```

### Spacing System
```typescript
interface SpacingSystem {
  space: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem'       // 384px
  }
}
```

### Component Hierarchy
```typescript
interface ComponentHierarchy {
  level1: {
    elements: ['Page headers', 'Main CTAs', 'Primary navigation']
    prominence: 'Highest'
    examples: ['Sign Up', 'Start Battle', 'Main Logo']
  }
  
  level2: {
    elements: ['Section headers', 'Secondary CTAs', 'Important status']
    prominence: 'High'
    examples: ['Battle Results', 'Token Balance', 'Ready Status']
  }
  
  level3: {
    elements: ['Cards', 'Form fields', 'Navigation items']
    prominence: 'Medium'
    examples: ['Battle History', 'Profile Form', 'Menu Items']
  }
  
  level4: {
    elements: ['Body text', 'Captions', 'Helper text']
    prominence: 'Low'
    examples: ['Descriptions', 'Timestamps', 'Hints']
  }
}
```

## 📱 Responsive Design Strategy

### Breakpoint System
```typescript
interface BreakpointSystem {
  breakpoints: {
    xs: '0px',      // Mobile portrait
    sm: '640px',    // Mobile landscape
    md: '768px',    // Tablet portrait
    lg: '1024px',   // Tablet landscape / Small desktop
    xl: '1280px',   // Desktop
    '2xl': '1536px' // Large desktop
  }
  
  containerSizes: {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
  
  designPriorities: {
    mobile: 'Primary design target',
    tablet: 'Optimize for touch and drawing',
    desktop: 'Enhanced features and multi-panel layout'
  }
}
```

### Mobile-First Approach
```typescript
interface MobileStrategy {
  navigation: {
    pattern: 'Bottom tab bar for main sections'
    implementation: 'Sticky navigation with 4-5 primary tabs'
    gestures: 'Swipe between tabs, pull to refresh'
  }
  
  drawing: {
    canvas: 'Full-screen drawing mode'
    tools: 'Floating action buttons'
    gestures: 'Pinch to zoom, two-finger pan'
  }
  
  battles: {
    orientation: 'Portrait-optimized battle view'
    controls: 'Large touch targets'
    feedback: 'Haptic feedback for interactions'
  }
}
```

## 🎮 Page Layouts & Wireframes

### Landing Page
```typescript
interface LandingPageLayout {
  hero: {
    content: 'Value proposition + hero video'
    cta: 'Sign Up / Play Demo'
    layout: 'Full viewport height'
    background: 'Animated creature battle'
  }
  
  features: {
    sections: ['Draw Creatures', 'AI Analysis', 'Real-time Battles']
    layout: 'Three-column on desktop, stacked on mobile'
    visuals: 'Interactive demos for each feature'
  }
  
  social: {
    proof: 'User testimonials and battle highlights'
    stats: 'Players online, battles today, creatures created'
    cta: 'Join the Community'
  }
  
  footer: {
    links: 'About, Privacy, Terms, Support'
    social: 'Discord, Twitter, YouTube'
    newsletter: 'Game updates signup'
  }
}
```

### Dashboard Layout
```typescript
interface DashboardLayout {
  header: {
    elements: ['Logo', 'Token Balance', 'Profile Avatar', 'Settings']
    layout: 'Fixed header with glass morphism effect'
    notifications: 'Bell icon with badge count'
  }
  
  mainContent: {
    desktop: {
      sidebar: 'Navigation + quick stats'
      main: 'Primary content area'
      aside: 'Recent activity + social feed'
    }
    mobile: {
      layout: 'Full-width single column'
      navigation: 'Bottom tab bar'
      cards: 'Scrollable card-based layout'
    }
  }
  
  quickActions: {
    primary: 'Start Battle (prominent floating action button)'
    secondary: ['View Gallery', 'Practice Mode', 'Buy Tokens']
    placement: 'Always visible, contextual'
  }
}
```

### Battle Interface
```typescript
interface BattleInterface {
  preparation: {
    canvas: 'Large drawing area with tools sidebar'
    toolbar: 'Brush, eraser, colors, undo/redo'
    submit: 'Analyze Drawing button'
    timer: 'Countdown timer for drawing phase'
  }
  
  analysis: {
    loading: 'AI analysis progress indicator'
    results: 'Creature stats with explanations'
    model: '3D model preview with rotation'
    confirm: 'Enter Battle button'
  }
  
  combat: {
    arena: '3D battle environment'
    creatures: 'Player and opponent creatures'
    ui: 'Health bars, turn indicators, action buttons'
    effects: 'Damage numbers, special effects'
  }
  
  results: {
    outcome: 'Win/Loss with celebration/encouragement'
    stats: 'Battle statistics and XP gained'
    sharing: 'Share victory or creature'
    actions: 'Battle Again, View Gallery, Dashboard'
  }
}
```

## 🎨 Component Design Specifications

### Button Components
```typescript
interface ButtonDesign {
  primary: {
    background: 'gradient(primary-500, primary-600)',
    text: 'white',
    hover: 'gradient(primary-600, primary-700)',
    active: 'gradient(primary-700, primary-800)',
    focus: 'ring-2 ring-primary-200',
    disabled: 'neutral-300 background, neutral-400 text'
  }
  
  secondary: {
    background: 'white',
    text: 'primary-600',
    border: 'primary-300',
    hover: 'primary-50 background',
    active: 'primary-100 background',
    focus: 'ring-2 ring-primary-200'
  }
  
  sizes: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  animations: {
    hover: 'transform: translateY(-1px), shadow increase',
    active: 'transform: translateY(0), shadow decrease',
    loading: 'spinner animation, disabled state'
  }
}
```

### Card Components
```typescript
interface CardDesign {
  base: {
    background: 'white',
    border: 'neutral-200',
    borderRadius: 'lg (8px)',
    shadow: 'sm (0 1px 2px rgba(0,0,0,0.05))',
    padding: 'p-6'
  }
  
  hover: {
    shadow: 'md (0 4px 6px rgba(0,0,0,0.1))',
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease'
  }
  
  variants: {
    battle: {
      gradient: 'from-primary-50 to-secondary-50',
      border: 'primary-200',
      accent: 'primary-500 left border'
    },
    creature: {
      background: 'neutral-50',
      border: 'neutral-200',
      hover: 'neutral-100 background'
    },
    achievement: {
      gradient: 'from-accent-50 to-accent-100',
      border: 'accent-200',
      icon: 'accent-500'
    }
  }
}
```

### Form Components
```typescript
interface FormDesign {
  input: {
    base: {
      background: 'white',
      border: 'neutral-300',
      borderRadius: 'md (6px)',
      padding: 'px-3 py-2',
      focus: 'ring-2 ring-primary-200, border-primary-500'
    },
    
    states: {
      error: 'border-error-500, ring-error-200',
      success: 'border-success-500, ring-success-200',
      disabled: 'background-neutral-100, text-neutral-400'
    },
    
    sizes: {
      sm: 'px-2 py-1 text-sm',
      base: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg'
    }
  }
  
  label: {
    base: 'text-sm font-medium text-neutral-700',
    required: 'after:content-["*"] after:text-error-500'
  }
  
  helpText: {
    base: 'text-xs text-neutral-500',
    error: 'text-error-500',
    success: 'text-success-500'
  }
}
```

## 🎭 Animation & Interaction Design

### Micro-Interactions
```typescript
interface MicroInteractions {
  buttons: {
    hover: {
      duration: '150ms',
      easing: 'ease-out',
      properties: ['transform', 'box-shadow', 'background-color']
    },
    click: {
      duration: '100ms',
      easing: 'ease-in',
      effect: 'scale(0.95)'
    }
  }
  
  cards: {
    hover: {
      duration: '200ms',
      easing: 'ease-out',
      effect: 'translateY(-4px) + shadow increase'
    },
    appear: {
      duration: '300ms',
      easing: 'ease-out',
      effect: 'fadeIn + slideUp(20px)'
    }
  }
  
  forms: {
    focus: {
      duration: '200ms',
      easing: 'ease-out',
      effect: 'border color + ring appear'
    },
    validation: {
      duration: '250ms',
      easing: 'ease-out',
      effect: 'shake animation for errors'
    }
  }
}
```

### Page Transitions
```typescript
interface PageTransitions {
  standard: {
    enter: 'fadeIn + slideUp(20px)',
    exit: 'fadeOut + slideDown(20px)',
    duration: '300ms',
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
  
  battle: {
    enter: 'scaleIn + fadeIn',
    exit: 'scaleOut + fadeOut',
    duration: '500ms',
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
  
  modal: {
    backdrop: 'fadeIn',
    content: 'scaleIn + fadeIn',
    duration: '200ms',
    easing: 'ease-out'
  }
}
```

### Loading States
```typescript
interface LoadingStates {
  skeleton: {
    elements: ['text lines', 'image placeholders', 'button shapes'],
    animation: 'shimmer effect',
    colors: 'neutral-200 to neutral-300',
    duration: '1.5s infinite'
  }
  
  spinner: {
    size: 'w-6 h-6',
    color: 'primary-500',
    animation: 'spin 1s linear infinite'
  }
  
  progress: {
    bar: 'linear progress with smooth animation',
    percentage: 'numerical progress indicator',
    states: ['determinate', 'indeterminate']
  }
}
```

## 🎮 Drawing Interface Design

### Canvas Layout
```typescript
interface DrawingCanvas {
  desktop: {
    canvas: 'Large central canvas (600x600)',
    toolbar: 'Left sidebar with tools',
    properties: 'Right sidebar with brush settings',
    actions: 'Bottom bar with undo/redo/clear'
  }
  
  mobile: {
    canvas: 'Full-screen canvas',
    toolbar: 'Floating action buttons',
    properties: 'Bottom sheet for settings',
    actions: 'Gesture-based (two-finger for undo)'
  }
  
  tablet: {
    canvas: 'Large canvas optimized for stylus',
    toolbar: 'Adaptive sidebar',
    properties: 'Contextual panels',
    actions: 'Pressure-sensitive drawing'
  }
}
```

### Tool Design
```typescript
interface DrawingTools {
  brush: {
    icon: 'Brush icon with size indicator',
    sizes: 'Visual size selector (1-20px)',
    preview: 'Live brush preview',
    pressure: 'Pressure sensitivity on supported devices'
  }
  
  eraser: {
    icon: 'Eraser icon',
    sizes: 'Size selector (larger increments)',
    mode: 'Destination-out blending',
    feedback: 'Eraser cursor follows finger/mouse'
  }
  
  colors: {
    palette: 'Swatches in grid layout',
    picker: 'Advanced color picker for custom colors',
    recent: 'Recently used colors bar',
    favorites: 'Saved color favorites'
  }
}
```

## 📊 Data Visualization

### Statistics Dashboard
```typescript
interface StatsDashboard {
  charts: {
    winRate: 'Donut chart with percentage',
    battleHistory: 'Line chart showing recent performance',
    creatureTypes: 'Bar chart of creature distribution',
    dailyActivity: 'Heatmap calendar view'
  }
  
  cards: {
    totalBattles: 'Large number with trend indicator',
    winStreak: 'Current streak with best streak',
    favorite: 'Most used creature type',
    level: 'Progress bar to next level'
  }
  
  layout: {
    desktop: 'Grid layout with 4 columns',
    mobile: 'Single column stacked cards',
    tablet: 'Two-column adaptive grid'
  }
}
```

### Battle Results
```typescript
interface BattleResults {
  outcome: {
    winner: 'Large victory/defeat announcement',
    creatures: 'Side-by-side creature comparison',
    stats: 'Before/after stat comparison',
    timeline: 'Turn-by-turn battle replay'
  }
  
  rewards: {
    xp: 'Animated XP bar with gained amount',
    tokens: 'Token reward with celebration',
    achievements: 'Unlocked achievement popups',
    progress: 'Level/rank progress indicators'
  }
  
  actions: {
    primary: 'Battle Again button',
    secondary: 'View Gallery, Share, Dashboard',
    social: 'Share victory on social media'
  }
}
```

## 🌟 Accessibility Design

### WCAG 2.1 AA Compliance
```typescript
interface AccessibilityStandards {
  colorContrast: {
    normal: 'Minimum 4.5:1 ratio',
    large: 'Minimum 3:1 ratio for 18pt+ text',
    testing: 'Automated contrast checking in CI'
  }
  
  keyboard: {
    navigation: 'Full keyboard navigation support',
    focusVisible: 'Clear focus indicators',
    shortcuts: 'Logical tab order and shortcuts'
  }
  
  screenReader: {
    labels: 'Proper ARIA labels and descriptions',
    landmarks: 'Semantic HTML structure',
    announcements: 'Live regions for dynamic content'
  }
  
  motor: {
    targets: 'Minimum 44px touch targets',
    gestures: 'Alternative input methods',
    timeouts: 'Adjustable or no timeouts'
  }
}
```

### Inclusive Design Features
```typescript
interface InclusiveFeatures {
  vision: {
    highContrast: 'High contrast mode toggle',
    fontSize: 'Text size adjustment',
    colorBlind: 'Color blind friendly palette'
  }
  
  motor: {
    largeTargets: 'Larger button mode',
    gestureAlternatives: 'Button alternatives to gestures',
    oneHanded: 'One-handed mode for mobile'
  }
  
  cognitive: {
    simplifiedUI: 'Reduced complexity mode',
    tooltips: 'Helpful explanations',
    confirmations: 'Confirmation dialogs for destructive actions'
  }
}
```

## 🎯 Performance & Optimization

### UI Performance Targets
```typescript
interface PerformanceTargets {
  rendering: {
    fps: '60fps for all animations',
    paint: 'First Paint < 1.5s',
    contentful: 'First Contentful Paint < 1.5s',
    interactive: 'Time to Interactive < 3.5s'
  }
  
  interactions: {
    response: 'User input response < 100ms',
    animation: 'Smooth 60fps animations',
    scroll: 'Smooth scrolling with momentum'
  }
  
  assets: {
    images: 'WebP format with fallbacks',
    icons: 'SVG icons for crisp rendering',
    fonts: 'Optimized font loading'
  }
}
```

### Bundle Optimization
```typescript
interface BundleOptimization {
  splitting: {
    routes: 'Route-based code splitting',
    components: 'Lazy loading for heavy components',
    libraries: 'Dynamic imports for large libraries'
  }
  
  compression: {
    gzip: 'Gzip compression for text assets',
    brotli: 'Brotli compression where supported',
    minification: 'CSS and JS minification'
  }
  
  caching: {
    static: 'Long-term caching for static assets',
    dynamic: 'Efficient caching for dynamic content',
    serviceWorker: 'Service worker for offline capabilities'
  }
}
```

## 🎭 Dark Mode Support

### Color System for Dark Mode
```typescript
interface DarkModeColors {
  background: {
    primary: '#0F172A',     // Dark slate
    secondary: '#1E293B',   // Lighter slate
    tertiary: '#334155',    // Card backgrounds
    elevated: '#475569'     // Elevated elements
  }
  
  text: {
    primary: '#F8FAFC',     // High contrast text
    secondary: '#CBD5E1',   // Medium contrast text
    tertiary: '#94A3B8',    // Low contrast text
    disabled: '#64748B'     // Disabled text
  }
  
  accent: {
    primary: '#F97316',     // Orange accent (unchanged)
    secondary: '#0EA5E9',   // Blue accent (unchanged)
    success: '#22C55E',     // Green (unchanged)
    warning: '#F59E0B',     // Yellow (unchanged)
    error: '#EF4444'        // Red (unchanged)
  }
}
```

### Implementation Strategy
```typescript
interface DarkModeImplementation {
  detection: {
    system: 'Respect system preference',
    manual: 'Manual toggle in settings',
    persistence: 'Remember user choice'
  }
  
  transition: {
    smooth: 'Smooth color transitions',
    duration: '200ms ease-out',
    properties: 'background-color, border-color, color'
  }
  
  testing: {
    automated: 'Test both modes in CI',
    manual: 'Visual regression testing',
    accessibility: 'Contrast checking for dark mode'
  }
}
```

## 🎯 Success Metrics

### Design System Metrics
```typescript
interface DesignMetrics {
  consistency: {
    componentReuse: '80% of UI uses design system components',
    colorUsage: '95% of colors from defined palette',
    spacingConsistency: '90% using design system spacing'
  }
  
  accessibility: {
    contrastRatio: '100% meeting WCAG AA standards',
    keyboardNav: '100% keyboard accessible',
    screenReader: '100% screen reader compatible'
  }
  
  performance: {
    loadTime: '< 2s for first paint',
    interactionTime: '< 100ms response time',
    animationFPS: '60fps for all animations'
  }
  
  userSatisfaction: {
    usabilityScore: '4.5/5 average rating',
    taskCompletion: '95% task completion rate',
    errorRate: '< 2% user errors'
  }
}
```

---

*This design system provides a comprehensive foundation for creating a consistent, accessible, and delightful user experience across all platforms and devices.*

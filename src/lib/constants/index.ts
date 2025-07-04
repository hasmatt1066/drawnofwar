// Game constants for Drawn of War 2

// Drawing Canvas
export const CANVAS_CONFIG = {
  WIDTH: 400,
  HEIGHT: 400,
  MIN_DRAWING_COVERAGE: 0.05, // 5%
  MAX_DRAWING_COVERAGE: 0.95, // 95%
  MAX_FILE_SIZE: 1024 * 1024, // 1MB
  BRUSH_SIZES: [1, 2, 4, 8, 12, 16, 20],
  ERASER_SIZES: [4, 8, 16, 32],
  COLORS: ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'],
  UNDO_REDO_LIMIT: 20,
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 2
} as const;

// Battle System
export const BATTLE_CONFIG = {
  WAVE_COUNT: 5,
  WAVE_INTERVAL: 180, // 3 minutes in seconds
  LANE_COUNT: 3,
  MAX_BATTLE_DURATION: 900, // 15 minutes in seconds
  DEPLOYMENT_LANES: 2, // Deploy to 2 lanes simultaneously
  TERRITORY_UPDATE_INTERVAL: 500, // milliseconds
} as const;

// Battlefield Dimensions
export const BATTLEFIELD_CONFIG = {
  WIDTH: 20, // units
  LENGTH: 30, // units
  LANE_WIDTH: 6, // units
  PLAYER_BASE_ZONE: 2, // units from edge
  ENEMY_BASE_ZONE: 2, // units from edge
} as const;

// Element Type Advantages (what beats what)
export const ELEMENT_ADVANTAGES = {
  fire: 'earth',
  water: 'fire',
  earth: 'air',
  air: 'water',
  light: 'dark',
  dark: 'light'
} as const;

// Battle Tokens
export const TOKEN_CONFIG = {
  BATTLE_COST: 1,
  DAILY_FREE_TOKENS: 5,
  TOKEN_PACK_COST: 0.99,
  TOKEN_PACK_SIZE: 10,
  WIN_REWARD: 1,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    VERIFY: '/api/auth/verify'
  },
  DRAWING: {
    ANALYZE: '/api/drawing/analyze',
    SAVE: '/api/drawing/save',
    LIST: '/api/drawing/list'
  },
  BATTLE: {
    CREATE: '/api/battle/create',
    JOIN: '/api/battle/join',
    STATE: '/api/battle/state'
  },
  AI: {
    ANALYZE: '/api/ai/analyze',
    GENERATE_3D: '/api/ai/generate-3d'
  }
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  // Battle
  BATTLE_JOIN: 'battle:join',
  BATTLE_START: 'battle:start',
  BATTLE_END: 'battle:end',
  
  // Wave System
  WAVE_COUNTDOWN: 'wave:countdown',
  WAVE_DRAWING_START: 'wave:drawing:start',
  WAVE_DRAWING_COMPLETE: 'wave:drawing:complete',
  WAVE_DEPLOYMENT: 'wave:deployment',
  WAVE_SPAWN: 'wave:spawn',
  
  // Territory
  TERRITORY_UPDATE: 'territory:update',
  TERRITORY_LANE_CAPTURED: 'territory:lane:captured',
  
  // Combat
  CREATURE_MOVE: 'combat:creature:move',
  CREATURE_ATTACK: 'combat:creature:attack',
  CREATURE_DEATH: 'combat:creature:death'
} as const;
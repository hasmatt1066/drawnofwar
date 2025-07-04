// Core type definitions for Drawn of War 2

// User related types
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  displayName: string;
  avatar?: string;
  level: number;
  experience: number;
  battleTokens: number;
  wins: number;
  losses: number;
  winStreak: number;
}

// Drawing related types
export interface DrawingData {
  id: string;
  userId: string;
  imageData: string; // Base64 PNG
  width: number;
  height: number;
  createdAt: Date;
}

// Creature related types
export interface CreatureStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
  element: ElementType;
  specialAbility?: SpecialAbility;
}

export interface Creature {
  id: string;
  userId: string;
  name: string;
  drawing: DrawingData;
  stats: CreatureStats;
  model3D?: string; // URL to 3D model
  createdAt: Date;
}

// Battle related types
export enum ElementType {
  FIRE = 'fire',
  WATER = 'water',
  EARTH = 'earth',
  AIR = 'air',
  LIGHT = 'light',
  DARK = 'dark'
}

export enum SpecialAbility {
  HEAL = 'heal',
  SHIELD = 'shield',
  BURST = 'burst',
  POISON = 'poison',
  STUN = 'stun'
}

// Territorial Battle types
export interface TerritorialBattleConfig {
  waveCount: number;
  waveInterval: number; // seconds
  laneCount: number;
  battlefieldLength: number;
  allowCrossLaneMovement: boolean;
  allowRangedSupport: boolean;
  earlyDeploymentEnabled: boolean;
}

export interface LaneState {
  laneIndex: number;
  player1Control: number; // 0-100%
  player2Control: number; // 0-100%
  contested: boolean;
  closed: boolean; // true when 100% captured
  creatures: CreatureInLane[];
}

export interface CreatureInLane {
  id: string;
  playerId: string;
  position: number; // 0-100 along lane
  health: number;
  stats: CreatureStats;
  isAdvancing: boolean;
  isRanged: boolean;
}

export interface TerritoryState {
  lanes: LaneState[];
  aggregateControl: {
    player1: number; // 0-100%
    player2: number; // 0-100%
  };
  timestamp: number;
}

export interface Battle {
  id: string;
  type: 'territorial';
  players: string[]; // user IDs
  config: TerritorialBattleConfig;
  state: TerritoryState;
  currentWave: number;
  waveStartTime: number;
  status: 'waiting' | 'drawing' | 'battling' | 'finished';
  winner?: string;
  createdAt: Date;
  endedAt?: Date;
}
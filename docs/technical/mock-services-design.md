# Mock Services Design for UI-First Development

## Overview
This document outlines the mock service layer design for Drawn of War 2's UI-first development approach. Mock services simulate backend functionality with realistic data and timing.

## Design Principles

1. **Interface First**: Define service interfaces that match planned API contracts
2. **Realistic Delays**: Simulate network latency (300-2000ms)
3. **Error Scenarios**: Include random failures to test error handling
4. **Type Safety**: Use TypeScript interfaces from `/src/types`
5. **Easy Swapping**: Simple to replace with real implementations

## Mock Service Architecture

```typescript
// Base mock service pattern
abstract class MockService {
  protected async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  protected randomDelay(min: number = 300, max: number = 1500): Promise<void> {
    return this.delay(Math.random() * (max - min) + min);
  }
  
  protected shouldFail(rate: number = 0.1): boolean {
    return Math.random() < rate;
  }
}
```

## Core Mock Services

### 1. Mock Authentication Service
```typescript
interface AuthService {
  login(email: string, password: string): Promise<{ user: User; token: string }>;
  register(email: string, password: string, username: string): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
```

**Mock Behaviors:**
- Stores auth state in localStorage
- Returns consistent user data
- Simulates token expiration
- 10% failure rate on login

### 2. Mock User Service
```typescript
interface UserService {
  getProfile(userId: string): Promise<UserProfile>;
  updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile>;
  getStats(userId: string): Promise<UserStats>;
  getCreatures(userId: string): Promise<Creature[]>;
}
```

**Mock Behaviors:**
- Generates random stats
- Creates 5-10 mock creatures per user
- Persists changes in sessionStorage

### 3. Mock Drawing Service
```typescript
interface DrawingService {
  analyzeDrawing(imageData: string): Promise<CreatureStats>;
  saveDrawing(drawing: DrawingData): Promise<Creature>;
  generate3DModel(creatureId: string): Promise<string>; // Returns URL
}
```

**Mock Behaviors:**
- 2-3 second delay for "AI analysis"
- Generates stats based on image complexity
- Returns placeholder 3D model URLs
- Shows progress updates

### 4. Mock Battle Service
```typescript
interface BattleService {
  findMatch(userId: string): Promise<Battle>;
  joinBattle(battleId: string): Promise<void>;
  submitCreature(battleId: string, creature: Creature): Promise<void>;
  getBattleState(battleId: string): Promise<TerritoryState>;
}
```

**Mock Behaviors:**
- Instant matchmaking with AI opponent
- Simulates territorial progression
- Updates territory control every 2 seconds
- Generates battle events

## Mock Data Generators

### User Generator
```typescript
function generateMockUser(overrides?: Partial<User>): User {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    ...overrides
  };
}
```

### Creature Stats Generator
```typescript
function generateCreatureStats(): CreatureStats {
  const elements = ['fire', 'water', 'earth', 'air', 'light', 'dark'];
  return {
    health: faker.datatype.number({ min: 50, max: 150 }),
    attack: faker.datatype.number({ min: 20, max: 80 }),
    defense: faker.datatype.number({ min: 10, max: 60 }),
    speed: faker.datatype.number({ min: 1, max: 10 }),
    element: faker.helpers.arrayElement(elements),
    specialAbility: faker.helpers.maybe(() => 
      faker.helpers.arrayElement(['heal', 'shield', 'burst', 'poison', 'stun'])
    )
  };
}
```

## Implementation Strategy

### Phase 1: Basic Mocks
- Simple localStorage-based auth
- Static mock data
- No persistence between sessions

### Phase 2: Enhanced Mocks
- IndexedDB for persistence
- More realistic battle simulations
- Mock WebSocket connections

### Phase 3: Transition Ready
- Same interfaces as real services
- Feature flags to toggle between mock/real
- Comprehensive error scenarios

## Usage Example

```typescript
// In components
import { useMockServices } from '@/hooks/useMockServices';

function DrawingCanvas() {
  const { drawingService } = useMockServices();
  
  const handleSubmit = async (imageData: string) => {
    try {
      setLoading(true);
      const stats = await drawingService.analyzeDrawing(imageData);
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };
}
```

## Transition to Real Services

When ready to integrate real backends:

1. Implement real service classes with same interfaces
2. Update service provider to return real implementations
3. No changes needed in UI components
4. Gradual migration possible (some mock, some real)

## Benefits

- **Faster Development**: No waiting for backend
- **Better UX Testing**: Realistic delays and errors
- **Clear Contracts**: Interfaces define expectations
- **Easy Onboarding**: New developers can run full app
- **Parallel Work**: Backend team has clear specs
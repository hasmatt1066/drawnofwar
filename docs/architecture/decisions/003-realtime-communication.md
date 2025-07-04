# ADR-003: Real-time Communication Architecture

## Status
**Accepted** - 2024-01-15

## Context

Drawn of War 2 requires real-time communication for:
- Live drawing synchronization between players
- Battle state updates and animations
- Matchmaking and lobby management
- Chat and social features
- Spectator mode functionality

### Requirements
- **Latency**: < 100ms for battle actions
- **Reliability**: 99.9% message delivery
- **Scalability**: 10,000+ concurrent connections
- **Cross-platform**: Web, mobile, desktop support
- **Fallback**: Graceful degradation when real-time fails

## Options Considered

### 1. WebSockets (Native)
- **Pros**: Low latency, full duplex, browser native
- **Cons**: Complex scaling, connection management, no fallback
- **Complexity**: High

### 2. Socket.io
- **Pros**: Excellent fallback, rooms/namespaces, event-driven
- **Cons**: Larger payload, framework dependency
- **Complexity**: Medium

### 3. Server-Sent Events (SSE)
- **Pros**: Simple, HTTP-based, good for updates
- **Cons**: Unidirectional, no binary support
- **Complexity**: Low

### 4. Firebase Realtime Database
- **Pros**: Managed service, excellent mobile support
- **Cons**: Limited control, potential cost issues
- **Complexity**: Low

### 5. Pusher/Ably (Third-party)
- **Pros**: Managed infrastructure, excellent features
- **Cons**: Vendor lock-in, cost scaling
- **Complexity**: Low

## Decision

We choose **Socket.io** for the following reasons:

### Technical Advantages
```typescript
interface SocketIOArchitecture {
  clientLibrary: 'socket.io-client'
  serverLibrary: 'socket.io'
  transport: 'websocket with xhr-polling fallback'
  
  features: {
    rooms: 'Battle rooms and lobbies'
    namespaces: 'Separate game areas'
    events: 'Type-safe event system'
    authentication: 'JWT token integration'
    compression: 'Built-in message compression'
  }
  
  scaling: {
    adapter: 'Redis adapter for multi-server'
    clustering: 'Multiple server instances'
    loadBalancing: 'Session affinity'
  }
}
```

### Battle-Specific Implementation
```typescript
interface BattleEvents {
  // Battle Management
  'battle:join': { battleId: string, userId: string }
  'battle:leave': { battleId: string, userId: string }
  'battle:start': { players: Player[], config: BattleConfig }
  'battle:end': { winner: string, stats: BattleStats }
  
  // Drawing Phase
  'drawing:start': { timeLimit: number }
  'drawing:stroke': { userId: string, stroke: StrokeData }
  'drawing:undo': { userId: string }
  'drawing:complete': { userId: string, drawing: DrawingData }
  
  // Combat Phase
  'combat:start': { creatures: Creature[] }
  'combat:turn': { playerId: string, timeLimit: number }
  'combat:action': { action: BattleAction }
  'combat:result': { damage: number, effects: Effect[] }
  
  // System Events
  'error': { message: string, code: number }
  'reconnect': { battleState: BattleState }
  'disconnect': { reason: string }
}
```

### Scaling Strategy
```typescript
interface ScalingArchitecture {
  redisAdapter: {
    purpose: 'Share state across multiple servers'
    configuration: 'Redis Cluster for high availability'
    keyStrategy: 'battle:{battleId}:* for battle data'
  }
  
  roomManagement: {
    structure: 'battle:{battleId} rooms'
    maxSize: 8 // players per battle
    persistence: 'Battle state in Redis'
  }
  
  loadBalancing: {
    strategy: 'Consistent hashing by battle ID'
    stickySession: 'Route users to same server'
    failover: 'Automatic failover to healthy servers'
  }
}
```

## Implementation Details

### Server Architecture
```typescript
// Socket.io Server Setup
class GameSocketServer {
  private io: Server;
  private redisAdapter: RedisAdapter;
  private battleManager: BattleManager;
  
  constructor() {
    this.io = new Server(server, {
      cors: { origin: process.env.FRONTEND_URL },
      transports: ['websocket', 'polling']
    });
    
    // Redis adapter for scaling
    this.redisAdapter = createAdapter(
      createClient({ url: process.env.REDIS_URL }),
      createClient({ url: process.env.REDIS_URL })
    );
    this.io.adapter(this.redisAdapter);
    
    this.setupAuthentication();
    this.setupEventHandlers();
  }
  
  private setupAuthentication() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const user = await this.verifyJWT(token);
        socket.userId = user.id;
        socket.user = user;
        next();
      } catch (error) {
        next(new Error('Authentication failed'));
      }
    });
  }
  
  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User ${socket.userId} connected`);
      
      socket.on('battle:join', async (data) => {
        await this.battleManager.joinBattle(socket, data);
      });
      
      socket.on('drawing:stroke', (data) => {
        socket.to(`battle:${data.battleId}`).emit('drawing:stroke', {
          userId: socket.userId,
          stroke: data.stroke
        });
      });
      
      socket.on('combat:action', async (data) => {
        await this.battleManager.handleCombatAction(socket, data);
      });
      
      socket.on('disconnect', (reason) => {
        console.log(`User ${socket.userId} disconnected: ${reason}`);
        this.battleManager.handleDisconnection(socket);
      });
    });
  }
}
```

### Client Integration
```typescript
// React Hook for Socket.io
export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });
    
    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Connected to game server');
    });
    
    newSocket.on('disconnect', (reason) => {
      setConnected(false);
      console.log('Disconnected from server:', reason);
    });
    
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error('Connection error occurred');
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, []);
  
  return { socket, connected };
};
```

### Battle State Management
```typescript
interface BattleStateManager {
  battleState: {
    phase: 'waiting' | 'drawing' | 'analysis' | 'combat' | 'results'
    players: Player[]
    timeRemaining: number
    currentTurn: string
    creatures: Creature[]
    combatLog: CombatAction[]
  }
  
  stateSync: {
    frequency: 'Real-time via Socket.io events'
    persistence: 'Redis for state recovery'
    validation: 'Server-side state validation'
    rollback: 'Automatic rollback on desync'
  }
  
  conflictResolution: {
    authority: 'Server is authoritative'
    clientPrediction: 'Local updates with server confirmation'
    lagCompensation: 'Timestamp-based action validation'
  }
}
```

## Consequences

### Positive
- **Excellent Developer Experience**: Event-driven architecture
- **Automatic Fallbacks**: Graceful degradation to polling
- **Rich Features**: Rooms, namespaces, acknowledgments
- **Scalability**: Redis adapter enables horizontal scaling
- **Cross-platform**: Works on all target platforms

### Negative
- **Payload Overhead**: Larger message sizes than raw WebSockets
- **Complexity**: More complex than simple HTTP polling
- **Dependencies**: Additional libraries and Redis infrastructure
- **Debugging**: More complex to debug than REST APIs

### Mitigation Strategies
- **Monitoring**: Comprehensive real-time monitoring
- **Fallback Testing**: Regular testing of fallback mechanisms
- **Load Testing**: Stress testing with simulated battles
- **Documentation**: Clear documentation of event flows

## Performance Optimizations

### Message Optimization
```typescript
interface MessageOptimization {
  compression: {
    enabled: true
    threshold: 1024 // bytes
    algorithm: 'gzip'
  }
  
  batching: {
    drawingStrokes: 'Batch multiple strokes'
    stateUpdates: 'Batch non-critical updates'
    frequency: 16 // 60 FPS for smooth drawing
  }
  
  prioritization: {
    critical: ['combat:action', 'battle:end']
    normal: ['drawing:stroke', 'combat:turn']
    background: ['spectator:update', 'chat:message']
  }
}
```

### Connection Management
```typescript
interface ConnectionManagement {
  heartbeat: {
    interval: 25000 // 25 seconds
    timeout: 5000 // 5 seconds
    maxRetries: 3
  }
  
  reconnection: {
    attempts: 5
    delay: 1000 // 1 second
    delayMax: 5000 // 5 seconds
    randomizationFactor: 0.5
  }
  
  cleanup: {
    idleTimeout: 300000 // 5 minutes
    battlesCleanup: 'Remove completed battles'
    connectionCleanup: 'Remove stale connections'
  }
}
```

## Success Metrics

- **Latency**: < 100ms average message delivery
- **Reliability**: 99.9% message delivery rate
- **Scalability**: Support 10,000+ concurrent connections
- **Uptime**: 99.9% service availability
- **Reconnection**: < 5 seconds average reconnection time

## Future Considerations

### Potential Upgrades
1. **WebRTC**: For peer-to-peer communication
2. **Custom Protocol**: Optimized binary protocol
3. **Edge Computing**: Regional servers for lower latency
4. **Mobile Optimization**: Platform-specific optimizations

### Monitoring and Metrics
- **Real-time Dashboards**: Connection and performance metrics
- **Error Tracking**: Comprehensive error logging
- **Performance Profiling**: Regular performance analysis
- **User Experience Metrics**: Latency and reliability tracking

## References
- [Socket.io Documentation](https://socket.io/docs/)
- [Redis Adapter Documentation](https://socket.io/docs/v4/redis-adapter/)
- [WebSocket Performance Best Practices](https://www.ably.io/blog/websocket-performance)

# ADR-002: AI Service Integration Strategy

## Status
**Accepted** - 2024-01-15

## Context

Drawn of War 2's core innovation is AI-powered drawing analysis that converts player artwork into creature stats. This requires:
- Advanced computer vision for drawing analysis
- Reliable, fast processing (< 30 seconds)
- Accurate creature attribute extraction
- Scalable architecture for thousands of concurrent analyses
- Fallback systems for service failures
- Cost-effective pricing model

### Critical Requirements
- **Accuracy**: 85%+ user satisfaction with creature stats
- **Speed**: < 15 seconds average processing time
- **Reliability**: 99%+ uptime with graceful degradation
- **Cost**: < $0.10 per analysis at scale
- **Scalability**: 1000+ concurrent requests

## Options Considered

### 1. OpenAI GPT-4 Vision
- **Pros**: Excellent accuracy, detailed analysis, established API
- **Cons**: High cost ($0.01265 per image), rate limits, potential policy changes
- **Cost**: ~$12.65 per 1000 analyses

### 2. Google Cloud Vision AI
- **Pros**: Fast, cost-effective, reliable infrastructure
- **Cons**: Limited creative analysis, basic object detection
- **Cost**: ~$1.50 per 1000 analyses

### 3. AWS Rekognition
- **Pros**: Good performance, AWS ecosystem integration
- **Cons**: Limited artistic analysis, basic feature detection
- **Cost**: ~$1.00 per 1000 analyses

### 4. Claude Vision (Anthropic)
- **Pros**: Excellent reasoning, creative analysis, detailed responses
- **Cons**: Newer service, pricing uncertainty
- **Cost**: ~$3.00 per 1000 analyses (estimated)

### 5. Custom ML Model
- **Pros**: Full control, optimized for game needs, no API costs
- **Cons**: Requires ML expertise, training data, infrastructure
- **Cost**: ~$10,000 initial + infrastructure

## Decision

We choose **Claude Vision API as primary** with **structured fallback system**:

### Primary Service: Claude Vision API
```typescript
interface ClaudeVisionConfig {
  service: 'Claude Vision API'
  model: 'claude-3-sonnet-20240229'
  endpoint: 'https://api.anthropic.com/v1/messages'
  timeout: 30000 // 30 seconds
  retries: 2
  
  analysisPrompt: {
    system: `You are an expert fantasy creature analyst. Analyze drawings 
    and generate balanced game stats based on visual complexity, 
    recognizability, and power indicators.`
    
    format: 'JSON with strict schema validation'
    output: {
      name: 'creature name'
      elementalType: 'Fire|Water|Earth|Air|Light|Dark'
      stats: { health: number, attack: number, defense: number, speed: number }
      abilities: string[]
      confidence: number
    }
  }
}
```

### Fallback System Architecture
```typescript
interface FallbackSystem {
  level1: {
    service: 'Claude Vision API'
    successRate: 95
    fallbackTrigger: 'API error or timeout'
  }
  
  level2: {
    service: 'Rule-based analysis'
    method: 'Computer vision + heuristics'
    triggers: ['pixel density', 'shape detection', 'color analysis']
    reliability: 99
  }
  
  level3: {
    service: 'Randomized generation'
    method: 'Weighted random within balanced ranges'
    guarantee: 'Always produces valid output'
    userNotification: 'Creative interpretation used'
  }
}
```

### Rationale

**Why Claude Vision?**
1. **Superior Creative Analysis**: Best at interpreting artistic intent
2. **Detailed Reasoning**: Provides explanations for stat assignments
3. **Balanced Pricing**: Reasonable cost for quality received
4. **Reliability**: Anthropic's infrastructure is production-ready
5. **Flexibility**: Can adjust prompts for better game balance

**Why Fallback System?**
1. **Guaranteed Success**: Always produces playable creatures
2. **User Experience**: No failed battles due to analysis errors
3. **Cost Control**: Prevents runaway API costs
4. **Performance**: Fallback systems are faster than API calls

## Implementation Details

### API Integration
```typescript
class CreatureAnalyzer {
  async analyzeDrawing(drawingData: DrawingData): Promise<CreatureStats> {
    try {
      // Level 1: Claude Vision API
      const result = await this.claudeVisionAnalysis(drawingData);
      if (result.confidence > 0.7) {
        return this.validateStats(result);
      }
    } catch (error) {
      console.warn('Claude Vision failed:', error);
    }
    
    try {
      // Level 2: Rule-based analysis
      const result = await this.ruleBasedAnalysis(drawingData);
      return this.validateStats(result);
    } catch (error) {
      console.warn('Rule-based analysis failed:', error);
    }
    
    // Level 3: Guaranteed fallback
    return this.generateRandomStats(drawingData);
  }
  
  private async claudeVisionAnalysis(drawing: DrawingData): Promise<CreatureStats> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: this.getAnalysisPrompt()
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: drawing.base64Data
              }
            }
          ]
        }]
      })
    });
    
    const data = await response.json();
    return JSON.parse(data.content[0].text);
  }
}
```

### Cost Management
```typescript
interface CostManagement {
  budgetLimits: {
    daily: 500 // $500 per day
    monthly: 10000 // $10,000 per month
    perUser: 1 // $1 per user per month
  }
  
  optimization: {
    caching: 'Cache results for 1 hour by drawing hash'
    rateLimit: 'Max 10 requests per user per hour'
    fallbackThreshold: 'Use fallback if API cost > $0.05'
  }
  
  monitoring: {
    costTracking: 'Real-time cost monitoring'
    alerts: 'Alert when approaching budget limits'
    reporting: 'Daily cost reports'
  }
}
```

## Consequences

### Positive
- **High Quality**: Claude Vision provides superior creative analysis
- **Reliability**: Multi-level fallback ensures 100% success rate
- **Cost Control**: Fallback system prevents runaway costs
- **User Experience**: Consistent, engaging creature generation
- **Scalability**: Can handle thousands of concurrent requests

### Negative
- **Complexity**: Multi-level system increases implementation complexity
- **API Dependency**: Reliance on external service for core feature
- **Cost Uncertainty**: AI service pricing may change
- **Latency**: API calls add processing time

### Mitigation Strategies
- **Monitoring**: Comprehensive monitoring of all AI services
- **Caching**: Aggressive caching to reduce API calls
- **Load Testing**: Regular testing of fallback systems
- **Budget Controls**: Automatic spending limits and alerts

## Success Metrics

- **Accuracy**: 85%+ user satisfaction with creature stats
- **Speed**: < 15 seconds average processing time
- **Reliability**: 99.9% successful creature generation
- **Cost**: < $0.05 per analysis average
- **Fallback Usage**: < 5% of analyses use fallback systems

## Future Considerations

### Potential Upgrades
1. **Custom Model**: Train specialized model for game-specific analysis
2. **Hybrid Approach**: Combine multiple AI services for best results
3. **Edge Computing**: Local processing for faster response times
4. **Community Training**: Use user feedback to improve analysis

### Monitoring and Optimization
- **A/B Testing**: Compare different AI services and prompts
- **User Feedback**: Collect feedback on creature stat accuracy
- **Performance Metrics**: Track processing time and success rates
- **Cost Optimization**: Regular review of pricing and usage patterns

## References
- [Claude Vision API Documentation](https://docs.anthropic.com/claude/docs/vision)
- [Game Balance Principles](https://www.gamedeveloper.com/design/game-balance-concepts)
- [AI Service Comparison Study](https://arxiv.org/abs/2023.12345)

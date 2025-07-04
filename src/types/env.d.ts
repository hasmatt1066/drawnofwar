declare namespace NodeJS {
  interface ProcessEnv {
    // Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    
    // Firebase Admin (Server-side only)
    FIREBASE_ADMIN_PROJECT_ID: string;
    FIREBASE_ADMIN_CLIENT_EMAIL: string;
    FIREBASE_ADMIN_PRIVATE_KEY: string;
    
    // AI Services
    CLAUDE_API_KEY: string;
    MESHY_API_KEY: string;
    
    // Stripe
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    
    // Redis
    REDIS_URL: string;
    
    // App
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    
    // Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
# Services Directory

This directory contains service modules that handle business logic and external integrations:

## `/ai`
AI integration services for Claude Vision API and Meshy.ai 3D generation

## `/auth`
Authentication services using Firebase Auth

## `/battle`
Battle system logic, real-time battle management, and Socket.io integration

## `/storage`
File storage services using Firebase Storage

## `/payment`
Payment processing services using Stripe

## Service Guidelines
- Services should be framework-agnostic when possible
- Handle error cases gracefully
- Include proper TypeScript types
- Use environment variables for API keys
- Implement retry logic for external API calls
- Include logging for debugging
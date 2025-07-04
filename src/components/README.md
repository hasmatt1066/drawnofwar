# Components Directory Structure

This directory contains all React components organized by their purpose:

## `/ui`
Reusable UI components like buttons, inputs, cards, modals, etc.

## `/game`
Game-specific components like battle arena, creature display, territory visualization

## `/auth`
Authentication-related components like login forms, registration forms

## `/common`
Common components used across the app like headers, footers, navigation

## `/layout`
Layout components for different page structures

## `/canvas`
Drawing canvas and related tool components

## `/3d`
3D model viewing and interaction components

## Component Guidelines
- Each component should have its own directory with the component file and any related files
- Use TypeScript for all components
- Include prop interfaces for type safety
- Keep components focused and single-purpose
- Use the `cn()` utility for className merging
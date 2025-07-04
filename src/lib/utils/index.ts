import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

/**
 * Format a number to a human-readable string with suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Calculate damage multiplier based on element types
 */
export function getElementMultiplier(attacker: string, defender: string): number {
  const advantages: Record<string, string> = {
    fire: 'earth',
    water: 'fire',
    earth: 'air',
    air: 'water',
    light: 'dark',
    dark: 'light',
  };
  
  if (advantages[attacker] === defender) {
    return 1.5; // 50% more damage
  } else if (advantages[defender] === attacker) {
    return 0.75; // 25% less damage
  }
  return 1.0; // Neutral
}

/**
 * Convert base64 to blob
 */
export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

/**
 * Calculate drawing coverage percentage
 */
export function calculateDrawingCoverage(imageData: ImageData): number {
  let pixelCount = 0;
  const data = imageData.data;
  
  // Check every 4th value (alpha channel)
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      pixelCount++;
    }
  }
  
  const totalPixels = imageData.width * imageData.height;
  return (pixelCount / totalPixels) * 100;
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
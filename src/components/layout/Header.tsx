'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Play', href: '/play' },
  { name: 'My Creatures', href: '/creatures' },
  { name: 'Battles', href: '/battles' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Mock user data - will be replaced with real auth
  const mockUser = {
    username: 'DragonMaster',
    level: 12,
    battleTokens: 25,
    avatar: '/api/placeholder/40/40',
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Drawn of War 2
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'text-white border-b-2 border-blue-500'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Battle Tokens */}
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
              </svg>
              <span className="text-white font-medium">{mockUser.battleTokens}</span>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{mockUser.username}</div>
                <div className="text-xs text-gray-400">Level {mockUser.level}</div>
              </div>
              <Link
                href="/profile"
                className="relative rounded-full bg-gray-800 p-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">View profile</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile User Info */}
          <div className="border-t border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-white">{mockUser.username}</div>
                <div className="text-sm text-gray-400">Level {mockUser.level}</div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
                </svg>
                <span className="text-white font-medium">{mockUser.battleTokens}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
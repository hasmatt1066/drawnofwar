# Development Setup Guide

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hasmatt1066/drawnofwar.git
cd drawnofwar
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, and Tailwind CSS.

## Running the Development Server

### Standard Method (All Platforms)

```bash
npm run dev
```

The development server will start on `http://localhost:3000`

### Windows-Specific Notes

The project has been configured to work properly on Windows machines. The `package.json` scripts use direct node paths to ensure compatibility with Windows PowerShell and Command Prompt.

If you encounter issues on Windows:

1. **Use PowerShell or Command Prompt** (not Git Bash)
2. **Alternative start methods**:
   - Use the provided `start.bat` file: `.\start.bat`
   - Use the PowerShell script: `.\start.ps1`
   - Direct node command: `node node_modules\next\dist\bin\next dev`

### macOS/Linux Notes

The standard `npm run dev` command works without any additional configuration.

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check

# Run all validation checks
npm run validate
```

## Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your environment variables (when needed for backend integration)

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
# Windows
set PORT=3001 && npm run dev

# macOS/Linux
PORT=3001 npm run dev
```

### Module Not Found Errors

If you see module not found errors:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Restart the development server

### Windows Path Issues

If you encounter "'next' is not recognized" errors on Windows:

1. Ensure you're using PowerShell or Command Prompt (not Git Bash)
2. Use `npm run dev` which is configured for Windows compatibility
3. As a last resort, use: `node node_modules\next\dist\bin\next dev`

## VS Code Setup (Recommended)

1. Install recommended extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

2. The project includes VS Code settings for consistent formatting

## Browser Setup

For the best development experience:

1. Use Chrome, Firefox, or Edge (latest versions)
2. Install React Developer Tools extension
3. Enable "Disable cache" in DevTools when Network tab is open

## Next Steps

Once your development server is running:

1. Visit `http://localhost:3000`
2. Explore the navigation and existing pages
3. Check the `docs` folder for architecture and implementation guides
4. Start building features following our UI-first approach
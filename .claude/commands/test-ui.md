Test the running application like a real user using Puppeteer automation.

Usage: /test-ui [optional: specific feature to test]

Follow these steps:
1. **Start Development Server** (if not running):
   - Ensure the Next.js dev server is running on localhost:3000
   - Check that all services are accessible
   - Verify no console errors on startup

2. **Automated UI Testing**:
   - Navigate to the application
   - Take full-page screenshots of key pages
   - Test user interactions (clicks, form inputs, navigation)
   - Monitor browser console for errors
   - Test responsive design at different screen sizes

3. **User Journey Testing**:
   - Complete user registration flow
   - Test authentication (login/logout)
   - Navigate through main user flows
   - Test drawing canvas functionality
   - Test battle system interactions

4. **Visual Validation**:
   - Take screenshots of each major UI state
   - Compare with design specifications
   - Check for layout issues or visual bugs
   - Verify responsive behavior
   - Test dark theme rendering

5. **Performance Monitoring**:
   - Monitor page load times
   - Check for console errors or warnings
   - Verify smooth animations and interactions
   - Test on mobile viewport sizes

6. **Issue Documentation**:
   - Document any UI issues found
   - Take screenshots of problems
   - Note console errors or warnings
   - Create actionable fix recommendations

Examples:
- /test-ui authentication flow
- /test-ui drawing canvas
- /test-ui responsive design
- /test-ui complete user journey

The system will automatically take screenshots and provide detailed feedback on UI quality and user experience.

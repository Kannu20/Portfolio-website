# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern, responsive web-based résumé template built with vanilla HTML, CSS, and JavaScript. It features a clean professional design with dark/light theme toggle, print optimization, smooth animations, and keyboard shortcuts.

## Architecture & Structure

### Core Components
- **index.html**: Main HTML structure with semantic sections (header, experience, skills, education, projects)
- **styles.css**: CSS with CSS custom properties for theming, responsive design, and print optimization
- **script.js**: Interactive functionality implemented as a ResumeTemplate class with modular methods
- **README.md**: Comprehensive documentation and customization guide

### Key Architectural Patterns
- **CSS Custom Properties**: Extensive use of CSS variables for consistent theming and easy customization
- **Component-Based CSS**: Modular styling with clear section-based organization
- **Progressive Enhancement**: JavaScript features enhance the base experience but aren't required for functionality
- **Intersection Observer**: Used for scroll-based animations and performance optimization
- **Theme System**: Automatic dark/light mode detection with manual override capability

## Common Development Commands

### Local Development
```bash
# Open the resume in default browser (Windows)
start index.html

# Or use a simple HTTP server for development
python -m http.server 8000
# Then visit http://localhost:8000
```

### Testing & Validation
```bash
# Validate HTML (if html-validator is installed)
html-validator --file index.html

# Test print layout - use browser's print preview (Ctrl+P)
```

## Key Technical Details

### Theme System Implementation
The template uses a CSS custom properties-based theming system:
- Light theme: Default CSS variables in `:root`
- Dark theme: Override variables in `[data-theme="dark"]` selector  
- JavaScript manages theme persistence via localStorage
- Automatic system preference detection with `prefers-color-scheme`

### Print Optimization
Special print styles ensure professional PDF output:
- `@media print` rules override colors and layout
- Print mode class management in JavaScript
- Page break optimization for sections
- Hidden interactive elements during print

### Responsive Design Strategy
Mobile-first approach with breakpoints:
- Desktop: 1000px+ (full layout)
- Tablet: 768px-999px (adjusted layout)
- Mobile: 480px-767px (stacked layout)  
- Small mobile: <480px (compact layout)

### JavaScript Architecture
The `ResumeTemplate` class encapsulates all functionality:
- Event-driven architecture with proper cleanup
- Intersection Observer for scroll animations
- Keyboard shortcuts (Ctrl+P for print, Ctrl+Shift+D for theme)
- Public API for extensibility (`addCustomSection`)
- Analytics integration ready (placeholder methods)

## Customization Workflow

### Content Updates
1. Personal information: Edit header section in `index.html`
2. Professional experience: Update `.experience-item` blocks
3. Skills: Modify `.skill-category` and `.skill-tags` sections
4. Education: Update `.education-item` blocks
5. Projects: Modify `.project-item` sections

### Visual Customization
1. Colors: Update CSS custom properties in `:root` selector
2. Typography: Change Google Fonts import and font-family declarations
3. Layout: Adjust container width, section spacing, and responsive breakpoints
4. Animations: Modify transition properties and intersection observer settings

### Functionality Extensions
- Add new sections using the `addCustomSection()` method
- Implement custom analytics by replacing placeholder `trackEvent()` method
- Extend keyboard shortcuts in `handleKeyboardShortcuts()` method

## Browser Compatibility

- Chrome: Full support (recommended for print/PDF)
- Firefox: Full support
- Safari: Full support  
- Edge: Full support
- IE: Not supported (uses modern CSS features)

## Development Best Practices for This Template

### When Making Changes
- Always test print layout after modifications (Ctrl+P)
- Verify responsive behavior across all breakpoints
- Check both light and dark themes
- Validate that animations don't interfere with accessibility
- Test keyboard shortcuts functionality

### Code Style Conventions
- Use CSS custom properties for any color or spacing values
- Maintain semantic HTML structure for accessibility
- Keep JavaScript methods focused and modular
- Follow existing naming conventions (kebab-case for CSS, camelCase for JavaScript)
- Add proper ARIA labels for interactive elements

### Performance Considerations
- Images should be optimized if custom photos are added
- CSS and JS are intentionally kept in separate files for clarity
- Intersection Observer is used instead of scroll event listeners for better performance
- Theme transitions are optimized to prevent layout thrashing

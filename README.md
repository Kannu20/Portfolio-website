# Professional Résumé Template

A modern, responsive, and interactive web-based résumé template built with HTML, CSS, and JavaScript. This template features a clean design, dark/light theme toggle, print optimization, and smooth animations.

![Resume Template Preview](https://via.placeholder.com/800x600/4F46E5/ffffff?text=Resume+Template+Preview)

## ✨ Features

- **📱 Responsive Design**: Looks great on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, professional design with beautiful typography
- **🌓 Dark/Light Theme**: Toggle between themes with automatic system preference detection
- **🖨️ Print Optimized**: Perfect formatting for PDF generation and physical printing
- **✨ Smooth Animations**: Subtle scroll animations and hover effects
- **⌨️ Keyboard Shortcuts**: Quick actions with keyboard combinations
- **♿ Accessibility**: Screen reader friendly with proper ARIA labels
- **🚀 Performance**: Optimized for fast loading and smooth interactions

## 🚀 Quick Start

1. **Download or Clone**: Get the template files
2. **Customize Content**: Replace placeholder content with your information
3. **Open in Browser**: View your résumé by opening `index.html`
4. **Print/Export**: Use the print button or Ctrl+P to generate PDF

## 📁 File Structure

```
resume-template/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and themes
├── script.js           # Interactive functionality
└── README.md           # Documentation (this file)
```

## 🛠️ Customization Guide

### 1. Personal Information

Edit the header section in `index.html`:

```html
<!-- Update these sections with your information -->
<h1 class="name">Your Full Name</h1>
<h2 class="title">Professional Title</h2>
<p class="summary">Your professional summary...</p>

<!-- Contact information -->
<span>your.email@example.com</span>
<span>+1 (555) 123-4567</span>
<a href="https://yourwebsite.com">yourwebsite.com</a>
```

### 2. Professional Experience

Replace the sample work experience:

```html
<div class="experience-item">
    <div class="job-header">
        <div class="job-info">
            <h3 class="job-title">Your Job Title</h3>
            <h4 class="company">Company Name</h4>
        </div>
        <div class="job-dates">Start Date - End Date</div>
    </div>
    <ul class="achievements">
        <li>Your key achievement or responsibility</li>
        <li>Another important accomplishment</li>
    </ul>
</div>
```

### 3. Skills Section

Update your technical skills:

```html
<div class="skill-category">
    <h3 class="skill-category-title">Category Name</h3>
    <div class="skill-tags">
        <span class="skill-tag">Skill 1</span>
        <span class="skill-tag">Skill 2</span>
    </div>
</div>
```

### 4. Education

Modify the education section:

```html
<div class="education-item">
    <div class="education-header">
        <div class="education-info">
            <h3 class="degree">Your Degree</h3>
            <h4 class="school">University Name</h4>
        </div>
        <div class="education-dates">Year Range</div>
    </div>
    <p class="education-details">Relevant details...</p>
</div>
```

### 5. Projects

Add your projects:

```html
<div class="project-item">
    <h3 class="project-title">Project Name</h3>
    <p class="project-description">Project description...</p>
    <div class="project-tech">
        <span class="skill-tag">Technology 1</span>
        <span class="skill-tag">Technology 2</span>
    </div>
</div>
```

## 🎨 Theme Customization

### Color Scheme

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4F46E5;      /* Main brand color */
    --secondary-color: #6366F1;    /* Secondary accent */
    --accent-color: #EC4899;       /* Highlight color */
    --text-primary: #1F2937;       /* Main text */
    --text-secondary: #6B7280;     /* Secondary text */
}
```

### Typography

Change fonts by updating the Google Fonts import and CSS:

```css
/* In HTML head */
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">

/* In CSS */
body {
    font-family: 'YourFont', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Layout Modifications

- **Container width**: Adjust `.container { max-width: 1000px; }`
- **Section spacing**: Modify `.main-content { gap: 2.5rem; }`
- **Border radius**: Change border-radius values throughout

## 🖨️ Print/PDF Export

### Browser Print (Recommended)
1. Click the "📄 Print Resume" button
2. Or use keyboard shortcut: `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Choose "Save as PDF" in the print dialog
4. Adjust margins if needed (usually "None" or "Minimum" works best)

### Print Optimization Features
- Automatic color adjustment for print
- Optimized page breaks
- Hidden interactive elements
- Clean, professional formatting

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + P**: Print résumé
- **Ctrl/Cmd + Shift + D**: Toggle theme
- Standard browser shortcuts work normally

## 📱 Responsive Breakpoints

- **Desktop**: 1000px+ (full layout)
- **Tablet**: 768px - 999px (adjusted layout)
- **Mobile**: 480px - 767px (stacked layout)
- **Small Mobile**: < 480px (compact layout)

## 🔧 Advanced Customization

### Adding New Sections

Use JavaScript to add custom sections:

```javascript
window.resumeTemplate.addCustomSection(`
    <section class="section">
        <h2 class="section-title">Custom Section</h2>
        <p>Your custom content here...</p>
    </section>
`, 'end');
```

### Custom CSS Classes

Add your own CSS classes for unique styling:

```css
.custom-highlight {
    background: linear-gradient(135deg, #your-colors);
    /* Your custom styles */
}
```

### Analytics Integration

Replace the placeholder analytics code in `script.js`:

```javascript
trackEvent(eventName, eventData = {}) {
    // Replace with your analytics service
    gtag('event', eventName, eventData);
}
```

## 🌐 Browser Support

- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support
- **Internet Explorer**: Not supported (uses modern CSS features)

## 📝 Best Practices

### Content Tips
- Keep descriptions concise and impactful
- Use action verbs for achievements
- Quantify accomplishments with numbers/percentages
- Tailor content for your target role

### Technical Tips
- Test print layout before finalizing
- Check responsiveness on different devices
- Validate HTML and CSS for best compatibility
- Optimize images if you add custom photos

### SEO Considerations
- Update the `<title>` tag with your name
- Add appropriate meta descriptions
- Use semantic HTML structure
- Include relevant keywords naturally

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this template.

### Development Setup
1. Clone the repository
2. Open `index.html` in your browser
3. Make changes and test across different browsers
4. Ensure print layout still works correctly

## 📄 License

This template is provided as-is for personal and commercial use. Feel free to modify and distribute.

## 🆘 Troubleshooting

### Common Issues

**Print layout looks different**
- Check browser zoom level (should be 100%)
- Try different browsers (Chrome usually works best)
- Adjust print margins to "None" or "Minimum"

**Animations not working**
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

**Theme toggle not working**
- Check if localStorage is available
- Verify JavaScript is running
- Look for console errors

**Mobile layout issues**
- Test on actual devices, not just browser dev tools
- Check CSS media queries
- Validate responsive breakpoints

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the customization guide
3. Inspect browser developer tools for errors
4. Create an issue with detailed description

---

**Happy job hunting! 🚀**

*Last updated: 2024*

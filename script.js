// Resume Template Interactive Features
class ResumeTemplate {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateLastModified();
        this.loadThemePreference();
        this.setupScrollAnimations();
        this.setupTypingAnimation();
    }

    // Event Listeners
    setupEventListeners() {
        // Print functionality
        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', this.handlePrint.bind(this));
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.handleThemeToggle.bind(this));
        }

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));

        // Print media query listener
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('print');
            mediaQuery.addEventListener('change', this.handlePrintMediaChange.bind(this));
        }
    }

    // Print Functionality
    handlePrint() {
        // Save current scroll position
        const scrollPosition = window.pageYOffset;
        
        // Optimize for printing
        this.preparePrintMode();
        
        // Trigger print
        window.print();
        
        // Restore after print
        setTimeout(() => {
            this.restoreFromPrintMode();
            window.scrollTo(0, scrollPosition);
        }, 100);
    }

    preparePrintMode() {
        document.body.classList.add('print-mode');
        
        // Hide interactive elements
        const interactiveElements = document.querySelectorAll('.footer .actions');
        interactiveElements.forEach(el => el.style.display = 'none');
        
        // Ensure all sections are expanded
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.breakInside = 'avoid';
            section.style.pageBreakInside = 'avoid';
        });
    }

    restoreFromPrintMode() {
        document.body.classList.remove('print-mode');
        
        // Restore interactive elements
        const interactiveElements = document.querySelectorAll('.footer .actions');
        interactiveElements.forEach(el => el.style.display = '');
        
        // Restore normal layout
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.breakInside = '';
            section.style.pageBreakInside = '';
        });
    }

    handlePrintMediaChange(mq) {
        if (mq.matches) {
            this.preparePrintMode();
        } else {
            this.restoreFromPrintMode();
        }
    }

    // Theme Toggle
    handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        this.saveThemePreference(newTheme);
        this.updateThemeToggleButton(newTheme);
        
        // Add a subtle animation effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('resume-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let theme = savedTheme;
        if (!savedTheme) {
            theme = prefersDark ? 'dark' : 'light';
        }
        
        this.setTheme(theme);
        this.updateThemeToggleButton(theme);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('resume-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.setTheme(newTheme);
                this.updateThemeToggleButton(newTheme);
            }
        });
    }

    saveThemePreference(theme) {
        localStorage.setItem('resume-theme', theme);
    }

    updateThemeToggleButton(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.innerHTML = '☀️ Light Mode';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeToggle.innerHTML = '🌙 Dark Mode';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    // Smooth Scrolling
    handleSmoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Keyboard Shortcuts
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + P for print
        if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
            event.preventDefault();
            this.handlePrint();
        }
        
        // Ctrl/Cmd + Shift + D for theme toggle
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
            event.preventDefault();
            this.handleThemeToggle();
        }
    }

    // Update Last Modified Date
    updateLastModified() {
        const lastUpdatedElement = document.getElementById('last-updated');
        if (lastUpdatedElement) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            lastUpdatedElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        // Create intersection observer for fade-in animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe sections for scroll animations
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });
        }
    }

    // Typing Animation for Name (optional enhancement)
    setupTypingAnimation() {
        const nameElement = document.querySelector('.name');
        if (nameElement && nameElement.textContent.includes('Your Full Name')) {
            // Only run animation on placeholder content
            this.typewriterEffect(nameElement, nameElement.textContent, 100);
        }
    }

    typewriterEffect(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance optimization for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public API for external customization
    addCustomSection(sectionHTML, position = 'end') {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const sectionElement = document.createElement('div');
            sectionElement.innerHTML = sectionHTML;
            
            if (position === 'start') {
                mainContent.insertBefore(sectionElement.firstElementChild, mainContent.firstChild);
            } else {
                mainContent.appendChild(sectionElement.firstElementChild);
            }
        }
    }

    // Analytics tracking (placeholder for future implementation)
    trackEvent(eventName, eventData = {}) {
        // Placeholder for analytics integration
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Log to console for development
        console.log('Event tracked:', eventName, eventData);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.resumeTemplate = new ResumeTemplate();
    
    // Track page load
    if (window.resumeTemplate) {
        window.resumeTemplate.trackEvent('page_view', {
            timestamp: new Date().toISOString()
        });
    }
});

// Handle window load for complete initialization
window.addEventListener('load', () => {
    // Additional optimizations after all resources are loaded
    document.body.classList.add('loaded');
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeTemplate;
}

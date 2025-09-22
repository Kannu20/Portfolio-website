// Modern Portfolio Interactive Features
class PortfolioWebsite {
    constructor() {
        this.init();
        this.activeFilter = 'all';
        this.observer = null;
    }

    init() {
        this.setupEventListeners();
        this.loadThemePreference();
        this.setupScrollAnimations();
        this.setupTypingAnimation();
        this.setupProjectFiltering();
        this.setupSkillBars();
        this.setupSmoothScrolling();
        this.setupNavigation();
        this.setupContactForm();
        this.setupParallax();
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.handleThemeToggle.bind(this));
        }

        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));

        // Scroll events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Resize events
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navigation
    setupNavigation() {
        // Update active nav link on scroll
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length === 0) return;
        
        this.updateActiveNavLink(sections, navLinks);
    }
    
    updateActiveNavLink(sections, navLinks) {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Project Filtering
    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterProjects(filter, filterButtons, projectCards);
            });
        });
    }
    
    filterProjects(filter, filterButtons, projectCards) {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Filter projects
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        this.activeFilter = filter;
    }
    
    // Skills Bar Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Create intersection observer for skill bars
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbar = document.querySelector('.nav');
                    const offset = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const navToggle = document.getElementById('nav-toggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit(form);
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (this.validateForm(form)) {
            this.showFormSuccess();
            form.reset();
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
        }
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        this.showFieldError(field, errorMessage);
        return isValid;
    }
    
    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }
        
        if (message) {
            field.style.borderColor = 'var(--danger-color)';
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.color = 'var(--danger-color)';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            formGroup.appendChild(errorElement);
        } else {
            field.style.borderColor = 'var(--success-color)';
        }
    }
    
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
            field.style.borderColor = 'var(--border-color)';
        }
    }
    
    showFormSuccess() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = 'Thank you! Your message has been sent successfully.';
        successDiv.style.cssText = `
            background: var(--success-color);
            color: white;
            padding: 1rem;
            border-radius: var(--radius-md);
            margin-bottom: 1rem;
            text-align: center;
            animation: slideInUp 0.5s ease-out;
        `;
        
        const form = document.getElementById('contact-form');
        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Scroll Handling
    handleScroll() {
        const navbar = document.querySelector('.nav');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Update active navigation
        if (sections.length > 0 && navLinks.length > 0) {
            this.updateActiveNavLink(sections, navLinks);
        }
    }
    
    handleResize() {
        // Close mobile menu on resize
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }
    
    // Parallax Effect
    setupParallax() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }
    
    // Theme Toggle
    handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        this.saveThemePreference(newTheme);
        this.updateThemeToggleIcon(newTheme);
        
        // Add transition effect
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
        this.updateThemeToggleIcon(newTheme);
            }
        });
    }

    saveThemePreference(theme) {
        localStorage.setItem('resume-theme', theme);
    }

    updateThemeToggleIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                    themeToggle.setAttribute('aria-label', 'Switch to light mode');
                } else {
                    icon.className = 'fas fa-moon';
                    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                }
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

    // Enhanced Scroll Animations
    setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.activateAllAnimations();
            return;
        }

        // Main scroll animation observer
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements
                    const delay = index * 100;
                    
                    setTimeout(() => {
                        this.animateElement(entry.target);
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        const animateElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-left, .scroll-animate-right, ' +
            '.scroll-animate-scale, .scroll-animate-fade, .scroll-animate-stagger'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        // Special observer for flowing elements
        this.setupFlowingAnimations();
    }
    
    animateElement(element) {
        if (element.classList.contains('scroll-animate-stagger')) {
            // Handle staggered animations for child elements
            this.handleStaggeredAnimation(element);
        } else if (element.classList.contains('flowing-element')) {
            // Trigger flowing animation
            element.style.animationDelay = '0s';
            element.classList.add('animate');
        } else {
            // Standard animation
            element.classList.add('animate');
        }
        
        // Add gentle float effect to certain elements
        if (element.classList.contains('stat-item') || 
            element.classList.contains('skill-category')) {
            setTimeout(() => {
                element.classList.add('gentle-float');
            }, 800);
        }
    }
    
    handleStaggeredAnimation(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate');
            }, index * 150);
        });
    }
    
    setupFlowingAnimations() {
        // Create a more sensitive observer for flowing effects
        const flowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add flowing class with delay based on scroll position
                    const scrollProgress = this.getScrollProgress(element);
                    const delay = Math.max(0, (1 - scrollProgress) * 300);
                    
                    setTimeout(() => {
                        element.classList.add('flowing-element');
                    }, delay);
                    
                    flowObserver.unobserve(element);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
        
        // Apply to specific elements that should flow
        const flowElements = document.querySelectorAll(
            '.project-card, .timeline-content, .contact-item'
        );
        
        flowElements.forEach(element => {
            flowObserver.observe(element);
        });
    }
    
    getScrollProgress(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        
        // Calculate how much of the element is visible (0 to 1)
        return Math.max(0, Math.min(1, (windowHeight - elementTop) / windowHeight));
    }
    
    activateAllAnimations() {
        // Fallback for browsers without IntersectionObserver
        const allAnimateElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-left, .scroll-animate-right, ' +
            '.scroll-animate-scale, .scroll-animate-fade, .scroll-animate-stagger'
        );
        
        allAnimateElements.forEach(element => {
            element.classList.add('animate');
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typedElements = document.querySelectorAll('.typed-text');
        
        typedElements.forEach(element => {
            const text = element.textContent;
            if (text.includes('Full Stack Developer')) {
                const phrases = [
                    'Full Stack Developer',
                    'Frontend Specialist', 
                    'Backend Engineer',
                    'UI/UX Designer',
                    'Problem Solver'
                ];
                this.typewriterLoop(element, phrases);
            }
        });
    }
    
    typewriterLoop(element, phrases) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before next phrase
            }
            
            setTimeout(type, typeSpeed);
        };
        
        type();
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
    window.portfolio = new PortfolioWebsite();
    
    // Track page load
    if (window.portfolio) {
        window.portfolio.trackEvent('portfolio_loaded', {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
    }
});

// Handle window load for complete initialization
window.addEventListener('load', () => {
    // Additional optimizations after all resources are loaded
    document.body.classList.add('loaded');
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
});

// Handle visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.portfolio) {
        // Resume animations or refresh data when page becomes visible
        window.portfolio.trackEvent('page_visible');
    }
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioWebsite;
}

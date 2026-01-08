// Main JavaScript for Premium Personal Website

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
            }, 500);
        }
    }, 200);
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Cursor Effects
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorOutline.style.left = `${e.clientX}px`;
                cursorOutline.style.top = `${e.clientY}px`;
            }, 100);
        });
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .course-card, .play-button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.width = '16px';
                cursorDot.style.height = '16px';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
            });
        });
    } else {
        // Hide cursor effects on touch devices
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
    
    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
    
    // Navbar Menu Toggle (Mobile)
    const navMenuBtn = document.getElementById('navMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    navMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate menu lines
        const menuLines = document.querySelectorAll('.menu-line');
        if (navLinks.classList.contains('active')) {
            menuLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            menuLines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const menuLines = document.querySelectorAll('.menu-line');
            menuLines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        });
    });
    
    // Scroll Animation for Sections
    const sections = document.querySelectorAll('.section');
    
    const checkSectionVisibility = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    };
    
    // Initial check
    checkSectionVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkSectionVisibility);
    
    // Skills Progress Animation
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateSkillProgress = () => {
        skillCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.9) {
                const progressFill = card.querySelector('.progress-fill');
                const progressBar = card.querySelector('.progress-bar');
                const progressValue = progressBar.getAttribute('data-progress');
                
                progressFill.style.width = `${progressValue}%`;
                card.style.opacity = '1';
            }
        });
    };
    
    // Initial check for skills
    animateSkillProgress();
    
    // Check on scroll for skills
    window.addEventListener('scroll', animateSkillProgress);
    
    // Course Card Flip
    const courseCard = document.getElementById('courseCard');
    
    courseCard.addEventListener('click', () => {
        courseCard.classList.toggle('flipped');
    });
    
    // Button Hover Effects Enhancement
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.getElementById('hero');
        
        if (hero) {
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });
    
    // Add subtle noise/grain effect
    const addNoiseEffect = () => {
        const noiseOverlay = document.createElement('div');
        noiseOverlay.style.position = 'fixed';
        noiseOverlay.style.top = '0';
        noiseOverlay.style.left = '0';
        noiseOverlay.style.width = '100%';
        noiseOverlay.style.height = '100%';
        noiseOverlay.style.pointerEvents = 'none';
        noiseOverlay.style.zIndex = '9999';
        noiseOverlay.style.opacity = '0.02';
        noiseOverlay.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';
        noiseOverlay.style.mixBlendMode = 'overlay';
        
        document.body.appendChild(noiseOverlay);
    };
    
    // Uncomment to enable noise effect (subtle premium texture)
    // addNoiseEffect();
    
    // Initialize all animations
    setTimeout(() => {
        checkSectionVisibility();
        animateSkillProgress();
    }, 2500);
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeElements = document.querySelectorAll('.business-card, .partner-card, .profile-card, .about-card, .info-card');
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.getAttribute('data-count'));
                let currentNumber = 0;
                const duration = 2000;
                const steps = 60;
                const increment = finalNumber / steps;
                const stepTime = duration / steps;
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = finalNumber.toLocaleString();
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentNumber).toLocaleString();
                    }
                }, stepTime);
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                heroBg.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.2}px)`;
            }
        });
    }
    
    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav a[href*=' + sectionId + ']');
            
            if (navLink && !navLink.classList.contains('nav-contact')) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = '#FF6F0F';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
});

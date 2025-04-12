// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loader = document.querySelector('.loading');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize all animations and interactive elements
    initScrollAnimation();
    initProgressCircles();
    initHamburgerMenu();
    initScrollToTop();
    initSmoothScrolling();
    initContactForm();
    initHeaderScroll();
});

// Progress Circle Animation
function initProgressCircles() {
    const progressContainers = document.querySelectorAll('.progress-circle-container');
    
    // Set initial progress for all circles
    progressContainers.forEach(container => setInitialProgress(container));
    
    // Set up animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressCircle(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each progress circle container
    progressContainers.forEach(container => {
        observer.observe(container);
    });
    
    // Also animate on hover for interactivity
    progressContainers.forEach(container => {
        container.addEventListener('mouseenter', () => animateProgressCircle(container));
    });
}

function setInitialProgress(container) {
    const progressBar = container.querySelector('.progress-bar');
    const progressText = container.querySelector('.progress-text');
    const targetValue = parseInt(container.getAttribute('data-value'), 10);

    // Calculate the circumference of the circle
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    // Set the stroke-dasharray to the circumference
    progressBar.style.strokeDasharray = circumference;

    // Set initial progress to 0%
    progressBar.style.strokeDashoffset = circumference;
    progressText.textContent = '0%';
}

function animateProgressCircle(container) {
    const progressBar = container.querySelector('.progress-bar');
    const progressText = container.querySelector('.progress-text');
    const targetValue = parseInt(container.getAttribute('data-value'), 10);

    // Calculate the circumference of the circle
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    // Animate from 0% to the target value
    let currentPercentage = 0;
    const intervalTime = 1500 / targetValue;
    
    const interval = setInterval(() => {
        if (currentPercentage >= targetValue) {
            clearInterval(interval);
            currentPercentage = targetValue;
        } else {
            currentPercentage++;
            const offset = circumference - (currentPercentage / 100) * circumference;
            progressBar.style.strokeDashoffset = offset;
            progressText.textContent = `${currentPercentage}%`;
        }
    }, intervalTime);
}

// Hamburger Menu
function initHamburgerMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when nav link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuIcon.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fadeIn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial styles and observe each element
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle contact form submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            // Simple validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll just show a success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                alert('Message sent successfully! I will get back to you soon.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
}

// Email contact handler
document.querySelector('.hire-me .btn').addEventListener('click', function() {
    window.location.href = "#contact";
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '10px 0';
        }
    });
}

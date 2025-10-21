// Weather App Website JavaScript

// Weather data for different locations
const weatherData = {
    'san-francisco': {
        icon: 'fas fa-sun',
        temperature: '24°C',
        description: 'Sunny',
        visibility: '10 km',
        wind: '12 km/h',
        humidity: '65%',
        feelsLike: '26°C'
    },
    'new-york': {
        icon: 'fas fa-cloud-rain',
        temperature: '18°C',
        description: 'Rainy',
        visibility: '8 km',
        wind: '15 km/h',
        humidity: '80%',
        feelsLike: '16°C'
    },
    'london': {
        icon: 'fas fa-cloud',
        temperature: '15°C',
        description: 'Cloudy',
        visibility: '12 km',
        wind: '8 km/h',
        humidity: '70%',
        feelsLike: '14°C'
    },
    'tokyo': {
        icon: 'fas fa-snowflake',
        temperature: '5°C',
        description: 'Snowy',
        visibility: '6 km',
        wind: '20 km/h',
        humidity: '85%',
        feelsLike: '2°C'
    }
};

// Theme data
const themes = {
    light: {
        primary: '#1e3a8a',
        secondary: '#06b6d4',
        accent: '#f97316',
        background: '#ffffff',
        text: '#1f2937'
    },
    dark: {
        primary: '#1f2937',
        secondary: '#3b82f6',
        accent: '#10b981',
        background: '#111827',
        text: '#f3f4f6'
    }
};

let currentTheme = 'light';

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const locationSelect = document.getElementById('locationSelect');
const themeToggle = document.getElementById('themeToggle');
const controlButtons = document.querySelectorAll('.control-btn');

// Weather display elements
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weatherDesc');
const visibility = document.getElementById('visibility');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeWeatherDemo();
    initializeScrollAnimations();
    initializeThemeToggle();
    updateWeatherDisplay('san-francisco');
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Weather demo functionality
function initializeWeatherDemo() {
    // Location select change
    locationSelect.addEventListener('change', function() {
        updateWeatherDisplay(this.value);
    });

    // Control buttons
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            updateWeatherDisplay(location);
            locationSelect.value = location;
            
            // Add active state
            controlButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Update weather display
function updateWeatherDisplay(location) {
    const data = weatherData[location];
    if (!data) return;

    // Animate weather icon change
    if (weatherIcon) {
        weatherIcon.style.transform = 'scale(0.8)';
        weatherIcon.style.opacity = '0.5';
        
        setTimeout(() => {
            weatherIcon.className = data.icon;
            weatherIcon.style.transform = 'scale(1)';
            weatherIcon.style.opacity = '1';
        }, 200);
    }

    // Update all weather data with animation
    animateValue(temperature, data.temperature);
    animateValue(weatherDesc, data.description);
    animateValue(visibility, data.visibility);
    animateValue(wind, data.wind);
    animateValue(humidity, data.humidity);
    animateValue(feelsLike, data.feelsLike);

    // Update background based on weather
    updateWeatherBackground(data.description);
}

// Animate value changes
function animateValue(element, newValue) {
    if (!element) return;
    
    element.style.opacity = '0.5';
    element.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 150);
}

// Update background based on weather
function updateWeatherBackground(description) {
    const phoneScreen = document.querySelector('.phone-screen-demo');
    if (!phoneScreen) return;

    const backgrounds = {
        'Sunny': 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
        'Rainy': 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
        'Cloudy': 'linear-gradient(135deg, #718096 0%, #4a5568 100%)',
        'Snowy': 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)'
    };

    const background = backgrounds[description] || 'linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%)';
    phoneScreen.style.background = background;
}

// Theme toggle functionality
function initializeThemeToggle() {
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        updateTheme(currentTheme);
        
        // Update icon
        const icon = this.querySelector('i');
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Update theme
function updateTheme(theme) {
    const root = document.documentElement;
    const themeColors = themes[theme];
    
    // Update CSS custom properties
    root.style.setProperty('--primary-blue', themeColors.primary);
    root.style.setProperty('--electric-cyan', themeColors.secondary);
    root.style.setProperty('--sunset-orange', themeColors.accent);
    root.style.setProperty('--pure-white', themeColors.background);
    root.style.setProperty('--charcoal', themeColors.text);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .theme-card, .tech-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const weatherAnimation = document.querySelector('.weather-animation');
    
    if (hero && weatherAnimation) {
        const rate = scrolled * -0.5;
        weatherAnimation.style.transform = `translateY(${rate}px)`;
    }
});

// Add rain effect for rainy weather
function addRainEffect() {
    const phoneScreen = document.querySelector('.phone-screen-demo');
    if (!phoneScreen) return;

    // Remove existing rain
    const existingRain = phoneScreen.querySelectorAll('.rain-effect');
    existingRain.forEach(drop => drop.remove());

    // Add rain drops
    for (let i = 0; i < 20; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain-effect';
        rainDrop.style.cssText = `
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.6));
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: rainFall 1s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        phoneScreen.appendChild(rainDrop);
    }
}

// Add snow effect for snowy weather
function addSnowEffect() {
    const phoneScreen = document.querySelector('.phone-screen-demo');
    if (!phoneScreen) return;

    // Remove existing snow
    const existingSnow = phoneScreen.querySelectorAll('.snow-effect');
    existingSnow.forEach(flake => flake.remove());

    // Add snow flakes
    for (let i = 0; i < 15; i++) {
        const snowFlake = document.createElement('div');
        snowFlake.className = 'snow-effect';
        snowFlake.innerHTML = '❄';
        snowFlake.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: snowFall 3s linear infinite;
            animation-delay: ${Math.random() * 3}s;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
        `;
        phoneScreen.appendChild(snowFlake);
    }
}

// Enhanced weather display with effects
function updateWeatherDisplay(location) {
    const data = weatherData[location];
    if (!data) return;

    // Clear existing effects
    const phoneScreen = document.querySelector('.phone-screen-demo');
    if (phoneScreen) {
        const existingEffects = phoneScreen.querySelectorAll('.rain-effect, .snow-effect');
        existingEffects.forEach(effect => effect.remove());
    }

    // Animate weather icon change
    if (weatherIcon) {
        weatherIcon.style.transform = 'scale(0.8)';
        weatherIcon.style.opacity = '0.5';
        
        setTimeout(() => {
            weatherIcon.className = data.icon;
            weatherIcon.style.transform = 'scale(1)';
            weatherIcon.style.opacity = '1';
        }, 200);
    }

    // Update all weather data with animation
    animateValue(temperature, data.temperature);
    animateValue(weatherDesc, data.description);
    animateValue(visibility, data.visibility);
    animateValue(wind, data.wind);
    animateValue(humidity, data.humidity);
    animateValue(feelsLike, data.feelsLike);

    // Update background and add effects
    updateWeatherBackground(data.description);
    
    // Add weather-specific effects
    if (data.description === 'Rainy') {
        addRainEffect();
    } else if (data.description === 'Snowy') {
        addSnowEffect();
    }
}

// Add CSS for rain and snow animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rainFall {
        0% { transform: translateY(-100vh); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes snowFall {
        0% { 
            transform: translateY(-100vh) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    .control-btn.active {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.6);
    }
`;
document.head.appendChild(style);

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Prevent default for demo buttons
        if (this.textContent.includes('Download')) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Demo version - Download coming soon!';
                successMsg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #10b981;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }, 2000);
        }
    });
});

// Add slide-in animation CSS
const slideInStyle = document.createElement('style');
slideInStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(slideInStyle);
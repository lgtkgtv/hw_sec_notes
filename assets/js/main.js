/**
 * DataCenter Hardware Security - Main JavaScript
 * Interactive learning platform utilities and navigation
 */

// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    storageKey: 'dchs_progress',
    modules: [
        { id: 0, name: 'Cryptography Fundamentals', key: 'crypto' },
        { id: 1, name: 'Hardware Root of Trust', key: 'hardware-rot' },
        { id: 2, name: 'GPU & Accelerator Security', key: 'gpu-security' },
        { id: 3, name: 'Cloud & Infrastructure Security', key: 'cloud-security' }
    ],
    games: [
        { id: 'detective', name: 'Security Detective', path: 'games/detective-mystery.html' },
        { id: 'defense', name: 'DataCenter Defense', path: 'games/security-war-game.html' },
        { id: 'racing', name: 'Crypto Grand Prix', path: 'games/crypto-racing.html' }
    ]
};

// ===== PROGRESS MANAGEMENT =====
class ProgressManager {
    constructor() {
        this.progress = this.loadProgress();
        this.initializeProgress();
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            return saved ? JSON.parse(saved) : this.getDefaultProgress();
        } catch (error) {
            console.warn('Failed to load progress from localStorage:', error);
            return this.getDefaultProgress();
        }
    }

    getDefaultProgress() {
        return {
            modules: CONFIG.modules.reduce((acc, module) => {
                acc[module.key] = {
                    completed: false,
                    progress: 0,
                    lastAccessed: null,
                    demos: {},
                    assessments: {}
                };
                return acc;
            }, {}),
            games: CONFIG.games.reduce((acc, game) => {
                acc[game.id] = {
                    completed: false,
                    score: 0,
                    lastPlayed: null
                };
                return acc;
            }, {}),
            achievements: [],
            totalProgress: 0,
            startedDate: new Date().toISOString()
        };
    }

    saveProgress() {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(this.progress));
        } catch (error) {
            console.warn('Failed to save progress to localStorage:', error);
        }
    }

    updateModuleProgress(moduleKey, progressData) {
        if (!this.progress.modules[moduleKey]) {
            this.progress.modules[moduleKey] = {
                completed: false,
                progress: 0,
                lastAccessed: null,
                demos: {},
                assessments: {}
            };
        }

        Object.assign(this.progress.modules[moduleKey], progressData);
        this.progress.modules[moduleKey].lastAccessed = new Date().toISOString();

        this.calculateTotalProgress();
        this.checkAchievements();
        this.saveProgress();
        this.updateUI();
    }

    updateGameProgress(gameId, score, completed = false) {
        if (!this.progress.games[gameId]) {
            this.progress.games[gameId] = {
                completed: false,
                score: 0,
                lastPlayed: null
            };
        }

        this.progress.games[gameId].score = Math.max(this.progress.games[gameId].score, score);
        this.progress.games[gameId].completed = completed;
        this.progress.games[gameId].lastPlayed = new Date().toISOString();

        this.checkAchievements();
        this.saveProgress();
        this.updateUI();
    }

    calculateTotalProgress() {
        const moduleCount = Object.keys(this.progress.modules).length;
        const totalModuleProgress = Object.values(this.progress.modules)
            .reduce((sum, module) => sum + module.progress, 0);

        this.progress.totalProgress = Math.round(totalModuleProgress / moduleCount);
    }

    checkAchievements() {
        const achievements = [];

        // First Steps - Complete any module
        const anyModuleCompleted = Object.values(this.progress.modules)
            .some(module => module.completed);
        if (anyModuleCompleted && !this.progress.achievements.includes('first-steps')) {
            achievements.push('first-steps');
        }

        // Crypto Master - Complete crypto module
        if (this.progress.modules.crypto && this.progress.modules.crypto.completed &&
            !this.progress.achievements.includes('crypto-master')) {
            achievements.push('crypto-master');
        }

        // Security Detective - Complete detective game
        if (this.progress.games.detective && this.progress.games.detective.completed &&
            !this.progress.achievements.includes('detective')) {
            achievements.push('detective');
        }

        // Security Architect - Complete all modules
        const allModulesCompleted = Object.values(this.progress.modules)
            .every(module => module.completed);
        if (allModulesCompleted && !this.progress.achievements.includes('architect')) {
            achievements.push('architect');
        }

        // Add new achievements
        achievements.forEach(achievement => {
            if (!this.progress.achievements.includes(achievement)) {
                this.progress.achievements.push(achievement);
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const achievements = {
            'first-steps': { icon: '🎓', name: 'First Steps', description: 'Completed your first module!' },
            'crypto-master': { icon: '🔐', name: 'Crypto Master', description: 'Mastered cryptography fundamentals!' },
            'detective': { icon: '🕵️', name: 'Security Detective', description: 'Solved all security mysteries!' },
            'architect': { icon: '🏗️', name: 'Security Architect', description: 'Completed all learning modules!' }
        };

        const achievementData = achievements[achievement];
        if (!achievementData) return;

        this.createNotification(
            `${achievementData.icon} Achievement Unlocked: ${achievementData.name}`,
            achievementData.description,
            'success'
        );
    }

    updateUI() {
        this.updateProgressDisplays();
        this.updateModuleCards();
        this.updateAchievementBadges();
    }

    updateProgressDisplays() {
        // Update circular progress indicator
        const circularProgress = document.querySelector('.progress-circle');
        if (circularProgress) {
            const percentage = this.progress.totalProgress;
            circularProgress.style.background = `conic-gradient(var(--secondary-color) ${percentage * 3.6}deg, var(--border-color) ${percentage * 3.6}deg)`;
        }

        const progressPercentage = document.querySelector('.progress-percentage');
        if (progressPercentage) {
            progressPercentage.textContent = `${this.progress.totalProgress}%`;
        }
    }

    updateModuleCards() {
        CONFIG.modules.forEach(module => {
            const moduleCard = document.querySelector(`[data-module="${module.id}"]`);
            if (moduleCard) {
                const progressFill = moduleCard.querySelector('.progress-fill');
                const moduleProgress = this.progress.modules[module.key];

                if (progressFill && moduleProgress) {
                    progressFill.style.width = `${moduleProgress.progress}%`;
                }

                // Update module card styling based on completion
                if (moduleProgress && moduleProgress.completed) {
                    moduleCard.classList.add('completed');
                }
            }
        });
    }

    updateAchievementBadges() {
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            const achievement = badge.dataset.achievement;
            if (this.progress.achievements.includes(achievement)) {
                badge.classList.remove('locked');
                badge.classList.add('unlocked');
            }
        });
    }

    initializeProgress() {
        // Initialize UI on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.updateUI());
        } else {
            this.updateUI();
        }
    }

    createNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Add notification styles if not present
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    padding: 16px;
                    max-width: 400px;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease-out;
                }
                .notification-success {
                    border-left: 4px solid #4CAF50;
                }
                .notification-info {
                    border-left: 4px solid #2196F3;
                }
                .notification-warning {
                    border-left: 4px solid #FF9800;
                }
                .notification-error {
                    border-left: 4px solid #f44336;
                }
                .notification-title {
                    font-weight: bold;
                    margin-bottom: 4px;
                    color: #333;
                }
                .notification-message {
                    color: #666;
                    font-size: 0.9em;
                }
                .notification-close {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: none;
                    border: none;
                    font-size: 1.5em;
                    cursor: pointer;
                    color: #999;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .notification-close:hover {
                    color: #333;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// ===== NAVIGATION UTILITIES =====
class NavigationManager {
    constructor() {
        this.initializeNavigation();
        this.setupScrollEffects();
    }

    initializeNavigation() {
        // Add smooth scrolling to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add navigation highlighting based on scroll position
        this.setupScrollSpy();
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    setupScrollEffects() {
        // Add navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const handleScroll = () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }

        // Add scroll-to-top button
        this.createScrollToTopButton();
    }

    createScrollToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');

        // Add styles
        if (!document.getElementById('scroll-to-top-styles')) {
            const styles = document.createElement('style');
            styles.id = 'scroll-to-top-styles';
            styles.textContent = `
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: var(--secondary-color);
                    color: white;
                    border: none;
                    font-size: 1.5em;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                    opacity: 0;
                    visibility: hidden;
                    z-index: 1000;
                }
                .scroll-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                }
                .scroll-to-top:hover {
                    background: var(--hover-color);
                    transform: translateY(-2px);
                }
                .navbar.scrolled {
                    background: rgba(44, 62, 80, 0.95);
                    backdrop-filter: blur(10px);
                }
            `;
            document.head.appendChild(styles);
        }

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        document.body.appendChild(button);
    }
}

// ===== INTERACTIVE DEMONSTRATIONS =====
class DemoManager {
    constructor(progressManager) {
        this.progressManager = progressManager;
        this.demos = new Map();
    }

    registerDemo(demoId, demoInstance) {
        this.demos.set(demoId, demoInstance);

        // Track demo completion
        demoInstance.onComplete = (result) => {
            this.handleDemoCompletion(demoId, result);
        };
    }

    handleDemoCompletion(demoId, result) {
        const moduleKey = this.getModuleKeyFromDemoId(demoId);
        if (moduleKey) {
            const currentProgress = this.progressManager.progress.modules[moduleKey];
            const newDemoData = { [demoId]: result };

            this.progressManager.updateModuleProgress(moduleKey, {
                demos: { ...currentProgress.demos, ...newDemoData }
            });
        }
    }

    getModuleKeyFromDemoId(demoId) {
        const mapping = {
            'boot-simulator': 'hardware-rot',
            'gpu-memory': 'gpu-security',
            'bmc-assessment': 'cloud-security',
            'crypto-demo': 'crypto'
        };
        return mapping[demoId];
    }
}

// ===== ACCESSIBILITY UTILITIES =====
class AccessibilityManager {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAnnouncements();
    }

    setupKeyboardNavigation() {
        // Add keyboard support for interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                if (target.hasAttribute('data-keyboard-action')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });

        // Add keyboard action attributes to clickable elements
        document.querySelectorAll('.btn, .card, .interactive-btn').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            element.setAttribute('data-keyboard-action', 'true');
        });
    }

    setupFocusManagement() {
        // Enhance focus visibility
        const style = document.createElement('style');
        style.textContent = `
            *:focus-visible {
                outline: 2px solid var(--focus-color, #3498db);
                outline-offset: 2px;
            }
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary-color);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1000;
                transition: top 0.3s;
            }
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);

        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        document.body.insertAdjacentElement('afterbegin', skipLink);
    }

    setupAnnouncements() {
        // Create screen reader announcement region
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.id = 'announcements';
        document.body.appendChild(announcer);
    }

    announce(message) {
        const announcer = document.getElementById('announcements');
        if (announcer) {
            announcer.textContent = message;
            // Clear after announcement to allow repeat announcements
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    }
}

// ===== GLOBAL INITIALIZATION =====
let progressManager;
let navigationManager;
let demoManager;
let accessibilityManager;

function initializeApp() {
    try {
        progressManager = new ProgressManager();
        navigationManager = new NavigationManager();
        demoManager = new DemoManager(progressManager);
        accessibilityManager = new AccessibilityManager();

        // Make managers globally available
        window.DCHS = {
            progress: progressManager,
            navigation: navigationManager,
            demo: demoManager,
            accessibility: accessibilityManager
        };

        console.log('DataCenter Hardware Security platform initialized successfully');
    } catch (error) {
        console.error('Failed to initialize platform:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

function debounce(func, wait) {
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

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProgressManager,
        NavigationManager,
        DemoManager,
        AccessibilityManager,
        CONFIG
    };
}
/**
 * Progress Tracking System for DataCenter Hardware Security Course
 * Handles user progress, achievements, and learning analytics
 */

class ProgressTracker {
    constructor() {
        this.storageKey = 'dchs_detailed_progress';
        this.sessionKey = 'dchs_session';
        this.progress = this.loadDetailedProgress();
        this.session = this.initializeSession();
        this.setupEventListeners();
        this.startProgressTracking();
    }

    // ===== INITIALIZATION =====
    loadDetailedProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : this.getDefaultDetailedProgress();
        } catch (error) {
            console.warn('Failed to load detailed progress:', error);
            return this.getDefaultDetailedProgress();
        }
    }

    getDefaultDetailedProgress() {
        return {
            user: {
                id: this.generateUserId(),
                startDate: new Date().toISOString(),
                learningGoal: null,
                estimatedTime: null,
                skillLevel: 'intermediate'
            },
            modules: {
                'module-0-crypto': {
                    status: 'not-started', // not-started, in-progress, completed
                    progress: 0,
                    timeSpent: 0,
                    sections: {},
                    assessments: {},
                    lastAccessed: null,
                    completedDate: null
                },
                'module-1-hardware-rot': {
                    status: 'not-started',
                    progress: 0,
                    timeSpent: 0,
                    sections: {},
                    assessments: {},
                    lastAccessed: null,
                    completedDate: null
                },
                'module-2-gpu-security': {
                    status: 'not-started',
                    progress: 0,
                    timeSpent: 0,
                    sections: {},
                    assessments: {},
                    lastAccessed: null,
                    completedDate: null
                },
                'module-3-cloud-security': {
                    status: 'not-started',
                    progress: 0,
                    timeSpent: 0,
                    sections: {},
                    assessments: {},
                    lastAccessed: null,
                    completedDate: null
                }
            },
            interactiveElements: {
                'boot-simulator': { completed: false, attempts: 0, bestScore: 0, timeSpent: 0 },
                'gpu-memory-demo': { completed: false, attempts: 0, bestScore: 0, timeSpent: 0 },
                'bmc-assessment': { completed: false, attempts: 0, bestScore: 0, timeSpent: 0 },
                'crypto-demo': { completed: false, attempts: 0, bestScore: 0, timeSpent: 0 }
            },
            games: {
                'detective-mystery': {
                    completed: false,
                    casesCompleted: 0,
                    totalCases: 5,
                    bestTime: null,
                    badges: [],
                    timeSpent: 0
                },
                'security-war-game': {
                    completed: false,
                    wavesCompleted: 0,
                    totalWaves: 10,
                    highScore: 0,
                    strategiesUsed: [],
                    timeSpent: 0
                },
                'crypto-racing': {
                    completed: false,
                    tracksCompleted: 0,
                    totalTracks: 4,
                    fastestLap: null,
                    algorithmsLearned: [],
                    timeSpent: 0
                }
            },
            achievements: {
                earned: [],
                progress: {
                    'first-steps': { progress: 0, target: 1 },
                    'crypto-master': { progress: 0, target: 100 },
                    'hardware-expert': { progress: 0, target: 100 },
                    'security-detective': { progress: 0, target: 5 },
                    'system-architect': { progress: 0, target: 4 },
                    'speed-learner': { progress: 0, target: 8 },
                    'perfectionist': { progress: 0, target: 10 }
                }
            },
            analytics: {
                totalTimeSpent: 0,
                sessionsCompleted: 0,
                averageSessionTime: 0,
                peakLearningHours: {},
                strugglingTopics: [],
                strengthAreas: [],
                learningVelocity: 0
            },
            preferences: {
                notifications: true,
                autoProgress: true,
                soundEffects: false,
                analyticsConsent: true,
                learningReminders: true
            }
        };
    }

    initializeSession() {
        return {
            id: Date.now(),
            startTime: new Date(),
            currentModule: null,
            interactions: [],
            timeTracking: {},
            focusEvents: [],
            achievements: []
        };
    }

    generateUserId() {
        return 'dchs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Track module navigation
        this.trackNavigationEvents();

        // Track interactive element usage
        this.trackInteractiveElements();

        // Track time spent and focus
        this.trackTimeAndFocus();

        // Track assessment completions
        this.trackAssessments();

        // Page visibility for accurate time tracking
        this.setupVisibilityTracking();
    }

    trackNavigationEvents() {
        // Track when users navigate to different modules
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href*="modules/"]');
            if (link) {
                const href = link.getAttribute('href');
                const moduleMatch = href.match(/modules\/(module-\d+-[^\/]+)/);
                if (moduleMatch) {
                    this.trackModuleAccess(moduleMatch[1]);
                }
            }
        });

        // Track hash changes for single-page sections
        window.addEventListener('hashchange', () => {
            this.trackSectionView(window.location.hash);
        });
    }

    trackInteractiveElements() {
        // Track clicks on interactive buttons
        document.addEventListener('click', (e) => {
            const interactiveBtn = e.target.closest('.interactive-btn, .demo-btn, .assess-btn');
            if (interactiveBtn) {
                const elementId = this.getInteractiveElementId(interactiveBtn);
                if (elementId) {
                    this.trackInteractionStart(elementId);
                }
            }
        });

        // Track form submissions in assessments
        document.addEventListener('submit', (e) => {
            const assessmentForm = e.target.closest('form[id*="assessment"]');
            if (assessmentForm) {
                this.trackAssessmentSubmission(assessmentForm.id);
            }
        });
    }

    trackTimeAndFocus() {
        this.focusStartTime = Date.now();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handleFocusLost();
            } else {
                this.handleFocusGained();
            }
        });

        window.addEventListener('beforeunload', () => {
            this.saveSessionProgress();
        });

        // Save progress periodically
        setInterval(() => {
            this.saveProgress();
        }, 30000); // Every 30 seconds
    }

    trackAssessments() {
        // Look for custom assessment completion events
        document.addEventListener('assessmentComplete', (e) => {
            this.handleAssessmentCompletion(e.detail);
        });

        // Listen for demo completion events
        document.addEventListener('demoComplete', (e) => {
            this.handleDemoCompletion(e.detail);
        });
    }

    setupVisibilityTracking() {
        let lastActiveTime = Date.now();

        // Track active time more accurately
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                lastActiveTime = Date.now();
            });
        });

        // Check if user is still active
        setInterval(() => {
            const now = Date.now();
            const timeSinceActive = now - lastActiveTime;

            if (timeSinceActive < 30000) { // Active within last 30 seconds
                this.updateActiveTime();
            }
        }, 5000);
    }

    // ===== PROGRESS TRACKING METHODS =====
    trackModuleAccess(moduleId) {
        const module = this.progress.modules[moduleId];
        if (!module) return;

        module.lastAccessed = new Date().toISOString();

        if (module.status === 'not-started') {
            module.status = 'in-progress';
            this.triggerAchievement('first-steps');
        }

        this.session.currentModule = moduleId;
        this.saveProgress();
    }

    trackSectionView(sectionHash) {
        if (!sectionHash) return;

        const sectionId = sectionHash.replace('#', '');
        this.session.interactions.push({
            type: 'section-view',
            sectionId: sectionId,
            timestamp: new Date().toISOString()
        });
    }

    trackInteractionStart(elementId) {
        if (!this.progress.interactiveElements[elementId]) {
            this.progress.interactiveElements[elementId] = {
                completed: false,
                attempts: 0,
                bestScore: 0,
                timeSpent: 0
            };
        }

        this.progress.interactiveElements[elementId].attempts++;
        this.session.interactions.push({
            type: 'interaction-start',
            elementId: elementId,
            timestamp: new Date().toISOString()
        });

        // Start timing for this interaction
        this.session.timeTracking[elementId] = Date.now();
    }

    handleAssessmentCompletion(details) {
        const { moduleId, assessmentId, score, maxScore, timeSpent } = details;

        if (this.progress.modules[moduleId]) {
            this.progress.modules[moduleId].assessments[assessmentId] = {
                score: score,
                maxScore: maxScore,
                percentage: Math.round((score / maxScore) * 100),
                completedDate: new Date().toISOString(),
                timeSpent: timeSpent
            };

            // Update module progress based on assessment completion
            this.updateModuleProgress(moduleId);
        }

        // Check for achievements
        if (score === maxScore) {
            this.triggerAchievement('perfectionist');
        }

        this.saveProgress();
    }

    handleDemoCompletion(details) {
        const { elementId, score, completed, timeSpent } = details;

        if (this.progress.interactiveElements[elementId]) {
            const element = this.progress.interactiveElements[elementId];
            element.completed = completed;
            element.bestScore = Math.max(element.bestScore, score || 0);

            if (timeSpent) {
                element.timeSpent += timeSpent;
            }
        }

        this.saveProgress();
    }

    updateModuleProgress(moduleId) {
        const module = this.progress.modules[moduleId];
        if (!module) return;

        // Calculate progress based on sections completed and assessments taken
        const sectionsCompleted = Object.keys(module.sections).length;
        const assessmentsCompleted = Object.keys(module.assessments).length;

        // Simplified progress calculation
        const progress = Math.min(100, (sectionsCompleted * 25) + (assessmentsCompleted * 25));
        module.progress = progress;

        if (progress === 100) {
            module.status = 'completed';
            module.completedDate = new Date().toISOString();
            this.triggerModuleCompletion(moduleId);
        }

        this.saveProgress();
    }

    triggerModuleCompletion(moduleId) {
        // Trigger specific achievements based on module
        const achievementMap = {
            'module-0-crypto': 'crypto-master',
            'module-1-hardware-rot': 'hardware-expert',
            'module-2-gpu-security': 'hardware-expert',
            'module-3-cloud-security': 'system-architect'
        };

        const achievement = achievementMap[moduleId];
        if (achievement) {
            this.triggerAchievement(achievement);
        }

        // Check if all modules completed
        const allModulesCompleted = Object.values(this.progress.modules)
            .every(module => module.status === 'completed');

        if (allModulesCompleted) {
            this.triggerAchievement('system-architect');
        }
    }

    // ===== TIME TRACKING =====
    updateActiveTime() {
        const now = Date.now();
        const timeDelta = now - this.focusStartTime;

        if (timeDelta > 0 && timeDelta < 300000) { // Max 5 minutes per update
            this.progress.analytics.totalTimeSpent += timeDelta;

            if (this.session.currentModule) {
                const module = this.progress.modules[this.session.currentModule];
                if (module) {
                    module.timeSpent += timeDelta;
                }
            }
        }

        this.focusStartTime = now;
    }

    handleFocusLost() {
        this.updateActiveTime();

        this.session.focusEvents.push({
            type: 'focus-lost',
            timestamp: new Date().toISOString()
        });
    }

    handleFocusGained() {
        this.focusStartTime = Date.now();

        this.session.focusEvents.push({
            type: 'focus-gained',
            timestamp: new Date().toISOString()
        });
    }

    // ===== ACHIEVEMENTS SYSTEM =====
    triggerAchievement(achievementId) {
        if (!this.progress.achievements.earned.includes(achievementId)) {
            this.progress.achievements.earned.push(achievementId);

            this.session.achievements.push({
                id: achievementId,
                timestamp: new Date().toISOString()
            });

            // Show achievement notification
            this.showAchievementNotification(achievementId);

            // Trigger custom event
            const event = new CustomEvent('achievementEarned', {
                detail: { achievementId: achievementId }
            });
            document.dispatchEvent(event);
        }
    }

    showAchievementNotification(achievementId) {
        const achievements = {
            'first-steps': {
                title: '🎓 First Steps',
                description: 'Started your first module!',
                points: 10
            },
            'crypto-master': {
                title: '🔐 Crypto Master',
                description: 'Completed cryptography fundamentals!',
                points: 50
            },
            'hardware-expert': {
                title: '🔧 Hardware Expert',
                description: 'Mastered hardware security concepts!',
                points: 50
            },
            'security-detective': {
                title: '🕵️ Security Detective',
                description: 'Solved all security mysteries!',
                points: 75
            },
            'system-architect': {
                title: '🏗️ System Architect',
                description: 'Completed all learning modules!',
                points: 100
            },
            'speed-learner': {
                title: '⚡ Speed Learner',
                description: 'Completed course in under 8 hours!',
                points: 25
            },
            'perfectionist': {
                title: '💯 Perfectionist',
                description: 'Scored 100% on 10 assessments!',
                points: 30
            }
        };

        const achievement = achievements[achievementId];
        if (achievement && window.DCHS && window.DCHS.progress) {
            window.DCHS.progress.createNotification(
                achievement.title,
                `${achievement.description} (+${achievement.points} points)`,
                'success'
            );
        }
    }

    // ===== ANALYTICS AND INSIGHTS =====
    calculateLearningAnalytics() {
        const modules = Object.values(this.progress.modules);
        const totalModules = modules.length;
        const completedModules = modules.filter(m => m.status === 'completed').length;
        const overallProgress = Math.round((completedModules / totalModules) * 100);

        // Calculate learning velocity (modules completed per hour)
        const totalHours = this.progress.analytics.totalTimeSpent / (1000 * 60 * 60);
        const learningVelocity = totalHours > 0 ? completedModules / totalHours : 0;

        // Identify struggling topics (modules with high time but low progress)
        const strugglingTopics = modules
            .filter(m => m.timeSpent > 0 && m.progress < 50 && m.timeSpent > 1800000) // 30+ minutes
            .map(m => m.id);

        // Identify strength areas (modules completed quickly with high scores)
        const strengthAreas = modules
            .filter(m => m.status === 'completed' && m.timeSpent < 3600000) // < 1 hour
            .map(m => m.id);

        return {
            overallProgress,
            completedModules,
            totalModules,
            learningVelocity: Math.round(learningVelocity * 100) / 100,
            strugglingTopics,
            strengthAreas,
            totalTimeSpent: Math.round(totalHours * 10) / 10,
            achievementsEarned: this.progress.achievements.earned.length
        };
    }

    getRecommendations() {
        const analytics = this.calculateLearningAnalytics();
        const recommendations = [];

        if (analytics.strugglingTopics.length > 0) {
            recommendations.push({
                type: 'support',
                title: 'Consider Additional Practice',
                description: `You might benefit from additional practice in: ${analytics.strugglingTopics.join(', ')}`,
                action: 'Review related interactive demos'
            });
        }

        if (analytics.learningVelocity < 0.5) {
            recommendations.push({
                type: 'pace',
                title: 'Take Your Time',
                description: 'Consider taking breaks between modules to improve retention',
                action: 'Set learning reminders'
            });
        }

        if (analytics.achievementsEarned < 3) {
            recommendations.push({
                type: 'engagement',
                title: 'Explore Interactive Content',
                description: 'Try the interactive demos and games to earn achievements',
                action: 'Visit the games section'
            });
        }

        return recommendations;
    }

    // ===== UTILITY METHODS =====
    getInteractiveElementId(element) {
        // Try to identify interactive element from various attributes
        const id = element.id ||
                  element.dataset.elementId ||
                  element.closest('[data-element-id]')?.dataset.elementId;

        if (!id) {
            // Try to infer from page URL or element context
            const url = window.location.pathname;
            if (url.includes('boot-simulator')) return 'boot-simulator';
            if (url.includes('gpu-memory')) return 'gpu-memory-demo';
            if (url.includes('bmc-assessment')) return 'bmc-assessment';
            if (url.includes('crypto-demo')) return 'crypto-demo';
        }

        return id;
    }

    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        } catch (error) {
            console.warn('Failed to save detailed progress:', error);
        }
    }

    saveSessionProgress() {
        this.updateActiveTime();

        // Update session analytics
        this.progress.analytics.sessionsCompleted++;
        this.progress.analytics.averageSessionTime =
            this.progress.analytics.totalTimeSpent / this.progress.analytics.sessionsCompleted;

        this.saveProgress();
    }

    startProgressTracking() {
        console.log('Progress tracking initialized for user:', this.progress.user.id);

        // Update analytics on initialization
        this.calculateLearningAnalytics();
    }

    // ===== PUBLIC API METHODS =====
    getProgressSummary() {
        return {
            user: this.progress.user,
            analytics: this.calculateLearningAnalytics(),
            achievements: this.progress.achievements,
            recommendations: this.getRecommendations()
        };
    }

    exportProgressData() {
        return {
            exportDate: new Date().toISOString(),
            version: '1.0',
            progress: this.progress
        };
    }

    importProgressData(data) {
        if (data.version === '1.0' && data.progress) {
            this.progress = { ...this.progress, ...data.progress };
            this.saveProgress();
            return true;
        }
        return false;
    }
}

// Initialize progress tracker when page loads
let progressTracker;

function initializeProgressTracker() {
    try {
        progressTracker = new ProgressTracker();

        // Make available globally
        if (window.DCHS) {
            window.DCHS.progressTracker = progressTracker;
        } else {
            window.DCHS = { progressTracker };
        }

        console.log('Progress tracker initialized successfully');
    } catch (error) {
        console.error('Failed to initialize progress tracker:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProgressTracker);
} else {
    initializeProgressTracker();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}
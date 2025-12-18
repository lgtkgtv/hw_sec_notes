// Module 1 Navigation and Study Hub JavaScript
// Hardware Security Course - Study Management System

// ==================== GLOBAL VARIABLES ====================
let studyTimer = {
    startTime: null,
    elapsedTime: 0,
    isRunning: false,
    interval: null
};

let studyProgress = {
    completedModules: 8,
    totalModules: 8,
    studyTimeToday: 0,
    lastAccessed: new Date().toISOString(),
    moduleProgress: {
        'datacenter-architecture-fundamentals.html': { completed: true, timeSpent: 45, lastViewed: '2024-01-15T10:30:00Z' },
        'csp-resource-orchestration.html': { completed: true, timeSpent: 60, lastViewed: '2024-01-15T09:45:00Z' },
        'redfish-bmc-scale-analysis.html': { completed: true, timeSpent: 50, lastViewed: '2024-01-15T08:30:00Z' },
        'datacenter-csp-relationship.html': { completed: true, timeSpent: 40, lastViewed: '2024-01-15T07:15:00Z' },
        'ia64-secure-boot-complete.html': { completed: true, timeSpent: 50, lastViewed: '2024-01-15T06:00:00Z' },
        'gpu-security-deep-dive.html': { completed: true, timeSpent: 40, lastViewed: '2024-01-15T05:00:00Z' },
        'nvme-security-deep-dive.html': { completed: true, timeSpent: 35, lastViewed: '2024-01-15T04:00:00Z' },
        'supply-chain-security.html': { completed: true, timeSpent: 35, lastViewed: '2024-01-15T03:00:00Z' }
    },
    studySessions: [],
    achievements: [],
    bookmarks: [],
    notes: {},
    preferences: {
        theme: 'dark',
        autoSave: true,
        notifications: true,
        pomodoroLength: 25
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeStudyHub();
    loadProgress();
    setupEventListeners();
    setupKeyboardShortcuts();
    loadRecentlyViewed();
});

function initializeStudyHub() {
    console.log('🎓 Study Hub Initialized');
    updateProgressStats();
    setupSearch();
    loadStudyPreferences();
}

// ==================== PROGRESS TRACKING ====================
function updateProgressStats() {
    const completedCount = document.getElementById('completedCount');
    const totalProgress = document.getElementById('totalProgress');
    const studyTime = document.getElementById('studyTime');
    const remainingTime = document.getElementById('remainingTime');

    // Calculate progress
    const progressPercentage = Math.round((studyProgress.completedModules / studyProgress.totalModules) * 100);
    const estimatedTotalTime = 5.5; // hours
    const timeSpent = studyProgress.studyTimeToday / 3600; // convert to hours
    const remaining = Math.max(0, estimatedTotalTime - timeSpent);

    // Update display
    if (completedCount) completedCount.textContent = studyProgress.completedModules;
    if (totalProgress) totalProgress.textContent = `${progressPercentage}%`;
    if (studyTime) studyTime.textContent = `${timeSpent.toFixed(1)}h`;
    if (remainingTime) remainingTime.textContent = `${remaining.toFixed(1)}h`;

    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage}% Complete`;
    }
}

function loadProgress() {
    // Load from localStorage if available
    const savedProgress = localStorage.getItem('studyProgress');
    if (savedProgress) {
        studyProgress = { ...studyProgress, ...JSON.parse(savedProgress) };
    }
    updateProgressStats();
}

function saveProgress() {
    localStorage.setItem('studyProgress', JSON.stringify(studyProgress));
}

// ==================== STUDY TIMER ====================
function toggleTimer() {
    const startBtn = document.getElementById('startBtn');

    if (studyTimer.isRunning) {
        // Stop timer
        stopTimer();
        startBtn.innerHTML = '▶️ Start';
        startBtn.classList.remove('active');
    } else {
        // Start timer
        startTimer();
        startBtn.innerHTML = '⏸️ Pause';
        startBtn.classList.add('active');
    }
}

function startTimer() {
    if (!studyTimer.isRunning) {
        studyTimer.startTime = Date.now() - studyTimer.elapsedTime;
        studyTimer.isRunning = true;

        studyTimer.interval = setInterval(() => {
            studyTimer.elapsedTime = Date.now() - studyTimer.startTime;
            updateTimerDisplay();

            // Update daily study time
            studyProgress.studyTimeToday = studyTimer.elapsedTime / 1000;
            saveProgress();
        }, 1000);
    }
}

function stopTimer() {
    if (studyTimer.isRunning) {
        clearInterval(studyTimer.interval);
        studyTimer.isRunning = false;
        saveProgress();
    }
}

function resetTimer() {
    stopTimer();
    studyTimer.elapsedTime = 0;
    studyTimer.startTime = null;
    updateTimerDisplay();

    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.innerHTML = '▶️ Start';
        startBtn.classList.remove('active');
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (!timerDisplay) return;

    const totalSeconds = Math.floor(studyTimer.elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = timeString;
}

// ==================== SEARCH FUNCTIONALITY ====================
function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    if (!searchBox) return;

    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterContent(searchTerm);
    });

    // Clear search on escape
    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.target.value = '';
            filterContent('');
        }
    });
}

function filterContent(searchTerm) {
    const contentCards = document.querySelectorAll('.content-card');
    let visibleCount = 0;

    contentCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const tags = card.getAttribute('data-tags') || '';

        const isMatch = title.includes(searchTerm) ||
                       description.includes(searchTerm) ||
                       tags.toLowerCase().includes(searchTerm);

        if (isMatch || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0.3';
        }
    });

    // Show search results count
    if (searchTerm) {
        console.log(`🔍 Found ${visibleCount} results for "${searchTerm}"`);
    }
}

// ==================== NAVIGATION FUNCTIONS ====================
function openContent(filename) {
    // Add to recently viewed
    addToRecentlyViewed(filename);

    // Open in new tab/window
    window.open(filename, '_blank');

    // Track interaction
    trackContentAccess(filename);
}

function addToRecentlyViewed(filename) {
    let recentItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    // Remove if already exists
    recentItems = recentItems.filter(item => item.filename !== filename);

    // Add to beginning
    recentItems.unshift({
        filename: filename,
        title: getContentTitle(filename),
        timestamp: new Date().toISOString()
    });

    // Keep only last 10 items
    recentItems = recentItems.slice(0, 10);

    localStorage.setItem('recentlyViewed', JSON.stringify(recentItems));
    updateRecentlyViewedUI();
}

function loadRecentlyViewed() {
    updateRecentlyViewedUI();
}

function updateRecentlyViewedUI() {
    const recentContainer = document.querySelector('.recently-viewed');
    if (!recentContainer) return;

    const recentItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const container = recentContainer.querySelector('.recent-item')?.parentNode;

    if (!container) return;

    // Clear existing items except the header
    const header = recentContainer.querySelector('h4');
    container.innerHTML = '';
    if (header) container.appendChild(header);

    // Add recent items
    recentItems.slice(0, 5).forEach(item => {
        const recentDiv = document.createElement('div');
        recentDiv.className = 'recent-item';
        recentDiv.onclick = () => openContent(item.filename);

        const timeAgo = getTimeAgo(new Date(item.timestamp));
        recentDiv.innerHTML = `
            <span>${getContentIcon(item.filename)} ${item.title}</span>
            <span class="recent-time">${timeAgo}</span>
        `;

        container.appendChild(recentDiv);
    });
}

function getContentTitle(filename) {
    const titleMap = {
        'datacenter-architecture-fundamentals.html': 'DataCenter Fundamentals',
        'csp-resource-orchestration.html': 'CSP Orchestration',
        'redfish-bmc-scale-analysis.html': 'RedFish APIs',
        'datacenter-csp-relationship.html': 'CSP Relationships',
        'ia64-secure-boot-complete.html': 'Secure Boot',
        'gpu-security-deep-dive.html': 'GPU Security',
        'nvme-security-deep-dive.html': 'NVMe Security',
        'supply-chain-security.html': 'Supply Chain'
    };
    return titleMap[filename] || filename.replace('.html', '');
}

function getContentIcon(filename) {
    const iconMap = {
        'datacenter-architecture-fundamentals.html': '🏗️',
        'csp-resource-orchestration.html': '⚡',
        'redfish-bmc-scale-analysis.html': '🔧',
        'datacenter-csp-relationship.html': '💼',
        'ia64-secure-boot-complete.html': '🔒',
        'gpu-security-deep-dive.html': '🎮',
        'nvme-security-deep-dive.html': '💾',
        'supply-chain-security.html': '🔗'
    };
    return iconMap[filename] || '📄';
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
}

function trackContentAccess(filename) {
    // Track content access for analytics
    const accessData = {
        filename: filename,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };

    // Store in localStorage for now (could send to analytics service)
    let accessLog = JSON.parse(localStorage.getItem('accessLog') || '[]');
    accessLog.push(accessData);

    // Keep only last 100 entries
    accessLog = accessLog.slice(-100);
    localStorage.setItem('accessLog', JSON.stringify(accessLog));
}

// ==================== INTERACTIVE FEATURES ====================
function markAsReview(button) {
    const card = button.closest('.content-card');
    card.style.borderColor = '#f59e0b';
    card.style.background = 'linear-gradient(135deg, #451a03, #78350f)';

    button.innerHTML = '⭐ Marked for Review';
    button.style.background = '#f59e0b';
    button.style.color = '#000';

    // Add to review list
    addToReviewList(card);

    // Show confirmation
    showNotification('📌 Added to review list', 'success');
}

function addToReviewList(card) {
    const title = card.querySelector('.card-title').textContent;
    let reviewList = JSON.parse(localStorage.getItem('reviewList') || '[]');

    if (!reviewList.includes(title)) {
        reviewList.push(title);
        localStorage.setItem('reviewList', JSON.stringify(reviewList));
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showQuickHelp() {
    const helpContent = `
        <div style="max-width: 400px; line-height: 1.6;">
            <h3 style="color: #60a5fa; margin-bottom: 15px;">🎓 Study Hub Help</h3>

            <h4 style="color: #34d399; margin: 15px 0 8px 0;">Navigation:</h4>
            <ul>
                <li>Click module cards to open content</li>
                <li>Use search to find specific topics</li>
                <li>Follow the learning path for optimal sequence</li>
            </ul>

            <h4 style="color: #34d399; margin: 15px 0 8px 0;">Study Features:</h4>
            <ul>
                <li>Study timer tracks your learning time</li>
                <li>Progress bars show completion status</li>
                <li>Recently viewed for quick access</li>
                <li>Mark important content for review</li>
            </ul>

            <h4 style="color: #34d399; margin: 15px 0 8px 0;">Keyboard Shortcuts:</h4>
            <ul>
                <li><strong>Ctrl+F:</strong> Search content</li>
                <li><strong>Space:</strong> Start/stop study timer</li>
                <li><strong>→/←:</strong> Navigate modules</li>
                <li><strong>Esc:</strong> Clear search</li>
            </ul>

            <p style="margin-top: 15px; color: #94a3b8; font-size: 0.9em;">
                💡 Tip: This hub saves your progress and preferences automatically!
            </p>
        </div>
    `;

    // Create modal
    createModal('Quick Help', helpContent);
}

function createModal(title, content) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #1e293b, #334155);
        border-radius: 15px;
        padding: 30px;
        border: 1px solid #475569;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        color: #e2e8f0;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
    `;

    modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="color: #60a5fa; margin: 0;">${title}</h2>
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove()"
                    style="background: #374151; border: none; color: #e2e8f0; padding: 8px 12px; border-radius: 6px; cursor: pointer;">
                ✕
            </button>
        </div>
        ${content}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// ==================== KEYBOARD SHORTCUTS ====================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Don't trigger shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case ' ': // Space - toggle timer
                e.preventDefault();
                toggleTimer();
                break;

            case 'ArrowRight': // Next module
                e.preventDefault();
                navigateModule('next');
                break;

            case 'ArrowLeft': // Previous module
                e.preventDefault();
                navigateModule('prev');
                break;

            case '/': // Focus search
                e.preventDefault();
                const searchBox = document.getElementById('searchBox');
                if (searchBox) searchBox.focus();
                break;

            case 'h': // Show help
                e.preventDefault();
                showQuickHelp();
                break;

            case 'r': // Reset timer
                if (e.ctrlKey) {
                    e.preventDefault();
                    resetTimer();
                }
                break;
        }
    });
}

function navigateModule(direction) {
    const pathSteps = document.querySelectorAll('.path-step');
    const currentIndex = Array.from(pathSteps).findIndex(step => step.classList.contains('current'));

    let nextIndex;
    if (direction === 'next') {
        nextIndex = Math.min(currentIndex + 1, pathSteps.length - 1);
    } else {
        nextIndex = Math.max(currentIndex - 1, 0);
    }

    if (nextIndex !== currentIndex) {
        pathSteps[nextIndex].click();
    }
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Window beforeunload to save progress
    window.addEventListener('beforeunload', function() {
        saveProgress();
    });

    // Page visibility change to pause/resume timer
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && studyTimer.isRunning) {
            // Page hidden, pause timer
            stopTimer();
        }
    });

    // Auto-save progress every 30 seconds
    setInterval(saveProgress, 30000);
}

// ==================== PREFERENCES ====================
function loadStudyPreferences() {
    const preferences = JSON.parse(localStorage.getItem('studyPreferences') || '{}');

    // Apply theme preferences, notification settings, etc.
    if (preferences.theme) {
        document.body.classList.add(`theme-${preferences.theme}`);
    }
}

function saveStudyPreferences() {
    const preferences = {
        theme: 'dark', // Default theme
        notifications: true,
        autoSave: true,
        lastSession: new Date().toISOString()
    };

    localStorage.setItem('studyPreferences', JSON.stringify(preferences));
}

// ==================== UTILITY FUNCTIONS ====================
function exportProgress() {
    const data = {
        progress: studyProgress,
        recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed') || '[]'),
        reviewList: JSON.parse(localStorage.getItem('reviewList') || '[]'),
        accessLog: JSON.parse(localStorage.getItem('accessLog') || '[]'),
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function resetAllProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

// ==================== ADVANCED PROGRESS TRACKING ====================
function trackModuleProgress(filename, timeSpent = 0) {
    if (!studyProgress.moduleProgress[filename]) {
        studyProgress.moduleProgress[filename] = {
            completed: false,
            timeSpent: 0,
            lastViewed: new Date().toISOString(),
            viewCount: 0
        };
    }

    const moduleData = studyProgress.moduleProgress[filename];
    moduleData.timeSpent += timeSpent;
    moduleData.lastViewed = new Date().toISOString();
    moduleData.viewCount = (moduleData.viewCount || 0) + 1;

    // Mark as completed if spent more than 30 minutes
    if (moduleData.timeSpent >= 30 && !moduleData.completed) {
        moduleData.completed = true;
        studyProgress.completedModules += 1;
        showAchievement(`Module Completed: ${getContentTitle(filename)}`);
    }

    saveProgress();
}

function addBookmark(filename, section = '', note = '') {
    const bookmark = {
        id: Date.now().toString(),
        filename: filename,
        section: section,
        note: note,
        timestamp: new Date().toISOString(),
        title: getContentTitle(filename)
    };

    studyProgress.bookmarks.unshift(bookmark);
    studyProgress.bookmarks = studyProgress.bookmarks.slice(0, 50); // Keep last 50 bookmarks

    saveProgress();
    showNotification('📌 Bookmark added', 'success');
}

function addStudyNote(filename, note) {
    if (!studyProgress.notes[filename]) {
        studyProgress.notes[filename] = [];
    }

    const noteObj = {
        id: Date.now().toString(),
        content: note,
        timestamp: new Date().toISOString()
    };

    studyProgress.notes[filename].unshift(noteObj);
    saveProgress();
    showNotification('📝 Note saved', 'success');
}

function getRecommendedNextModule() {
    const incompleteModules = Object.keys(studyProgress.moduleProgress)
        .filter(filename => !studyProgress.moduleProgress[filename].completed);

    if (incompleteModules.length === 0) {
        return null; // All modules completed
    }

    // Sort by priority/dependency order
    const moduleOrder = [
        'datacenter-architecture-fundamentals.html',
        'ia64-secure-boot-complete.html',
        'gpu-security-deep-dive.html',
        'nvme-security-deep-dive.html',
        'supply-chain-security.html',
        'csp-resource-orchestration.html',
        'redfish-bmc-scale-analysis.html',
        'datacenter-csp-relationship.html'
    ];

    for (const module of moduleOrder) {
        if (incompleteModules.includes(module)) {
            return module;
        }
    }

    return incompleteModules[0];
}

function showAchievement(message) {
    const achievement = {
        id: Date.now().toString(),
        message: message,
        timestamp: new Date().toISOString(),
        type: 'completion'
    };

    studyProgress.achievements.unshift(achievement);
    studyProgress.achievements = studyProgress.achievements.slice(0, 20); // Keep last 20 achievements

    // Show achievement notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: #000;
        padding: 30px 40px;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        z-index: 2000;
        font-weight: bold;
        font-size: 1.2em;
        text-align: center;
        min-width: 300px;
        animation: achievementPop 3s ease;
    `;
    notification.innerHTML = `
        <div style="font-size: 2em; margin-bottom: 10px;">🎉</div>
        <div style="font-size: 1.1em; margin-bottom: 5px;">Achievement Unlocked!</div>
        <div>${message}</div>
    `;

    document.body.appendChild(notification);

    // Add CSS animation
    if (!document.getElementById('achievementStyle')) {
        const style = document.createElement('style');
        style.id = 'achievementStyle';
        style.textContent = `
            @keyframes achievementPop {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                15% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                25% { transform: translate(-50%, -50%) scale(1); }
                85% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);

    saveProgress();
}

function startStudySession() {
    const session = {
        id: Date.now().toString(),
        startTime: new Date().toISOString(),
        endTime: null,
        duration: 0,
        modulesStudied: [],
        notes: []
    };

    studyProgress.studySessions.unshift(session);
    localStorage.setItem('currentSession', JSON.stringify(session));
}

function endStudySession() {
    const currentSession = JSON.parse(localStorage.getItem('currentSession') || 'null');
    if (currentSession) {
        currentSession.endTime = new Date().toISOString();
        currentSession.duration = (new Date() - new Date(currentSession.startTime)) / 1000 / 60; // minutes

        // Update in progress array
        const sessionIndex = studyProgress.studySessions.findIndex(s => s.id === currentSession.id);
        if (sessionIndex >= 0) {
            studyProgress.studySessions[sessionIndex] = currentSession;
        }

        localStorage.removeItem('currentSession');
        saveProgress();

        // Show session summary
        if (currentSession.duration > 5) { // Only show if studied for more than 5 minutes
            showSessionSummary(currentSession);
        }
    }
}

function showSessionSummary(session) {
    const summary = `
        <div style="text-align: center;">
            <h3 style="color: #60a5fa; margin-bottom: 15px;">📊 Study Session Complete</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                <div style="background: #374151; padding: 15px; border-radius: 8px;">
                    <div style="color: #22c55e; font-size: 1.5em; font-weight: bold;">${Math.round(session.duration)} min</div>
                    <div style="color: #94a3b8;">Study Time</div>
                </div>
                <div style="background: #374151; padding: 15px; border-radius: 8px;">
                    <div style="color: #22c55e; font-size: 1.5em; font-weight: bold;">${session.modulesStudied.length}</div>
                    <div style="color: #94a3b8;">Modules Accessed</div>
                </div>
            </div>
            <p style="color: #94a3b8; margin-top: 15px;">Great work! Keep up the momentum 🚀</p>
        </div>
    `;

    createModal('Session Summary', summary);
}

function getStudyStreak() {
    const today = new Date().toDateString();
    const sessions = studyProgress.studySessions || [];

    let streak = 0;
    let currentDate = new Date();

    while (streak < 30) { // Check last 30 days max
        const dateStr = currentDate.toDateString();
        const hasSessionOnDate = sessions.some(session =>
            new Date(session.startTime).toDateString() === dateStr && session.duration > 5
        );

        if (hasSessionOnDate) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

function generateWeeklyReport() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentSessions = studyProgress.studySessions.filter(session =>
        new Date(session.startTime) > oneWeekAgo
    );

    const totalTime = recentSessions.reduce((sum, session) => sum + session.duration, 0);
    const avgSessionLength = recentSessions.length > 0 ? totalTime / recentSessions.length : 0;
    const streak = getStudyStreak();

    return {
        sessionsThisWeek: recentSessions.length,
        totalTimeThisWeek: Math.round(totalTime),
        averageSessionLength: Math.round(avgSessionLength),
        currentStreak: streak,
        completionRate: Math.round((studyProgress.completedModules / studyProgress.totalModules) * 100)
    };
}

function showWeeklyReport() {
    const report = generateWeeklyReport();

    const reportHtml = `
        <div>
            <h3 style="color: #60a5fa; margin-bottom: 20px; text-align: center;">📈 Weekly Study Report</h3>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: #374151; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="color: #22c55e; font-size: 1.8em; font-weight: bold;">${report.sessionsThisWeek}</div>
                    <div style="color: #94a3b8; font-size: 0.9em;">Sessions</div>
                </div>
                <div style="background: #374151; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="color: #22c55e; font-size: 1.8em; font-weight: bold;">${report.totalTimeThisWeek}m</div>
                    <div style="color: #94a3b8; font-size: 0.9em;">Total Time</div>
                </div>
                <div style="background: #374151; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="color: #22c55e; font-size: 1.8em; font-weight: bold;">${report.averageSessionLength}m</div>
                    <div style="color: #94a3b8; font-size: 0.9em;">Avg Session</div>
                </div>
                <div style="background: #374151; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="color: #22c55e; font-size: 1.8em; font-weight: bold;">${report.currentStreak}</div>
                    <div style="color: #94a3b8; font-size: 0.9em;">Day Streak</div>
                </div>
            </div>

            <div style="background: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #fbbf24; margin-bottom: 10px;">🎯 Progress Summary</h4>
                <div style="background: #374151; height: 20px; border-radius: 10px; overflow: hidden; margin: 10px 0;">
                    <div style="background: linear-gradient(90deg, #22c55e, #16a34a); height: 100%; width: ${report.completionRate}%; transition: width 0.5s ease;"></div>
                </div>
                <div style="color: #94a3b8; text-align: center;">${report.completionRate}% Complete</div>
            </div>

            ${report.currentStreak > 0 ? `
                <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 15px; border-radius: 8px; text-align: center; color: #000;">
                    <strong>🔥 ${report.currentStreak} Day Study Streak!</strong><br>
                    <span style="font-size: 0.9em;">Keep it up - consistency is key to mastery!</span>
                </div>
            ` : ''}
        </div>
    `;

    createModal('Weekly Report', reportHtml);
}

// ==================== RESUME FUNCTIONALITY ====================
function getResumeRecommendation() {
    const lastModule = findLastAccessedModule();
    const nextModule = getRecommendedNextModule();
    const bookmarks = studyProgress.bookmarks || [];

    if (bookmarks.length > 0) {
        return {
            type: 'bookmark',
            content: bookmarks[0],
            message: `Resume from your last bookmark in ${getContentTitle(bookmarks[0].filename)}`
        };
    }

    if (nextModule && nextModule !== lastModule) {
        return {
            type: 'next_module',
            content: nextModule,
            message: `Continue with ${getContentTitle(nextModule)}`
        };
    }

    if (lastModule) {
        return {
            type: 'last_module',
            content: lastModule,
            message: `Continue reading ${getContentTitle(lastModule)}`
        };
    }

    return {
        type: 'start',
        content: 'datacenter-architecture-fundamentals.html',
        message: 'Start with DataCenter Architecture Fundamentals'
    };
}

function findLastAccessedModule() {
    const moduleEntries = Object.entries(studyProgress.moduleProgress);
    if (moduleEntries.length === 0) return null;

    const sorted = moduleEntries.sort((a, b) =>
        new Date(b[1].lastViewed) - new Date(a[1].lastViewed)
    );

    return sorted[0][0];
}

function showResumeDialog() {
    const recommendation = getResumeRecommendation();

    const resumeHtml = `
        <div style="text-align: center;">
            <h3 style="color: #60a5fa; margin-bottom: 20px;">👋 Welcome Back!</h3>

            <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="color: #34d399; margin-bottom: 10px;">📚 ${recommendation.message}</div>
                <button onclick="resumeStudy('${recommendation.content}')"
                        style="background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; border: none;
                               padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    Continue Learning →
                </button>
            </div>

            <div style="margin-top: 20px;">
                <button onclick="showWeeklyReport()"
                        style="background: #374151; color: #e2e8f0; border: 1px solid #6b7280;
                               padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 0 5px;">
                    📊 View Report
                </button>
                <button onclick="closeModal(event)"
                        style="background: #374151; color: #e2e8f0; border: 1px solid #6b7280;
                               padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 0 5px;">
                    Browse Hub
                </button>
            </div>
        </div>
    `;

    createModal('Resume Learning', resumeHtml);
}

function resumeStudy(filename) {
    closeModal();
    openContent(filename);
    trackModuleProgress(filename);
}

function closeModal(event) {
    if (event) event.preventDefault();
    const modal = document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]');
    if (modal) modal.remove();
}

// Initialize everything when the page loads
console.log('🎓 Module 1 Study Hub - Ready for learning!');
console.log('💡 Press "h" for help, Space for timer, "/" for search');

// Auto-start timer if user preference is set
const autoStartTimer = localStorage.getItem('autoStartTimer') === 'true';
if (autoStartTimer && !studyTimer.isRunning) {
    setTimeout(startTimer, 1000);
}

// Start study session tracking
setTimeout(() => {
    startStudySession();
    // Show resume dialog if returning user
    const hasProgress = localStorage.getItem('studyProgress');
    if (hasProgress && studyProgress.studySessions.length > 0) {
        setTimeout(showResumeDialog, 2000);
    }
}, 1000);

// End study session on page unload
window.addEventListener('beforeunload', endStudySession);
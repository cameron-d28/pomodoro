class PomodoroTimer {
    constructor() {
        this.workDuration = 25 * 60; // 25 minutes in seconds
        this.shortBreakDuration = 5 * 60; // 5 minutes in seconds
        this.longBreakDuration = 15 * 60; // 15 minutes in seconds
        
        this.currentTime = this.workDuration;
        this.isRunning = false;
        this.sessionType = 'work';
        this.pomodoroCount = 0;
        this.timer = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.updateSessionIndicator();
    }
    
    initializeElements() {
        this.timerDisplay = document.getElementById('timerDisplay');
        this.sessionIndicator = document.getElementById('sessionIndicator');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.pomodoroCountElement = document.getElementById('pomodoroCount');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    start() {
        this.isRunning = true;
        this.startBtn.style.display = 'none';
        this.pauseBtn.style.display = 'inline-block';
        
        this.timer = setInterval(() => {
            this.currentTime--;
            this.updateDisplay();
            
            if (this.currentTime <= 0) {
                this.sessionComplete();
            }
        }, 1000);
    }
    
    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
        this.startBtn.style.display = 'inline-block';
        this.pauseBtn.style.display = 'none';
    }
    
    reset() {
        this.pause();
        this.sessionType = 'work';
        this.currentTime = this.workDuration;
        this.updateDisplay();
        this.updateSessionIndicator();
    }
    
    sessionComplete() {
        this.pause();
        
        if (this.sessionType === 'work') {
            this.pomodoroCount++;
            this.pomodoroCountElement.textContent = this.pomodoroCount;
            
            // After 4 work sessions, take a long break
            if (this.pomodoroCount % 4 === 0) {
                this.sessionType = 'long-break';
                this.currentTime = this.longBreakDuration;
            } else {
                this.sessionType = 'short-break';
                this.currentTime = this.shortBreakDuration;
            }
        } else {
            // After any break, go back to work
            this.sessionType = 'work';
            this.currentTime = this.workDuration;
        }
        
        this.updateDisplay();
        this.updateSessionIndicator();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateSessionIndicator() {
        this.sessionIndicator.classList.remove('work', 'break');
        
        switch (this.sessionType) {
            case 'work':
                this.sessionIndicator.textContent = 'WORK';
                this.sessionIndicator.classList.add('work');
                break;
            case 'short-break':
                this.sessionIndicator.textContent = 'SHORT BREAK';
                this.sessionIndicator.classList.add('break');
                break;
            case 'long-break':
                this.sessionIndicator.textContent = 'LONG BREAK';
                this.sessionIndicator.classList.add('break');
                break;
        }
    }
}

// Initialize the Pomodoro timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});

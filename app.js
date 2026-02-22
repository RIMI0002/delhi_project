// Clean Cycle Duration in milliseconds (simulated)
const CLEAN_CYCLE_DURATION = 10000;
document.addEventListener('DOMContentLoaded', () => {
    // Initial Setup (could pull from API in real world)
    console.log("SwachhRail Auto-Clean Dashboard Loaded");
});
function activateAutoClean(unitId) {
    const btn = document.getElementById(`btn-${unitId}`);
    const ledRing = document.getElementById(`led-${unitId}`);
    const statusText = document.getElementById(`status-text-${unitId}`);
    const progressBarContainer = document.getElementById(`progress-${unitId}`).parentElement;
    const progressBar = document.getElementById(`progress-${unitId}`);
    // Prevent double execution
    if (btn.disabled) return;
    // 1. Transition to "Cleaning" Status
    btn.disabled = true;
    btn.innerHTML = `<span class="btn-icon">⏳</span> CLEANING...`;
    // Change LED class to blue pulsing
    ledRing.className = 'led-ring ring-blue';
    statusText.innerText = 'CLEANING...';
    // Show progress bar
    progressBarContainer.classList.add('active');
    let startTime = Date.now();
    // Animate progress bar manually to sync with the simulated duration
    const interval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let progressPercent = Math.min((elapsedTime / CLEAN_CYCLE_DURATION) * 100, 100);
        progressBar.style.width = `${progressPercent}%`;
        if (progressPercent >= 100) {
            clearInterval(interval);
            finishCleaning(unitId);
        }
    }, 50); // Updates every 50ms for smooth animation
}
function finishCleaning(unitId) {
    const btn = document.getElementById(`btn-${unitId}`);
    const ledRing = document.getElementById(`led-${unitId}`);
    const statusText = document.getElementById(`status-text-${unitId}`);
    const progressBarContainer = document.getElementById(`progress-${unitId}`).parentElement;
    const progressBar = document.getElementById(`progress-${unitId}`);
    // 2. Transition back to "Ready" Status (Green/Success Color)
    setTimeout(() => {
        ledRing.className = 'led-ring ring-green';
        statusText.innerText = 'Ready';
        // Reset Button
        btn.innerHTML = `<span class="btn-icon">✨</span> ACTIVATE AUTO-CLEAN`;
        btn.disabled = false;
        // Hide and reset progress bar
        progressBarContainer.classList.remove('active');
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 300); // give time for opacity to fade before snapping back to 0
    }, 500); // 500ms grace period end-of-cycle
}

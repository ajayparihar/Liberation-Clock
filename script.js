// Liberation Clock - Countdown Timer Only
// --------------------------------------------------

// Set the target date for the countdown (October 7, 2025, 00:00:00)
const targetDate = new Date('2025-10-07T00:00:00');

/**
 * Animate a number element with a pop effect when its value changes.
 * @param {string} id - The DOM id of the number element to animate.
 */
function animateNumber(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('pop');
    void el.offsetWidth; // Force reflow to restart animation
    el.classList.add('pop');
}

// Store previous values to detect changes for animation
let prev = { days: null, hours: null, minutes: null, seconds: null };

/**
 * Update the countdown timer display.
 * Calculates the time difference and updates the DOM.
 * Animates numbers if their value changes.
 */
function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    // If countdown is complete, show message and stop updating
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<span style="font-size:2rem;">Countdown Complete!</span>';
        return;
    }

    // Calculate remaining time components
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Animate only if value changed
    if (prev.days !== days) animateNumber('days');
    if (prev.hours !== hours) animateNumber('hours');
    if (prev.minutes !== minutes) animateNumber('minutes');
    // Only animate seconds if it increases (i.e., from 59 to 0)
    if (prev.seconds !== null && seconds > prev.seconds) animateNumber('seconds');
    prev = { days, hours, minutes, seconds };

    // Update DOM with new values
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Initial call to display countdown immediately
updateCountdown();
// Update countdown every second
setInterval(updateCountdown, 1000); 
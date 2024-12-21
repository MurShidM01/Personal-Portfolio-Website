document.querySelector('.hire-me .btn').addEventListener('click', function() {
    window.location.href = "mailto:alikhanjalbani@outlook.com?subject=Hire Me Inquiry";
});

// Progress Bar
function setInitialProgress(container) {
    const progressBar = container.querySelector('.progress-bar');
    const progressText = container.querySelector('.progress-text');
    const targetValue = parseInt(container.getAttribute('data-value'), 10);

    // Calculate the circumference of the circle
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    // Set the stroke-dasharray to the circumference
    progressBar.style.strokeDasharray = circumference;

    // Set initial progress based on target value
    const offset = circumference - (targetValue / 100) * circumference;
    progressBar.style.strokeDashoffset = offset;
    progressText.textContent = `${targetValue}%`; // Set the text to the target value
}

function animateProgressCircle(container) {
    const progressBar = container.querySelector('.progress-bar');
    const progressText = container.querySelector('.progress-text');
    const targetValue = parseInt(container.getAttribute('data-value'), 10);

    // Calculate the circumference of the circle
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    // Animate from 0% to the target value
    progressText.textContent = '0%';
    progressBar.style.strokeDashoffset = circumference; // Reset to 0%
    
    let currentPercentage = 0;
    const intervalTime = 2000 / targetValue;
    
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

// Initialize the progress circle when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const progressContainers = document.querySelectorAll('.progress-circle-container');

    // Set initial progress based on data-value
    progressContainers.forEach(container => setInitialProgress(container));

    // Animate on hover
    progressContainers.forEach(container => {
        container.addEventListener('mouseenter', () => animateProgressCircle(container));
    });
});


const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

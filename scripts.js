document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const bars = document.getElementById('bars');

    audio.addEventListener('play', function() {
        console.log('Play event triggered'); // Check if the play event is being triggered
        bars.classList.add('playing'); // Add 'playing' class to start the animation
        animateBars(); // Call function to animate the bars with random durations
    });

    audio.addEventListener('pause', function() {
        bars.classList.remove('playing'); // Remove 'playing' class to stop the animation
    });

    audio.addEventListener('ended', function() {
        bars.classList.remove('playing'); // Remove 'playing' class when the audio ends
    });

    function animateBars() {
        const barElements = bars.querySelectorAll('div'); // Select all individual bars
        barElements.forEach((bar) => {
            const duration = Math.random() * 2 + 0.5; // Generate random duration between 0.5 and 2.5 seconds
            bar.style.animationDuration = `${duration}s`; // Apply the random duration to each bar
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('darkModeToggle');

    if (!toggleSwitch) {
        console.error('Dark mode toggle switch not found in the DOM.');
        return;
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    function enableDarkMode() {
        document.querySelector('main').classList.add('dark-mode');
    }

    function disableDarkMode() {
        document.querySelector('main').classList.remove('dark-mode');
    }
});

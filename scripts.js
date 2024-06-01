window.onload = function() {
    const audio = document.getElementById('audio'); // The audio element
    const playPauseBtn = document.getElementById('playPauseBtn'); // Play/Pause button
    const volumeSlider = document.getElementById('volumeSlider'); // Volume control slider

    if (!audio || !playPauseBtn || !volumeSlider) {
        console.error('One or more elements not found in the DOM.');
        return;
    }

    // Event listener for the play/pause button
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play(); // Play audio if paused
            playPauseBtn.textContent = 'Pause'; // Update button text to 'Pause'
        } else {
            audio.pause(); // Pause audio if playing
            playPauseBtn.textContent = 'Play'; // Update button text to 'Play'
        }
    });

    // Event listener for the volume slider
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value; // Set audio volume based on slider value
    });
};

// For the dark mode slider
document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('darkModeToggle');

    if (!toggleSwitch) {
        console.error('Dark mode toggle switch not found in the DOM.');
        return;
    }

    // Check if dark mode preference is stored in localStorage
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

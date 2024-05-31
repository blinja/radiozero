
window.onload = function() {
    const audio = document.getElementById('audio'); // The audio element
    const playPauseBtn = document.getElementById('playPauseBtn'); // Play/Pause button
    const volumeSlider = document.getElementById('volumeSlider'); // Volume control slider
    const visualizer = document.getElementById('visualizer'); // Canvas element for visualizer

    if (!audio || !playPauseBtn || !volumeSlider || !visualizer) {
        console.error('One or more elements not found in the DOM.');
        return;
    }

    const canvasCtx = visualizer.getContext('2d'); // 2D context for canvas drawing

    let audioContext;
    let analyser;
    let source;
    let dataArray;
    let bufferLength;

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

    // Event listener for when the audio starts playing
    audio.addEventListener('play', () => {
        if (!audioContext) { // Check if the audio context is not already created
            // Create a new AudioContext instance
            audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Create an analyser node
            analyser = audioContext.createAnalyser();

            // Create a source node from the audio element
            source = audioContext.createMediaElementSource(audio);

            // Connect the source node to the analyser node
            source.connect(analyser);

            // Connect the analyser node to the audio context's destination (speakers)
            analyser.connect(audioContext.destination);

            // Set the FFT size for the analyser (affects the granularity of the frequency data)
            analyser.fftSize = 256;

            // Calculate the buffer length based on the FFT size
            bufferLength = analyser.frequencyBinCount;

            // Create a Uint8Array to hold the frequency data
            dataArray = new Uint8Array(bufferLength);

            // Start the visualizer drawing loop
            drawVisualizer();
        }
    });

    // Function to draw the visualizer
    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer); // Call this function again for the next frame

        analyser.getByteFrequencyData(dataArray); // Get the frequency data from the analyser

        // Clear the canvas
        canvasCtx.fillStyle = '#333';
        canvasCtx.fillRect(0, 0, visualizer.width, visualizer.height);

        const barWidth = (visualizer.width / bufferLength) * 2.5; // Calculate the width of each bar
        let barHeight;
        let x = 0; // Start drawing bars from the left edge

        // Loop through the frequency data and draw bars
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            // Set the fill color for each bar (using frequency data to influence the color)
            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            // Draw a rectangle (bar) for the current frequency data
            canvasCtx.fillRect(x, visualizer.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1; // Move to the next bar position
        }
    }
}

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


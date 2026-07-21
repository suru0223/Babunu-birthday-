/* ============================================
   BIRTHDAY WEBSITE - JAVASCRIPT
   For: KITTY from SURU
   ============================================ */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const songName = document.getElementById('songName');

// Songs playlist
const songs = [
    {
        url: 'https://ia801403.us.archive.org/26/items/arijit_singh_enna_sona/Enna%20Sona%20-%20OK%20Jaanu%20%28arijit%20singh%29.mp3',
        name: '🎵 ENNA Sona - Arijit Singh'
    },
    {
        url: 'https://ia801405.us.archive.org/1/items/gehra_hua_arijit_singh/Gehra%20hua%20-%20Arijit%20Singh%20%28SoundtrackBD.com%29.mp3',
        name: '🎵 Gehra Hua - Arijit Singh'
    },
    {
        url: 'https://ia801405.us.archive.org/32/items/manjha/Manjha%20-%20Vishal%20Mishra%20%28320Kbps%29%20SoundtrackBD.com.mp3',
        name: '🎵 Manjha - Vishal Mishra'
    }
];

let currentSongIndex = 0;
let isPlaying = false;

// Initialize
function init() {
    showSlide(0);
    updateIndicators();
    setupMusicPlayer();
}

// Show specific slide
function showSlide(n) {
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function previousSlide() {
    showSlide(currentSlide - 1);
}

// Go to specific slide
function goToSlide(n) {
    showSlide(n);
}

// Update indicators
function updateIndicators() {
    indicators.forEach((ind, index) => {
        if (index === currentSlide) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}

// Restart slideshow
function restartSlideshow() {
    showSlide(0);
    if (isPlaying) {
        bgMusic.currentTime = 0;
    }
}

// Setup music player
function setupMusicPlayer() {
    if (bgMusic) {
        bgMusic.src = songs[0].url;
        updateSongDisplay();
        
        bgMusic.addEventListener('ended', () => {
            nextSong();
        });
    }
}

// Toggle music
function toggleMusic() {
    if (!bgMusic) return;

    if (isPlaying) {
        bgMusic.pause();
        playBtn.textContent = '🎵 Play Music';
        isPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
        playBtn.textContent = '⏸ Pause Music';
        isPlaying = true;
    }
}

// Next song
function nextSong() {
    if (!bgMusic) return;
    
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    bgMusic.src = songs[currentSongIndex].url;
    updateSongDisplay();
    
    if (isPlaying) {
        bgMusic.play();
    }
}

// Update song display
function updateSongDisplay() {
    if (songName) {
        songName.textContent = songs[currentSongIndex].name;
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === ' ') {
        e.preventDefault();
        toggleMusic();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

// Allow music to play on user interaction
document.addEventListener('click', () => {
    if (bgMusic && !isPlaying && bgMusic.paused) {
        bgMusic.play().catch(err => console.log('Autoplay:', err));
        playBtn.textContent = '⏸ Pause Music';
        isPlaying = true;
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        previousSlide();
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

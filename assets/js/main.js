document.addEventListener('DOMContentLoaded', () => {
    console.log('GreenJustyn Technical Knowledge Graph Init.');

    // Interactive Media Queue Switching
    const queueItems = document.querySelectorAll('.queue-item');
    const mainThumb = document.getElementById('mainVideoThumb');
    const mainTitle = document.getElementById('mainVideoTitle');

    const videoData = {
        1: {
            thumb: 'assets/images/cinema-thumb.png',
            title: 'Edge Compute Visualization',
        },
        2: {
            thumb: 'assets/images/hero-art.png',
            title: 'Git-Based Server Optimization',
        }
    };

    queueItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            queueItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Get data ID
            const id = item.getAttribute('data-video-id');
            if (videoData[id]) {
                // Fade animation for smooth viewing
                mainThumb.style.opacity = '0';
                
                setTimeout(() => {
                    mainThumb.src = videoData[id].thumb;
                    mainTitle.innerText = videoData[id].title;
                    mainThumb.style.opacity = '0.8';
                }, 300);
            }
        });
    });

    // Simple Overlay Interactive Reaction
    const playOverlay = document.querySelector('.play-overlay');
    if (playOverlay) {
        playOverlay.addEventListener('click', () => {
            alert('Playing instructional technology review snippet.');
        });
    }
});

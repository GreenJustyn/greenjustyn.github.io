document.addEventListener('DOMContentLoaded', () => {
    console.log('GreenJustyn Web3 Media Engine Initialized.');

    // Wallet Connection Simulation
    const connectBtn = document.getElementById('connectWallet');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            connectBtn.innerHTML = 'Connecting...';
            connectBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                connectBtn.innerHTML = '0x7F...9A3';
                connectBtn.style.opacity = '1';
                connectBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                connectBtn.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.4)';
                
                // Simple custom alert/toast
                alert('Wallet Connected Successfully! Accessing premium Web3 content streams.');
            }, 1500);
        });
    }

    // Interactive Media Queue Switching
    const queueItems = document.querySelectorAll('.queue-item');
    const mainThumb = document.getElementById('mainVideoThumb');
    const mainTitle = document.getElementById('mainVideoTitle');
    const mainDesc = document.getElementById('mainVideoDesc');

    const videoData = {
        1: {
            thumb: 'assets/images/cinema-thumb.png',
            title: 'Interstellar Monolith Discovery',
            desc: 'A stunning cinematic exploration of deep space anomalies and alien mega-structures.'
        },
        2: {
            thumb: 'assets/images/hero-art.png',
            title: 'Neon Obsidian Vortex',
            desc: 'Exclusive digital art stream capturing quantum energy fluctuations in the metaverse.'
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
                // Add fade animation for smooth transition
                mainThumb.style.opacity = '0';
                
                setTimeout(() => {
                    mainThumb.src = videoData[id].thumb;
                    mainTitle.innerText = videoData[id].title;
                    mainDesc.innerText = videoData[id].desc;
                    mainThumb.style.opacity = '0.8';
                }, 300);
            }
        });
    });

    // Video Play Button Mock Animation
    const playOverlay = document.querySelector('.play-overlay');
    if (playOverlay) {
        playOverlay.addEventListener('click', () => {
            alert('Initializing high-fidelity web3 video stream protocol (Simulation).');
        });
    }
});

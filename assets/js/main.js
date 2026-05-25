document.addEventListener('DOMContentLoaded', () => {
    console.log('GreenJustyn Technical Knowledge Graph Init.');

    // ==========================================
    // Interactive Media Queue Switching (Cinema & YouTube Player)
    // ==========================================
    const queueItems = document.querySelectorAll('.queue-item');
    const mainThumb = document.getElementById('mainVideoThumb');
    const playOverlay = document.getElementById('playOverlay');
    const ytPlayer = document.getElementById('ytPlayer');

    function playVideo(videoId) {
        if (!ytPlayer) return;
        
        // Set YouTube embed source with autoplay
        ytPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        
        // Transition to display iframe and hide the static thumbnail/overlay
        mainThumb.style.display = 'none';
        if (playOverlay) playOverlay.style.display = 'none';
        ytPlayer.style.display = 'block';
    }

    queueItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active class state
            queueItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Get video ID from data-video-id
            const videoId = item.getAttribute('data-video-id');
            
            // Immediately launch and autoplay the clicked video!
            playVideo(videoId);
        });
    });

    // Trigger YouTube embed when clicking on the central play button overlay
    if (playOverlay) {
        playOverlay.addEventListener('click', () => {
            const activeItem = document.querySelector('.queue-item.active');
            if (activeItem) {
                const videoId = activeItem.getAttribute('data-video-id');
                playVideo(videoId);
            }
        });
    }

    // ==========================================
    // Dynamic Technical Library Loading & Search
    // ==========================================
    let articles = [];
    const libraryGrid = document.getElementById('libraryGrid');
    const searchInput = document.getElementById('searchInput');
    const filterChips = document.querySelectorAll('#filterChips .chip');

    // Only run library logic if the element exists (i.e. we are on the homepage)
    if (libraryGrid) {
        fetch('articles.json')
            .then(res => res.json())
            .then(data => {
                articles = data;
                renderArticles('all', '');
            })
            .catch(err => {
                console.error('Error loading technical library index:', err);
                libraryGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--neon-purple); font-family: var(--font-display);">Error loading library. Please refresh the page.</p>`;
            });

        // Event listener for search input
        searchInput.addEventListener('input', () => {
            const activeChip = document.querySelector('#filterChips .chip.active');
            const category = activeChip ? activeChip.getAttribute('data-category') : 'all';
            renderArticles(category, searchInput.value);
        });

        // Event listener for filter chips
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                const category = chip.getAttribute('data-category');
                renderArticles(category, searchInput.value);
            });
        });
    }

    function renderArticles(category, searchString) {
        if (!libraryGrid) return;
        
        const filtered = articles.filter(art => {
            const matchesCategory = (category === 'all' || art.category === category);
            
            const searchLower = searchString.toLowerCase().trim();
            const searchTerms = searchLower.split(/\s+/).filter(t => t);
            
            const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => 
                art.title.toLowerCase().includes(term) ||
                art.excerpt.toLowerCase().includes(term) ||
                art.category.toLowerCase().includes(term) ||
                (art.tags && Array.isArray(art.tags) && art.tags.some(tag => tag.toLowerCase().includes(term))) ||
                (art.tags && typeof art.tags === 'string' && art.tags.toLowerCase().includes(term))
            );
            
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            libraryGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-family: var(--font-display); padding: 60px 0;">No articles match your query.</p>`;
            return;
        }

        libraryGrid.innerHTML = filtered.map((art, idx) => {
            return `
                <a href="${art.url}" style="text-decoration: none; color: inherit; opacity: 0; transform: translateY(15px); animation: fadeInUp 0.4s ease forwards ${idx * 0.04}s;">
                    <div class="nft-card">
                        <img class="nft-image" src="${art.image}" alt="${art.title}">
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; display: flex; justify-content: space-between;">
                            <span>📅 ${art.publishDate}</span>
                            <span>⏱️ ${art.readTime}</span>
                        </div>
                        <h3 style="margin-bottom: 8px; font-family: var(--font-display); font-size: 1.15rem; line-height: 1.4; color: var(--text-main);">${art.title}</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
                            ${art.excerpt}
                        </p>
                        <div class="nft-meta">
                            <span class="badge" style="background: rgba(34, 211, 238, 0.1); color: var(--neon-cyan); border: 1px solid rgba(34, 211, 238, 0.2); font-size: 0.75rem; text-transform: uppercase;">${art.category}</span>
                            <span style="font-size: 0.8rem; color: var(--neon-purple); font-weight: 700; font-family: var(--font-display); display: flex; align-items: center; gap: 4px;">
                                Read &rarr;
                            </span>
                        </div>
                    </div>
                </a>
            `;
        }).join('');
    }
});

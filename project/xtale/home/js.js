document.addEventListener('DOMContentLoaded', function() {
    // Hero 轮播
    initHeroCarousel();

    // 分类标签切换
    initCategoryTabs();

    // 故事卡片交互
    initStoryCards();

    // 热门标签交互
    initHotTags();

    // 排行榜交互
    initRankingItems();
});

// Hero 轮播功能
function initHeroCarousel() {
    const dots = document.querySelectorAll('.hero-dots .dot');
    let currentIndex = 0;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function goToSlide(index) {
        dots[currentIndex].classList.remove('active');
        currentIndex = index;
        dots[currentIndex].classList.add('active');
    }

    // 自动轮播
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % dots.length;
        goToSlide(nextIndex);
    }, 5000);
}

// 分类标签切换
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            console.log('切换分类:', tab.textContent);
        });
    });
}

// 故事卡片交互
function initStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');

    storyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-outline')) {
                console.log('点击阅读按钮');
                return;
            }
            console.log('点击故事卡片');
        });
    });
}

// 热门标签交互
function initHotTags() {
    const tags = document.querySelectorAll('.hot-tag');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            console.log('点击标签:', tag.textContent);
        });
    });
}

// 排行榜交互
function initRankingItems() {
    const rankingItems = document.querySelectorAll('.ranking-item');

    rankingItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('.rank-title');
            if (title) {
                console.log('点击排行榜:', title.textContent);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initInteractions();
});

function initAnimations() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 600 + index * 150);
    });
}

function initInteractions() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

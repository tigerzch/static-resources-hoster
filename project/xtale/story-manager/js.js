// Story Manager Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFilterControls();
    initStoryCards();
    initPagination();
});

// Filter Controls
function initFilterControls() {
    const resetBtn = document.querySelector('.filter-reset');
    const filterSelects = document.querySelectorAll('.filter-select');
    const filterInput = document.querySelector('.filter-input');

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filterSelects.forEach(select => select.selectedIndex = 0);
            if (filterInput) filterInput.value = '';
            showToast('筛选已重置');
        });
    }

    if (filterInput) {
        let searchTimeout;
        filterInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                console.log('Searching for:', this.value);
            }, 300);
        });
    }

    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.value);
        });
    });
}

// Story Cards
function initStoryCards() {
    const storyCards = document.querySelectorAll('.workshop-story-card');

    storyCards.forEach(card => {
        const deleteBtn = card.querySelector('.btn-action-delete, .btn-icon');
        const detailBtn = card.querySelector('.btn-action, .btn-outline');

        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const title = card.querySelector('.workshop-story-title').textContent;
                if (confirm(`确定要删除故事"${title}"吗？此操作不可撤销。`)) {
                    card.style.transform = 'scale(0.8)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.remove();
                        showToast('故事已删除');
                    }, 200);
                }
            });
        }

        if (detailBtn) {
            detailBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = 'story-detail.html';
            });
        }

        card.addEventListener('click', function() {
            window.location.href = 'story-detail.html';
        });
    });

    // Create new story button
    const createBtn = document.querySelector('.page-header .btn-large');
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            showToast('正在创建新故事...');
        });
    }
}

// Pagination
function initPagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');

    paginationNumbers.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            paginationNumbers.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showToast(`跳转到第 ${this.textContent} 页`);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const active = document.querySelector('.pagination-number.active');
            if (active && active.previousElementSibling) {
                active.classList.remove('active');
                active.previousElementSibling.classList.add('active');
                showToast('上一页');
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const active = document.querySelector('.pagination-number.active');
            if (active && active.nextElementSibling) {
                active.classList.remove('active');
                active.nextElementSibling.classList.add('active');
                showToast('下一页');
            }
        });
    }
}

// Toast notification
function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: toastIn 0.3s ease;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes toastIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes toastOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

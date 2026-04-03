// World List JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 处理世界观卡片点击
    const worldCards = document.querySelectorAll('.world-card');
    worldCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是编辑按钮，不触发卡片跳转
            if (e.target.closest('.btn-world-edit')) {
                const editBtn = e.target.closest('.btn-world-edit');
                const href = editBtn.getAttribute('data-href');
                if (href) {
                    window.location.href = href;
                }
                return;
            }

            // 否则跳转到卡片的链接
            const href = card.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });

    // 处理编辑按钮点击
    const editButtons = document.querySelectorAll('.btn-world-edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const href = btn.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});

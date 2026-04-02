// Story Detail Page JS
document.addEventListener('DOMContentLoaded', function() {
    // 返回按钮
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'story-manager.html';
        });
    }

    // 字数统计
    const textarea = document.querySelector('.info-textarea');
    const charCount = document.querySelector('.char-count');

    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            const current = this.value.length;
            charCount.textContent = `${current} / 500`;

            if (current > 500) {
                charCount.style.color = '#ef4444';
            } else {
                charCount.style.color = '';
            }
        });
    }

    // 保存按钮动画
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                已保存
            `;
            this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            this.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.25)';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.boxShadow = '';
            }, 2000);
        });
    }

    // 封面上传点击效果
    const coverArea = document.querySelector('.cover-area');
    if (coverArea) {
        coverArea.addEventListener('click', function() {
            // 这里可以打开文件选择器
            console.log('点击上传封面');
        });
    }

    // 新增章节按钮
    const addChapterBtn = document.querySelector('.btn-add-chapter');
    if (addChapterBtn) {
        addChapterBtn.addEventListener('click', function() {
            console.log('新增章节');
        });
    }

    // 章节卡片操作
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach((card, index) => {
        // 查看按钮
        const viewBtn = card.querySelector('.chapter-action-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('查看章节', index + 1);
            });
        }

        // 编辑按钮
        const editBtn = card.querySelector('.chapter-action-edit');
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('编辑章节', index + 1);
            });
        }

        // 删除按钮
        const deleteBtn = card.querySelector('.chapter-action-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('删除章节', index + 1);
            });
        }
    });
});

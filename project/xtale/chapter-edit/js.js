// Chapter Edit Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Character count for description
    const descriptionTextarea = document.querySelector('.form-textarea');
    const charCount = document.querySelector('.char-count');

    if (descriptionTextarea && charCount) {
        descriptionTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count} / 500`;

            if (count > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = '500 / 500';
            }
        });
    }

    // Add goal card
    const addGoalBtn = document.querySelector('.goal-add-btn');
    const goalsGrid = document.querySelector('.goals-grid');

    if (addGoalBtn && goalsGrid) {
        addGoalBtn.addEventListener('click', function() {
            const addCard = goalsGrid.querySelector('.goal-card-add');
            const goalCard = document.createElement('div');
            goalCard.className = 'goal-card';
            goalCard.innerHTML = `
                <div class="goal-card-content">
                    <textarea class="goal-card-input" placeholder="输入目标描述"></textarea>
                </div>
                <div class="goal-card-footer">
                    <label class="goal-card-toggle">
                        <input type="checkbox">
                        <span class="goal-card-toggle-slider"></span>
                        <span class="goal-card-toggle-label">必须完成</span>
                    </label>
                    <button class="goal-card-delete" onclick="deleteGoal(this)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;
            goalsGrid.insertBefore(goalCard, addCard);
        });
    }

    // Add param row
    const addParamBtn = document.querySelector('.params-table + .btn-add-row');
    const paramsTable = document.querySelector('.params-table');

    if (addParamBtn && paramsTable) {
        addParamBtn.addEventListener('click', function() {
            const paramRow = document.createElement('div');
            paramRow.className = 'param-row';
            paramRow.innerHTML = `
                <div class="col-name">
                    <input type="text" class="form-input-inline" placeholder="参数名称">
                </div>
                <div class="col-ptype">
                    <select class="form-select">
                        <option>数字</option>
                        <option>字符串</option>
                        <option>布尔值</option>
                        <option>JSON</option>
                    </select>
                </div>
                <div class="col-pvalue">
                    <input type="text" class="form-input-inline" placeholder="参数值">
                </div>
                <div class="col-action">
                    <button class="btn-icon" onclick="deleteRow(this)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;
            paramsTable.appendChild(paramRow);
        });
    }

    // Map tabs
    const mapTabs = document.querySelectorAll('.map-tab');
    mapTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            mapTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });


    // Cover upload click
    const coverUpload = document.querySelector('.cover-upload');
    if (coverUpload) {
        coverUpload.addEventListener('click', function() {
            // Here you would open a file dialog
            console.log('Cover upload clicked');
        });
    }

    // Save draft button
    const saveDraftBtn = document.querySelector('.header-actions .btn-secondary');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            alert('草稿已保存！');
        });
    }

    // Publish chapter button
    const publishBtn = document.querySelector('.header-actions .btn-primary');
    if (publishBtn) {
        publishBtn.addEventListener('click', function() {
            if (confirm('确定要发布这个章节吗？')) {
                alert('章节已发布！');
            }
        });
    }
});

// Delete row function
function deleteRow(btn) {
    const row = btn.closest('.param-row');
    if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.2s ease';
        setTimeout(() => {
            row.remove();
        }, 200);
    }
}

// Delete goal function
function deleteGoal(btn) {
    const goalCard = btn.closest('.goal-card');
    if (goalCard) {
        goalCard.style.opacity = '0';
        goalCard.style.transform = 'scale(0.95)';
        goalCard.style.transition = 'all 0.2s ease';
        setTimeout(() => {
            goalCard.remove();
        }, 200);
    }
}

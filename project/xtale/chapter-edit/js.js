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
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 0 0 1-2-2V6m3 0V4a2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"/>
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
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"/>
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
            const targetTab = this.dataset.tab;
            mapTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show/hide tab content
            document.querySelectorAll('.map-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById('tab-' + targetTab).classList.add('active');
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

    // Key Plot functionality - Wide
    const plotLines = document.getElementById('plotLines');
    const plotInput = document.getElementById('plotInput');
    const addPlotBtn = document.getElementById('addPlotBtn');
    const nextLineNum = document.getElementById('nextLineNum');
    const entitiesList = document.getElementById('entitiesList');

    let plots = [
        '#李慕尘 在 #城镇中心 醒来',
        '#苏清颜 出现并提供帮助',
        '两人前往 #森林区域 寻找 #神秘老人'
    ];

    function renderPlots() {
        if (!plotLines) return;

        plotLines.innerHTML = plots.map((text, index) => {
            const highlightedText = text.replace(/#[^\s#，。！？,.!?]+/g, function(match) {
                return `<span class="plot-line-entity">${match}</span>`;
            });
            return `
                <div class="plot-line-item" data-index="${index}">
                    <div class="plot-line-num">${index + 1}</div>
                    <div class="plot-line-text">${highlightedText}</div>
                    <div class="plot-line-actions">
                        <button class="plot-line-btn" onclick="editPlot(${index})">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="plot-line-btn delete" onclick="deletePlot(${index})">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        if (nextLineNum) nextLineNum.textContent = plots.length + 1;
        renderEntities();
    }

    function renderEntities() {
        if (!entitiesList) return;

        const allText = plots.join(' ');
        const entityMatches = allText.match(/#[^\s#，。！？,.!?]+/g) || [];

        const entityCount = {};
        entityMatches.forEach(e => {
            entityCount[e] = (entityCount[e] || 0) + 1;
        });

        const sortedEntities = Object.entries(entityCount).sort((a, b) => b[1] - a[1]);

        entitiesList.innerHTML = sortedEntities.map(([entity, count]) =>
            `<span class="entity-chip">${entity.substring(1)}<span class="entity-chip-count">${count}</span></span>`
        ).join('');
    }

    function addPlot() {
        if (!plotInput) return;
        const text = plotInput.value.trim();
        if (!text) return;

        plots.push(text);
        plotInput.value = '';
        renderPlots();
    }

    window.deletePlot = function(index) {
        plots.splice(index, 1);
        renderPlots();
    };

    window.editPlot = function(index) {
        const text = plots[index];
        if (plotInput) {
            plotInput.value = text;
            plotInput.focus();
            plots.splice(index, 1);
            renderPlots();
        }
    };

    if (addPlotBtn) {
        addPlotBtn.addEventListener('click', addPlot);
    }

    if (plotInput) {
        plotInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addPlot();
            }
        });
    }

    // Initial render
    renderPlots();

    // Chapter Characters functionality
    const selectFromWorldBtn = document.getElementById('selectFromWorldBtn');
    const createCharBtn = document.getElementById('createCharBtn');
    const chapterCharsGrid = document.getElementById('chapterCharsGrid');

    const charEmojis = ['🧑‍🦰', '👩', '🧙', '🦹', '🧑‍💼', '👨‍⚕️', '🕵️', '🧛', '🤖', '🧔', '💃', '👮'];

    function addCharacterCard(name = '', source = '本章自创') {
        if (!chapterCharsGrid) return;

        const addCard = chapterCharsGrid.querySelector('.chapter-char-card-add');
        const emoji = charEmojis[Math.floor(Math.random() * charEmojis.length)];
        const isWorld = source === '世界观角色';

        const charCard = document.createElement('div');
        charCard.className = 'chapter-char-card ' + (isWorld ? 'chapter-char-card-world' : 'chapter-char-card-local');
        charCard.innerHTML = `
            <button class="char-delete-btn" onclick="deleteCharCard(this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"/>
                </svg>
            </button>
            <div class="char-avatar">
                <span class="char-emoji">${emoji}</span>
                <input type="text" class="char-name-input" value="${name || '新角色'}" placeholder="角色名">
                <span class="char-source-badge ${isWorld ? '' : 'char-source-badge-local'}">${isWorld ? '世界观' : '自创'}</span>
            </div>
            <div class="char-meta">
                <select class="char-source-select">
                    <option ${isWorld ? 'selected' : ''}>世界观角色</option>
                    <option ${isWorld ? '' : 'selected'}>本章自创</option>
                </select>
            </div>
        `;
        chapterCharsGrid.insertBefore(charCard, addCard);
    }

    window.deleteCharCard = function(btn) {
        const charCard = btn.closest('.chapter-char-card');
        if (charCard) {
            charCard.style.opacity = '0';
            charCard.style.transform = 'scale(0.95)';
            charCard.style.transition = 'all 0.2s ease';
            setTimeout(() => {
                charCard.remove();
            }, 200);
        }
    };

    if (createCharBtn) {
        createCharBtn.addEventListener('click', function() {
            addCharacterCard();
        });
    }

    if (selectFromWorldBtn) {
        selectFromWorldBtn.addEventListener('click', function() {
            // Mock: Add some predefined characters from "world"
            addCharacterCard('夜无殇', '世界观角色');
            addCharacterCard('月灵', '世界观角色');
        });
    }

    // Update badge when source select changes
    if (chapterCharsGrid) {
        chapterCharsGrid.addEventListener('change', function(e) {
            if (e.target.classList.contains('char-source-select')) {
                const card = e.target.closest('.chapter-char-card');
                const badge = card.querySelector('.char-source-badge');
                const source = e.target.value;
                if (badge) {
                    const isWorld = source === '世界观角色';
                    badge.textContent = isWorld ? '世界观' : '自创';

                    // Update badge style and card class
                    if (isWorld) {
                        badge.classList.remove('char-source-badge-local');
                        card.classList.remove('chapter-char-card-local');
                        card.classList.add('chapter-char-card-world');
                    } else {
                        badge.classList.add('char-source-badge-local');
                        card.classList.remove('chapter-char-card-world');
                        card.classList.add('chapter-char-card-local');
                    }
                }
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

// Map & Initialization Functions
const objectEmojis = ['🗄️', '🪑', '🕯️', '📜', '⚱️', '🗝️', '📦', '🖼️', '🗡️', '🛡️', '🔮', '📚'];

// Add Entrance
window.addEntrance = function() {
    const entranceTable = document.querySelector('#tab-entrances .entrance-table');
    if (!entranceTable) return;

    const entranceRow = document.createElement('div');
    entranceRow.className = 'entrance-row';
    entranceRow.innerHTML = `
        <div class="col-ename">
            <input type="text" class="form-input-inline" value="新出入口">
        </div>
        <div class="col-target">
            <input type="text" class="form-input-inline" value="未知区域">
        </div>
        <div class="col-estatus">
            <span class="status-label">关闭</span>
            <label class="toggle-switch">
                <input type="checkbox">
                <span class="slider"></span>
            </label>
            <span class="status-label">开启</span>
        </div>
        <div class="col-action">
            <button class="btn-icon" onclick="deleteEntrance(this)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 0 0 1 2 2h4a2 0 0 1 2 2v2"/>
                </svg>
            </button>
        </div>
    `;
    entranceTable.appendChild(entranceRow);
};

// Delete Entrance
window.deleteEntrance = function(btn) {
    const row = btn.closest('.entrance-row');
    if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.2s ease';
        setTimeout(() => {
            row.remove();
        }, 200);
    }
};

// Add Object
window.addObject = function() {
    const objectsGrid = document.querySelector('.map-objects-grid');
    if (!objectsGrid) return;

    const addCard = objectsGrid.querySelector('.init-object-card-add');
    const emoji = objectEmojis[Math.floor(Math.random() * objectEmojis.length)];

    const objectCard = document.createElement('div');
    objectCard.className = 'init-object-card';
    objectCard.innerHTML = `
        <button class="variable-delete-btn" onclick="deleteObject(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 0 0 1 2 2h4a2 0 0 1 2 2v2"/>
            </svg>
        </button>
        <div class="variable-icon">
            <span class="variable-emoji">${emoji}</span>
            <input type="text" class="variable-name-input" value="新物体">
            <span class="object-type-badge">物体</span>
        </div>
        <div class="object-event-config">
            <label class="form-label">调查事件</label>
            <textarea class="form-textarea" rows="3" placeholder="玩家调查此物体时触发的事件描述"></textarea>
        </div>
    `;
    objectsGrid.insertBefore(objectCard, addCard);
};

// Delete Object
window.deleteObject = function(btn) {
    const objectCard = btn.closest('.init-object-card');
    if (objectCard) {
        objectCard.style.opacity = '0';
        objectCard.style.transform = 'scale(0.95)';
        objectCard.style.transition = 'all 0.2s ease';
        setTimeout(() => {
            objectCard.remove();
        }, 200);
    }
};

// Add Init Character
window.addInitChar = function() {
    const charsGrid = document.querySelector('.map-chars-grid');
    if (!charsGrid) return;

    const addCard = charsGrid.querySelector('.init-char-card-add');
    const emoji = charEmojis[Math.floor(Math.random() * charEmojis.length)];
    const isWorld = Math.random() > 0.5;

    const charCard = document.createElement('div');
    charCard.className = 'init-char-card';
    charCard.innerHTML = `
        <button class="variable-delete-btn" onclick="deleteInitChar(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 0 0 1 2 2h4a2 0 0 1 2 2v2"/>
            </svg>
        </button>
        <div class="char-avatar">
            <span class="char-emoji">${emoji}</span>
            <input type="text" class="char-name-input" value="新角色">
            <span class="char-source-badge ${isWorld ? '' : 'char-source-badge-local'}">${isWorld ? '世界观' : '自创'}</span>
        </div>
        <div class="char-event-config">
            <label class="form-label">默认对话事件</label>
            <textarea class="form-textarea" rows="3" placeholder="玩家与该角色对话时触发的默认内容"></textarea>
        </div>
    `;
    charsGrid.insertBefore(charCard, addCard);
};

// Delete Init Character
window.deleteInitChar = function(btn) {
    const charCard = btn.closest('.init-char-card');
    if (charCard) {
        charCard.style.opacity = '0';
        charCard.style.transform = 'scale(0.95)';
        charCard.style.transition = 'all 0.2s ease';
        setTimeout(() => {
            charCard.remove();
        }, 200);
    }
};

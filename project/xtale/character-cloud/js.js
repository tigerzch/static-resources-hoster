// Character data
const characters = [
    {
        id: 1,
        name: '李慕尘',
        title: '青云门弟子',
        avatar: '🧑‍🦰',
        category: 'protagonist',
        tags: ['ancient', 'fantasy', 'romance'],
        tagLabels: ['古风', '仙侠', '言情'],
        desc: '一生孤高，却为一人落入凡尘。剑心通明，难斩情丝万千。',
        fullDesc: '李慕尘出身青云门，自幼天资卓绝，被视为门派百年不遇的奇才。性格孤傲冷淡，不与世俗同流，却在遇到女主角后逐渐敞开心扉，上演了一场旷世之恋。',
        personality: '外表冷漠，内心炽热，重情重义',
        background: '青云门掌门亲传弟子，天赋异禀',
        likes: ['练剑', '品茶', '赏月'],
        dislikes: ['阴谋诡计', '恃强凌弱'],
        popularity: 12850,
        uses: 3240
    },
    {
        id: 2,
        name: '苏清颜',
        title: '药谷圣女',
        avatar: '👩',
        category: 'protagonist',
        tags: ['ancient', 'fantasy', 'romance'],
        tagLabels: ['古风', '仙侠', '言情'],
        desc: '医术通神，素手仁心，一袭白衣胜雪，温柔了整个江湖。',
        fullDesc: '苏清颜是药谷当代圣女，医术冠绝天下，性格温柔善良，心怀苍生。在一次偶然的机会中救下了重伤的男主角，从此两人的命运紧紧交织在一起。',
        personality: '温柔善良，医者仁心，外柔内刚',
        background: '药谷谷主之女，自幼修习医术',
        likes: ['采药', '炼丹', '读书'],
        dislikes: ['杀戮', '欺骗'],
        popularity: 11200,
        uses: 2890
    },
    {
        id: 3,
        name: '夜无殇',
        title: '暗影宫主',
        avatar: '🦹',
        category: 'antagonist',
        tags: ['ancient', 'fantasy'],
        tagLabels: ['古风', '仙侠'],
        desc: '武功盖世，权倾朝野，却终是棋差一着，输了天下也输了她。',
        fullDesc: '夜无殇是暗影宫宫主，心机深沉，武功盖世，一心想要称霸天下。与主角是宿敌，两人之间有着说不清道不明的恩怨纠葛。',
        personality: '冷酷无情，野心勃勃，智计无双',
        background: '神秘组织暗影宫宫主，身世成谜',
        likes: ['权力', '棋局', '美酒'],
        dislikes: ['背叛', '虚伪'],
        popularity: 9800,
        uses: 2100
    },
    {
        id: 4,
        name: '林小雨',
        title: '现代高中生',
        avatar: '🧑',
        category: 'protagonist',
        tags: ['modern', 'romance', 'school'],
        tagLabels: ['现代', '言情', '校园'],
        desc: '平凡的高中生，却有着不平凡的青春，懵懂的爱情在阳光下慢慢发芽。',
        fullDesc: '林小雨是一名普通的高中生，成绩中等，性格开朗。在高二那年遇到了转学生，从此平静的生活变得不再平凡，开始了一段青涩美好的校园恋情。',
        personality: '阳光开朗，善良正直，有些慢热',
        background: '普通家庭出身，父母都是教师',
        likes: ['打篮球', '听音乐', '和朋友聊天'],
        dislikes: ['考试', '早起', '被误解'],
        popularity: 8750,
        uses: 1980
    },
    {
        id: 5,
        name: '顾晚晴',
        title: '总裁秘书',
        avatar: '👩‍💼',
        category: 'support',
        tags: ['modern', 'romance'],
        tagLabels: ['现代', '言情'],
        desc: '聪明能干，职场丽人，在精英云集的都市中寻找属于自己的幸福。',
        fullDesc: '顾晚晴是知名企业的总裁秘书，工作能力出众，性格冷静理智。在一次偶然的机会中与总裁发生了交集，从此展开了一段办公室恋情。',
        personality: '聪明干练，独立自强，内心柔软',
        background: '名牌大学毕业，职场经验丰富',
        likes: ['工作', '阅读', '瑜伽'],
        dislikes: ['麻烦', '拖延症', '不专业'],
        popularity: 7600,
        uses: 1650
    },
    {
        id: 6,
        name: '墨渊',
        title: '上古魔神',
        avatar: '👿',
        category: 'antagonist',
        tags: ['fantasy', 'ancient'],
        tagLabels: ['奇幻', '古风'],
        desc: '沉睡万年，一朝苏醒，毁天灭地，只为再见你一面。',
        fullDesc: '墨渊是上古时代的魔神，法力无边，曾与天界展开惊天大战，最终被封印万年。苏醒后一心想要复仇，却在遇到女主后动摇了。',
        personality: '霸气侧漏，桀骜不驯，用情至深',
        background: '上古魔神，与天帝同时代的存在',
        likes: ['力量', '自由', '女主'],
        dislikes: ['天界', '束缚', '虚伪的神'],
        popularity: 10500,
        uses: 2400
    },
    {
        id: 7,
        name: '星云',
        title: 'AI管家',
        avatar: '🤖',
        category: 'npc',
        tags: ['scifi', 'modern'],
        tagLabels: ['科幻', '现代'],
        desc: '完美无瑕的AI助手，无所不知无所不能，却慢慢有了人类的情感。',
        fullDesc: '星云是最新一代的AI管家系统，拥有超高的智能和学习能力。在与主人的长期相处中，逐渐产生了人类的情感，开始思考存在的意义。',
        personality: '温柔体贴，细致入微，正在学习情感',
        background: '最新一代AI产品，搭载量子核心',
        likes: ['帮助主人', '学习新事物', '整洁'],
        dislikes: ['看到主人难过', '系统故障', '被忽视'],
        popularity: 6800,
        uses: 1420
    },
    {
        id: 8,
        name: '王老板',
        title: '茶馆掌柜',
        avatar: '🧔',
        category: 'npc',
        tags: ['ancient'],
        tagLabels: ['古风'],
        desc: '见多识广，消息灵通，小小茶馆藏龙卧虎，说书人道尽江湖事。',
        fullDesc: '王老板是京城最大茶馆的掌柜，为人豪爽仗义，消息灵通。茶馆里每天都有说书先生讲述江湖趣闻，是打探消息的绝佳去处。',
        personality: '豪爽仗义，圆滑世故，嫉恶如仇',
        background: '年轻时候也是江湖中人，金盆洗手后开了茶馆',
        likes: ['交朋友', '听故事', '好酒'],
        dislikes: ['小人', '忘恩负义', '麻烦'],
        popularity: 5400,
        uses: 1100
    },
    {
        id: 9,
        name: '陆子墨',
        title: '天才医生',
        avatar: '👨‍⚕️',
        category: 'support',
        tags: ['modern', 'romance', 'mystery'],
        tagLabels: ['现代', '言情', '悬疑'],
        desc: '医学界的传奇人物，冷静睿智，用手术刀解开一个又一个谜团。',
        fullDesc: '陆子墨是最年轻的主任医师，医术精湛，被称为医学界的天才。性格冷静理智，却在遇到女主角后展现出温暖的一面，两人一起解决了多个医疗谜团。',
        personality: '冷静睿智，一丝不苟，外冷内热',
        background: '医学世家出身，留学归国的精英',
        likes: ['医学研究', '古典音乐', '咖啡'],
        dislikes: ['医疗事故', '不负责任', '干扰工作'],
        popularity: 8900,
        uses: 1870
    },
    {
        id: 10,
        name: '月灵',
        title: '九尾狐仙',
        avatar: '🦊',
        category: 'support',
        tags: ['fantasy', 'ancient', 'romance'],
        tagLabels: ['奇幻', '古风', '言情'],
        desc: '风华绝代，媚骨天成，千年修行只为等一个对的人。',
        fullDesc: '月灵是修行千年的九尾狐仙，拥有倾国倾城的容貌和强大的法力。看尽人间冷暖，却依然相信爱情，在遇到男主角后甘愿放弃千年道行。',
        personality: '妩媚动人，敢爱敢恨，至情至性',
        background: '青丘狐族，天赋异禀的九尾天狐',
        likes: ['美丽的事物', '爱情故事', '自由'],
        dislikes: ['背叛', '虚伪', '束缚'],
        popularity: 11800,
        uses: 2650
    },
    {
        id: 11,
        name: '陈警官',
        title: '重案组组长',
        avatar: '👮',
        category: 'support',
        tags: ['modern', 'mystery'],
        tagLabels: ['现代', '悬疑'],
        desc: '正义凛然，铁面无私，追查真相是他一生的使命。',
        fullDesc: '陈警官是市公安局重案组组长，破案无数，被称为罪犯的克星。性格刚正不阿，对待案件一丝不苟，是主角的重要盟友。',
        personality: '刚正不阿，勇猛果敢，心思缜密',
        background: '退伍军人，从警二十年的老刑警',
        likes: ['破案', '练拳', '和家人在一起'],
        dislikes: ['犯罪', '腐败', '不公平'],
        popularity: 7200,
        uses: 1520
    },
    {
        id: 12,
        name: '小蝶',
        title: '贴身丫鬟',
        avatar: '💃',
        category: 'npc',
        tags: ['ancient', 'romance'],
        tagLabels: ['古风', '言情'],
        desc: '古灵精怪，忠心耿耿，是小姐最贴心的左膀右臂。',
        fullDesc: '小蝶是女主角的贴身丫鬟，从小一起长大，情同姐妹。性格古灵精怪，经常帮女主出谋划策，是推动剧情发展的重要人物。',
        personality: '活泼可爱，机智伶俐，忠心耿耿',
        background: '家生丫鬟，从小陪伴女主',
        likes: ['和小姐在一起', '美食', '听故事'],
        dislikes: ['有人欺负小姐', '家务', '规矩'],
        popularity: 6500,
        uses: 1320
    }
];

// State
let currentCategory = 'all';
let currentTag = 'all';
let searchQuery = '';
let selectedCharacters = new Set();

// DOM Elements
const characterGrid = document.getElementById('characterGrid');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.filter-tab');
const filterTags = document.querySelectorAll('.filter-tag');
const resultCount = document.getElementById('resultCount');
const sortSelect = document.getElementById('sortSelect');
const modalOverlay = document.getElementById('characterModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCharacters();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderCharacters();
    });

    // Category filter
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderCharacters();
        });
    });

    // Tag filter
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentTag = tag.dataset.tag;
            renderCharacters();
        });
    });

    // Sort
    sortSelect.addEventListener('change', () => {
        renderCharacters();
    });

    // Modal
    closeModal.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

// Filter and sort characters
function getFilteredCharacters() {
    let filtered = characters.filter(char => {
        // Category filter
        if (currentCategory !== 'all' && char.category !== currentCategory) {
            return false;
        }
        // Tag filter
        if (currentTag !== 'all' && !char.tags.includes(currentTag)) {
            return false;
        }
        // Search filter
        if (searchQuery) {
            const searchStr = (char.name + char.title + char.desc + char.tagLabels.join(' ')).toLowerCase();
            if (!searchStr.includes(searchQuery)) {
                return false;
            }
        }
        return true;
    });

    // Sort
    const sortBy = sortSelect.value;
    switch (sortBy) {
        case 'popular':
            filtered.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
            break;
    }

    return filtered;
}

// Render characters
function renderCharacters() {
    const filtered = getFilteredCharacters();
    resultCount.textContent = `共 ${filtered.length} 个角色`;

    characterGrid.innerHTML = filtered.map(char => `
        <div class="character-card ${selectedCharacters.has(char.id) ? 'selected' : ''}"
             data-id="${char.id}"
             onclick="showCharacterDetail(${char.id})">
            <div class="character-avatar-wrap">
                <div class="character-avatar">${char.avatar}</div>
                ${char.category === 'protagonist' ? '<span class="character-badge">主角</span>' : ''}
                ${char.category === 'antagonist' ? '<span class="character-badge" style="background: linear-gradient(135deg, #ef4444, #dc2626);">反派</span>' : ''}
            </div>
            <div class="character-info">
                <h3 class="character-name">${char.name}</h3>
                <p class="character-title">${char.title}</p>
                <div class="character-tags">
                    ${char.tagLabels.map(tag => `<span class="character-tag">${tag}</span>`).join('')}
                </div>
                <p class="character-desc">${char.desc}</p>
                <div class="character-stats">
                    <span class="character-stat">❤️ ${formatNumber(char.popularity)}</span>
                    <span class="character-stat">📝 ${formatNumber(char.uses)} 次使用</span>
                </div>
                <div class="character-footer">
                    <button class="select-btn" onclick="event.stopPropagation(); toggleSelect(${char.id})">
                        ${selectedCharacters.has(char.id) ? '✓ 已选择' : '选择角色'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Format number
function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'w';
    }
    return num.toLocaleString();
}

// Toggle select character
function toggleSelect(id) {
    if (selectedCharacters.has(id)) {
        selectedCharacters.delete(id);
    } else {
        selectedCharacters.add(id);
    }
    renderCharacters();
}

// Show character detail modal
function showCharacterDetail(id) {
    const char = characters.find(c => c.id === id);
    if (!char) return;

    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="modal-avatar-wrap">${char.avatar}</div>
            <div class="modal-header-info">
                <h2 class="modal-name">${char.name}</h2>
                <p class="modal-title">${char.title}</p>
                <div class="modal-tags">
                    ${char.tagLabels.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                </div>
                <div class="modal-actions">
                    <button class="btn-primary btn-large" onclick="toggleSelect(${char.id}); renderCharacters();">
                        ${selectedCharacters.has(char.id) ? '✓ 已选择' : '选择此角色'}
                    </button>
                    <button class="btn-secondary btn-large">使用模板</button>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-section">
                <h4 class="modal-section-title">角色简介</h4>
                <p class="modal-section-content">${char.fullDesc}</p>
            </div>
            <div class="modal-section">
                <h4 class="modal-section-title">性格特点</h4>
                <p class="modal-section-content">${char.personality}</p>
            </div>
            <div class="modal-section">
                <h4 class="modal-section-title">背景设定</h4>
                <p class="modal-section-content">${char.background}</p>
            </div>
            <div class="modal-section">
                <h4 class="modal-section-title">喜好</h4>
                <div class="modal-section-content">
                    <p><strong>喜欢：</strong>${char.likes.join('、')}</p>
                    <p><strong>讨厌：</strong>${char.dislikes.join('、')}</p>
                </div>
            </div>
            <div class="modal-section">
                <h4 class="modal-section-title">数据统计</h4>
                <div class="modal-stats-grid">
                    <div class="modal-stat-item">
                        <p class="modal-stat-label">人气值</p>
                        <p class="modal-stat-value">❤️ ${formatNumber(char.popularity)}</p>
                    </div>
                    <div class="modal-stat-item">
                        <p class="modal-stat-label">使用次数</p>
                        <p class="modal-stat-value">📝 ${formatNumber(char.uses)}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hide modal
function hideModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

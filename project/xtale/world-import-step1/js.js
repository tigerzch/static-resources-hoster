// World Import Step 1 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let uploadedFiles = [];

    // Elements
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const uploadArea = document.getElementById('uploadArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const clearFilesBtn = document.getElementById('clearFilesBtn');
    const startAnalysisBtn = document.getElementById('startAnalysisBtn');
    const analysisSection = document.getElementById('analysisSection');
    const nextStepFrom1Btn = document.getElementById('nextStepFrom1Btn');

    // File upload functionality
    if (selectFileBtn) {
        selectFileBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }

    if (uploadArea) {
        uploadArea.addEventListener('click', (e) => {
            if (e.target === uploadArea || e.target.closest('.upload-dropzone')) {
                fileInput.click();
            }
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dropzone = uploadArea.querySelector('.upload-dropzone');
            if (dropzone) dropzone.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            const dropzone = uploadArea.querySelector('.upload-dropzone');
            if (dropzone) dropzone.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropzone = uploadArea.querySelector('.upload-dropzone');
            if (dropzone) dropzone.classList.remove('drag-over');

            const files = e.dataTransfer.files;
            handleFiles(files);
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (uploadedFiles.length < 20) {
                uploadedFiles.push(file);
            }
        });
        renderFileList();
        updateStartButton();
    }

    function renderFileList() {
        if (!fileList) return;
        fileList.innerHTML = '';
        if (fileCount) fileCount.textContent = uploadedFiles.length;

        uploadedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            const fileExt = file.name.split('.').pop().toLowerCase();
            let fileClass = 'file-txt';
            if (fileExt === 'pdf') fileClass = 'file-pdf';
            else if (fileExt === 'doc' || fileExt === 'docx') fileClass = 'file-doc';

            let fileIconEmoji = '📄';
            if (fileExt === 'pdf') fileIconEmoji = '📕';
            else if (fileExt === 'doc' || fileExt === 'docx') fileIconEmoji = '📘';

            fileItem.innerHTML = `
                <div class="file-icon ${fileClass}">
                    <span>${fileIconEmoji}</span>
                </div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">
                        <span>${formatFileSize(file.size)}</span>
                        <div class="file-status">
                            <svg class="file-status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div class="file-progress-bar">
                            <div class="file-progress-fill" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
                <button class="btn-remove-file" data-index="${index}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;

            fileList.appendChild(fileItem);
        });

        // Add remove listeners
        document.querySelectorAll('.btn-remove-file').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                uploadedFiles.splice(index, 1);
                renderFileList();
                updateStartButton();
            });
        });
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function updateStartButton() {
        if (startAnalysisBtn) {
            startAnalysisBtn.disabled = uploadedFiles.length === 0;
            if (!startAnalysisBtn.disabled) {
                startAnalysisBtn.removeAttribute('disabled');
            }
        }
    }

    // Clear files
    if (clearFilesBtn) {
        clearFilesBtn.addEventListener('click', () => {
            uploadedFiles = [];
            renderFileList();
            updateStartButton();
        });
    }

    // Start analysis
    if (startAnalysisBtn) {
        startAnalysisBtn.addEventListener('click', (e) => {
            if (uploadedFiles.length === 0) {
                e.preventDefault();
                return;
            }

            // Hide upload section, show analysis
            const uploadSection = document.querySelector('.import-section:not(.analysis-section)');
            if (uploadSection) {
                uploadSection.style.display = 'none';
            }
            if (analysisSection) {
                analysisSection.style.display = 'block';
            }

            // Simulate analysis progress
            simulateAnalysis();
            e.preventDefault();
        });
    }

    function simulateAnalysis() {
        const progress1 = document.getElementById('progress1');
        const progress2 = document.getElementById('progress2');
        const progress3 = document.getElementById('progress3');

        if (!progress1) return;

        let p1 = 0;
        const interval1 = setInterval(() => {
            p1 += 2;
            progress1.style.width = p1 + '%';
            if (p1 >= 100) {
                clearInterval(interval1);

                // Start step 2
                if (progress2) {
                    let p2 = 0;
                    const interval2 = setInterval(() => {
                        p2 += 3;
                        progress2.style.width = p2 + '%';
                        if (p2 >= 100) {
                            clearInterval(interval2);

                            // Start step 3
                            if (progress3) {
                                let p3 = 0;
                                const interval3 = setInterval(() => {
                                    p3 += 4;
                                    progress3.style.width = p3 + '%';
                                    if (p3 >= 100) {
                                        clearInterval(interval3);

                                        // Show next step button
                                        if (nextStepFrom1Btn) {
                                            nextStepFrom1Btn.style.display = 'inline-flex';
                                        }
                                    }
                                }, 50);
                            }
                        }
                    }, 50);
                }
            }
        }, 50);
    }

    // Initialize
    updateStartButton();
});

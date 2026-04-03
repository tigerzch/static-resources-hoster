// World Import Step 3 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Go to world edit
    const goToWorldEditBtn = document.getElementById('goToWorldEditBtn');
    if (goToWorldEditBtn) {
        goToWorldEditBtn.addEventListener('click', () => {
            window.location.href = 'world-edit.html';
        });
    }
});

// World Import Step 2 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Data card selection
    document.addEventListener('click', (e) => {
        const dataCard = e.target.closest('.data-card');
        if (dataCard && !dataCard.classList.contains('data-card-disabled')) {
            const checkbox = dataCard.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            dataCard.classList.toggle('data-card-selected');
        }
    });
});

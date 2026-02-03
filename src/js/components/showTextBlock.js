document.addEventListener('DOMContentLoaded', function() {
    const seotextBlocks = document.querySelectorAll('.openBlock');

    seotextBlocks.forEach(block => {
        const toggleBtn = block.querySelector('.toggleBtn');
        if (!toggleBtn) return;

        const toggleText = toggleBtn.querySelector('span');
        const icon = toggleBtn.querySelector('svg, i');

        toggleBtn.addEventListener('click', function() {
            block.classList.toggle('open');

            if (block.classList.contains('open')) {
                toggleText.textContent = 'Свернуть';
                if (icon) {
                    icon.classList.add('rotated');
                }
            } else {
                toggleText.textContent = 'Читать далее';
                if (icon) {
                    icon.classList.remove('rotated');
                }
            }
        });
    });
});

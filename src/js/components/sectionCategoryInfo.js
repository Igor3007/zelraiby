document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.sectionCategoryInfo');
    if (!section) return;

    const content = section.querySelector('.sectionCategoryInfo__content');
    const showMoreBtn = section.querySelector('.showMore');

    const contentHeight = content.scrollHeight;
    const maxHeight = 128;

    if (contentHeight > maxHeight) {
        showMoreBtn.style.display = 'inline-block';

        content.style.maxHeight = maxHeight + 'px';
        content.style.overflow = 'hidden';

        content.style.transition = 'max-height 0.3s ease';

        let isExpanded = false;

        showMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                content.style.maxHeight = contentHeight + 'px';
                showMoreBtn.textContent = 'Скрыть';
                isExpanded = true;
            } else {
                content.style.maxHeight = maxHeight + 'px';
                showMoreBtn.textContent = 'Показать ещё';
                isExpanded = false;
            }
        });
    } else {
        showMoreBtn.style.display = 'none';
    }
});

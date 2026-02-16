document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.contentNavigation__menu_item');

    function activateMenuItem(clickedItem) {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });

        clickedItem.classList.add('active');
    }

    menuItems.forEach(item => {
        const title = item.querySelector('.contentNavigation__menu_item-title');

        if (title) {
            title.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const parentItem = this.closest('.contentNavigation__menu_item');
                if (parentItem) {
                    activateMenuItem(parentItem);
                }
            });

            title.style.cursor = 'pointer';
        }
    });

    const hasActive = Array.from(menuItems).some(item => item.classList.contains('active'));
    if (!hasActive && menuItems.length > 0) {
        menuItems[0].classList.add('active');
    }
});

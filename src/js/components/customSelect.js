class SortSelector {
    constructor(container) {
        this.container = container;
        this.sortSelect = container.querySelector('.contentSort__select');
        this.sortList = this.sortSelect.querySelector('ul');
        this.listItems = this.sortList.querySelectorAll('li');

        this.customTrigger = null;
        this.isMobile = window.innerWidth <= 1025;

        this.init();
    }

    init() {
        this.bindEvents();
        this.switchMode();
    }

    setActiveItem(value, text) {
        this.listItems.forEach(item => {
            const isActive = item.dataset.value === value;
            item.classList.toggle('active', isActive);
        });

        if (!this.isMobile && this.customTrigger) {
            this.customTrigger.textContent = text;
        }
    }

    createCustomSelect() {
        if (this.customTrigger) return;

        const activeItem = Array.from(this.listItems).find(item => item.classList.contains('active'));
        const activeText = activeItem ? activeItem.textContent : 'По популярности';

        this.customTrigger = document.createElement('div');
        this.customTrigger.className = 'custom-select-trigger';
        this.customTrigger.textContent = activeText;

        this.sortSelect.insertBefore(this.customTrigger, this.sortList);

        this.customTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleTriggerClick();
        });
    }

    handleTriggerClick() {
        this.customTrigger.classList.toggle('active');

        if (this.customTrigger.classList.contains('active')) {
            this.sortList.classList.add('show');
        } else {
            this.sortList.classList.remove('show');
        }
    }

    removeCustomSelect() {
        if (this.customTrigger) {
            this.customTrigger.remove();
            this.customTrigger = null;
        }
        this.sortList.classList.remove('show');
    }

    switchMode() {
        this.isMobile = window.innerWidth <= 1025;

        if (this.isMobile) {
            this.removeCustomSelect();
        } else {
            this.createCustomSelect();
        }
    }

    bindEvents() {
        this.listItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();

                const value = item.dataset.value;
                const text = item.textContent;

                this.setActiveItem(value, text);

                if (!this.isMobile && this.customTrigger) {
                    this.customTrigger.classList.remove('active');
                    this.sortList.classList.remove('show');
                    this.customTrigger.textContent = text;
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!this.isMobile && this.customTrigger) {
                if (!this.customTrigger.contains(e.target) && !this.sortList.contains(e.target)) {
                    this.customTrigger.classList.remove('active');
                    this.sortList.classList.remove('show');
                }
            }
        });

        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            const nowMobile = window.innerWidth <= 1025;

            if (wasMobile !== nowMobile) {
                this.switchMode();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const sortContainers = document.querySelectorAll('.contentSort');

    if (sortContainers.length === 0) {
        console.warn('Не найдено элементов с классом .contentSort');
        return;
    }

    sortContainers.forEach((container, index) => {
        try {
            new SortSelector(container);
        } catch (error) {
            console.error(`Ошибка инициализации сортировки`, error);
        }
    });
});

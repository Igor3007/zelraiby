export class FilterOffeers {
    constructor(params) {
        this.$el = document.querySelector(params.el) || document;
        this.filterItems = this.$el.querySelectorAll('[data-filter]');
        this.currencyItems = this.$el.querySelectorAll('[data-currency]');
        // Сохраняем оригинальные слайды
        this.originalSlides = this.$el.querySelectorAll('[data-filter-id]');
        this.slider = params.slider;
        this.currentFilter = "0";
        this.currentCurrency = null;
        this.params = params;
        this.isSliderDestroyed = false;
        this.init();
    }

    init() {
        this.addEvent();
        this.updateFilterButtons();

        // Инициализируем отображение только с filterId="0"
        this.renderFilteredSlides();

        if (this.slider && this.slider.on) {
            this.slider.on('destroy', () => {
                this.isSliderDestroyed = true;
                console.log('Slider destroyed, filtering will work without slider methods');
            });
        }
    }

    renderFilteredSlides() {
        const splideList = this.$el.querySelector('.splide__list--offers');
        if (!splideList) return;

        // Очищаем список
        splideList.innerHTML = '';

        // Показываем слайды в зависимости от фильтра
        this.originalSlides.forEach(originalSlide => {
            const slideFilterId = originalSlide.getAttribute('data-filter-id');

            // Выводим только товары с filterId равным текущему фильтру
            if (slideFilterId === this.currentFilter) {
                const clonedSlide = originalSlide.cloneNode(true);
                splideList.appendChild(clonedSlide);
            }
        });

        // Обновляем валюту если выбрана
        if (this.currentCurrency) {
            this.applyCurrencyToSlides();
        }
    }

    applyCurrencyToSlides() {
        const slides = this.$el.querySelectorAll('.splide__slide');
        slides.forEach(slide => {
            const currencyElements = slide.querySelectorAll('[data-currency-id]');
            currencyElements.forEach(curr => {
                curr.classList.toggle('is-active', curr.dataset.currencyId === this.currentCurrency);
            });
        });
    }

    changeFilter(el) {
        const filterValue = el.dataset.filter;

        // Если кликнули на уже активный фильтр - ничего не делаем
        if (this.currentFilter === filterValue) return;

        this.currentFilter = filterValue;

        // Рендерим слайды для выбранного фильтра
        this.renderFilteredSlides();

        // Обновляем слайдер
        if (!this.isSliderDestroyed && this.slider) {
            if (this.slider.refresh && typeof this.slider.refresh === 'function') {
                try {
                    this.slider.refresh();
                    if (this.slider.go && typeof this.slider.go === 'function') {
                        this.slider.go(0);
                    }
                } catch (error) {
                    console.warn('Slider methods failed, marking as destroyed:', error);
                    this.isSliderDestroyed = true;
                }
            } else {
                this.isSliderDestroyed = true;
            }
        }

        // Обновляем активные кнопки фильтров
        this.updateFilterButtons();
    }

    updateFilterButtons() {
        this.filterItems.forEach(el => {
            el.classList.toggle('is-active', el.dataset.filter === this.currentFilter);
        });
    }

    changeCurrency(el) {
        this.currentCurrency = el.dataset.currency;

        this.currencyItems.forEach(el => {
            el.classList.toggle('is-active', el.dataset.currency === this.currentCurrency);
        });

        this.applyCurrencyToSlides();
    }

    addEvent() {
        this.filterItems.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeFilter(el);
            });
        });

        this.currencyItems.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeCurrency(el);
            });
        });
    }
}

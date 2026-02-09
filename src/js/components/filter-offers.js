export class FilterOffeers {
    constructor(params) {
        this.$el = document.querySelector(params.el) || document;
        this.filterItems = this.$el.querySelectorAll('[data-filter]');
        this.currencyItems = this.$el.querySelectorAll('[data-currency]');
        this.filterSlides = this.$el.querySelectorAll('[data-filter-id]');
        this.slider = params.slider;
        this.currentFilter = "0"; // По умолчанию "Все"
        this.currentCurrency = null;
        this.params = params;
        this.isSliderDestroyed = false; // Флаг уничтожения слайдера
        this.init();
    }

    init() {
        this.addEvent();
        this.updateFilterButtons();

        // Слушаем события уничтожения слайдера если есть такая возможность
        if (this.slider && this.slider.on) {
            this.slider.on('destroy', () => {
                this.isSliderDestroyed = true;
                console.log('Slider destroyed, filtering will work without slider methods');
            });
        }
    }

    changeFilter(el) {
        const filterValue = el.dataset.filter;

        // Если кликнули на уже активный фильтр - ничего не делаем
        if (this.currentFilter === filterValue) return;

        this.currentFilter = filterValue;
        const splideList = this.$el.querySelector('.splide__list--offers');

        // Очищаем список
        splideList.innerHTML = '';

        // Показываем слайды в зависимости от фильтра
        this.filterSlides.forEach(item => {
            if (filterValue === "0" || item.dataset.filterId === filterValue) {
                splideList.append(item.cloneNode(true));
            }
        });

        // Обновляем слайдер только если он не уничтожен
        if (!this.isSliderDestroyed && this.slider) {
            // Безопасная проверка на существование методов
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

        // Обновляем валюту если выбрана
        if (this.currentCurrency) {
            this.changeCurrency({
                dataset: {
                    currency: this.currentCurrency
                }
            });
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

        this.$el.querySelectorAll('.minicard').forEach(minicard => {
            minicard.querySelectorAll('[data-currency-id]').forEach(curr => {
                curr.classList.toggle('is-active', curr.dataset.currencyId === this.currentCurrency);
            });
        });
    }

    addEvent() {
        this.filterItems.forEach(el => {
            el.addEventListener('click', (e) => this.changeFilter(el));
        });
        this.currencyItems.forEach(el => {
            el.addEventListener('click', (e) => this.changeCurrency(el));
        });
    }
}

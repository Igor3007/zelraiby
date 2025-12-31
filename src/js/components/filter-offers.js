/* ===============================================
filter offers
===============================================*/

export class FilterOffeers {
    constructor(params) {
        this.$el = document.querySelector(params.el) || document
        this.filterItems = this.$el.querySelectorAll('[data-filter]')
        this.currencyItems = this.$el.querySelectorAll('[data-currency]')
        this.filterSlides = this.$el.querySelectorAll('[data-filter-id]')
        this.slider = params.slider
        this.currentFilter = null
        this.currentCurrency = null
        this.params = params
        this.init()
    }

    init() {
        this.addEvent()
    }

    changeFilter(el) {

        const splideList = this.$el.querySelector('.splide__list--offers')
        splideList.innerHTML = ''


        if (this.currentFilter == el.dataset.filter) {
            this.filterSlides.forEach(item => {
                splideList.append(item.cloneNode(true))
            })
            this.currentFilter = null
        } else {
            this.currentFilter = el.dataset.filter
            this.filterSlides.forEach(item => {
                if (item.dataset.filterId == el.dataset.filter) {
                    splideList.append(item.cloneNode(true))
                }
            })
        }

        this.slider.refresh();
        this.slider.go(0);

        initSliderMinicard(splideList);
        initMinicardEvents(splideList);
        initWishLists(splideList);

        if (this.currentCurrency) {
            this.changeCurrency({
                dataset: {
                    currency: this.currentCurrency
                }
            })
        }


        this.changeActiveFilter()

    }

    changeActiveFilter() {
        this.filterItems.forEach(el => {
            el.classList.toggle('is-active', el.dataset.filter == this.currentFilter)
        })
    }

    changeCurrency(el) {

        this.currentCurrency = el.dataset.currency

        this.currencyItems.forEach(el => {
            el.classList.toggle('is-active', el.dataset.currency == this.currentCurrency)
        })

        this.$el.querySelectorAll('.minicard').forEach(minicard => {
            minicard.querySelectorAll('[data-currency-id]').forEach(curr => {
                curr.classList.toggle('is-active', curr.dataset.currencyId == this.currentCurrency)
            })
        })
    }

    addEvent() {
        this.filterItems.forEach(el => {
            el.addEventListener('click', (e) => this.changeFilter(el))
        })
        this.currencyItems.forEach(el => {
            el.addEventListener('click', (e) => this.changeCurrency(el))
        })
    }
}

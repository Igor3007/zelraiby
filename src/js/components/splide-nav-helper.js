export class SplideNavHelper {
    constructor(params) {
        this.params = params
        this.slider = params.slider
        this.btn = params.btn
        this.container = params.container
        this.dynamicMode = false
        this.prevButton = null
        this.nextButton = null

        this.init()
    }

    init() {
        this.prevButton = this.container.querySelector('[data-slider-prev="' + this.btn + '"]')
        this.nextButton = this.container.querySelector('[data-slider-next="' + this.btn + '"]')

        if (this.prevButton) {
            this.prevButton.setAttribute('disabled', 'disabled')
        }

        this.addEvent()
    }

    scrollToElem(elem, container) {
        var rect = elem.getBoundingClientRect();
        var rectContainer = container.getBoundingClientRect();

        let elemOffset = {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        }

        let containerOffset = {
            top: rectContainer.top + document.body.scrollTop,
            left: rectContainer.left + document.body.scrollLeft
        }

        let leftPX = elemOffset.left - containerOffset.left + container.scrollLeft - (container.offsetWidth / 2) + ((elem.offsetWidth + 0) / 2)

        container.scrollTo({
            left: leftPX,
            behavior: 'smooth'
        });
    }

    addEvent() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', e => {
                this.slider.go('<')
            })
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', e => {
                this.slider.go('>')
            })
        }

        this.slider.on('mounted refresh', () => {
            if (this.nextButton) {
                this.nextButton.removeAttribute('disabled')
            }

            let is_overflow = !this.slider.root.classList.contains('is-overflow')

            if (this.nextButton) {
                this.nextButton.classList.toggle('is-hide', is_overflow)
            }

            if (this.prevButton) {
                this.prevButton.classList.toggle('is-hide', is_overflow)
            }

            setTimeout(() => {
                if (this.container.querySelector('.splide-counter')) {
                    //скрыть счетчик если нету стрелок
                    this.container.querySelector('.splide-counter').classList.toggle('is-hide', is_overflow)
                }

                if(this.slider.Components.Pagination.items.length > 10) {
                    this.slider.root.classList.add('is-dynamic-pagination')
                    this.dynamicMode = true
                }

            }, 100)
        })

        this.slider.on('move', (newIndex, prevIndex, destIndex) => {
            if (this.nextButton) {
                this.nextButton.removeAttribute('disabled')
            }

            if (this.prevButton) {
                this.prevButton.removeAttribute('disabled')
            }

            if (this.slider.options.type == 'loop') {
                return false
            }

            // Используем правильное свойство для общего количества слайдов
            const totalSlides = this.slider.Components.Elements.slides.length;
            const perPage = this.slider.options.perPage || 1;
            const isEnd = (destIndex + perPage) >= totalSlides;
            const isStart = destIndex === 0;

            if (this.prevButton) {
                if (isStart) {
                    this.prevButton.setAttribute('disabled', 'disabled')
                } else {
                    this.prevButton.removeAttribute('disabled')
                }
            }

            if (this.nextButton) {
                if (isEnd) {
                    this.nextButton.setAttribute('disabled', 'disabled')
                } else {
                    this.nextButton.removeAttribute('disabled')
                }
            }

            if (typeof this.params.onChange != 'undefined') {
                this.params.onChange(destIndex + 1, totalSlides)
            }

            if(this.dynamicMode) {
                const elem = this.slider.Components.Pagination.items[newIndex].li;
                this.scrollToElem(elem, this.slider.root.querySelector('.splide__pagination'))
            }
        })
    }
}

export const SLIDER_ARROW_PATH = 'M16.204 12.396a1 1 0 011.4-.192l5.618 4.267a4.391 4.391 0 010 7.058l-5.617 4.267a1 1 0 11-1.21-1.592l5.617-4.268c1.317-1 1.317-2.872 0-3.872l-5.616-4.268a1 1 0 01-.192-1.4z';

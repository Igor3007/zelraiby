import Splide from "@splidejs/splide";

export function teamslider() {

    if (document.querySelector('[data-slider="team"]')) {


        document.querySelectorAll('[data-slider="team"]').forEach(slider => {
            slider['splide'] = new Splide(slider, {

                perPage: 4,
                perMove: 1,
                gap: 32,
                pagination: false,
                breakpoints: {
                    1440: {
                        gap: 24,
                    },
                    1024: {
                        perPage: 3,
                        gap: 20
                    },
                    768: {
                        fixedWidth: 300,
                        perPage: 1,
                        pagination: true,
                    },
                },

                arrowPath: 'M13.531 8.523a1.835 1.835 0 012.567 0l10.37 10.213c.71.698.71 1.83 0 2.528l-10.37 10.213a1.835 1.835 0 01-2.566 0 1.768 1.768 0 010-2.528L22.618 20l-9.088-8.949a1.768 1.768 0 010-2.528z'
            });

            const getTopArrowButtons = () => {

                if (slider) {
                    let heigthEl = slider.querySelector('picture').clientHeight
                    slider.querySelectorAll('.splide__arrow').forEach(btn => {
                        btn.style.top = (heigthEl / 2) + 'px'
                    })
                }


            }

            slider['splide'].on('resize', (e) => getTopArrowButtons(e))
            slider['splide'].on('mounted', (e) => getTopArrowButtons(e))
            slider['splide'].mount();
        })
    }
}

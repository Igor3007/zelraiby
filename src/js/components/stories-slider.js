import Splide from "@splidejs/splide";

export function storiesSlider() {

    if (document.querySelector('[data-slider="stories"]')) {


        document.querySelectorAll('[data-slider="stories"]').forEach(slider => {
            slider['splide'] = new Splide(slider, {

                perPage: 10,
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

            slider['splide'].mount();
        })
    }
}

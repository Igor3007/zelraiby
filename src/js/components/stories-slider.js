import Splide from "@splidejs/splide";
import {
    getTopArrowButtons
} from "./splide_ext";

export function storiesSlider() {

    if (document.querySelector('[data-slider="stories"]')) {
        document.querySelectorAll('[data-slider="stories"]').forEach(slider => {
            slider['splide'] = new Splide(slider, {

                fixedWidth: 112,
                perMove: 1,
                gap: 16,
                pagination: false,
                breakpoints: {
                    1440: {
                        gap: 24,
                    },
                    1024: {

                        gap: 20
                    },
                    768: {
                        pagination: true,
                    },
                },

                arrowPath: 'M16.204 12.396a1 1 0 011.4-.192l5.618 4.267a4.391 4.391 0 010 7.058l-5.617 4.267a1 1 0 11-1.21-1.592l5.617-4.268c1.317-1 1.317-2.872 0-3.872l-5.616-4.268a1 1 0 01-.192-1.4z'
            });

            slider['splide'].on('mounted', (e) => {
                // top for nan button
                getTopArrowButtons(slider['splide'].root)
            })

            slider['splide'].on('resize', (e) => {
                getTopArrowButtons(slider['splide'].root)
            })

            slider['splide'].mount();
        })
    }
}

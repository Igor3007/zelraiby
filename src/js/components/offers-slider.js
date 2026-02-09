import {
    FilterOffeers
} from "./filter-offers";
import {
    SplideNavHelper,
    SLIDER_ARROW_PATH
} from "./splide-nav-helper";
import Splide from "@splidejs/splide";

export function offersSlider() {
    document
        .querySelectorAll('[data-slider="offers"]')
        .forEach(slider => {
            slider['Splide'] = new Splide(slider, {

                arrows: false,
                arrowPath: SLIDER_ARROW_PATH,
                pagination: false,
                gap: 12,
                start: 0,
                fixedWidth: '343px',
                perMove: 1,
                flickMaxPages: 1,
                flickPower: 100,
                offsetPagination: 2,
                omitEnd: true,
                breakpoints: {
                    480: {
                        fixedWidth: '87.9vw',
                        pagination: false,
                    },

                    640: {
                        fixedWidth: '343px',
                        pagination: false,
                    },

                }

            });

            // disable drag on hover
            slider.querySelectorAll('.minicard__slider').forEach(gallery => {
                gallery.addEventListener('mouseenter', () => {
                    slider['Splide'].options = {
                        drag: false,
                    };

                })
                gallery.addEventListener('mouseleave', () => {
                    slider['Splide'].options = {
                        drag: true,
                    };
                })
            })

            // init splide nav
            new SplideNavHelper({
                slider: slider['Splide'],
                btn: 'offers',
                container: slider.closest('section')
            })

            //init filter

            new FilterOffeers({
                el: '.section-best-offers',
                slider: slider['Splide']
            })

            // slider['splide'].mount();
            if (document.body.clientWidth > 769) {
                slider['Splide'].mount();
            }
        })

}

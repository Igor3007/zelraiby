import {
    SplideNavHelper,
    SLIDER_ARROW_PATH
} from "./splide-nav-helper";
import Splide from "@splidejs/splide";

export function aboutUsSlider() {
    document
        .querySelectorAll('[data-slider="aboutUs"]')
        .forEach(slider => {
            if (slider['Splide']) {
                return;
            }

            slider['Splide'] = new Splide(slider, {
                arrows: false,
                arrowPath: SLIDER_ARROW_PATH,
                pagination: false,
                gap: 32,
                start: 0,
                perMove: 1,
                flickMaxPages: 1,
                flickPower: 100,
                offsetPagination: 2,
                omitEnd: true,
                perPage: 3,
                breakpoints: {
                    480: {
                        pagination: false,
                        fixedWidth: '81vw',
                        type   : 'loop',
                        perPage: 1,
                        focus  : 'center',
                    },
                    1024: {
                        perPage: 2,
                        gap: 16,
                    },
                }
            });

            new SplideNavHelper({
                slider: slider['Splide'],
                btn: 'offers',
                container: slider.closest('section')
            });


            if (window.innerWidth > 576) {
                slider['Splide'].mount();
            } else {
                slider['Splide'].mount();
            }
        });
}

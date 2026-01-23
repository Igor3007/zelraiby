import Splide from "@splidejs/splide";
import { SplideNavHelper } from "./splide-nav-helper";

export function teamslider() {

    if (document.querySelector('[data-slider="team"]')) {


        document.querySelectorAll('[data-slider="team"]').forEach(slider => {
            slider['splide'] = new Splide(slider, {

                perPage: 4,
                perMove: 1,
                gap: 12,
                pagination: false,
                arrows: false,
                omitEnd: true,
                breakpoints: {
                    1440: {

                    },
                    1024: {
                        perPage: 3,

                    },
                    768: {
                        fixedWidth: 300,
                        perPage: 1,
                        pagination: true,
                    },
                },

            });

            // init splide nav
            new SplideNavHelper({
                slider: slider['splide'],
                btn: 'team',
                container: slider.closest('section')
            })

            slider['splide'].mount();
        })
    }
}

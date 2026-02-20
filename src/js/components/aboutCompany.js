import Splide from "@splidejs/splide";

export function aboutCompany() {
    if (document.querySelector('[data-slider="aboutCompany"]')) {
        document.querySelectorAll('[data-slider="aboutCompany"]').forEach(slider => {
            slider['splide'] = new Splide(slider, {
                type   : 'loop',
                perPage: 1,
                perMove: 1,
                gap: 0,
                pagination: false,
                arrows: false,
                omitEnd: true,
                autoplay: true,
            });

            slider['splide'].mount();
        })
    }
}

const getTopArrowButtons = (slider) => {

    if (slider) {
        let heigthEl = slider.querySelector('picture').clientHeight
        slider.querySelectorAll('.splide__arrow').forEach(btn => {
            btn.style.top = (heigthEl / 2) + 1 + 'px'
        })
    }
}

export {
    getTopArrowButtons
}

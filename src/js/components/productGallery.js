import Splide from "@splidejs/splide";

export function initProductGallery() {
    let verticalThumbs, mainSlider;
    let isMobile = window.innerWidth <= 767;

    const verticalThumbsEl = document.querySelector('[data-slider="left-vertical-thumbs"]');
    const mainSliderEl = document.querySelector('[data-slider="main-slider"]');

    if (!verticalThumbsEl || !mainSliderEl) {
        console.log('Слайдеры не найдены');
        return;
    }

    // Функция инициализации в зависимости от разрешения
    function initSliders() {
        isMobile = window.innerWidth <= 767;

        // Уничтожаем предыдущие слайдеры если они есть
        if (verticalThumbs) {
            verticalThumbs.destroy();
            verticalThumbs = null;
        }
        if (mainSlider) {
            mainSlider.destroy();
            mainSlider = null;
        }

        // Показываем/скрываем элементы
        if (isMobile) {
            // На мобилке показываем только вертикальные миниатюры как горизонтальный слайдер
            verticalThumbsEl.style.display = 'block';
            mainSliderEl.style.display = 'none';

            // Инициализируем горизонтальный слайдер на мобилке
            verticalThumbs = new Splide(verticalThumbsEl, {
                type   : 'loop',
                arrows: false,
                pagination: false,
                gap: 6,
                start: 0,
                fixedWidth: '343px',
                perMove: 1,
                flickMaxPages: 1,
                flickPower: 100,
                offsetPagination: 2,
                omitEnd: true,
                focus: 'center',
                breakpoints: {
                    640: {
                        height: 400,
                        fixedWidth: '296px',
                    }
                }
            }).mount();
        } else {
            verticalThumbsEl.style.display = 'block';
            mainSliderEl.style.display = 'block';

            // Проверяем количество слайдов
            const verticalThumbsCount = verticalThumbsEl.querySelectorAll('.splide__slide').length;
            const mainSlidesCount = mainSliderEl.querySelectorAll('.splide__slide').length;

            if (verticalThumbsCount !== mainSlidesCount) {
                console.warn('Количество слайдов не совпадает! Синхронизация невозможна.');
            }

            // Вертикальные миниатюры
            verticalThumbs = new Splide(verticalThumbsEl, {
                direction: 'ttb',
                height: 680,
                gap: 10,
                pagination: false,
                arrows: false,
                isNavigation: true,
                fixedWidth: 88,
                fixedHeight: 120,
                focus: 'center',
                cover: true,
                breakpoints: {
                    1199: {
                        height: 520,
                    },
                    767: {
                        destroy: true
                    }
                }
            }).mount();

            // Основной слайдер
            mainSlider = new Splide(mainSliderEl, {
                type: 'fade',
                height: 680,
                pagination: false,
                arrows: false,
                rewind: true,
                breakpoints: {
                    1199: {
                        height: 520,
                    },
                    767: {
                        destroy: true
                    }
                }
            }).mount();

            // Ручная синхронизация
            verticalThumbs.on('click', (slide) => {
                const index = slide.index;
                mainSlider.go(index);
            });

            verticalThumbs.on('move', (index) => {
                mainSlider.go(index);
            });

            // Обработка клика по основному слайдеру для открытия модалки (только на десктопе)
            const mainSlides = mainSliderEl.querySelectorAll('.splide__slide');
            mainSlides.forEach((slide, index) => {
                slide.style.cursor = 'pointer';
                // Удаляем старые обработчики
                slide.removeEventListener('click', handleMainSlideClick);
                // Добавляем новый
                slide.addEventListener('click', handleMainSlideClick);

                function handleMainSlideClick() {
                    openGalleryModal(index);
                }
            });
        }
    }

    // Инициализация при загрузке
    initSliders();

    // Реинициализация при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 767;
            if (isMobile !== newIsMobile) {
                initSliders();
            }
        }, 250);
    });

    // Инициализация модального окна (только для десктопа)
    if (window.innerWidth > 767) {
        initGalleryModal();
    }
}

function initGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) {
        console.warn('Модальное окно не найдено');
        return;
    }

    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeGalleryModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeGalleryModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeGalleryModal();
        }
    });
}

function openGalleryModal(slideIndex = 0) {
    // Проверяем, что не на мобилке
    if (window.innerWidth <= 767) {s
        console.log('Модалка недоступна на мобильных устройствах');
        return;
    }

    const modal = document.querySelector('.gallery-modal');
    const gallerySliderEl = document.querySelector('[data-slider="gallery-modal"]');
    const modalBody = modal?.querySelector('.modal__body');

    if (!modal || !gallerySliderEl || !modalBody) {
        console.error('Элементы галереи не найдены');
        return;
    }

    // Перемещаем слайдер в модалку
    modalBody.appendChild(gallerySliderEl);
    gallerySliderEl.style.display = 'block';

    // Уничтожаем старый слайдер если есть
    if (gallerySliderEl['splide']) {
        gallerySliderEl['splide'].destroy();
    }

    // Инициализация слайдера в модалке
    const gallerySlider = new Splide(gallerySliderEl, {
        start: slideIndex,
        type: 'fade',
        pagination: false,
        arrows: true,
        rewind: true,
        arrowPath: 'M16.204 12.396a1 1 0 011.4-.192l5.618 4.267a4.391 4.391 0 010 7.058l-5.617 4.267a1 1 0 11-1.21-1.592l5.617-4.268c1.317-1 1.317-2.872 0-3.872l-5.616-4.268a1 1 0 01-.192-1.4z'
    }).mount();

    gallerySliderEl['splide'] = gallerySlider;

    // Открываем модалку
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    // Проверяем, что не на мобилке
    if (window.innerWidth <= 767) return;

    const modal = document.querySelector('.gallery-modal');
    const gallerySliderEl = document.querySelector('[data-slider="gallery-modal"]');
    const originalContainer = document.querySelector('.gallery-main-container');

    if (modal) {
        modal.classList.remove('active');
    }

    if (gallerySliderEl) {
        if (gallerySliderEl['splide']) {
            gallerySliderEl['splide'].destroy();
            gallerySliderEl['splide'] = null;
        }

        if (originalContainer) {
            originalContainer.appendChild(gallerySliderEl);
        }

        gallerySliderEl.style.display = 'none';
    }

    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', initProductGallery);

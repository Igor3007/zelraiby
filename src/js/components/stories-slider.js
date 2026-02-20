import Splide from "@splidejs/splide";
import {
    getTopArrowButtons
} from "./splide_ext";

export function storiesSlider() {
    // Инициализация основного слайдера
    const mainSliders = document.querySelectorAll('[data-slider="stories"]');

    mainSliders.forEach(slider => {
        slider['splide'] = new Splide(slider, {
            fixedWidth: 112,
            perMove: 1,
            omitEnd: true,
            gap: 16,
            pagination: false,
            breakpoints: {
                1440: { gap: 24 },
                1024: { gap: 16 },
                768: { arrows: false }
            },
            arrowPath: 'M16.204 12.396a1 1 0 011.4-.192l5.618 4.267a4.391 4.391 0 010 7.058l-5.617 4.267a1 1 0 11-1.21-1.592l5.617-4.268c1.317-1 1.317-2.872 0-3.872l-5.616-4.268a1 1 0 01-.192-1.4z'
        });

        slider['splide'].on('mounted', (e) => {
            getTopArrowButtons(slider['splide'].root);
        });

        slider['splide'].on('resize', (e) => {
            getTopArrowButtons(slider['splide'].root);
        });

        slider['splide'].mount();
    });

    // Инициализация модального окна
    initGalleryModal();
}

function initGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    const modalOverlay = document.querySelector('.modal__overlay');
    const modalClose = document.querySelector('.modal__close');
    const modalBody = document.querySelector('.modal__body');
    const galleryContainer = document.querySelector('.gallery-main-container');
    const mainSlider = document.querySelector('[data-slider="stories"]');

    if (!modal || !galleryContainer || !mainSlider) return;

    let modalSplide = null;

    // Функция открытия модального окна
    function openModal(event) {
        const slide = event.target.closest('.splide__slide');
        if (!slide) return;

        // Получаем индекс кликнутого слайда
        const slides = Array.from(mainSlider.querySelectorAll('.splide__slide'));
        const index = slides.indexOf(slide);

        if (index === -1) return;

        // Клонируем и показываем модальный слайдер
        const galleryContent = galleryContainer.innerHTML;
        modalBody.innerHTML = galleryContent;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Инициализируем модальный слайдер
        const modalSlider = modalBody.querySelector('[data-slider="gallery-modal-video"]');

        if (modalSlider) {
            modalSplide = new Splide(modalSlider, {
                type: 'slide',
                perPage: 1,
                perMove: 1,
                gap: 0,
                pagination: false,
                arrows: true,
                start: index,
                speed: 400,
                arrowPath: 'M16.204 12.396a1 1 0 011.4-.192l5.618 4.267a4.391 4.391 0 010 7.058l-5.617 4.267a1 1 0 11-1.21-1.592l5.617-4.268c1.317-1 1.317-2.872 0-3.872l-5.616-4.268a1 1 0 01-.192-1.4z'
            });

            modalSplide.on('move', (newIndex) => {
                // Синхронизируем основной слайдер
                if (mainSlider.splide) {
                    mainSlider.splide.go(newIndex);
                }
            });

            modalSplide.mount();
        }
    }

    // Функция закрытия
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';

        if (modalSplide) {
            modalSplide.destroy();
            modalSplide = null;
        }

        modalBody.innerHTML = '';
    }

    // Добавляем обработчики на основной слайдер
    if (mainSlider) {
        mainSlider.addEventListener('click', openModal);

        // Добавляем обработчики на все слайды для доступности
        mainSlider.querySelectorAll('.splide__slide').forEach(slide => {
            slide.setAttribute('tabindex', '0');
            slide.setAttribute('role', 'button');
            slide.setAttribute('aria-label', 'Открыть в галерее');

            slide.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(e);
                }
            });
        });
    }

    // Закрытие модального окна
    modalOverlay?.addEventListener('click', closeModal);
    modalClose?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    if (!header) {
        return;
    }

    function checkScroll() {
        if (window.scrollY > 145) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    }

    checkScroll();

    window.addEventListener('scroll', checkScroll);
});

document.addEventListener('DOMContentLoaded', function() {
    const openMenuButtons = document.querySelectorAll('.openMenu');
    const headerMenu = document.querySelector('.header__menu');
    const header = document.querySelector('header');
    const body = document.querySelector('body');

    if (!headerMenu) return;

    // Открытие меню
    function openMenu() {
        headerMenu.classList.add('open');
        if (header) header.classList.add('open');
        if (body) body.classList.add('open');
    }

    // Закрытие меню
    function closeMenu() {
        headerMenu.classList.remove('open');
        if (header) header.classList.remove('open');
        if (body) body.classList.remove('open');
    }

    // Переключение меню (для повторного клика)
    function toggleMenu(event) {
        // Предотвращаем всплытие события, чтобы не сработал document click
        event.stopPropagation();

        if (headerMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Добавляем обработчики на кнопки открытия/закрытия
    openMenuButtons.forEach(button => {
        button.addEventListener('click', toggleMenu);
    });

    // Закрытие по клику вне меню
    document.addEventListener('click', function(event) {
        // Проверяем, что клик был не по кнопке openMenu и не по меню
        if (!headerMenu.contains(event.target) &&
            !event.target.closest('.openMenu') &&
            headerMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && headerMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Закрытие по кнопке закрытия внутри меню (если есть)
    const closeButton = headerMenu.querySelector('.close-menu');
    if (closeButton) {
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeMenu();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.header__menu_tabs .tab');
    const tabPanels = document.querySelectorAll('.header__menu_content .tabPanel');

    // Функция для активации таба
    function activateTab(index) {
        // Убираем активный класс у всех табов и панелей
        tabs.forEach(tab => tab.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Добавляем активный класс нужному табу и панели
        tabs[index].classList.add('active');
        if (tabPanels[index]) {
            tabPanels[index].classList.add('active');
        }
    }

    // Добавляем обработчики на каждый таб
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            activateTab(index);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const openMenuButtonsMob = document.querySelectorAll('.openMenuMob');
    const headerMenuMob = document.querySelector('.MenuMobile');
    const bodyMob = document.querySelector('body');

    if (!headerMenuMob) return;

    // Открытие меню
    function openMenuMob() {
        headerMenuMob.classList.add('open');
        if (bodyMob) bodyMob.classList.add('open');
    }

    // Закрытие меню
    function closeMenuMob() {
        headerMenuMob.classList.remove('open');
        if (bodyMob) bodyMob.classList.remove('open');
    }

    // Переключение меню (для повторного клика)
    function toggleMenuMob(event) {
        // Предотвращаем всплытие события, чтобы не сработал document click
        event.stopPropagation();

        if (headerMenuMob.classList.contains('open')) {
            closeMenuMob();
        } else {
            openMenuMob();
        }
    }

    // Добавляем обработчики на кнопки открытия/закрытия
    openMenuButtonsMob.forEach(button => {
        button.addEventListener('click', toggleMenuMob);
    });

    // Закрытие по клику вне меню
    document.addEventListener('click', function(event) {
        // Проверяем, что клик был не по кнопке openMenu и не по меню
        if (!headerMenuMob.contains(event.target) &&
            !event.target.closest('.openMenuMob') &&
            headerMenuMob.classList.contains('open')) {
            closeMenuMob();
        }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && headerMenuMob.classList.contains('open')) {
            closeMenuMob();
        }
    });

    // Закрытие по кнопке закрытия внутри меню (если есть)
    const closeButton = headerMenuMob.querySelector('.closeMenuMob');
    if (closeButton) {
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeMenuMob();
        });
    }
});

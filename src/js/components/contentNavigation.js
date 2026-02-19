document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.querySelector('.openMobileCategory');
    const closeBtn = document.querySelector('.contentNavigationBox__header_close');
    const navigation = document.querySelector('.contentNavigation');
    const body = document.body;

    let originalOverflow = '';

    function openNavigation() {
        navigation.classList.add('open');
        originalOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
    }

    function closeNavigation() {
        navigation.classList.remove('open');
        body.style.overflow = originalOverflow;
    }

    if (openBtn) {
        openBtn.addEventListener('click', openNavigation);
        openBtn.addEventListener('touchstart', openNavigation, { passive: true });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeNavigation);
        closeBtn.addEventListener('touchstart', closeNavigation, { passive: true });
    }

    document.addEventListener('keydown', function(e) {
        if (navigation && e.key === 'Escape' && navigation?.classList.contains('open')) {
            closeNavigation();
        }
    });

    document.addEventListener('click', function(e) {
        if (navigation && !navigation.contains(e.target) && navigation?.classList.contains('open')) {
            closeNavigation();
        }
    });
});

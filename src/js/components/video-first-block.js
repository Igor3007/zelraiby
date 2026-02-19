



document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video-responsive');

    videos.forEach(videoContainer => {
        const video = videoContainer.querySelector('video');
        const btnPlay = videoContainer.querySelector('.btnPlay');
        const btnFull = videoContainer.querySelector('.btnFull');

        if (!video || !btnPlay || !btnFull) return;

        // Функция обновления иконки Play/Pause
        function updatePlayIcon() {
            const icon = btnPlay.querySelector('use');
            if (video.paused) {
                icon.setAttribute('href', '/img/sprites/sprite.svg#ic_play_dark'); // Замените на ID вашей иконки Play
            } else {
                icon.setAttribute('href', '/img/sprites/sprite.svg#ic_pause_dark'); // Замените на ID вашей иконки Pause
            }
        }

        // Play / Pause
        btnPlay.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Обновление иконки при смене состояния видео
        video.addEventListener('play', updatePlayIcon);
        video.addEventListener('pause', updatePlayIcon);

        // Fullscreen
        btnFull.addEventListener('click', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { // Safari
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }
        });

        // Инициализация иконки
        updatePlayIcon();
    });
});

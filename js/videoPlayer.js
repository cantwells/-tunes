export const videoPlayerInit = () => {
    //=============================Получаем элемента=============================================
    const videoPlayer = document.querySelector('.video-player'), //контейнер с видео
        videoButtonPlay = document.querySelector('.video-button__play'), //кнопка play
        videoButtonStop = document.querySelector('.video-button__stop'), //кнопка stop
        videoTimePassed = document.querySelector('.video-time__passed'), //время сколько пройдено
        videoTimeTotal = document.querySelector('.video-time__total'), //полное вреся
        videoProgress = document.querySelector('.video-progress'); //прогресс бар 

    //============================Функции==========================================================

    //Переключает состояние на воспроизводить/пауза
    const togglePlay = () => videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();

    //Остановка видео
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    //===========================события============================================================

    //Воспроизведение/Пауза при нажатии на по экрану
    videoPlayer.addEventListener('click', togglePlay);

    //Воспроизведение по нажатию на кнопу play
    videoButtonPlay.addEventListener('click', togglePlay);

    //смена иконок при проигрывании видео, 
    videoPlayer.addEventListener('play', () => {
        //меняем иконку проигрывания и паузы
        videoButtonPlay.classList.remove('fa-play');
        videoButtonPlay.classList.add('fa-pause');
    })

    //смена иконок при остановке воспроизведения
    videoPlayer.addEventListener('pause', () => {
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    })

    //Событие при нажатию кнопки stop
    videoButtonStop.addEventListener('click', stopPlay);

}
export const videoPlayerInit = () => {
    //=============================Получаем элемента=============================================
    const videoPlayer = document.querySelector('.video-player'), //контейнер с видео
        videoButtonPlay = document.querySelector('.video-button__play'), //кнопка play
        videoButtonStop = document.querySelector('.video-button__stop'), //кнопка stop
        videoTimePassed = document.querySelector('.video-time__passed'), //время сколько пройдено
        videoTimeTotal = document.querySelector('.video-time__total'), //полное вреся
        videoProgress = document.querySelector('.video-progress'), //прогресс бар видео
        videoButtonFullscreen = document.querySelector('.video-button__fullscreen'), //кнопка на отображеиня на весь экран 
        videoButtonVolumeUp = document.querySelector('.video-button__volume-up'), //кнопка звука
        soundProgress = document.querySelector('.sound-progress'); //прогресс бар звука
    let val = soundProgress.value; //Получение значения ползунка
    //============================Функции==========================================================

    //Переключает состояние на воспроизводить/пауза
    const togglePlay = () => videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();

    //Остановка видео
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    //Вспомогательная функция для добавления нуля в переди чисел до 10
    const getZero = num => num < 10 ? `0${num}` : num;

    const toggleVol = () => {

            if (!videoPlayer.volume || videoPlayer.muted) {
                //Меням ярлычки и бегунок уровня звука
                videoButtonVolumeUp.classList.remove('fa-volume-up');
                videoButtonVolumeUp.classList.add('fa-volume-off');
            } else {
                videoButtonVolumeUp.classList.remove('fa-volume-off');
                videoButtonVolumeUp.classList.add('fa-volume-up');
            }
            // videoPlayer.muted ? soundProgress.value = 0 : soundProgress.value = 100;
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

    //событие срабатывает каждый раз при смене currentTime
    videoPlayer.addEventListener('timeupdate', () => {
        //Получаем текущее время и общее время
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        //Получаем кол-во минут и секунд для текущего
        const currentMinutes = getZero(Math.floor(currentTime / 60));
        const currentSeconds = getZero(Math.floor(currentTime % 60));
        //и общего времени
        const totalMinutes = getZero(Math.floor(duration / 60));
        const totalSeconds = getZero(Math.floor(duration % 60));

        //Подставляем его в соответсвующие поля в верстке
        videoTimePassed.textContent = `${currentMinutes}:${currentSeconds}`;
        videoTimeTotal.textContent = `${totalMinutes}:${totalSeconds}`;

        //Получаем сколько времени в процентном соотношение пройдено и подставляем его в инпут, для движения бегунка проигрователя
        videoProgress.value = (currentTime / duration) * 100;
    })

    //Cрабатывает когда изменяется место положение бегунка
    videoProgress.addEventListener('input', () => {
        //Устанавливаем текущее значени воспроизведения в результат расчёта процентного соотношения места куда пользователь нажимает
        videoPlayer.currentTime = (videoPlayer.duration / 100) * videoProgress.value;
    })

    //Вывод видео на весь экран
    videoButtonFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    })

    //Убираем/возвращаем звук
    videoButtonVolumeUp.addEventListener('click', () => {
        if (!videoPlayer.muted) {
            val = soundProgress.value;
            soundProgress.value = 0;
            videoPlayer.muted = true;
        } else {
            soundProgress.value = val;
            videoPlayer.muted = false;
        }
        toggleVol();
    })

    soundProgress.addEventListener('input', () => {
        videoPlayer.volume = soundProgress.value / 100;
        toggleVol();
    })
}
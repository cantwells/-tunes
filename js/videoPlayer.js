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

    //Вспомогательная функция для добавления нуля в переди чисел до 10
    const getZero = num => num < 10 ? `0${num}` : num;
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

}
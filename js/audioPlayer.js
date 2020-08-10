import { checkZero } from './lib.js';
export const audioPlayerInit = () => {
    //=============================Получение элементов===================================================
    const audioPlayer = document.querySelector('.audio-player'), //аудио плеер находящийся внутри тега audio
        audio = document.querySelector('.audio'), //вся вкладка с аудио
        audioImg = document.querySelector('.audio-img'), //картинка для аудио
        audioHeader = document.querySelector('.audio-header'), //Заголовок с названием песни
        audioNavigation = document.querySelector('.audio-navigation'), //Весь навигационный контейнер
        audioButtonPlay = document.querySelector('.audio-button__play'), //кнопка play
        audioTimePassed = document.querySelector('.audio-time__passed'), //время воспроизведения
        audioTimeTotal = document.querySelector('.audio-time__total'), //полное время воспроизведения
        audioProgress = document.querySelector('.audio-progress'), //прогрес бар
        audioProgressTiming = document.querySelector('.audio-progress__timing'); //див отображающий пройденное время


    //массив с названиями песен
    const playlist = ['hello', 'flow', 'speed'];
    let idxTrack = 0;
    //==============================Функции==============================================================
    //переключение иконки воспроизведения
    const togglePlay = () => {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
        }
        //загрузка трека
    const loadTrack = () => {
        //запоминаем значение в котором был трек 
        const isPlayed = audioPlayer.paused;
        //получаем имя трека
        const track = playlist[idxTrack];
        //подставляем в src сформированное значение 
        audioPlayer.src = `../audio/${track}.mp3`;
        //выводим имя трека
        audioHeader.textContent = track.toUpperCase();
        //подставляем соответсвующую картинку
        audioImg.src = `../audio/${track}.jpg`;
        //если до срабатывания функции трек воспроизводился, то он будет воспроизводится, если нет то будет на паузе
        isPlayed ? audioPlayer.pause() : audioPlayer.play();
    }

    //===============================Событие==============================================================
    //отлавливаем событие по нажатию на кнопки: play, next, prev
    audioNavigation.addEventListener('click', event => {
            const target = event.target;
            //поведение при нажатие на кнопку play
            if (target.classList.contains('audio-button__play')) {
                const track = playlist[idxTrack];
                audioHeader.textContent = track.toUpperCase();
                audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
                togglePlay();
            }
            //при нажатие на кнопку prev
            if (target.classList.contains('audio-button__prev')) {
                idxTrack !== 0 ? idxTrack-- : idxTrack = playlist.length - 1;
                loadTrack();
            }
            //при нажатие на кнопку next
            if (target.classList.contains('audio-button__next')) {
                (idxTrack < playlist.length - 1) ? idxTrack++ : idxTrack = 0;
                loadTrack();
            }
        })
        //движение линии во время проигрывания
    audioPlayer.addEventListener('timeupdate', () => {
        //получаем кол-во всего минут
        const totalMinutes = checkZero(Math.floor(audioPlayer.duration / 60) || 0);
        //получение кол-во всего секунд
        const titalSeconds = checkZero(Math.floor(audioPlayer.duration % 60) || 0);
        //получение всего минут в текущее время воспроизведения
        const passedMinutes = checkZero(Math.floor(audioPlayer.currentTime / 60) || 0);
        //получение всего секунд в текущее время воспроизведения
        const passedSecundes = checkZero(Math.floor(audioPlayer.currentTime % 60) || 0);
        //подставляем в соостетсвующие поля
        audioTimeTotal.textContent = `${totalMinutes}:${titalSeconds}`;
        audioTimePassed.textContent = `${passedMinutes}:${passedSecundes}`;
        //получение процентного соотношения при проигрывании
        const process = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        //задаем полученные проценты в ширину
        audioProgressTiming.style.width = `${process}%`;

    })

    //остановка видео после завершения воспроизведения
    audioPlayer.addEventListener('ended', togglePlay);

    //перемотка аудио в зависимости от нажатия на место прогрес бара
    audioProgress.addEventListener('click', event => {
            //получаем значени точки по оси Х, от левого края
            const x = event.offsetX;
            //получаем полную длину прогресс бара
            const allWidth = audioProgress.clientWidth;
            //полное время воспроизведения
            const duration = audioPlayer.duration;
            //высчитываем время с места куда мы кликнули
            const progress = (x / allWidth) * duration;
            //подставляем в текущее время воспроизведения
            audioPlayer.currentTime = progress;
        })
        //метод для остановки воспроизведения
    audioPlayerInit.stop = () => {
        audioPlayer.pause();
        audio.classList.remove('play');
        audioButtonPlay.classList.remove('fa-pause');
        audioButtonPlay.classList.add('fa-play');
    }
}
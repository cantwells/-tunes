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
        audioProgressTiming = document.querySelector('.audio-progress__timing'); //див отображающий пройденное время


    //массив с названиями песен
    const playlist = ['hello', 'flow', 'speed'];
    let idxTrack = 0;
    //==============================Функции==============================================================
    //переключение иконки воспроизведения
    const togglePlay = () => {
        audioButtonPlay.classList.toggle('fa-play');
        audioButtonPlay.classList.toggle('fa-pause');
    }

    //===============================Событие==============================================================
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            if (audioPlayer.paused) {
                audioPlayer.src = `../audio/${playlist[idxTrack]}.mp3`;
                audioPlayer.play();
                audio.classList.add('play');
                audioHeader.textContent = playlist[idxTrack].toUpperCase();
                audioImg.src = `../audio/${playlist[idxTrack]}.jpg`;
                togglePlay();
            } else {
                audioPlayer.pause();
                audio.classList.remove('play');
                togglePlay();
            }
        }
    })

    audioPlayer.addEventListener('timeupdate', () => {
        const totalMinutes = checkZero(Math.floor(audioPlayer.duration / 60) || 0);
        const titalSeconds = checkZero(Math.floor(audioPlayer.duration % 60) || 0);
        const passedMinutes = checkZero(Math.floor(audioPlayer.currentTime / 60) || 0);
        const passedSecundes = checkZero(Math.floor(audioPlayer.currentTime % 60) || 0);

        audioTimeTotal.textContent = `${totalMinutes}:${titalSeconds}`;
        audioTimePassed.textContent = `${passedMinutes}:${passedSecundes}`;
        const process = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        audioProgressTiming.style.width = `${process}%`;
        // console.log(Math.floor(audioPlayer.currentTime));
    })
}
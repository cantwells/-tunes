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

}
//Импортируем внешние файлы
import { videoPlayerInit } from './videoPlayer.js';
import { audioPlayerInit } from './audioPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';

//============================Получение элементов============================================
const playerBtns = document.querySelectorAll('.player-btn'), //Кнопки в вкладках
    playerBlocks = document.querySelectorAll('.player-block'), //Блоки с аудио, видео и радио
    temp = document.querySelector('.temp'); //Временный заголовок

//============================Функции=========================================================

//Функция сброса класса видимости
const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtns.forEach((el) => el.classList.remove('active'));
    playerBlocks.forEach((el) => el.classList.remove('active'));
    audioPlayerInit.stop();
    videoPlayerInit.stop();
    radioPlayerInit.stop();
}

//============================События=========================================================
//вешаем событие на вкладки
playerBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlocks[i].classList.add('active');
    });
})

videoPlayerInit();
radioPlayerInit();
audioPlayerInit();
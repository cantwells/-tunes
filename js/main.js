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
const resetClass = () => {
    playerBtns.forEach((el, i) => {
        el.classList.remove('active');
        playerBlocks[i].classList.remove('active');
    })
}

//============================События=========================================================
//вешаем событие на вкладки
playerBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        temp.style.display = 'none';
        resetClass();
        btn.classList.add('active');
        playerBlocks[i].classList.add('active');
    });
})

videoPlayerInit();
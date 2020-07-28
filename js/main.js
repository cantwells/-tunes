//Импортируем внешние файлы
import { videoPlayerInit } from './videoPlayer.js';
import { audioPlayerInit } from './audioPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';

//============================Получение элементов============================================
const playerBtns = document.querySelectorAll('.player-btn');
const playerBlocks = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//============================Функции=========================================================
const resetClass = () => {
    playerBtns.forEach((el, i) => {
        el.classList.remove('active');
        playerBlocks[i].classList.remove('active');
    })
}

//============================События=========================================================
playerBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        temp.style.display = 'none';
        resetClass();
        btn.classList.add('active');
        playerBlocks[i].classList.add('active');
    });
})
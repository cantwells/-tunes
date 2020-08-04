export const radioPlayerInit = () => {

    //===========================Получение элементов=======================================================
    const radioNavigation = document.querySelector('.radio-navigation'), //форма с радиостанциями
        radioСoverImg = document.querySelector('.radio-cover__img'), //центральная картинка 
        radioHeaderBig = document.querySelector('.radio-header__big'), //Заголовок с названием радиостанции
        radioItems = document.querySelectorAll('.radio-item'), //все радиостанции
        radioStop = document.querySelector('.radio-stop'); //кнопка включения

    radioStop.disabled = true; //делаем не активной кнопку play
    const audio = new Audio(); //получаем экземпляр класса Audio

    //==================================Функции============================================================
    //Отметить радиостанцию
    const selectItem = chosen => {
            //убираем у всех класс для выделения
            radioItems.forEach(item => item.classList.remove('select'));
            chosen.classList.add('select');
        }
        //меняем вид иконки play и запускаем или останавливаем анимацию
    const togglePlay = () => {
        if (audio.paused) {
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
            radioСoverImg.style.animationPlayState = 'paused';
        } else {
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
            radioСoverImg.style.animationPlayState = 'running';
        }
    }

    //==================================Событие============================================================
    //Вешаем событие на форму и с помощью делегирования ищем инпут
    radioNavigation.addEventListener('click', event => {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            //подставляем в свойство src адрес потокового радио, который находится в дата-сет атрибуте
            audio.src = target.dataset.radioStation;
            //запускаем радио
            audio.play();
            //делаем кнопку play активной
            radioStop.disabled = false;
            //получаем родителя (карточку с радиостанцией)
            const parent = target.closest('.radio-item');
            selectItem(parent);
            //подставляем название станции в заголовок
            radioHeaderBig.textContent = parent.querySelector('.radio-name').textContent;
            //подставляем картинку
            radioСoverImg.src = parent.querySelector('.radio-img').src;
            togglePlay();
        }

    })
    radioStop.addEventListener('click', event => {
        //запускаем или останавливаем радио
        audio.paused ? audio.play() : audio.pause();
        togglePlay();
    })
}
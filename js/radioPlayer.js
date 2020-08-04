export const radioPlayerInit = () => {

    //===========================Получение элементов=======================================================
    const radioNavigation = document.querySelector('.radio-navigation'), //форма с радиостанциями
        radioСoverImg = document.querySelector('.radio-cover__img'), //центральная картинка 
        radioHeaderBig = document.querySelector('.radio-header__big'), //Заголовок с названием радиостанции
        radioItems = document.querySelectorAll('.radio-item'), //все радиостанции
        radioStop = document.querySelector('.radio-stop'); //кнопка включения

    radioStop.disabled = true; //делаем не активной кнопку play
    const audio = new Audio(); //получаем экземпляр класса Audio
}
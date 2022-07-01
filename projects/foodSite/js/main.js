"use strict";
window.addEventListener('DOMContentLoaded', function() {


    fetch('bd/food-db.json')
        .then(data => console.log(data));

    /*** Tabs **/

    (function() {
        const tabsImg = document.querySelectorAll('.tabcontent'),
            tabsName = document.querySelectorAll('.tabheader__item'),
            tabsSelector = document.querySelector('.tabheader__items');


        function hideTabs() {
            tabsImg.forEach(item => {
                item.classList.remove('show');
                item.classList.add('hide');
            });
            tabsName.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTab(tabNumber = 0) {
            tabsImg[tabNumber].classList.add('show', 'showTab');
            tabsName[tabNumber].classList.add('tabheader__item_active');
        }

        hideTabs();
        showTab();

        tabsSelector.addEventListener('click', function(e) {
            let target = e.target;
            if (target.classList.contains('tabheader__item')) {
                tabsName.forEach((item, index) => {
                    if (target == item) {
                        hideTabs();
                        showTab(index);
                    }
                });
            }

        });

    })();

    /*** Timer **/

    (function() {
        const clock = document.querySelectorAll('.timer__block span'),
            NEED_DATE = '2023-01-01';

        function getTime(date) {
            const miliseconds = Date.parse(date) - new Date();
            let day, hour, minute, second;

            if (miliseconds <= 0) {
                day = 0;
                hour = 0;
                minute = 0;
                second = 0;
            } else {
                day = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
                hour = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
                minute = Math.floor((miliseconds / (1000 * 60)) % 60);
                second = Math.floor((miliseconds / (1000)) % 60);
            }
            return {
                miliseconds,
                day,
                hour,
                minute,
                second
            };
        }

        function addZero(numb) {
            if (numb < 10) { numb = '0' + numb };
            return numb;
        }

        function setTimerOnSite(date) {
            const startTimer = setInterval(updateclock, 1000);

            function updateclock() {

                const time = getTime(date);
                clock[0].innerHTML = time.day;
                clock[1].innerHTML = addZero(time.hour);
                clock[2].innerHTML = addZero(time.minute);
                clock[3].innerHTML = addZero(time.second);

                if (time.miliseconds < 0) {
                    clearInterval(startTimer);
                }
            }
            updateclock();
        }
        setTimerOnSite(NEED_DATE);
    })();




    /** Modal **/
    const modalWindow = document.querySelector('.modal'),
        modalBtn = document.querySelectorAll('[data-modal="open"]');

    function closeModal() {
        modalWindow.style.display = "none";
        document.body.style.overflow = 'visible';
    }

    function openModal() {
        //AUTOMODAL
        clearTimeout(autoModalTimerID);
        window.removeEventListener('scroll', openModalEndScreen);

        modalWindow.style.display = "block";
        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        document.addEventListener('click', function(e) {


            if (e.target === modalWindow || e.target.classList.contains('modal__close')) {
                closeModal();
            }
        });
    }



    modalBtn.forEach(item => {
        item.addEventListener('click', openModal);
    });

    //Auto Modal
    const autoModalTimerID = setTimeout(openModal, 20000);

    function openModalEndScreen() {
        if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - (document.documentElement.clientHeight + 120)) {
            openModal();
        }
    }
    window.addEventListener('scroll', openModalEndScreen);

    //CONTENT WITH CLASS MENU
    (function() {

        //Получаем данные с сервера и возвращаем обьект
        async function getData(url) {
            const request = await fetch(url);
            const data = await request.text();

            return JSON.parse(data);
        }

        //Рендер меню из полученных данных, посредствам класса
        async function renderMenu(urlMenu) {
            const data = await getData(urlMenu);

            data.menu.forEach(m => {
                new Menu(m.img, 'text', m.title, m.descr, m.price).makeMenu();
            });

        }

        renderMenu('bd/food-db.json');

        //Класс для создания меню
        class Menu {
            constructor(src, srcname, name, description, price = 100) {
                this.src = src;
                this.srcname = srcname;
                this.name = name;
                this.description = description;
                this.price = price;
            }



            //отрисовка меню на стр
            makeMenu() {
                const menuItem = document.createElement('div');
                menuItem.classList.add("menu__item");
                menuItem.innerHTML = `                   
                  <img src="${this.src}" alt="${this.srcname}">
                  <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
                  <div class="menu__item-descr">Меню "${this.name}" - ${this.description}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.dollatToRub(this.price)}</span> руб/день</div>
                  </div>`;
                document.querySelector('.menu__field .container').appendChild(menuItem);
            }

            //из $ в руб
            dollatToRub(dollar) {
                return Math.round(dollar * 60);
            }

        }

    })();




    // FORMS //
    const forms = this.document.querySelectorAll("form");

    function postData(url, data) {
        const request = fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return request;
    }

    function PostFormData(url, data, form) {

        postData(url, data)
            .then(responce => {
                if (responce.ok) {
                    return responce.text();
                } else { throw new Error(`OWIBKA - status:${responce.status}`); }
            })
            .then(responceText => {
                console.log(JSON.parse(responceText));
                ModalMessage("Спасибо за заявку!");
            })
            .catch((e) => {
                console.log(e);
                ModalMessage("Что-то пошло не так!");
            })
            .finally(() => {
                form.reset();
            });
    }

    //MODAL for form
    function ModalMessage(message = "") {
        openModal();
        document.querySelector('.modal__content').classList.add('hide');

        const modalMessageHtml = `
        <div class="modal__content">
        <div class="modal__close">&times;</div>
             <div class="modal__title">${message}</div>
        </div>   
         `;
        const modalMessageEL = document.createElement('div');
        modalMessageEL.insertAdjacentHTML('beforeend', modalMessageHtml);

        document.querySelector('.modal__dialog').insertAdjacentElement('beforeend', modalMessageEL);
        setTimeout(() => {
            closeModal();
            modalMessageEL.remove();
            document.querySelector('.modal__content').classList.remove('hide');
        }, 3000);

    }

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));

            PostFormData('http://localhost:3000/requests', formDataJson, e.target);

        });
    });








    //SLIDER
    (function() {

        const sliders = document.querySelectorAll('.offer__slide');
        const nextSlider = document.querySelector('.offer__slider-next');
        const prevSlider = document.querySelector('.offer__slider-prev');
        const current = document.querySelector('#current');
        const total = document.querySelector('#total');
        const wrapSliderOuter = document.querySelector('.offer__slider-wrapper');
        const wrapSliderInner = document.querySelector('.offer__slider-inner');

        let widthSlider = sliders[0].offsetWidth; //узнаем, какая будет ширина каждого элемента ( предпологается, что ширина будет одинаковая)
        let widthWrap = 0; // Ширина обёртки
        let counter = 0; // номер текущего слайдера
        const navDotsArr = []; // массив точек ( элемент навигации)

        //добавляем стили + делаем вычисления 
        function addStyles() {

            widthWrap = 100 * sliders.length; // ширина в %

            total.innerText = sliders.length < 10 ? `0${sliders.length}` : sliders.length; //кол-во слайдеров
            current.innerText = "0" + (counter + 1); //первый слайдер

            //скрываем лишнии обьекты со страницы и задаем позишен
            wrapSliderOuter.style.overflow = "hidden";
            wrapSliderOuter.style.position = "relative";
            //растягиваем блок в исходя из количества обектво
            wrapSliderInner.style.display = "flex";
            wrapSliderInner.style.width = widthWrap + "%";
            wrapSliderInner.style.transition = "all .9s";
            //Добавляем нав-элементы к слайдеру - обёртка 
            const navWrap = document.createElement('div');
            // стили для нав меню, обертка
            navWrap.style.cssText =
                `
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 15;
                    display: flex;
                    justify-content: center;
                    margin-right: 15%;
                    margin-left: 15%;
                    list-style: none;
                `;
            wrapSliderOuter.insertAdjacentElement('beforeend', navWrap);
            //Добавляем нав-элементы к слайдеру - точки
            for (let i = 0; i < sliders.length; i++) {
                const dot = document.createElement('div');
                dot.setAttribute('data-slide-number', i + 1);
                dot.style.cssText =
                    `
                    box-sizing: content-box;
                    flex: 0 1 auto;
                    width: 30px;
                    height: 6px;
                    margin-right: 3px;
                    margin-left: 3px;
                    cursor: pointer;
                    background-color: #fff;
                    background-clip: padding-box;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    opacity: .5;
                    transition: opacity .6s ease;
                `;
                navWrap.insertAdjacentElement('beforeend', dot);
                navDotsArr.push(dot);
            }
            // выделения, 1го элемента при инициализации
            navDotsArr[counter].style.opacity = "1";


        }
        addStyles();

        // вся движуха тут n- принимает номер слайдера
        function move(sliderNum) {

            if (sliderNum >= sliders.length) { sliderNum = 0; }
            if (sliderNum < 0) { sliderNum = sliders.length - 1; }

            counter = sliderNum;

            current.innerText = (counter + 1) < 10 ? "0" + (counter + 1) : (counter + 1);

            //нав меню
            navDotsArr.forEach(item => item.style.opacity = ".5");
            navDotsArr[counter].style.opacity = "1";

            //движение
            wrapSliderInner.style.transform = `translateX(${-(sliderNum*widthSlider)}px)`;
        }

        nextSlider.addEventListener('click', () => {
            counter++;
            move(counter);
        });

        prevSlider.addEventListener('click', () => {
            counter--;
            move(counter);
        });

        navDotsArr.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const numberOfSlider = e.target.getAttribute('data-slide-number') - 1;
                move(numberOfSlider);
            });
        });

    })();









});
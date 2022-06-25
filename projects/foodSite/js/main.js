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
    const sliders = document.querySelectorAll('.offer__slide');
    const nextSlider = document.querySelector('.offer__slider-next');
    const prevSlider = document.querySelector('.offer__slider-prev');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');

    let counter = 0;
    total.innerText = sliders.length < 10 ? `0${sliders.length}` : sliders.length;

    function showSlide(n) {
        //скрываем все слайдеры
        sliders.forEach(slide => {
            slide.classList.add('hide');
        });

        // цикл слайдера
        if (n < 0) { counter = sliders.length - 1; }
        if (n > sliders.length - 1) { counter = 0; }

        //изменяем счетчик текущего слайдера
        current.innerText = (counter + 1) < 10 ? "0" + (counter + 1) : (counter + 1);

        // показываем слайд
        sliders[counter].classList.remove('hide');
    }

    function plusSlide(n) {
        showSlide(counter += n);
    }

    nextSlider.addEventListener('click', () => {
        plusSlide(1);
    });
    prevSlider.addEventListener('click', () => {
        plusSlide(-1);
    });
    showSlide(counter);








});
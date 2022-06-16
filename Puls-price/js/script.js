"use strict";
window.addEventListener('DOMContentLoaded', () => {
    //Link  Увеличить заказы
    const linkShowService = document.querySelector('.tariff__current_wrap-link');

    linkShowService.addEventListener('click', (e) => {
        e.preventDefault();
        btnShowTariff.click();
    })


    //MENU
    const menuList = document.querySelector('.menu__list');
    menuList.addEventListener('click', (e) => {

        if (e.target.closest('.menu__item')) {
            removeActive();
            e.target.closest('.menu__item').classList.add('menu__active');
        }

        function removeActive() {
            menuList.querySelectorAll('.menu__item').forEach(item => {
                item.classList.remove('menu__active');
            });
        }
    });


    //SHOW-BLOCK
    const btnShowSale = document.querySelector('#show-sale'),
        btnShowTariff = document.querySelector('#show-service'),
        sectionSale = document.querySelector('.sale'),
        sectionService = document.querySelector('.service');

    btnShowSale.addEventListener('click', (e) => {
        focusOff(e);
        hideSection(sectionService);
        ShowSection(sectionSale);

    });

    btnShowTariff.addEventListener('click', (e) => {
        focusOff(e);
        hideSection(sectionSale);
        ShowSection(sectionService);

    });

    function focusOff(e) {
        document.querySelectorAll('.rising__block').forEach(el => {
            el.classList.add('focus-off');
        });
        e.target.closest('.rising__block').classList.remove('focus-off');
    }

    function ShowSection(section) {
        section.classList.remove('disp-no');
        section.scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
        section.querySelector('.hiden-block').classList.add('show');
    }

    function hideSection(section) {
        section.classList.add('disp-no');
        section.querySelector('.hiden-block').classList.remove('show');
    }




    // SLIDER
    const btnSale = document.querySelector('#btn-carrusel-sale'),
        btnTariff = document.querySelector('#btn-carrusel-tariff'),
        adaptiveBtnTariff = document.querySelector('#btn-tariff'),
        adaptiveBtnRegion = document.querySelector('#btn-region'),
        adaptiveBtnSale = document.querySelector('#btn-sale');

    adaptiveBtnTariff.addEventListener('click', () => sliderTariff.goTo('next'));
    adaptiveBtnRegion.addEventListener('click', () => sliderRegion.goTo('next'));
    adaptiveBtnSale.addEventListener('click', () => sliderSale.goTo('next'));

    btnSale.addEventListener('click', () => sliderSale.goTo('next'));
    btnTariff.addEventListener('click', () => {
        sliderTariff.goTo('next');
        sliderRegion.goTo('next');
    });

    const sliderTariff = tns({
        container: '.carrusel-tariff',
        items: 1,
        speed: 600,
        rewind: true,
        nav: false,
        controls: false,
    });
    const sliderRegion = tns({
        container: '.carrusel-region',
        items: 1,
        speed: 600,
        rewind: true,
        nav: false,
        controls: false,
        responsive: {
            700: {},
            1366: {},
            1919: {}
        }
    });
    const sliderSale = tns({
        container: '.carrusel-sale',
        items: 4,
        slideBy: "page",
        speed: 800,
        rewind: false,
        nav: false,
        controls: false,
        responsive: {
            700: {},
            1366: {
                items: 2,
                edgePadding: 100,
                gutter: 120,
            },
            1919: {
                edgePadding: 0,
                gutter: 0,
                items: 4
            }
        }
    });

    //Modal Call
    const btnConsultation = document.querySelector('.button_consultation');
    const form = document.querySelector('.modal__call');
    const thanks = document.querySelector('.modal__thanks');




    btnConsultation.addEventListener('click', () => {
        showModal(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.target.reset();
            closeModal();
            showModal(thanks);
            setTimeout(closeModal, 2500);

        });


        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.modal__overlay')) {
                closeModal();
            }
        });
    });

    function showModal(modal) {
        document.body.style.overflow = 'hidden';
        document.querySelector('.modal__overlay').classList.add('show-modal');
        modal.classList.add('show-modal');
        modal.scrollIntoView({
            block: "center",
            behavior: "smooth"
        });
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        const form = modal.querySelector('.modal__call');
        const thanks = modal.querySelector('.modal__thanks');

        document.body.style.overflow = '';
        modal.querySelector('.modal__overlay').classList.remove('show-modal');
        form.classList.remove('show-modal');
        thanks.classList.remove('show-modal');
    }






});
"use strict";
document.addEventListener('DOMContentLoaded', () => {

    //Hamburger
    (function() {
        const hamburger = document.querySelector('.nav__hamburger');
        const menu = document.querySelector('.nav__list');
        const btn = document.querySelector('.nav__btn');
        const header = document.querySelector('.header');

        hamburger.addEventListener('click', () => {

            if (document.documentElement.clientWidth < 577) {
                menu.classList.toggle('hide-mobile');
                btn.classList.toggle('hide-mobile');
                header.classList.toggle('show-menu');
            } else {
                menu.classList.toggle('hide');
                btn.classList.toggle('hide');
            }
        });
    })();


});
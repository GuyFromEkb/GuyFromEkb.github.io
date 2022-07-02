"use strict";
document.addEventListener('DOMContentLoaded', () => {



    //slider
    const sliderInner = document.querySelector('.m-card__slider');
    const sliderOne = document.querySelector('.m-card__item');
    const sliderWidth = sliderOne.offsetWidth;
    const styleGap = parseInt(getComputedStyle(sliderInner).gap);
    const sliderAll = Array.from(document.querySelectorAll('.m-card__item'));
    const width = -styleGap + (sliderWidth + styleGap) * sliderAll.length
    const COUNT_SLIDER_ON_SITE = 4;

    sliderInner.style.width = width + "px";
    sliderInner.style.display = "flex";


    let scrollToPx = 0;
    sliderInner.addEventListener('wheel', (e) => {
        e.preventDefault();
        let buffScroll = 0;

        if (e.deltaY > 0) {
            buffScroll += (sliderWidth + styleGap) / 2;
        } else {
            buffScroll -= (sliderWidth + styleGap) / 2;
        }


        if (scrollToPx + buffScroll > 0) {

        } else if (scrollToPx + buffScroll < -((sliderAll.length - COUNT_SLIDER_ON_SITE) * (sliderWidth + styleGap))) {

        } else {
            scrollToPx += buffScroll;
        }





        sliderInner.style.transform = `translateX(${scrollToPx}px)`;


    })



});
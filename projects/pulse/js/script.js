"use strict";
$(document).ready(function() {

    //  tiny-Slider

    var slider = tns({
        container: '.carusel__inner',
        items: 1,
        speed: 1400,
        loop: true,
        rewind: true,
        nav: true,
        controls: false,
        navPosition: "bottom"
    });




    document.querySelector('.carusel__prev-btn').onclick = function() {
        slider.goTo('prev');
    };
    document.querySelector('.carusel__next-btn').onclick = function() {
        slider.goTo('next');
    };

    //  Tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function TabInfo(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__content-info').eq(i).toggleClass('catalog-item__content-info_active');
            });

        });
    }

    TabInfo('.catalog-item__link');
    TabInfo('.catalog-item__link_back');



    //  Modal Windows

    $('[data-modal=consultation]').on('click', function() {
        $('.modal-window, #callBack ').fadeIn('slow');
    });

    $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-window__text').text($('.catalog-item__subtitle').eq(i).text());
            $('.modal-window, #order ').fadeIn('slow');
        });
    });
    $('.modal-window__close ').on('click', function() {
        $('.modal-window , #thanks, #order , #callBack').fadeOut('slow');
    });

    // jQuery validator

    function formValidate(idItem) {
        $(idItem).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 15

                },
                email: {
                    required: true,
                    email: true

                }
            },
            messages: {
                name: {
                    required: "Нам нужно знать как к вам обращаться",
                    minlength: jQuery.validator.format("Ваше имя не может быть короче {0} букв ")
                },
                phone: {
                    minlength: "Формат для ввода номера:<br>+7 900 1111-333",
                    required: "Введите ваш мобильный номер телефона",
                    digits: "Формат для ввода номера:<br>+7 900 1111-333"
                },
                email: {
                    required: "Укажите ваш E-mail адрес",
                    email: "Формат для ввода e-mail:<br>name@domain.com"
                }
            },
        });
    }

    formValidate('#orderForm');

    formValidate('#siteForm');

    formValidate('#callbackForm');

    //  *jQuery mask phone*

    // $('input[name=phone]').mask("+7(999) 999-9999");

    //клик по центру, плагин
    //походу криво работает на моб версии

    // $.fn.setCursorPosition = function(pos) {
    //     if ($(this).get(0).setSelectionRange) {
    //         $(this).get(0).setSelectionRange(pos, pos);
    //     } else if ($(this).get(0).createTextRange) {
    //         var range = $(this).get(0).createTextRange();
    //         range.collapse(true);
    //         range.moveEnd('character', pos);
    //         range.moveStart('character', pos);
    //         range.select();
    //     }
    // };

    $("input[name=phone]").mask("+7(999)999-99-99");

    // $('input[name=phone]').click(function() {
    //     $(this).setCursorPosition(3);
    // }).mask("+7(999) 999-9999");

    //  *jQuery отправка форм по email*

    //заглушка. т.к. на github pages не работает php


    $('form').submit(function(e) {
        if (e.result == false)
            return false;
        else {
            e.preventDefault();
            $('#order , #callBack').fadeOut();
            $('.modal-window , #thanks').fadeIn();
            $('form').trigger('reset');

            setTimeout(() => alert("*заглушка вместо php скрипта, который отправляет данные,например на email*\n\nДАННЫЕ ОТПРАВЛЕНЫ"), 500);
        }


    });



    // $('form').submit(function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: "POST",
    //         url: "mailer/smart.php",
    //         data: $(this).serialize()
    //     }).done(function() {
    //         $(this).find("input").val("");
    //         $('#order , #callBack').fadeOut();
    //         $('.modal-window , #thanks').fadeIn();
    //         $('form').trigger('reset');
    //     });
    //     return false;



    //  *Smooth Scroll*



    $(window).scroll(function() {
        if ($(this).scrollTop() > 1100 && screen.width > 1023) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });


    //Короче это говно не работает, я не понял почему, тупил 2 часа и все равно не понял, спросить у того, кто шарит!(пробовал разные вариации)

    /*     $("a[href=#up]").on("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 777);
            e.preventDefault();
            return false;
        }); */

    //    *Wow animated*

    const wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animate', // default
        offset: 0, // default
        mobile: true, // default
        live: false // default
    });
    wow.init();

    // new WOW().init();


});
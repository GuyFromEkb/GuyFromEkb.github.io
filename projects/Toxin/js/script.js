"use strict";
window.addEventListener('DOMContentLoaded', () => {

    // CALENDAR
    const calendar = document.querySelector('#calendar');
    const crp = document.querySelector('.tstcontain');
    console.log(crp);

    // console.log(calendar);
    let today = new Date();
    let dp = new AirDatepicker('#calendar', {
        // multipleDates: "2",
        range: true,
        // minDate: new Date(),
        navTitles: {
            days: '<i>MMMM</i> &nbsp yyyy ',
            months: 'yyyy'
        },
        autoClose: false,
        dynamicRange: true,
        container: "body",
        buttons: ['clear', 'clear'],
        prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1757 8.01562V9.98438H3.98819L9.56632 15.6094L8.16007 17.0156L0.144441 9L8.16007 0.984375L9.56632 2.39062L3.98819 8.01562H16.1757Z" fill="#BC9CFF"/></svg>',
        nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">        <path d="M8.36252 0.984375L16.3781 9L8.36252 17.0156L6.95627 15.6094L12.5344 9.98438H0.346894V8.01562H12.5344L6.95627 2.39062L8.36252 0.984375Z" fill="#BC9CFF"/>        </svg>',
    });

    // AUTORIZATION
    const promoModal = document.querySelector('.modal__promo');
    const modals = document.querySelectorAll('.modal');
    const btnIn = document.querySelectorAll('#sign-in');
    const btnRegistration = document.querySelectorAll('#registation');
    const modalLogIn = document.querySelector('.modal__autorization');
    const modalRegistration = document.querySelector('.modal__registration');
    const overlay = document.querySelector('.modals');


    function showPromoModal() {
        modals.forEach(item => {
            hideModal(item);
        });
        promoModal.classList.remove('modal__hide');
    }


    function showModal(modal) {
        modals.forEach(item => {
            hideModal(item);
        });
        document.body.style.overflow = "hidden"
        overlay.classList.remove('modal__hide');
        modal.classList.remove('modal__hide');
    }

    function hideModal(modal) {
        overlay.classList.add('modal__hide');
        modal.classList.add('modal__hide');
        document.body.style.overflow = "";
    }

    btnIn.forEach(item => {
        item.addEventListener('click', function(e) {
            showModal(modalLogIn);
        });
        overlay.addEventListener('click', function(e) {
            const target = e.target;
            if (target.classList.contains('overlay')) {
                hideModal(modalLogIn);
                showPromoModal()
            }
        })
    });
    btnRegistration.forEach(item => {
        item.addEventListener('click', function(e) {
            showModal(modalRegistration);
        });
        overlay.addEventListener('click', function(e) {
            const target = e.target;
            if (target.classList.contains('overlay')) {
                hideModal(modalRegistration);
                showPromoModal()
            }
        })
    });

    showPromoModal();


});
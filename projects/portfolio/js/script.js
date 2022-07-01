// *SKILL LINE HEIGHT* //
const skillLine = document.querySelectorAll('.skills__percent-wrap_scale span');

skillLine.forEach(element => {
    element.style.width = `${element.parentElement.previousElementSibling.firstElementChild.innerText}`;
});

// *MENU* //
const hamburger = document.querySelector('.promo__hamburger'),
    menu = document.querySelector('.menu'),
    menuLink = document.querySelectorAll('.menu__link'),
    menuClose = document.querySelector('.menu__close');

hamburger.addEventListener('click', function() {
    menu.classList.toggle('menu_active');
    hamburger.classList.toggle('hamburger_active');
});
menuClose.addEventListener('click', function() {
    menu.classList.toggle('menu_active');
    hamburger.classList.toggle('hamburger_active');
});
menuLink.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.toggle('menu_active');
        hamburger.classList.toggle('hamburger_active');
    });
});

// smooth scroll
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
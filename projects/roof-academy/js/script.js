document.addEventListener("DOMContentLoaded", function() {

    //Phone-mask
    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            // console.log(template);
            let i = 0,
                newValue = template.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }

    }
    maskPhone('.form__numb');

    //Modals
    (function() {

        //Modal + form

        const btn = document.querySelector('.link_call-me');
        const close = document.querySelectorAll('.modal__close');
        const overlay = document.querySelector('.modal__overlay');
        const modal = document.querySelector('#modal-form');
        const modalAll = document.querySelectorAll('.modal__window');

        function showModal(modal) {
            overlay.classList.remove('hide');
            modal.classList.remove('hide');
            document.body.classList.add('stop-scroll');
            watchForCloseModal();
        }

        function hideModal() {
            overlay.classList.add('hide');
            modalAll.forEach(item => {
                item.classList.add('hide');
            });
            // modal.classList.add('hide');
            document.body.classList.remove('stop-scroll');
        }

        function watchForCloseModal() {
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    hideModal();
                }
            });

            document.addEventListener('click', function(e) {


                if (e.target === overlay) {
                    hideModal();
                }
            });
        }

        btn.addEventListener('click', () => {
            showModal(modal);
        });
        close.forEach(item => {
            item.addEventListener('click', hideModal);
        });

        //Form
        const form = document.querySelector('.form');
        const modalTnh = document.querySelector('#modal-tnh');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.target.reset();
            hideModal();
            showModal(modalTnh);

            //autoclose

            setTimeout(() => {
                if (!modalTnh.classList.contains('hide')) {
                    hideModal();
                }
            }, 5000);

        });

    })();


    //Hamburger-menu
    (function() {
        const hamburger = document.querySelector('.header__burger');
        const menuItem = document.querySelectorAll('[data-menu]');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');

            if (hamburger.classList.contains('active')) {
                menuItem.forEach(item => {
                    item.removeAttribute('data-menu-hide');
                });
            } else {
                menuItem.forEach(item => {
                    item.setAttribute('data-menu-hide', '');
                });
            }
        });
    })();

    //OpenList-mobile
    (function() {
        const btn = document.querySelector('.main__services-btn');
        const list = document.querySelector('.main__services');

        btn.addEventListener('click', () => {

            list.classList.toggle('active');
            btn.classList.toggle('active');




            console.log('cl');
        });

    })();




});
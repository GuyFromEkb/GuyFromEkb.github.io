document.addEventListener("DOMContentLoaded", function() {
    let procent = 0;
    let discountIsActive = false;

    //CЧЁТЧИК ТОВАРА


    (function() {


        document.addEventListener('click', (e) => {

            const target = e.target;

            if (target.classList.contains('items__control')) {

                const atr = target.getAttribute(('data-action'));
                const counter = target.closest('.counter-wrapper').querySelector('[data-counter]');


                //cчетчик в корзине (удаления товара из корзины + отрисовка суммы с кол-вом)
                if (target.closest('.cart-wrapper')) {

                    if (atr == "plus") {
                        counter.innerText = ++counter.innerText;
                        totalInfo();
                        Discound();
                    }
                    if (atr == "minus") {
                        if (counter.innerText == 1) {
                            target.closest('.cart-item').remove();
                            emptyCart();
                            totalInfo();
                            Discound();
                        }
                        if (counter.innerText > 1) {
                            counter.innerText = --counter.innerText;
                            totalInfo();
                            Discound();
                        }
                    }

                }
                //cчетчик на странице
                else {
                    if (atr == "plus") {
                        counter.innerText = ++counter.innerText;
                    }
                    if (atr == "minus") {

                        if (counter.innerText > 1) { counter.innerText = --counter.innerText; }

                    }
                }
            }


        });



    })();









    //КОРЗИНА

    //товар в корзину
    (function() {
        //товар в корзину
        const wraper = document.querySelector('.roll-wraper');
        wraper.addEventListener('click', (e) => {

            const target = e.target;

            if (target.hasAttribute('data-cart')) {

                const card = target.closest('.card');

                const cardInfo = {
                    id: +card.getAttribute('data-id'),
                    imgSrc: card.querySelector('.product-img').getAttribute('src'),
                    name: card.querySelector('.item-title').innerText,
                    quantity: card.querySelector('.text-muted').innerText,
                    weight: card.querySelector('.price__weight').innerText,
                    price: card.querySelector('.price__currency').innerText,
                    counter: +card.querySelector('[data-counter]').innerText
                };

                renderCart(cardInfo);
                card.querySelector('[data-counter]').innerText = 1;
                emptyCart();

            }
        });

    })();




    //удаление из корзины
    (function() {
        const cartWrap = document.querySelector('.cart-wrapper');

        cartWrap.addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('cart-item__close') || target.closest('.cart-item__close')) {
                target.closest('.cart-item').remove();

                emptyCart();
            }

        });
    })();


    //отрисовка эл в корзине
    function renderCart({ id, imgSrc, name, quantity, weight, price, counter }) {

        const cartWrap = document.querySelector('.cart-wrapper');
        const cartId = document.querySelector(`[data-id="${id}"]`);


        if (cartId) {
            const counterInCart = cartId.querySelector('[data-counter]');

            // console.log(parseInt(counterInCart.innerText), counter);

            counterInCart.innerText = parseInt(counterInCart.innerText) + counter;

        } else {
            const cartItem =
                `
                <div class="cart-item" data-id="${id}">
                                    <div class="cart-item__close">
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div class="cart-item__top">
                                        <div class="cart-item__img">
                                            <img src="${imgSrc}" alt="img">
                                        </div>
                                        <div class="cart-item__desc">
                                            <div class="cart-item__title">${name}</div>
                                            <div class="cart-item__weight">${quantity} / ${weight}</div>

                                
                                            <div class="salle cart-item__details">

                                                <div class="items items--small counter-wrapper">
                                                    <div class="items__control" data-action="minus">-</div>
                                                    <div class="items__current" data-counter="">${counter}</div>
                                                    <div class="items__control" data-action="plus">+</div>
                                                </div>

                                                <div class="price">
                                                    <div class="price-count price__currency">${price} <span class="salle-price" ></span></div>
                                                </div>

                                            </div>
                            

                                        </div>
                                    </div>
                                </div>
            `;

            cartWrap.insertAdjacentHTML('beforeend', cartItem);
        }







    }

    //информация о данных в  корзине
    function emptyCart() {
        const cartWrap = document.querySelector('.cart-wrapper');
        totalInfo();

        if (cartWrap.children.length > 0) {
            document.querySelector('.cart-empty').classList.add('hide');
            document.querySelector('#order-form').classList.remove('hide');
            document.querySelector('.cart-total').classList.remove('hide');
            Discound();
        } else {
            document.querySelector('.cart-empty').classList.remove('hide');
            document.querySelector('#order-form').classList.add('hide');
            document.querySelector('.cart-total').classList.add('hide');
            discountIsActive = false;
            document.querySelector('form').reset();
            Discound();
        }
    }


    //ЦЕНА
    function totalInfo() {
        const cartItems = Array.from(document.querySelector('.cart-wrapper').children);
        const totalPrice = document.querySelector('.total-price');
        const totalQuantity = document.querySelector('.total-count');

        // console.log(totalPrice, totalQuantity);
        let sum = 0;
        let quantity = 0;
        // console.log(cartItems);

        cartItems.forEach(item => {
            let count = +item.querySelector('[data-counter]').innerText;
            let price = parseInt(item.querySelector('.price__currency').innerText);

            sum += count * price;
            quantity += count;
            // console.log(count, price);
        });

        renderNumb(totalPrice, sum);
        renderNumb(totalQuantity, quantity);
        // console.log(sum, quantity);

    }

    function renderNumb(element, data) {
        element.innerText = data;
    }


    //Скидка

    (function() {

        const form = document.querySelector('form');
        const offDiscoundBtn = document.querySelector('.off-discound');

        form.addEventListener('submit', (e) => {
            e.preventDefault();


            const formData = new FormData(form);
            procent = +formData.get('sale') / 100;

            if (procent > 0) {
                discountIsActive = true;
                Discound();
            } else {
                discountIsActive = false;
                Discound();
            }

        });


        document.addEventListener('click', (e) => {
            if (e.target == offDiscoundBtn) {

                form.reset();
                discountIsActive = false;
                Discound();
            }

        });


    })();

    function Discound() {
        const salleAll = document.querySelectorAll('.salle');

        salleAll.forEach(element => {
            const price = element.querySelector('.price-count');
            const discound = element.querySelector('.salle-price');

            if (discountIsActive) {
                const priceNumb = parseInt(price.innerText);
                const finalProcent = Math.round(priceNumb - (priceNumb * procent));

                discound.innerText = finalProcent + "₽";
                price.classList.add('active');
            } else {
                discound.innerText = "";
                price.classList.remove('active');
            }


        });
    }







});

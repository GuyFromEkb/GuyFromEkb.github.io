"use strict";

//counter
document.querySelector('.cart-wrapper').addEventListener('click', counter);
document.querySelector('.cart-wrapper').addEventListener('click', finalPriceCart);
document.querySelector('.roll-wraper').addEventListener('click', counter);

function counter(e) {
    if (e.target.dataset.action == 'plus' || e.target.dataset.action == 'minus') {

        const targetWrap = e.target.parentNode.parentNode.parentNode,
            counter = targetWrap.querySelector('.items__current'),
            price = targetWrap.querySelector('.price__currency');

        if (e.target.dataset.action == 'plus') {
            ++counter.innerText;
            price.innerText = parseInt(price.innerText) / (+counter.innerText - 1) * counter.innerText + " ₽";
        } else {
            if (+counter.innerText > 1) {
                --counter.innerText;
                price.innerText = parseInt(price.innerText) - (parseInt(price.innerText) / (+counter.innerText + 1)) + " ₽";
            } else if (targetWrap.closest('.cart-wrapper') && +counter.innerText == 1) {
                targetWrap.closest('.cart-item').remove();
                showOrHideCartProperty();
            }
        }
    }
}
//Add to cart
const cartWrapper = document.querySelector('.cart-wrapper');
document.querySelector('.roll-wraper').addEventListener('click', function(e) {

    if (e.target.hasAttribute('data-cart')) {
        const item = e.target.closest('.card');
        const itemData = {
            id: item.getAttribute('data-id'),
            src: item.querySelector('.product-img').src,
            title: item.querySelector('.item-title').innerText,
            quantity: item.querySelector('[data-items-in-box]').innerText,
            weight: item.querySelector('.price__weight').innerText,
            count: item.querySelector('.items__current').innerText,
            price: item.querySelector('.price__currency').innerText
        };

        const itemCartHtml = `
    <div class="cart-item" data-id="${itemData.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${itemData.src}" alt="${itemData.id}">
            </div>
            <div class="cart-item__desc">
                <div class="cart-item__title">${itemData.title}</div>
                <div class="cart-item__weight">${itemData.quantity} / ${itemData.weight}</div>
                <div class="cart-item__details">
                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${itemData.count}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>
                    <div class="price">
                        <div class="price__currency">${itemData.price}</div>
                    </div>
                </div>
            </div>
        </div>
    </div> `;

        const itemInCart = cartWrapper.querySelector(`[data-id="${itemData.id}"]`);

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('.items__current'),
                priceElement = itemInCart.querySelector('.price__currency');

            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(itemData.count);
            priceElement.innerText = parseInt(itemData.price) + parseInt(priceElement.innerText) + " ₽";

        } else {
            cartWrapper.insertAdjacentHTML('beforeend', itemCartHtml);
        }

        const counter = item.querySelector('.items__current'),
            price = item.querySelector('.price__currency');

        price.innerText = parseInt(price.innerText) / parseInt(counter.innerText) + " ₽";
        counter.innerText = "1";
        finalPriceCart();
        showOrHideCartProperty();


    }
});

//Cart Manipulation

function showOrHideCartProperty() {
    const cartWraper = document.querySelector('.cart-wrapper').children.length;
    if (cartWraper > 0) {
        console.log(cartWraper)
        document.querySelector('.cart-total').classList.remove('none');
        document.querySelector('[data-cart-empty]').classList.add('none');
        document.querySelector('#order-form').classList.remove('none');

    } else {
        document.querySelector('.cart-total').classList.add('none');
        document.querySelector('[data-cart-empty]').classList.remove('none');
        document.querySelector('#order-form').classList.add('none');
    }
}

//Cart Final Price
function finalPriceCart() {
    let finalCost = 0,
        delivery = 0;
    const cartItems = document.querySelectorAll('.cart-item'),
        cartPrice = document.querySelector('.total-price');
    cartItems.forEach(item => {
        finalCost += parseInt(item.querySelector('.price__currency').innerText);
    });
    if (finalCost < 1000) {
        delivery = 300;
        document.querySelector('.small').classList.remove('none')
        document.querySelector('.delivery-cost').classList.remove('free')
        document.querySelector('.delivery-cost').innerHTML = "300 ₽";
    } else {
        delivery = 0;
        document.querySelector('.small').classList.add('none')
        document.querySelector('.delivery-cost').classList.add('free');
        document.querySelector('.delivery-cost').innerHTML = "бесплатно";
    }
    cartPrice.innerText = finalCost + delivery;


}
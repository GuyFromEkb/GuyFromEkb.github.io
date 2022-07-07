"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let procent = 0;
    let discountIsActive = false;

    //Данные с формы
    document.querySelector('.form-item').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = (Object.fromEntries(formData.entries()));

        renderItem(formDataObj)
        checkListEmpty();
        e.target.reset();

    })

    //Поиск по id, если в списке уже есть товар с таким id, возвраает данный элемент
    function searchId(id) {
        const itemInList = document.querySelector('.list__wrap').querySelector(`[data-id="${id}"]`);

        return (itemInList) ? itemInList.closest('.item') : false;

    }

    //Отрисовка элемента в корзине 

    function renderItem({ name, id, price }) {
        const item = searchId(id);

        //Меняет имя и цену, елси данный товар присутсвует в корзине
        if (item) {

            item.querySelector('[data-price]').innerText = price + " Р";
            item.querySelector('.item__name p').innerText = name;
        }
        else {
            //Либо отрисовывает
            const listItem =
                `
                <div class="item">
                    <div class="item__close"></div>
                    <div class="item__name">
                        <p>${name}</p> 
                        
                    </div>
                    <div data-id="${id}" class="item__id">
                        <p>ID: <span>${id}</span></p>

                    </div>
                    <div class="item__price">
                        <span data-price>${price + " Р"}</span>
                        <span data-discount=""></span>
                        
                    </div>
                </div>
             `;

            document.querySelector('.list__wrap').insertAdjacentHTML('beforeend', listItem);

        }

        renderDiscount();

    }


    //Удаление элемента из корзины

    function deleteItem() {
        document.querySelector('.list__wrap').addEventListener('click', (e) => {

            const target = e.target;
            if (target.classList.contains('item__close')) {
                target.closest('.item').remove();
                checkListEmpty()
            }
        })
    }
    deleteItem();

    //Добавление сообщения о том, что корзина пуста

    function checkListEmpty() {
        const itemsInLists = document.querySelector('.list__wrap').children.length;


        if (itemsInLists === 0) {
            document.querySelector('.list__bottom').classList.remove('show');
            document.querySelector('.list__empty').classList.add('show');
            document.querySelector('.list__title').classList.remove('show');
            deleteDiscount();
            document.querySelector('.form-discount').reset();

        }
        else {
            document.querySelector('.list__bottom').classList.add('show');
            document.querySelector('.list__title').classList.add('show');
            document.querySelector('.list__empty').classList.remove('show');
        }
        calculation();
        renderDiscount();

    }
    checkListEmpty()

    // подсчёт кол-во и суммы
    function calculation() {
        const allItems = Array.from(document.querySelector('.list__wrap').children);

        const result = allItems.reduce((acc, item) => {

            acc += parseInt(item.querySelector('.item__price span').innerText);
            return acc;

        }, 0)

        document.querySelector('.list__sum').innerText = result + " Р";
        document.querySelector('.list__count').innerText = allItems.length;
    }

    //скидка

    document.querySelector('.form-discount').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        procent = (Object.fromEntries(formData.entries())).discount;
        discountIsActive = true;

        (procent == 0) ? deleteDiscount() : renderDiscount();




    })

    //отрисовка скидки
    function renderDiscount(num = procent) {


        if (discountIsActive) {
            const items = document.querySelectorAll('[data-price]');
            const procent = num / 100;

            items.forEach(item => {
                item.classList.add('show');

                const price = parseInt(item.innerText);

                item.nextElementSibling.innerText = Math.round(price - (price * procent)) + " Р"

            })
        }



    }
    //Удаление скидки 
    function deleteDiscount() {
        discountIsActive = false;
        const items = document.querySelectorAll('[data-price]');

        items.forEach(item => {
            item.classList.remove('show');

            item.nextElementSibling.innerText = "";

        })
    }

    document.querySelector('.off-discount').addEventListener('click', deleteDiscount)


});
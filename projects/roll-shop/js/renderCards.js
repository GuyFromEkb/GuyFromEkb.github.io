const request = new XMLHttpRequest(),
    itemWraper = document.querySelector('.roll-wraper');

request.open("GET", 'js/products.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('load', () => {
    let itemHtml = '';
    if (request.status === 200) {
        const data = JSON.parse(request.response);
        data.forEach(item => {
            itemHtml += `
            <div class="col-md-6">
            <div class="card mb-4" data-id="${item.id}">
                <img class="product-img" src="img/roll/${item.imgSrc}" alt="${item.imgSrc}">
                <div class="card-body text-center">
                    <h4 class="item-title">${item.title}</h4>
                    <p><small data-items-in-box class="text-muted">${item.itemsInBox} шт.</small></p>
    
                    <div class="details-wrapper">
                        <div class="items counter-wrapper">
                            <div class="items__control" data-action="minus">-</div>
                            <div class="items__current" data-counter>1</div>
                            <div class="items__control" data-action="plus">+</div>
                        </div>
    
                        <div class="price">
                            <div class="price__weight">${item.weight}г.</div>
                            <div class="price__currency">${item.price} ₽</div>
                        </div>
    
                    </div>
    
                    <button data-cart type="button" class="btn btn-block btn-outline-warning">
                        + в корзину
                    </button>
    
                </div>
            </div>
        </div>
            `;

        });
    } else {
        itemHtml =
            `что-то пошло не так проблема при загрузки данных с сервера`;
    }
    itemWraper.insertAdjacentHTML('beforeend', itemHtml);

});
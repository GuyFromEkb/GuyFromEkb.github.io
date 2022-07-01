let _mainContent = document.querySelector('.js-body')
let _modalContent = document.querySelectorAll('.modal-wrapper-block')
let _modalClose = document.querySelectorAll('.modal-close')

_mainContent.addEventListener('click', (e) => {

    let attr_Rel = e.target.getAttribute('rel') //находим аттрибут попапа который открыли
    let attr_Rel_child = e.target.parentNode.getAttribute('rel') //находим аттрибут попапа который открыли
    if (attr_Rel != null) {
        modal(attr_Rel)
    } else {
        modal(attr_Rel_child)
    }
})



function modal(attr) {
    _modalContent.forEach(element => {
        attrPopup = element.getAttribute('data-popup')
        if (attrPopup == attr) { // сравниваем с аттрибутами модальных окн, если совпадают то
            _modalClose[0].style.display = "block"
            console.log(element);
            element.classList.add('modal-block-show') // показываем модальное окно
            _mainContent.style.overflow = 'hidden' // отключаем прокрутку страницы

            // функция для закрытия модального окна 
            _modalClose[0].onclick = function() {
                _modalClose[0].style.display = "none"
                element.classList.remove('modal-block-show')
                _mainContent.style.overflow = 'auto' // включаем прокрутку страницы

            }

            element.addEventListener('click', (clickClose_) => {

                if (clickClose_.target.classList.contains('modal-wrapper-block') ||
                    clickClose_.target.classList.contains('modal-closeButt')) {
                    element.classList.remove('modal-block-show')
                    element.children[0].classList.remove('modal-block-height')
                    _mainContent.style.overflow = 'auto' // включаем прокрутку страницы
                }
            })

            // функция для закрытия модального окна через Esc
            document.addEventListener('keydown', (keyClose) => {
                if (keyClose.keyCode == '27') {
                    _modalClose[0].style.display = "none"
                    element.classList.remove('modal-block-show')
                    _mainContent.style.overflow = 'auto' // включаем прокрутку страницы
                }
            })

            //получаем высоту экрана (рабочей области)
            let height = document.documentElement.clientHeight

            //получаем высоту элемента
            let heightEl = element.children[0].clientHeight
            if (heightEl > height) {
                element.children[0].classList.add('modal-block-height')
                element.style.overflow = 'auto'
            }
        }
    });
}
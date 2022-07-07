"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let search = "";


    //form
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        search = Object.fromEntries(formData.entries()).repo;
        let counterSecondResult = 0;


        // getData(search);


        getData(search)
            .then((data) => {
                data.forEach(item => {

                    if (searchResult(item.name, search)) {

                        new repo(item).renderRepo(true);

                    } else {

                        if (counterSecondResult < 10 && searchSecondResult(item.name, search)) {

                            new repo(item).renderRepo(false);
                            counterSecondResult++;

                        }
                    }
                });

            })
            .then(() => {
                e.target.reset();
                //Отображение результата
                const resultContent = document.querySelector('.result').children.length;
                const SecondResultContent = document.querySelector('.second-result__wrap').children.length;



                if (resultContent > 0) {
                    if (SecondResultContent == 0) {

                    } else {
                        document.querySelector('.second-result').classList.add('active')
                    }

                } else {
                    renderNoResult();
                    if (SecondResultContent == 0) {
                        renderSecondNoResult();
                    } else {
                        document.querySelector('.second-result').classList.add('active')
                    }
                }



                // e.target.reset();
                // if (document.querySelector('.result').children.length == 0) {
                //     renderNoResult();
                // }
                // if (document.querySelector('.second-result__wrap').children.length == 0) {
                //     renderSecondNoResult();
                // } else {
                //     document.querySelector('.second-result').classList.add('active')
                // }



            });







    });

    async function getData(srch) {
        const request = await fetch(`https://api.github.com/search/repositories?q=${srch}`);
        Clean();


        if (!request.ok) {

            renderEror(request.status);
            throw new Error(request.status);
        }

        const data = await request.json();

        return data.items;
    }

    //Проверка на совпадения именни реп
    function searchResult(repoName, search) {

        return repoName.toLowerCase() == search.toLowerCase().replace(" ", "-");
    }

    //Проверка на совпадения строки в репозитории
    function searchSecondResult(repoName, search) {


        const cleanSearch = search.toLowerCase()
            .split(/[-__\s]/)
            .join("");

        const cleanRepoName = repoName.toLowerCase()
            .split(/[-__\s]/)
            .join("");

        return cleanRepoName.includes(cleanSearch);

    }



    class repo {
        constructor(item) {
            this.name = item.name;
            this.url = item['html_url'];
            this.avatar = item.owner['avatar_url'];
            this.login = item.owner['login'];
            this.ownerUrl = item.owner['html_url'];
            this.date = item['created_at'];
            this.stars = item['stargazers_count'];
            this.watch = item['watchers_count'];
            this.fork = item['forks_count'];
        }



        //отрисовка  на стр
        renderRepo(flag) {

            const date = this.date.substring(0, 10);

            const item =
                `
            <div class="item">

                <h4>
                    <a class="rep-name" target="_blank" href="${this.url}">${this.name}</a>
                </h4>

                <img class="rep-img item__img" src="${this.avatar}" alt="avatar">

                <div class="item__info">

                    <div class="item__owner-login">
                        <p>Логин владельца: </p>
                        <a class="rep-owner" target="_blank" href="${this.ownerUrl}">${this.login}</a>
                    </div>

                    <div class="item__search-data">

                        <p>Создан: </p>
                        <span class="rep-date">
                            ${date}
                        </span>

                    </div>

                </div>


                <div class="item__icon">

                    <div class="item__start">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star mr-2">
                            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        <span class="rep-star">${this.stars}</span> starts
                    </div>




                    <div class="item__watch">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-eye mr-2">
                            <path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span class="rep-watch">${this.watch}</span> watching
                    </div>


                    <div class="item__fork">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
                            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                        </svg>
                        <span class="rep-fork">${this.fork}</span> forks
                    </div>



                </div>

            </div>
            `;

            if (flag) {
                document.querySelector('.result').insertAdjacentHTML('beforeend', item);
            } else {
                document.querySelector('.second-result__wrap').insertAdjacentHTML('beforeend', item);
            }

        }

    }

    //поиск не удался
    function renderNoResult() {

        const item =
            `
            <div class="no-result">
                <h2>К сожалению ничего не найдено</h2>
            </div>
             `;
        document.querySelector('.result').insertAdjacentHTML('beforeend', item);

    }

    function renderEror(statusCode) {

        const item =
            `
            <div class="no-result">
                <h2>Что то пошло не так.....</h2>
                <p>response status = ${statusCode}</p>
            </div>
             `;
        document.querySelector('.result').insertAdjacentHTML('beforeend', item);

    }

    function renderSecondNoResult() {

        const item =
            `
            <div class="no-result">
                <h2>Даже похожих не нашлось :(</h2>
            </div>
             `;
        document.querySelector('.result').insertAdjacentHTML('beforeend', item);

    }


    //очистка окон
    function Clean() {

        const resultChildren = Array.from(document.querySelector('.result').children);
        const secResultChildren = Array.from(document.querySelector('.second-result__wrap').children);
        document.querySelector('.second-result').classList.remove('active')

        resultChildren.forEach(item => {
            item.remove();
        });
        secResultChildren.forEach(item => {
            item.remove();
        });


    }





});

// Hover Tariff
(function() {
    const tariffLinks = document.querySelectorAll(".promo__tariff-link");

    tariffLinks.forEach(item => {

        const silverTariff = document.querySelector('.silver-tariff'),
            goldTariff = document.querySelector('.gold-tariff'),
            platinumTariff = document.querySelector('.platinum-tariff');

        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('silver-btn')) {
                showTariffInfo(silverTariff);
            } else if (item.classList.contains('gold-btn')) {
                showTariffInfo(goldTariff);
            } else {
                showTariffInfo(platinumTariff);
            }
        });

        item.addEventListener("mouseleave", () => {
            if (item.classList.contains('silver-btn')) {
                hideTariffInfo(silverTariff);
            } else if (item.classList.contains('gold-btn')) {
                hideTariffInfo(goldTariff);
            } else {
                hideTariffInfo(platinumTariff);
            }
        });




    });

    function showTariffInfo(tariff) {
        tariff.classList.remove('hide');
    }

    function hideTariffInfo(tariff) {
        tariff.classList.add('hide');
    }

})();
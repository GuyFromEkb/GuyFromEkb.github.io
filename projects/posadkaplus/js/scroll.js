// Плавный scroll

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute("href").substring(1);
        if (blockID) {
            document.getElementById(blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            return false
        }
    });
}
// Begin Me - Talk

window.MeTalkSetup = {
    domain: "comkc.pulscen.ru",
};
(function (d, w, m) {
    window.supportAPIMethod = m;
    var s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "supportScript";
    s.charset = "utf-8";
    s.async = true;
    var id = "9e71060b780fc267cbbfff6f8dec56ba";
    s.src = "//me-talk.ru/support/support.js?h=" + id;
    var sc = d.getElementsByTagName("script")[0];
    w[m] =
        w[m] ||
        function () {
            (w[m].q = w[m].q || []).push(arguments);
        };
    if (sc) sc.parentNode.insertBefore(s, sc);
    else d.documentElement.firstChild.appendChild(s);
})(document, window, "MeTalk");

	// End Me - Talk
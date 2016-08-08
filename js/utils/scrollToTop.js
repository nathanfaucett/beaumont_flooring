var requestAnimationFrame = require("@nathanfaucett/request_animation_frame"),
    scrollTo = require("./scrollTo");


var DELTA_TIME = 1000 / 60;


module.exports = scrollToTop;


function scrollToTop() {
    var lastTime = 0,
        scrollY = window.scrollY,
        delta = -scrollY;

    function scroll(ms) {
        var dt;

        dt = ms - (lastTime || -DELTA_TIME);
        lastTime = ms;

        if (scrollY > 0) {
            scrollY += delta / dt;
            scrollTo(0, scrollY);
            requestAnimationFrame(scroll);
        } else {
            scrollTo(0, 0);
        }
    }

    requestAnimationFrame(scroll);
}

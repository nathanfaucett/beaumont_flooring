var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.route(
    "/about_us",
    function handleRoot(ctx, next) {
        app.dispatcher.dispatch({
            type: RouteStore.consts.UPDATE,
            state: "about_us",
            ctx: ctx
        });
        scrollToTop();
        ctx.end();
        next();
    }
);

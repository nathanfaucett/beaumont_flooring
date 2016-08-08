var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.route(
    "/",
    function handleRoot(ctx, next) {
        app.dispatcher.dispatch({
            type: RouteStore.consts.UPDATE,
            state: "home",
            ctx: ctx
        });
        scrollToTop();
        ctx.end();
        next();
    }
);

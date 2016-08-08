var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.route(
    "/testimonials",
    function handleRoot(ctx, next) {
        app.dispatcher.dispatch({
            type: RouteStore.consts.UPDATE,
            state: "testimonials",
            ctx: ctx
        });
        scrollToTop();
        ctx.end();
        next();
    }
);

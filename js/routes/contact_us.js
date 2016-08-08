var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.route(
    "/contact_us",
    function handleRoot(ctx, next) {
        app.dispatcher.dispatch({
            type: RouteStore.consts.UPDATE,
            state: "contact_us",
            ctx: ctx
        });
        scrollToTop();
        ctx.end();
        next();
    }
);

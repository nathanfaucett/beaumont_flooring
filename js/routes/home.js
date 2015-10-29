var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.route(
    "/",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "home",
            ctx: ctx
        });
        scrollToTop();
        ctx.end();
        next();
    }
);

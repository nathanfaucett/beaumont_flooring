var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.route(
    "/testimonials",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "testimonials",
            ctx: ctx
        });
        scrollToTop();
        ctx.end();
        next();
    }
);

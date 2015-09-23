var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/testimonials",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "testimonials",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/about_us",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "about_us",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

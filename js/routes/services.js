var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/services",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "services",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

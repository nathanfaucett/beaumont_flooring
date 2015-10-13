var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/contact_us",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "contact_us",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

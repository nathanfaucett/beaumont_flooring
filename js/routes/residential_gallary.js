var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/residential_gallary",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "residential_gallary",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

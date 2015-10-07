var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/residential_gallery",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "residential_gallery",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

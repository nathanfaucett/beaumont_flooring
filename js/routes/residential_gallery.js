var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/residential_gallery",
    function handleRoot(ctx, next) {
        app.dispatcher.dispatch({
            type: RouteStore.consts.UPDATE,
            state: "residential_gallery",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);

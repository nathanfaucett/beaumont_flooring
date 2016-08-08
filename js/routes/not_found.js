var RouteStore = require("../stores/RouteStore"),
    scrollToTop = require("../utils/scrollToTop"),
    app = require("../index");


app.router.use(
    function handleNotFound(ctx, next) {
        if (ctx.route) {
            next();
        } else {
            app.dispatcher.dispatch({
                type: RouteStore.consts.UPDATE,
                state: "not_found",
                ctx: ctx
            });
            scrollToTop();
            ctx.end();
            next();
        }
    }
);

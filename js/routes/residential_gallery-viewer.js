var virtModal = require("@nathanfaucett/virt-modal"),
    RouteStore = require("../stores/RouteStore"),
    scrollTo = require("../utils/scrollTo"),
    app = require("../index");


app.router.route(
    "/residential_gallery/:id[0-9]",
    function handleRoot(ctx, next) {
        app.dispatcher.dispatch({
            type: RouteStore.consts.UPDATE,
            state: "residential_gallery",
            ctx: ctx
        });
        app.dispatcher.dispatch({
            type: virtModal.ModalStore.consts.OPEN,
            name: "residential_gallery-viewer",
            dialog: {
                margin: "0px",
                width: "100%"
            },
            style: {
                overflow: "auto"
            },
            data: {
                id: ctx.params.id
            }
        });
        scrollTo(0, window.scrollY + 1);
        ctx.end();
        next();
    }
);

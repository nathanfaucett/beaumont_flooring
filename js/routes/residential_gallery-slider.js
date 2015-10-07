var virtModal = require("virt-modal"),
    RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/residential_gallery/:id[0-9]",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "residential_gallery",
            ctx: ctx
        });
        app.dispatcher.handleViewAction({
            actionType: virtModal.ModalStore.consts.MODAL_OPEN,
            name: "residential_gallery-slider",
            modalDialog: {
                margin: "0px",
                width: "100%"
            },
            modalStyle: {
                overflow: "auto"
            },
            data: {
                id: ctx.params.id
            }
        });
        ctx.end();
        next();
    }
);

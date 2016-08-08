var virt = require("@nathanfaucett/virt"),
    virtModal = require("@nathanfaucett/virt-modal"),
    Modal = require("../components/Modal"),
    ImageView = require("../components/ResidentialGallery/ImageView"),
    app = require("..");


app.registerModal(
    "residential_gallery-viewer",
    function renderResidentialGalleryImageViewModal(modal, ctx) {
        return (
            virt.createView(Modal, {
                ctx: ctx,
                i18n: app.i18n,
                modal: modal,
                render: function render() {
                    return virt.createView(ImageView, {
                        modal: modal,
                        id: +ctx.params.id
                    });
                }
            })
        );
    },
    function onCloseResidentialGalleryImageView(modal /*, ctx */ ) {
        app.dispatcher.dispatch({
            type: virtModal.ModalStore.consts.CLOSE,
            id: modal.id
        });
        app.page.go("/residential_gallery");
    }
);

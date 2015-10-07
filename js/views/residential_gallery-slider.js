var virt = require("virt"),
    virtModal = require("virt-modal"),
    Modal = require("../components/Modal"),
    Slider = require("../components/ResidentialGallery/Slider"),
    app = require("..");


app.registerModal(
    "residential_gallery-slider",
    function renderResidentialGallerySliderModal(modal, ctx) {
        return (
            virt.createView(Modal, {
                ctx: ctx,
                i18n: app.i18n,
                modal: modal,
                render: function render() {
                    return virt.createView(Slider, {
                        id: ctx.params.id
                    });
                }
            })
        );
    },
    function onCloseResidentialGallerySlider(modal /*, ctx */ ) {
        app.dispatcher.handleViewAction({
            actionType: virtModal.ModalStore.consts.MODAL_CLOSE,
            id: modal.id
        });
        app.page.go("/residential_gallery");
    }
);

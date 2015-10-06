var virt = require("virt"),
    app = require("../index"),
    ResidentialGallery = require("../components/ResidentialGallery"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("residential_gallary", function renderResidentialGalleryPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function render() {
                return virt.createView(ResidentialGallery);
            }
        })
    );
});

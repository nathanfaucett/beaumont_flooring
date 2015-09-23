var virt = require("virt"),
    app = require("../index"),
    ResidentialGallary = require("../components/ResidentialGallary"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("residential_gallary", function renderResidentialGallaryPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function render() {
                return virt.createView(ResidentialGallary);
            }
        })
    );
});

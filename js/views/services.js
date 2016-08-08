var virt = require("@nathanfaucett/virt"),
    app = require("../index"),
    Services = require("../components/Services"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("services", function renderServicesPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function render() {
                return virt.createView(Services);
            }
        })
    );
});

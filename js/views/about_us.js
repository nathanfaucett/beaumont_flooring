var virt = require("@nathanfaucett/virt"),
    app = require("../index"),
    AboutUs = require("../components/AboutUs"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("about_us", function renderAboutUsPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function render() {
                return virt.createView(AboutUs);
            }
        })
    );
});

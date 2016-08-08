var virt = require("@nathanfaucett/virt"),
    app = require("../index"),
    ContactUs = require("../components/ContactUs"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("contact_us", function renderContactUsPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function render() {
                return virt.createView(ContactUs);
            }
        })
    );
});

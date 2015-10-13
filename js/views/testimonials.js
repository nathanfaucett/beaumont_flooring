var virt = require("virt"),
    app = require("../index"),
    Testimonials = require("../components/Testimonials"),
    LayoutApp = require("../components/layouts/LayoutApp");


app.registerPage("testimonials", function renderTestimonialsPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function render() {
                return virt.createView(Testimonials);
            }
        })
    );
});

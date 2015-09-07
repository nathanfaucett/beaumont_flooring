var virt = require("virt"),
    propTypes = require("prop_types"),
    css = require("css"),
    Link = require("./Link"),
    app = require("../index");


var FooterPrototype;


module.exports = Footer;


function Footer(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Footer, "Footer");

Footer.contextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

FooterPrototype = Footer.prototype;

FooterPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,
        styles = {
            footerTop: {
                padding: "16px 64px",
                color: theme.palette.canvasColor,
                background: theme.palette.accent1Color
            },
            topLeft: {
                textAlign: "center"
            },
            address: {
                width: size.width < 768 ? "inherit" : "180px",
                textAlign: size.width < 768 ? "center" : "left"
            },
            phone: {
                marginTop: size.width < 768 ? "0" : "1.66em",
                textAlign: size.width < 768 ? "center" : "right"
            },
            footerBottom: {
                padding: "16px 64px",
                color: theme.palette.canvasColor,
                background: theme.palette.accent2Color
            },
            copyright: {
                textAlign: "left"
            },
            designedby: {
                textAlign: "right"
            },
            ul: {
                textAlign: "center"
            },
            link: {
                fontSize: "1em",
                fontWeight: "bold",
                background: theme.palette.primary1Color,
                display: "inline-block",
                margin: "4px",
                padding: "8px 20px"
            }
        };

    return styles;
};

FooterPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Footer"
            },
            virt.createView("div", {
                    className: "grid",
                    style: styles.footerTop
                },
                virt.createView("div", {
                        className: "col-xs-12 col-sm-12 col-md-4 col-lg-4",
                        style: styles.topLeft
                    },
                    virt.createView("img", {
                        src: "img/logo.png"
                    })
                ),
                virt.createView("div", {
                        className: "push-md-2 push-lg-2 col-xs-12 col-sm-12 col-md-6 col-lg-6",
                        style: styles.topRight
                    },
                    virt.createView("div", {
                            className: "grid",
                        },
                        virt.createView("div", {
                            className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                        }, virt.createView("h2", {
                            style: styles.address
                        }, i18n("footer.address"))),
                        virt.createView("div", {
                            className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                        }, virt.createView("h2", {
                            style: styles.phone
                        }, i18n("footer.phone")))
                    ),
                    virt.createView("ul", {
                            style: styles.ul
                        },
                        virt.createView("li", {style: styles.link}, virt.createView(Link, {href: "/"}, i18n("footer.nav.home"))),
                        virt.createView("li", {style: styles.link}, virt.createView(Link, {href: "/about_us"}, i18n("footer.nav.about_us"))),
                        virt.createView("li", {style: styles.link}, virt.createView(Link, {href: "/services"}, i18n("footer.nav.services"))),
                        virt.createView("li", {style: styles.link}, virt.createView(Link, {href: "/contact_us"}, i18n("footer.nav.contact_us")))
                    )
                )
            ),
            virt.createView("div", {
                    className: "grid",
                    style: styles.footerBottom
                },
                virt.createView("div", {
                        className: "col-xs-12 col-sm-12 col-md-6 col-lg-6",
                        style: styles.copyright
                    },
                    virt.createView("p", i18n("footer.copyright"))
                ),
                virt.createView("div", {
                        className: "col-xs-12 col-sm-12 col-md-6 col-lg-6",
                        style: styles.designedby
                    },
                    virt.createView("p", "© " + i18n("footer.designedby"))
                )
            )
        )
    );
};

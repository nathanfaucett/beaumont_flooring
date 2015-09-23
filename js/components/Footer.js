var virt = require("virt"),
    propTypes = require("prop_types"),
    arrayMap = require("array-map"),
    extend = require("extend"),
    Link = require("./Link"),
    links = require("../utils/links");


var FooterPrototype;


module.exports = Footer;


function Footer(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Footer, "Footer");

Footer.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
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
            footerLogo: {
                paddingTop: "24px"
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
                marginTop: "24px",
                textAlign: "center"
            },
            li: {
                display: "inline-block",
                marginLeft: "4px"
            },
            link: {
                fontSize: "1em",
                fontWeight: "bold",
                background: theme.palette.primary1Color,
                padding: "8px 16px"
            }
        };

    if (size.width < 768) {
        styles.copyright.textAlign = "center";
        styles.designedby.textAlign = "center";
    }

    if (size.width < 640) {
        styles.footerTop.padding = styles.footerBottom.padding = "16px 32px";
    }

    return styles;
};

FooterPrototype.render = function() {
    var context = this.context,
        i18n = context.i18n,
        theme = context.theme,
        pathname = context.ctx.pathname,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Footer"
            },
            virt.createView("div", {
                    style: styles.footerTop
                },
                virt.createView("div", {
                        className: "grid"
                    },
                    virt.createView("div", {
                            className: "col-xs-12 col-sm-12 col-md-4 col-lg-4",
                            style: styles.topLeft
                        },
                        virt.createView("img", {
                            style: styles.footerLogo,
                            src: "img/logo.png"
                        })
                    ),
                    virt.createView("div", {
                            className: "push-md-1 push-lg-1 col-xs-12 col-sm-12 col-md-7 col-lg-7",
                            style: styles.topRight
                        },
                        virt.createView("div", {
                                className: "grid"
                            },
                            virt.createView("div", {
                                className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                            }, virt.createView("h2", {
                                style: styles.address
                            }, i18n("app.address"))),
                            virt.createView("div", {
                                className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                            }, virt.createView("h2", {
                                style: styles.phone
                            }, i18n("app.phone")))
                        )
                    )
                ),
                virt.createView("ul", {
                        style: styles.ul
                    },
                    arrayMap(links, function(link, index) {
                        var active = pathname === link.path,
                            overrideStyles = {},
                            style = extend({}, styles.link);

                        if (index === 0) {
                            overrideStyles.marginLeft = "0px";
                        }

                        if (active) {
                            style.color = theme.palette.primary1Color;
                            style.background = theme.palette.canvasColor;
                        }

                        return virt.createView("li", {
                                style: extend({}, styles.li, overrideStyles)
                            },
                            virt.createView(Link, {
                                style: style,
                                active: active,
                                hoverColor: theme.palette.primary1Color,
                                hoverBackgroundColor: theme.palette.canvasColor,
                                href: link.path
                            }, i18n(link.name))
                        );
                    })
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

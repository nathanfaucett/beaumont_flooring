var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    HeaderNav = require("./HeaderNav");


var HeaderPrototype;


module.exports = Header;


function Header(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Header, "Header");

Header.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HeaderPrototype = Header.prototype;

HeaderPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,
        styles = {
            top: {
                color: theme.palette.primary2Color,
                padding: "16px"
            },
            headerRight: {
                textAlign: size.width < 768 ? "center" : "right"
            },
            headerLeft: {
                textAlign: size.width < 768 ? "center" : "left"
            },
            dot: {
                textAlign: "center"
            },
            logo: {
                padding: "16px 0",
                textAlign: "center"
            },
            nav: {

            },
            ul: {
                textAlign: "center"
            },
            link: {
                fontSize: "2em",
                display: "inline-block",
                margin: "0 4px",
                padding: "12px 20px"
            },
            linkA: {
                color: theme.palette.accent2Color
            }
        };

    if (size.width > 768) {
        styles.top.paddingBottom = "16px";
        styles.logo.padding = "32px 0";
    }

    return styles;
};

HeaderPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Header"
            },
            virt.createView("div", {
                    style: styles.top
                },
                virt.createView("div", {
                        className: "grid"
                    },
                    virt.createView("h2", {
                        className: "col-xs-12 col-sm-12 col-md-6 col-lg-6",
                        style: styles.headerLeft
                    }, i18n("header.commercial")),
                    virt.createView("h2", {
                        className: "hidden-max-sm col-md-1 col-lg-1"
                    }, "·"),
                    virt.createView("h2", {
                        className: "col-xs-12 col-sm-12 col-md-5 col-lg-5",
                        style: styles.headerRight
                    }, i18n("header.licensed"))
                )
            ),
            virt.createView("div", {
                    style: styles.logo
                },
                virt.createView("img", {
                    src: "img/logo.png"
                })
            ),
            virt.createView(HeaderNav)
        )
    );
};

var virt = require("virt"),
    propTypes = require("prop_types"),
    arrayMap = require("array-map"),
    extend = require("extend"),
    Link = require("../Link"),
    links = require("../../utils/links");


var HeaderNavPrototype;


module.exports = HeaderNav;


function HeaderNav(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(HeaderNav, "HeaderNav");

HeaderNav.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HeaderNavPrototype = HeaderNav.prototype;

HeaderNavPrototype.getStyles = function() {
    var context = this.context,
        size = context.size,
        theme = context.theme,
        styles = {
            ul: {
                textAlign: "center"
            },
            li: {
                display: "inline-block"
            },
            link: {
                fontSize: "1.25em",
                color: theme.palette.accent2Color,
                padding: "12px 16px"
            }
        };

    if (size.width < 640) {
        styles.li.display = "block";
    }

    return styles;
};

HeaderNavPrototype.render = function() {
    var context = this.context,
        theme = context.theme,
        pathname = context.ctx.pathname,
        i18n = context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "HeaderNav",
                style: styles.nav
            },
            virt.createView("ul", {
                    style: styles.ul
                },
                arrayMap(links, function(link) {
                    var active = pathname === link.path,
                        style = extend({}, styles.link);

                    if (active) {
                        style.background = theme.palette.primary2Color;
                    }

                    return virt.createView("li", {
                            style: styles.li
                        },
                        virt.createView(Link, {
                            style: style,
                            active: active,
                            href: link.path
                        }, i18n(link.name))
                    );
                })
            )
        )
    );
};

var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    arrayMap = require("array-map"),
    extend = require("extend"),
    Link = require("../Link"),
    links = require("../../utils/links");


var HeaderNavPrototype;


module.exports = HeaderNav;


function HeaderNav(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        opened: false
    };

    this.onClickMenu = function(e) {
        return _this.__onClickMenu(e);
    };
}
virt.Component.extend(HeaderNav, "HeaderNav");

HeaderNav.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HeaderNavPrototype = HeaderNav.prototype;

HeaderNavPrototype.__onClickMenu = function() {
    this.setState({
        opened: !this.state.opened
    });
};

HeaderNavPrototype.getStyles = function() {
    var context = this.context,
        size = context.size,
        theme = context.theme,
        styles = {
            root: {
                textAlign: "center"
            },
            ul: {
                overflow: "hidden",
                textAlign: "center"
            },
            li: {
                display: "inline-block"
            },
            link: {
                fontSize: "1.25em",
                color: theme.palette.accent2Color,
                padding: "12px 16px"
            },
            menu: {
                padding: "8px 0px 16px",
                display: "none"
            }
        };

    css.transition(styles.ul, "max-height 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)");

    if (size.width < 640) {
        styles.li.display = "block";

        if (this.state.opened) {
            styles.ul.maxHeight = "1024px";
        } else {
            styles.ul.maxHeight = "0";
        }

        delete styles.menu.display;
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
                style: styles.root
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
            ),
            virt.createView(Link, {
                    style: styles.menu,
                    onClick: this.onClickMenu,
                    hoverOpacity: 0.5
                },
                virt.createView("img", {
                    src: "img/menu.png"
                })
            )
        )
    );
};

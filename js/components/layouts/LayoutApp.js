var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    app = require("../../index"),
    Header = require("../Header"),
    Footer = require("../Footer");


var LayoutAppPrototype;


module.exports = LayoutApp;


function LayoutApp(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(LayoutApp, "LayoutApp");
LayoutAppPrototype = LayoutApp.prototype;

LayoutApp.propTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired,
    render: propTypes.func.isRequired
};

LayoutApp.contextTypes = {
    theme: propTypes.object.isRequired
};

LayoutApp.childContextTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

LayoutAppPrototype.getChildContext = function() {
    return {
        ctx: this.props.ctx,
        i18n: this.props.i18n
    };
};

LayoutAppPrototype.getStyles = function() {
    var theme = this.context.theme,
        styles = {
        background: {
            background: theme.palette.canvasColor
        },
        content: {
            margin: "0 auto",
            maxWidth: "768px"
        }
    };

    css.boxShadow(styles.content, "0px -8px 32px 0px " + theme.palette.accent1Color);

    return styles;
};

LayoutAppPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Layout",
                style: styles.background
            },
            virt.createView("div", {
                    style: styles.content
                },
                virt.createView(Header),
                this.props.render(this.props.ctx),
                virt.createView(Footer)
            )
        )
    );
};

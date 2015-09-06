var virt = require("virt"),
    propTypes = require("prop_types"),
    extend = require("extend");


var LinkPrototype;


module.exports = Link;


function Link(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Link, "Link");

LinkPrototype = Link.prototype;

Link.contextTypes = {
    theme: propTypes.object.isRequired
};

LinkPrototype.getStyle = function() {
    var theme = this.context.theme,
        styles = {
            color: theme.palette.canvasColor
        };
    return styles;
};

LinkPrototype.render = function() {
    var props = this.props;

    return (
        virt.createView("a", extend({}, props, {
            style: extend(this.getStyle(), props.style)
        }), this.children)
    );
};

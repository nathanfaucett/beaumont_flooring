var virt = require("virt"),
    propTypes = require("prop_types");


var HeaderPrototype;


module.exports = Header;


function Header(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Header, "Header");

Header.contextTypes = {
    i18n: propTypes.func.isRequired
};

HeaderPrototype = Header.prototype;

HeaderPrototype.getStyles = function() {
    var styles = {
        root: {
            position: "relative"
        },
        menu: {
            textAlign: "right"
        },
        links: {
            padding: "8px"
        }
    };

    return styles;
};

HeaderPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Header",
                style: styles.root
            },
            virt.createView("div", {
                style: styles.menu
            })
        )
    );
};

var virt = require("virt"),
    propTypes = require("prop_types");


var HomePrototype;


module.exports = Home;


function Home(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Home, "Home");

HomePrototype = Home.prototype;

Home.contextTypes = {
    i18n: propTypes.func.isRequired
};

HomePrototype.render = function() {
    return (
        virt.createView("div", {
            className: "Home"
        })
    );
};

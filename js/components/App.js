var virt = require("virt"),
    propTypes = require("prop_types"),
    app = require("../index"),
    Theme = require("../theme"),
    RouteStore = require("../stores/RouteStore");


var AppPrototype;


module.exports = App;


function App(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.theme = new Theme();

    this.state = {
        render: null
    };

    this.onChange = function() {
        _this.__onChange();
    };
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

App.childContextTypes = {
    theme: propTypes.object.isRequired
};

AppPrototype.getChildContext = function() {
    var theme = this.theme;

    return {
        theme: theme
    };
};

AppPrototype.__onChange = function() {
    var pageState = RouteStore.getState(),
        renderPage = app.getPage(pageState);

    if (renderPage) {
        this.setState({
            ctx: RouteStore.getContext(),
            render: renderPage
        });
    } else {
        throw new Error("App onChange no page state found named " + pageState);
    }
};

AppPrototype.componentDidMount = function() {
    RouteStore.addChangeListener(this.onChange);
};

AppPrototype.componentWillUnmount = function() {
    RouteStore.removeChangeListener(this.onChange);
};

AppPrototype.render = function() {
    if (this.state.render) {
        return (
            virt.createView("div", {
                className: "App"
            }, this.state.render(this.state.ctx))
        );
    } else {
        return (
            virt.createView("div", {
                className: "App"
            })
        );
    }
};

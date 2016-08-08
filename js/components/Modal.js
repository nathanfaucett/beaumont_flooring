var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    app = require("..");


var ModalPrototype;


module.exports = Modal;


function Modal(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.onClose = function() {
        return _this.__onClose();
    };
}
virt.Component.extend(Modal, "Modal");

Modal.propTypes = {
    render: propTypes.func.isRequired,
    modal: propTypes.object.isRequired,
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

Modal.childContextTypes = {
    ctx: propTypes.object.isRequired,
    modal: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

Modal.getChildContext = function() {
    return {
        ctx: this.props.ctx,
        modal: this.props.modal,
        i18n: this.props.i18n
    };
};

ModalPrototype = Modal.prototype;

ModalPrototype.componentDidMount = function() {
    app.page.on("request", this.onClose);
};

ModalPrototype.componentWillUnmount = function() {
    app.page.off("request", this.onClose);
};

ModalPrototype.__onClose = function() {
    var modal = this.props.modal;

    if (!modal.willClose) {
        modal.close();
    }
};

ModalPrototype.getStyles = function() {
    var styles = {
        root: {
            position: "relative"
        }
    };

    return styles;
};

ModalPrototype.render = function() {
    var props = this.props,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Modal",
                style: styles.root
            },
            props.render(props.ctx)
        )
    );
};

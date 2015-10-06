var virt = require("virt"),
    virtDOM = require("virt-dom"),
    css = require("css"),
    propTypes = require("prop_types"),
    getImageDimensions = require("../../utils/getImageDimensions");


var SliderImagePrototype;


module.exports = SliderImage;


function SliderImage(props, children, context) {
    virt.Component.call(this, props, children, context);

    this.state = {
        loaded: false
    };
}
virt.Component.extend(SliderImage, "SliderImage");

SliderImagePrototype = SliderImage.prototype;

SliderImage.propTypes = {
    src: propTypes.string.isRequired
};

SliderImage.contextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

SliderImagePrototype.componentDidMount = function() {
    var _this = this;

    virtDOM.findDOMNode(this.refs.img).onload = function onLoad() {
        _this.setState({
            loaded: true
        });
    };
};

SliderImagePrototype.getImageDimensions = function() {
    var size = this.context.size,
        node = virtDOM.findDOMNode(this.refs.img);

    return getImageDimensions(node, size.width * 0.75, size.height * 0.75, true);
};

SliderImagePrototype.getStyles = function() {
    var state = this.state,
        size = this.context.size,
        img = {
            position: "relative"
        },
        styles = {
            root: {
                width: "100%",
                height: "100%"
            },
            img: img
        };

    if (state.loaded) {
        dims = this.getImageDimensions();

        img.width = dims.width + "px";
        img.height = dims.height + "px";
        img.top = ((size.height * 0.5) - (dims.height * 0.5)) + "px";
        img.left = ((size.width * 0.5) - (dims.width * 0.5)) + "px";
    }

    return styles;
};

SliderImagePrototype.render = function() {
    var props = this.props,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "SliderImage",
                style: styles.root
            },
            virt.createView("img", {
                ref: "img",
                src: props.src,
                style: styles.img
            })
        )
    );
};

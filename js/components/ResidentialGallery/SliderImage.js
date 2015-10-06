var virt = require("virt"),
    virtDOM = require("virt-dom"),
    // css = require("css"),
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
    fading: propTypes.bool.isRequired,
    prev: propTypes.func.isRequired,
    next: propTypes.func.isRequired,
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

    setTimeout(function() {
        _this.props.fading = false;
        _this.forceUpdate();
    }, 200);
};

SliderImagePrototype.getImageDimensions = function() {
    var size = this.context.size,
        node = virtDOM.findDOMNode(this.refs.img);

    return getImageDimensions(node, size.width * 0.75, size.height * 0.75, true);
};

SliderImagePrototype.getStyles = function() {
    var state = this.state,
        props = this.props,
        context = this.context,
        size = context.size,
        img = {
            zIndex: 1,
            position: "relative"
        },
        prev = {
            zIndex: 2,
            fontWeight: "bold",
            fontSize: "3em",
            display: "none",
            position: "absolute"
        },
        next = {
            zIndex: 2,
            fontWeight: "bold",
            fontSize: "3em",
            display: "none",
            position: "absolute"
        },
        styles = {
            prev: prev,
            next: next,
            img: img
        };

    //css.transition(styles.img, "opacity 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)");

    if (state.loaded) {
        dims = this.getImageDimensions();

        img.width = (dims.width | 0) + "px";
        img.height = (dims.height | 0) + "px";
        img.top = (((size.height * 0.5) - (dims.height * 0.5)) | 0) + "px";
        img.left = (((size.width * 0.5) - (dims.width * 0.5)) | 0) + "px";

        next.display = prev.display = "initial";
        prev.top = (((size.height * 0.5) - 16) | 0) + "px";
        prev.left = (((size.width * 0.5) - (dims.width * 0.5) - 24) | 0) + "px";
        next.top = (((size.height * 0.5) - 16) | 0) + "px";
        next.left = (((size.width * 0.5) + (dims.width * 0.5)) | 0) + "px";
    }

    if (!state.loaded || props.fading) {
        //css.opacity(styles.img, 0);
    } else {
        //css.opacity(styles.img, 1);
    }

    return styles;
};

SliderImagePrototype.render = function() {
    var props = this.props,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "SliderImage"
            },
            virt.createView("div", {
                    style: styles.prev
                },
                virt.createView("a", {
                    onClick: props.prev
                }, "<")
            ),
            virt.createView("img", {
                ref: "img",
                src: props.src,
                style: styles.img
            }),
            virt.createView("div", {
                    style: styles.next
                },
                virt.createView("a", {
                    onClick: props.next
                }, ">")
            )
        )
    );
};

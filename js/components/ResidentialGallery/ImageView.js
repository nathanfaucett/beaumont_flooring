var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    Link = require("../Link"),
    ResidentialGalleryStore = require("../../stores/ResidentialGalleryStore"),
    getImageDimensions = require("../../utils/getImageDimensions");


var ImageViewPrototype;


module.exports = ImageView;


function ImageView(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        image: null,
        loaded: false
    };

    this.onChange = function() {
        return _this.__onChange();
    };
    this.onLoad = function(e) {
        return _this.__onLoad(e);
    };
}
virt.Component.extend(ImageView, "ImageView");

ImageViewPrototype = ImageView.prototype;

ImageView.propTypes = {
    id: propTypes.number.isRequired,
    modal: propTypes.object.isRequired
};

ImageView.contextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

ImageViewPrototype.componentDidMount = function() {
    ResidentialGalleryStore.addChangeListener(this.onChange);
    this.__onChange();
};

ImageViewPrototype.componentWillUnmount = function() {
    ResidentialGalleryStore.removeChangeListener(this.onChange);
};

ImageViewPrototype.__onChange = function() {
    var _this = this;

    ResidentialGalleryStore.get(this.props.id, function onGet(error, item) {
        if (!error) {
            _this.setState({
                image: item.image,
                loaded: false
            });
        }
    });
};

ImageViewPrototype.getImageDimensions = function() {
    var size = this.context.size,
        node = virtDOM.findDOMNode(this.refs.img);

    return getImageDimensions(node, size.width * 0.75, size.height * 0.75, true);
};

ImageViewPrototype.__onLoad = function() {
    if (!this.state.loaded) {
        this.setState({
            loaded: true
        });
    }
};

ImageViewPrototype.getStyles = function() {
    var state = this.state,
        context = this.context,
        size = context.size,
        root = {
            zIndex: 1,
            position: "fixed"
        },
        styles = {
            root: root,
            close: {
                position: "absolute",
                top: "-16px",
                right: "-16px",
                background: context.theme.palette.canvasColor,
                fontFamily: "'Helvetica', 'Arial', sans-serif",
                fontSize: "2em",
                lineHeight: "1em",
                fontWeight: "bold",
                textAlign: "center",
                width: "32px",
                height: "32px"
            }
        };

    css.transition(styles.root, "opacity 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)");

    if (state.loaded) {
        dims = this.getImageDimensions();
        root.width = (dims.width | 0) + "px";
        root.height = (dims.height | 0) + "px";
        root.top = (((size.height * 0.5) - (dims.height * 0.5)) | 0) + "px";
        root.left = (((size.width * 0.5) - (dims.width * 0.5)) | 0) + "px";
        css.opacity(styles.root, 1);
    } else {
        css.opacity(styles.root, 0);
    }

    return styles;
};

ImageViewPrototype.render = function() {
    var styles = this.getStyles(),
        image = this.state.image;

    if (image) {
        return (
            virt.createView("div", {
                    className: "ImageView",
                    style: styles.root
                },
                virt.createView("img", {
                    ref: "img",
                    src: image,
                    onLoad: this.onLoad,
                    style: styles.img
                }),
                virt.createView(Link, {
                    onClick: this.props.modal.close,
                    color: this.context.theme.palette.accent2Color,
                    style: styles.close
                }, "x")
            )
        );
    } else {
        return (
            virt.createView("div", {
                className: "ImageView",
                style: styles.root
            })
        );
    }
};

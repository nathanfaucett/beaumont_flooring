var virt = require("virt"),
    virtDOM = require("virt-dom"),
    css = require("css"),
    domDimensions = require("dom_dimensions"),
    propTypes = require("prop_types");


var ItemPrototype;


module.exports = Item;


function Item(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        loaded: false,
        ratio: 1,
        width: 0,
        height: 0,
        top: 0,
        left: 0
    };

    this.onMouseOver = function(e) {
        return _this.__onMouseOver(e);
    };
    this.onMouseOut = function(e) {
        return _this.__onMouseOut(e);
    };
}
virt.Component.extend(Item, "Item");

ItemPrototype = Item.prototype;

Item.propTypes = {
    item: propTypes.object.isRequired,
    height: propTypes.number.isRequired
};

Item.contextTypes = {
    theme: propTypes.object.isRequired
};

ItemPrototype.componentDidMount = function() {
    var _this = this;

    virtDOM.findDOMNode(this.refs.img).onload = function onLoad() {
        _this.getImageDimensions();
    };
};

ItemPrototype.__onMouseOver = function() {
    this.setState({
        hover: true
    });
};

ItemPrototype.__onMouseOut = function() {
    this.setState({
        hover: false
    });
};

ItemPrototype.getImageDimensions = function() {
    var node = virtDOM.findDOMNode(this),
        maxWidth = domDimensions.width(node),
        maxHeight = domDimensions.height(node),

        imgNode = virtDOM.findDOMNode(this.refs.img),
        width = imgNode.width,
        height = imgNode.height,
        ratio = width / height,
        w, h, t, l;

    if (ratio > 1) {
        h = maxHeight;
        w = maxHeight * ratio;
        l = (w - maxWidth) * 0.5;
    } else {
        w = maxWidth;
        h = maxWidth / ratio;
        t = (h - maxHeight) * 0.5;
    }

    this.setState({
        loaded: true,
        width: w,
        height: h,
        top: -t,
        left: -l
    });
};

ItemPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        state = this.state,
        props = this.props,
        styles = {
            root: {
                position: "relative",
                height: props.height + "px",
                overflow: "hidden"
            },
            hover: {
                zIndex: 1,
                display: "block",
                cursor: "pointer",
                position: "absolute",
                width: "100%",
                height: props.height + "px",
                background: theme.palette.accent2Color
            },
            imgWrap: {
                zIndex: 0,
                position: "relative"
            },
            img: {
                position: "absolute",
                maxWidth: "inherit",
                top: state.top + "px",
                left: state.left + "px",
                width: state.loaded ? state.width + "px" : "inherit",
                height: state.loaded ? state.height + "px" : "inherit"
            }
        };

    css.transition(styles.hover, "opacity 300ms cubic-bezier(.25,.8,.25,1)");

    if (state.hover) {
        css.opacity(styles.hover, 0.5);
    } else {
        css.opacity(styles.hover, 0);
    }

    return styles;
};

ItemPrototype.render = function() {
    var styles = this.getStyles(),
        item = this.props.item;

    return (
        virt.createView("div", {
                className: "Item",
                style: styles.root
            },
            virt.createView("div", {
                onMouseOver: this.onMouseOver,
                onMouseOut: this.onMouseOut,
                style: styles.hover
            }),
            virt.createView("div", {
                    style: styles.imgWrap
                },
                virt.createView("img", {
                    style: styles.img,
                    ref: "img",
                    src: item.src
                })
            )
        )
    );
};

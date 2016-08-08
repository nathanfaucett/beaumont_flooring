var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    domDimensions = require("@nathanfaucett/dom_dimensions"),
    getImageDimensions = require("../../utils/getImageDimensions");


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
    this.onClick = function(e) {
        return _this.__onClick(e);
    };
    this.onLoad = function(e) {
        return _this.__onLoad(e);
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

ItemPrototype.__onLoad = function() {
    if (!this.state.loaded) {
        this.getImageDimensions();
    }
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
        dims = getImageDimensions(
            virtDOM.findDOMNode(this.refs.img),
            domDimensions.width(node),
            domDimensions.height(node)
        );

    this.setState({
        loaded: true,
        width: dims.width,
        height: dims.height,
        top: -dims.top,
        left: -dims.left
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
                background: theme.palette.accent2Color // theme.palette.canvasColor
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
            virt.createView("a", {
                onMouseOver: this.onMouseOver,
                onMouseOut: this.onMouseOut,
                href: "/residential_gallery/" + this.props.item.id,
                style: styles.hover
            }),
            virt.createView("div", {
                    style: styles.imgWrap
                },
                virt.createView("img", {
                    onLoad: this.onLoad,
                    style: styles.img,
                    ref: "img",
                    src: item.thumbnail
                })
            )
        )
    );
};

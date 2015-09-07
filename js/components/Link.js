var virt = require("virt"),
    propTypes = require("prop_types"),
    extend = require("extend");


var LinkPrototype;


module.exports = Link;


function Link(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        focus: false,
        hover: false,
        down: false
    };

    this.onMouseOver = function(e) {
        return _this.__onMouseOver(e);
    };
    this.onMouseOut = function(e) {
        return _this.__onMouseOut(e);
    };
    this.onMouseDown = function(e) {
        return _this.__onMouseDown(e);
    };
    this.onMouseUp = function(e) {
        return _this.__onMouseUp(e);
    };
    this.onFocus = function(e) {
        return _this.__onFocus(e);
    };
    this.onBlur = function(e) {
        return _this.__onBlur(e);
    };
}
virt.Component.extend(Link, "Link");

LinkPrototype = Link.prototype;

Link.contextTypes = {
    theme: propTypes.object.isRequired
};

LinkPrototype.__onMouseOver = function(e) {
    if (this.props.onMouseOver) {
        this.props.onMouseOver(e);
    }

    this.setState({
        hover: true
    });
};

LinkPrototype.__onMouseOut = function(e) {
    if (this.props.onMouseOut) {
        this.props.onMouseOut(e);
    }

    this.setState({
        hover: false,
        down: false
    });
};

LinkPrototype.__onMouseDown = function(e) {
    if (this.props.onMouseDown) {
        this.props.onMouseDown(e);
    }

    this.setState({
        down: true
    });
};

LinkPrototype.__onMouseUp = function(e) {
    if (this.props.onMouseUp) {
        this.props.onMouseUp(e);
    }

    this.setState({
        down: false
    });
};

LinkPrototype.__onFocus = function(e) {
    if (this.props.onFocus) {
        this.props.onFocus(e);
    }

    this.setState({
        focus: true
    });
};

LinkPrototype.__onBlur = function(e) {
    if (this.props.onBlur) {
        this.props.onBlur(e);
    }

    this.setState({
        focus: false
    });
};

LinkPrototype.getStyle = function() {
    var props = this.props,
        theme = this.context.theme.styles.link,
        state = this.state,
        styles = {
            color: theme.color,
            textDecoration: "none"
        };

    if (state.hover) {
        styles.color = theme.hoverColor || props.hoverColor || theme.color;
    }
    if (state.focus) {
        styles.color = theme.focusColor || props.focusColor || theme.color;
    }
    if (state.down) {
        styles.color = theme.downColor || props.downColor || theme.color;
    }
    if (props.active) {
        styles.color = theme.activeColor || props.activeColor || theme.color;
    }

    return styles;
};

LinkPrototype.render = function() {
    var props = extend({}, this.props);

    props.className = "Link";
    props.style = extend(this.getStyle(), props.style);
    props.onMouseOver = this.onMouseOver;
    props.onMouseOut = this.onMouseOut;
    props.onMouseDown = this.onMouseDown;
    props.onMouseUp = this.onMouseUp;
    props.onFocus = this.onFocus;
    props.onBlur = this.onBlur;

    return virt.createView("a", props, this.children);
};

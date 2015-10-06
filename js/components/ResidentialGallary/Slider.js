var virt = require("virt"),
    propTypes = require("prop_types"),
    ResidentialGalleryStore = require("../../stores/ResidentialGalleryStore"),
    SliderImage = require("./SliderImage");


var SliderPrototype;


module.exports = Slider;


function Slider(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        images: [],
        index: 0,
        length: 0,
        fading: true
    };

    this.onChange = function() {
        return _this.__onChange();
    };
    this.onStateChange = function() {
        return _this.__onStateChange();
    };
    this.next = function() {
        return _this.__next();
    };
    this.prev = function() {
        return _this.__prev();
    };
}
virt.Component.extend(Slider, "Slider");

SliderPrototype = Slider.prototype;

Slider.propTypes = {
    id: propTypes.number.isRequired
};

Slider.contextTypes = {
    modal: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

SliderPrototype.componentDidMount = function() {
    ResidentialGalleryStore.addChangeListener(this.onChange);
    this.__onChange();
};

SliderPrototype.componentWillUnmount = function() {
    ResidentialGalleryStore.removeChangeListener(this.onChange);
};

SliderPrototype.__onChange = function() {
    var _this = this;

    ResidentialGalleryStore.get(this.props.id, function(error, item) {
        var index = _this.state.index,
            images, length;

        if (!error) {
            images = item.images;
            length = images.length;

            _this.setState({
                images: images,
                length: length,
                index: index < length ? index : 0
            });
        }
    });
};

SliderPrototype.__next = function() {
    var _this = this,
        state = this.state,
        index = state.index + 1,
        length = state.length;

    if (index === length) {
        index = 0;
    }

    setTimeout(function() {
        _this.setState({
            index: index,
            fading: false
        });
    }, 200);

    _this.setState({
        fading: true
    });
};

SliderPrototype.__prev = function() {
    var _this = this,
        state = this.state,
        index = state.index - 1,
        length = state.length;

    if (index === -1) {
        index = length - 1;
    }

    setTimeout(function() {
        _this.setState({
            index: index,
            fading: false
        });
    }, 200);

    _this.setState({
        fading: true
    });
};

SliderPrototype.getStyles = function() {
    var styles = {
        root: {
            position: "fixed"
        }
    };

    return styles;
};

SliderPrototype.render = function() {
    var styles = this.getStyles(),
        state = this.state,
        src = state.images[state.index];

    if (src) {
        return (
            virt.createView("div", {
                    className: "Slider",
                    style: styles.root
                },
                virt.createView(SliderImage, {
                    prev: this.prev,
                    next: this.next,
                    fading: state.fading,
                    src: src
                })
            )
        );
    } else {
        return (
            virt.createView("div", {
                className: "Slider",
                style: styles.root
            })
        );
    }
};

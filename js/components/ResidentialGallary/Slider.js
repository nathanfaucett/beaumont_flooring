var virt = require("virt"),
    virtDOM = require("virt-dom"),
    css = require("css"),
    arrayMap = require("array-map"),
    parallel = require("parallel"),
    propTypes = require("prop_types"),
    ResidentialGallaryStore = require("../../stores/ResidentialGallaryStore"),
    getImageDimensions = require("../../utils/getImageDimensions"),
    SliderImage = require("./SliderImage");


var SliderPrototype;


module.exports = Slider;


function Slider(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        images: [],
        index: 0,
        length: 0
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
    ResidentialGallaryStore.addChangeListener(this.onChange);
    this.__onChange();
};

SliderPrototype.componentWillUnmount = function() {
    ResidentialGallaryStore.removeChangeListener(this.onChange);
};

SliderPrototype.__onChange = function() {
    var _this = this;

    ResidentialGallaryStore.get(this.props.id, function(error, item) {
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
    var state = this.state,
        index = state.index + 1,
        length = state.length;

    if (index === length) {
        index = 0;
    }

    this.setState({
        index: index
    });
};

SliderPrototype.__prev = function() {
    var state = this.state,
        index = state.index - 1,
        length = state.length;

    if (index === -1) {
        index = length - 1;
    }

    this.setState({
        index: index
    });
};

SliderPrototype.getStyles = function() {
    var styles = {
        root: {
            position: "fixed",
            width: "100%",
            height: "100%"
        },
        prev: {
            position: "absolute"
        },
        next: {
            position: "absolute"
        }
    };

    return styles;
};

SliderPrototype.render = function() {
    var styles = this.getStyles(),
        src = this.state.images[this.state.index];

    if (src) {
        return (
            virt.createView("div", {
                    className: "Slider",
                    style: styles.root
                },
                virt.createView("div", {
                        style: styles.prev
                    },
                    virt.createView("a", {
                        onClick: this.prev
                    }, "prev")
                ),
                virt.createView(SliderImage, {
                    src: src
                }),
                virt.createView("div", {
                        style: styles.next
                    },
                    virt.createView("a", {
                        onClick: this.next
                    }, "prev")
                )
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

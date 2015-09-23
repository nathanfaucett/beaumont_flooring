var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    arrayMap = require("array-map"),
    ResidentialGallaryStore = require("../../stores/ResidentialGallaryStore");


var ResidentialGallaryPrototype;


module.exports = ResidentialGallary;


function ResidentialGallary(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        items: []
    };

    this.onChange = function() {
        return _this.__onChange();
    };
}
virt.Component.extend(ResidentialGallary, "ResidentialGallary");

ResidentialGallaryPrototype = ResidentialGallary.prototype;

ResidentialGallary.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

ResidentialGallaryPrototype.componentDidMount = function() {
    ResidentialGallaryStore.addChangeListener(this.onChange);
    this.__onChange();
};

ResidentialGallaryPrototype.componentWillUnmount = function() {
    ResidentialGallaryStore.removeChangeListener(this.onChange);
};

ResidentialGallaryPrototype.__onChange = function() {
    var _this = this;

    ResidentialGallaryStore.all(function(error, items) {
        if (!error) {
            _this.setState({
                items: items
            });
        }
    });
};

ResidentialGallaryPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,
        styles = {
            root: {
                padding: "48px 0",
                background: theme.palette.primary2Color
            },
            imgHeader: {
                position: "relative"
            },
            over: {
                textAlign: "center",
                position: "absolute",
                height: "100%",
                width: "100%"
            },
            imgOver: {
                paddingTop: "5%"
            },
            img: {
                minHeight: "96px",
                width: "100%"
            },
            body: {
                zIndex: "999",
                position: "relative",
                fontSize: "1.175em",
                background: theme.palette.canvasColor,
                margin: "0 32px",
                padding: "32px"
            },
            header: {
                textTransform: "uppercase",
                zIndex: "1000",
                background: theme.palette.primary1Color,
                color: theme.palette.canvasColor,
                position: "absolute",
                padding: "4px 64px 4px 48px",
                minWidth: "256px",
                margin: "0",
                left: "-16px"
            },
            ul: {
                background: theme.palette.canvasColor,
                margin: "0 32px",
                padding: "32px"
            },
            li: {

            }
        };

    css.boxShadow(styles.header, theme.styles.boxShadow);

    return styles;
};

ResidentialGallaryPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "ResidentialGallary",
                style: styles.root
            },
            virt.createView("div", {
                    style: styles.imgHeader
                },
                virt.createView("div", {
                        style: styles.over,
                        src: "img/floor_covering.png"
                    },
                    virt.createView("img", {
                        style: styles.imgOver,
                        src: "img/floor_covering.png"
                    })
                ),
                virt.createView("img", {
                    style: styles.img,
                    src: "img/wood.jpg"
                })
            ),
            virt.createView("div", {
                    style: styles.body
                },
                virt.createView("h3", {
                        style: styles.header
                    },
                    i18n("residential_gallary.header")
                ),
                virt.createView("ul", {
                        style: styles.ul
                    },
                    arrayMap(this.state.items, function(item) {
                        return (
                            virt.createView("li", {
                                key: item.id
                            })
                        );
                    })
                )
            ),
            virt.createView("img", {
                style: styles.img,
                src: "img/wood.jpg"
            })
        )
    );
};

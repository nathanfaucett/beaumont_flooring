var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    arrayMap = require("array-map"),
    Item = require("./Item"),
    Link = require("../Link"),
    ResidentialGalleryStore = require("../../stores/ResidentialGalleryStore");


var ResidentialGalleryPrototype;


module.exports = ResidentialGallery;


function ResidentialGallery(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        items: []
    };

    this.onChange = function() {
        return _this.__onChange();
    };
}
virt.Component.extend(ResidentialGallery, "ResidentialGallery");

ResidentialGalleryPrototype = ResidentialGallery.prototype;

ResidentialGallery.contextTypes = {
    i18n: propTypes.func.isRequired,
    size: propTypes.object.isRequired,
    theme: propTypes.object.isRequired
};

ResidentialGalleryPrototype.componentDidMount = function() {
    ResidentialGalleryStore.addChangeListener(this.onChange);
    this.__onChange();
};

ResidentialGalleryPrototype.componentWillUnmount = function() {
    ResidentialGalleryStore.removeChangeListener(this.onChange);
};

ResidentialGalleryPrototype.__onChange = function() {
    var _this = this;

    ResidentialGalleryStore.all(function(error, items) {
        if (!error) {
            _this.setState({
                items: items
            });
        }
    });
};

ResidentialGalleryPrototype.getStyles = function() {
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
            milestoneloans: {
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
                margin: "0",
                padding: "48px 0 32px"
            },
            li: {
                display: "inline-block",
                padding: "0.999%",
                width: "33.333%"
            }
        };

    if (size.width < 480) {
        styles.li.width = "100%";
        styles.ul.textAlign = "center";
    }

    css.boxShadow(styles.header, theme.styles.boxShadow);

    return styles;
};

ResidentialGalleryPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "ResidentialGallery",
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
                    src: "img/fourfloors.jpg"
                })
            ),
            virt.createView("div", {
                    style: styles.body
                },
                virt.createView("h3", {
                        style: styles.header
                    },
                    i18n("residential_gallery.header")
                ),
                virt.createView("ul", {
                        style: styles.ul
                    },
                    arrayMap(this.state.items, function(item) {
                        return (
                            virt.createView("li", {
                                    key: item.id,
                                    style: styles.li
                                },
                                virt.createView(Item, {
                                    height: 160,
                                    item: item
                                })
                            )
                        );
                    })
                )
            ),
            virt.createView(Link, {
                    style: styles.milestoneloans,
                    target: "_blank",
                    href: "http://milestoneloans.net",
                    src: "img/fourfloors.jpg"
                },
                virt.createView("img", {
                    style: styles.milestoneloans,
                    src: "img/milestoneloans.jpg"
                })
            ),
            virt.createView("img", {
                style: styles.img,
                src: "img/fourfloors.jpg"
            })
        )
    );
};

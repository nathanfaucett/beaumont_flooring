var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    arrayMap = require("array-map"),
    Testimonial = require("./Testimonial"),
    Link = require("../Link"),
    TestimonialStore = require("../../stores/TestimonialStore");


var TestimonialsPrototype;


module.exports = Testimonials;


function Testimonials(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        testimonials: []
    };

    this.onChange = function() {
        return _this.__onChange();
    };
}
virt.Component.extend(Testimonials, "Testimonials");

TestimonialsPrototype = Testimonials.prototype;

Testimonials.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

TestimonialsPrototype.componentDidMount = function() {
    TestimonialStore.addChangeListener(this.onChange);
    this.__onChange();
};

TestimonialsPrototype.componentWillUnmount = function() {
    TestimonialStore.removeChangeListener(this.onChange);
};

TestimonialsPrototype.__onChange = function() {
    var _this = this;

    TestimonialStore.all(function(error, testimonials) {
        if (!error) {
            _this.setState({
                testimonials: testimonials
            });
        }
    });
};

TestimonialsPrototype.getStyles = function() {
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
                margin: "0 32px",
                padding: "32px"
            },
            li: {

            }
        };

    css.boxShadow(styles.header, theme.styles.boxShadow);

    if (size.width < 640) {
        styles.ul.padding = "32px 0";
        styles.ul.margin = "0px";
    }

    return styles;
};

TestimonialsPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Testimonials",
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
                    i18n("testimonials.header")
                ),
                virt.createView("ul", {
                        style: styles.ul
                    },
                    arrayMap(this.state.testimonials, function(testimonial) {
                        return (
                            virt.createView("li", {
                                    key: testimonial.id,
                                    style: styles.li
                                },
                                virt.createView(Testimonial, {
                                    testimonial: testimonial
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

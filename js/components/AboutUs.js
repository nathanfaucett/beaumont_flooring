var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    Link = require("./Link");


var AboutUsPrototype;


module.exports = AboutUs;


function AboutUs(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(AboutUs, "AboutUs");

AboutUsPrototype = AboutUs.prototype;

AboutUs.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

AboutUsPrototype.getStyles = function() {
    var context = this.context,
        size = context.size,
        theme = context.theme,
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
            body: {
                zIndex: "999",
                position: "relative",
                fontSize: "1.175em",
                background: theme.palette.canvasColor,
                margin: "0 32px",
                padding: "32px"
            },
            bodyImgWrap0: {
                "float": "left",
                padding: "24px 22px 22px 0"
            },
            bodyImg0: {
                zIndex: "1001",
                border: "3px solid " + theme.palette.canvasColor
            },
            bodyImgWrap1: {
                "float": "right",
                padding: "24px 0 22px 22px"
            },
            bodyImg1: {
                zIndex: "1001",
                border: "3px solid " + theme.palette.canvasColor
            },
            text0: {
                paddingTop: "48px",
                marginBottom: "0"
            },
            text1: {
                marginTop: "0"
            },
            text2: {
                marginTop: "24px",
                marginBottom: "0"
            },
            text3: {
                marginTop: "0"
            },
            clear: {
                clear: "both"
            }
        };

    css.boxShadow(styles.header, theme.styles.boxShadow);

    css.boxShadow(styles.bodyImg0, theme.styles.boxShadow);
    css.transform(styles.bodyImg0, "rotate(-6deg)");

    css.boxShadow(styles.bodyImg1, theme.styles.boxShadow);
    css.transform(styles.bodyImg1, "rotate(6deg)");

    if (size.width < 480) {
        styles.bodyImgWrap0["float"] = "none";
        styles.bodyImgWrap1["float"] = "none";
    }

    return styles;
};

AboutUsPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "AboutUs",
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
                    i18n("about_us.header")
                ),
                virt.createView("p", {
                    style: styles.text0
                }, i18n("about_us.body0")),
                virt.createView("div", {
                        style: styles.bodyImgWrap0
                    },
                    virt.createView("img", {
                        style: styles.bodyImg0,
                        src: "img/dining.jpg"
                    })
                ),
                virt.createView("p", {
                    style: styles.text1
                }, i18n("about_us.body1")),
                virt.createView("div", {
                    style: styles.clear
                }),
                virt.createView("p", {
                    style: styles.text2
                }, i18n("about_us.body2")),
                virt.createView("div", {
                        style: styles.bodyImgWrap1
                    },
                    virt.createView("img", {
                        style: styles.bodyImg1,
                        src: "img/room.jpg"
                    })
                ),
                virt.createView("p", {
                    style: styles.text3
                }, i18n("about_us.body3")),
                virt.createView("div", {
                    style: styles.clear
                })
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

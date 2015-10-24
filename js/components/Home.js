var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types"),
    Link = require("./Link");


var HomePrototype;


module.exports = Home;


function Home(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Home, "Home");

HomePrototype = Home.prototype;

Home.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HomePrototype.getStyles = function() {
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
            body: {},
            intro: {
                padding: "8px 24px"
            },
            introHeader: {
                fontWeight: "100",
                fontStyle: "italic"
            },
            introImgs: {
                textAlign: "center",
                padding: "4px 0"
            },
            introImg: {
                margin: "0px 2%",
                border: "3px solid " + theme.palette.canvasColor
            },
            sec: {
                position: "relative",
                margin: "32px 16px 64px"
            },
            secHeader: {
                textTransform: "uppercase",
                zIndex: "1000",
                background: theme.palette.primary1Color,
                color: theme.palette.canvasColor,
                position: "absolute",
                top: "-20px",
                padding: "4px 64px 4px 48px",
                minWidth: "256px",
                margin: "0"
            },
            secBody: {
                zIndex: "999",
                position: "relative",
                fontSize: "1.25em",
                background: theme.palette.canvasColor,
                margin: "0 0 0 32px",
                padding: "32px 16px 16px"
            },
            qualityImg: {
                zIndex: "1001",
                position: "absolute",
                top: "-32px",
                right: "-24px",
                border: "3px solid " + theme.palette.canvasColor
            },
            halfText: {
                width: "60%"
            },
            clear: {
                clear: "both"
            }
        };

    if (size.width < 768) {
        styles.qualityImg.position = "inherit";
        styles.qualityImg.top = "inherit";
        styles.qualityImg.right = "inherit";
        styles.qualityImg.width = "inherit";
        styles.halfText.width = "inherit";
    }

    if (size.width < 480) {
        styles.qualityImg.width = "100%";
    }

    if (size.width < 640) {
        styles.introImg.margin = "4px 25%";
        styles.introImg.width = "50%";
    }

    css.boxShadow(styles.introImg, theme.styles.boxShadow);
    css.boxShadow(styles.secHeader, theme.styles.boxShadow);
    css.boxShadow(styles.secBody, theme.styles.boxShadow);
    css.boxShadow(styles.qualityImg, theme.styles.boxShadow);
    css.transform(styles.qualityImg, "rotate(6deg)");

    return styles;
};

HomePrototype.render = function() {
    var context = this.context,
        i18n = context.i18n,
        theme = context.theme,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Home",
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
                virt.createView("div", {
                        style: styles.intro
                    },
                    virt.createView("h2", {
                        style: styles.introHeader
                    }, i18n("home.intro")),
                    virt.createView("div", {
                            style: styles.introImgs
                        },
                        virt.createView("img", {
                            style: styles.introImg,
                            src: "img/dining.jpg"
                        }),
                        virt.createView("img", {
                            style: styles.introImg,
                            src: "img/pool_room.jpg"
                        }),
                        virt.createView("img", {
                            style: styles.introImg,
                            src: "img/bedroom.jpg"
                        })
                    )
                ),
                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("home.commitment")),
                    virt.createView("p", {
                            style: styles.secBody
                        },
                        i18n("home.commitment_body"),
                        virt.createView(Link, {
                            color: theme.palette.primary1Color,
                            hoverColor: theme.palette.accent2Color,
                            href: "/about_us"
                        }, i18n("home.commitment_body_here")),
                        "."
                    )
                ),
                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("home.quality")),
                    virt.createView("div", {
                            style: styles.secBody
                        },
                        virt.createView("p", {
                            style: styles.halfText
                        }, i18n("home.quality_body")),
                        virt.createView("img", {
                            style: styles.qualityImg,
                            src: "img/room.jpg"
                        }),
                        virt.createView("div", {
                            style: styles.clear
                        })
                    )
                ),
                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("home.timely")),
                    virt.createView("p", {
                        style: styles.secBody
                    }, i18n("home.timely_body"))
                )
            ),
            virt.createView("img", {
                style: styles.img,
                src: "img/wood.jpg"
            })
        )
    );
};

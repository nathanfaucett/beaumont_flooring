var virt = require("virt"),
    css = require("css"),
    extend = require("extend"),
    propTypes = require("prop_types");


var ServicesPrototype;


module.exports = Services;


function Services(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Services, "Services");

ServicesPrototype = Services.prototype;

Services.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

ServicesPrototype.getStyles = function() {
    var context = this.context,
        size = context.size,
        theme = context.theme,
        styles = {
            root: {
                padding: "48px 0",
                background: theme.palette.primary2Color
            },
            img: {
                minHeight: "96px",
                width: "100%"
            },
            header: {
                paddingBottom: "48px"
            },
            headerImgWrap: {
                textAlign: "center",
                padding: "0 16px"
            },
            headerImg: {
                width: "100%"
            },
            headerText: {
                margin: "0",
                padding: "16px 8px 0 8px",
                minHeight: "72px",
                color: theme.palette.canvasColor,
                background: theme.palette.primary1Color
            },
            ul: {
                paddingTop: "48px",
                textAlign: "center"
            },
            li: {
                fontWeight: "500",
                textTransform: "uppercase",
                fontSize: "1.75em",
                padding: "0 16px",
                display: "inline-block"
            },
            body: {
                zIndex: "999",
                position: "relative",
                fontSize: "1.175em",
                background: theme.palette.canvasColor,
                margin: "0 32px",
                padding: "32px"
            },
            sec: {
                position: "relative"
            },
            secHeader: {
                textTransform: "uppercase",
                zIndex: "1000",
                background: theme.palette.primary1Color,
                color: theme.palette.canvasColor,
                padding: "4px 64px 4px 48px",
                minWidth: "256px",
                margin: "0",
                position: "absolute",
                left: "-48px"
            },
            secBody: {
                paddingTop: "64px"
            }
        };

    css.boxShadow(styles.secHeader, theme.styles.boxShadow);

    styles.liMid = extend({
        borderLeft: "2px solid " + theme.palette.accent2Color,
        borderRight: "2px solid " + theme.palette.accent2Color
    }, styles.li);

    if (size.width < 480) {
        styles.li.display = "block";
        styles.liMid = styles.li;
    } else {
        styles.liMid = extend({
            borderLeft: "2px solid " + theme.palette.accent2Color,
            borderRight: "2px solid " + theme.palette.accent2Color
        }, styles.li);
    }

    return styles;
};

ServicesPrototype.render = function() {
    var i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Services",
                style: styles.root
            },
            virt.createView("div", {
                    style: styles.header
                },
                virt.createView("div", {
                        className: "grid"
                    },
                    virt.createView("div", {
                            style: styles.headerImgWrap,
                            className: "col-xs-12 col-sm-12 col-md-4 col-lg-4"
                        },
                        virt.createView("img", {
                            style: styles.headerImg,
                            src: "img/entry_room.jpg"
                        }),
                        virt.createView("h3", {
                            style: styles.headerText
                        }, i18n("services.header.new_construction"))
                    ),
                    virt.createView("div", {
                            style: styles.headerImgWrap,
                            className: "col-xs-12 col-sm-12 col-md-4 col-lg-4"
                        },
                        virt.createView("img", {
                            style: styles.headerImg,
                            src: "img/small_bedroom.jpg"
                        }),
                        virt.createView("h3", {
                            style: styles.headerText
                        }, i18n("services.header.repairs_remediation"))
                    ),
                    virt.createView("div", {
                            style: styles.headerImgWrap,
                            className: "col-xs-12 col-sm-12 col-md-4 col-lg-4"
                        },
                        virt.createView("img", {
                            style: styles.headerImg,
                            src: "img/living_room.jpg"
                        }),
                        virt.createView("h3", {
                            style: styles.headerText
                        }, i18n("services.header.commerical_residential"))
                    )
                ),
                virt.createView("ul", {
                        style: styles.ul
                    },
                    virt.createView("li", {
                        style: styles.li
                    }, i18n("services.header.carpet")),
                    virt.createView("li", {
                        style: styles.liMid
                    }, i18n("services.header.carpet_tile")),
                    virt.createView("li", {
                        style: styles.li
                    }, i18n("services.header.vinyl"))
                )
            ),
            virt.createView("div", {
                    style: styles.body
                },
                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("services.corporate_header")),
                    virt.createView("p", {
                        style: styles.secBody
                    }, i18n("services.corporate_body"))
                ),

                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("services.senior_header")),
                    virt.createView("p", {
                        style: styles.secBody
                    }, i18n("services.senior_body"))
                ),

                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("services.retail_header")),
                    virt.createView("p", {
                        style: styles.secBody
                    }, i18n("services.retail_body"))
                ),


                virt.createView("div", {
                        style: styles.sec
                    },
                    virt.createView("h3", {
                        style: styles.secHeader
                    }, i18n("services.hospitality_header")),
                    virt.createView("p", {
                        style: styles.secBody
                    }, i18n("services.hospitality_body"))
                )
            ),
            virt.createView("img", {
                style: styles.img,
                src: "img/wood.jpg"
            })
        )
    );
};

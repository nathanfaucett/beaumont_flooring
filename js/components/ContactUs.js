var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types"),
    Link = require("./Link");


var ContactUsPrototype;


module.exports = ContactUs;


function ContactUs(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        name: "",
        email: "",
        subject: "",
        message: ""
    };

    this.onSubmit = function(e) {
        return _this.__onSubmit(e);
    };

    this.onInput = function(e) {
        return _this.__onInput(e);
    };
}
virt.Component.extend(ContactUs, "ContactUs");

ContactUsPrototype = ContactUs.prototype;

ContactUs.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired
};

ContactUsPrototype.__onInput = function(e) {
    var _this = this,
        componentTarget = e.componentTarget,
        name = componentTarget.props.name;

    componentTarget.getValue(function(error, value) {
        var state;

        if (!error) {
            state = {};
            state[name] = value;
            _this.setState(state);
        }
    });
};

ContactUsPrototype.getStyles = function() {
    var context = this.context,
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
            milestoneloans: {
                width: "100%"
            },
            header: {
                textAlign: "center",
                margin: "0 32px",
                padding: "32px 16px",
                background: theme.palette.canvasColor
            },
            headerImg: {
                width: "100%",
                border: "3px solid " + theme.palette.canvasColor
            },
            formHeader: {
                textTransform: "uppercase",
                zIndex: "1000",
                background: theme.palette.primary1Color,
                color: theme.palette.canvasColor,
                position: "absolute",
                top: "-20px",
                padding: "4px 64px 4px 48px",
                minWidth: "256px",
                margin: "0",
                left: "-16px"
            },
            body: {
                position: "relative",
                margin: "0 32px",
                padding: "32px 16px",
                background: theme.palette.canvasColor
            },
            formLabel: {
                display: "block",
                marginBottom: "4px",
                fontSize: "1.5em",
                fontWeight: "bold"
            },
            formInput: {
                padding: "8px",
                marginBottom: "8px",
                border: "2px solid " + theme.palette.accent2Color
            },
            formTextArea: {
                minHeight: "256px",
                resize: "vertical",
                padding: "8px",
                marginBottom: "32px",
                border: "2px solid " + theme.palette.accent2Color
            },
            formSubmit: {
                display: "block",
                width: "inherit",
                fontWeight: "bold",
                fontSize: "1.17em",
                textTransform: "uppercase",
                background: theme.palette.primary1Color,
                color: theme.palette.canvasColor,
                padding: "4px 16px"
            }
        };

    css.boxShadow(styles.formSubmit, theme.styles.boxShadow);
    css.boxShadow(styles.formHeader, theme.styles.boxShadow);
    css.boxShadow(styles.headerImg, theme.styles.boxShadow);

    css.borderRadius(styles.formSubmit, "0px");
    css.borderRadius(styles.formInput, "0px");
    css.borderRadius(styles.formTextArea, "0px");

    return styles;
};

ContactUsPrototype.render = function() {
    var state = this.state,
        i18n = this.context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "ContactUs",
                style: styles.root
            },
            virt.createView("div", {
                    style: styles.header
                },
                virt.createView("div", {
                        className: "grid"
                    },
                    virt.createView("div", {
                            className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                        },
                        virt.createView("h3", i18n("app.name")),
                        virt.createView("h4", i18n("app.address")),
                        virt.createView("h4", i18n("app.phone"))
                    ),
                    virt.createView("div", {
                            className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                        },
                        virt.createView("img", {
                            style: styles.headerImg,
                            src: "img/google_map.jpg"
                        })
                    )
                )
            ),
            virt.createView("div", {
                    style: styles.body
                },
                virt.createView("h3", {
                    style: styles.formHeader
                }, i18n("contact_us.form.header")),
                virt.createView("form", {
                        style: styles.form,
                        method: "POST",
                        action: "email.php"
                    },
                    virt.createView("label", {
                        style: styles.formLabel,
                        "for": "name"
                    }, i18n("contact_us.form.name")),
                    virt.createView("input", {
                        name: "name",
                        onInput: this.onInput,
                        style: styles.formInput,
                        value: state.name,
                        type: "text"
                    }),
                    virt.createView("label", {
                        style: styles.formLabel,
                        "for": "email"
                    }, i18n("contact_us.form.email")),
                    virt.createView("input", {
                        name: "email",
                        onInput: this.onInput,
                        style: styles.formInput,
                        value: state.email,
                        type: "email"
                    }),
                    virt.createView("label", {
                        style: styles.formLabel,
                        "for": "subject"
                    }, i18n("contact_us.form.subject")),
                    virt.createView("input", {
                        name: "subject",
                        onInput: this.onInput,
                        style: styles.formInput,
                        value: state.subject,
                        type: "text"
                    }),
                    virt.createView("label", {
                        style: styles.formLabel,
                        "for": "message"
                    }, i18n("contact_us.form.message")),
                    virt.createView("textarea", {
                        name: "message",
                        onInput: this.onInput,
                        style: styles.formTextArea,
                        value: state.message
                    }),
                    virt.createView("input", {
                        style: styles.formSubmit,
                        value: i18n("contact_us.form.submit"),
                        type: "submit"
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

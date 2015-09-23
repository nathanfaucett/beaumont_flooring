var virt = require("virt"),
    css = require("css"),
    propTypes = require("prop_types");


var TestimonialPrototype;


module.exports = Testimonial;


function Testimonial(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Testimonial, "Testimonial");

TestimonialPrototype = Testimonial.prototype;

Testimonial.propTypes = {
    testimonial: propTypes.object.isRequired
};

Testimonial.contextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

TestimonialPrototype.getStyles = function() {
    var context = this.context,
        theme = context.theme,
        size = context.size,
        styles = {
            root: {
                paddingBottom: "16px"
            },
            text: {
                fontSize: "1em",
                fontStyle: "italic"
            },
            author: {
                fontSize: "0.85em",
                fontWeight: "bold",
                marginTop: "1em",
                marginBottom: "0em"
            },
            location: {
                fontSize: "0.85em",
                fontWeight: "bold",
                marginTop: "0em",
                marginBottom: "0em"
            }
        };

    return styles;
};

TestimonialPrototype.render = function() {
    var styles = this.getStyles(),
        testimonial = this.props.testimonial;

    return (
        virt.createView("div", {
                className: "Testimonial",
                style: styles.root
            },
            virt.createView("p", {
                    style: styles.text
                },
                virt.createView("q", {
                        dangerouslySetInnerHTML: true
                    },
                    testimonial.text
                )
            ),
            virt.createView("p", {
                style: styles.author
            }, testimonial.author),
            virt.createView("p", {
                style: styles.location
            }, testimonial.location)
        )
    );
};

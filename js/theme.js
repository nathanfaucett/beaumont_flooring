var Theme = require("theme"),
    css = require("css");


var BomontFlooringThemePrototype;


module.exports = BomontFlooringTheme;


function BomontFlooringTheme() {

    Theme.call(this);

    this.fontFamily = "Roboto, sans-serif";
}
Theme.extend(BomontFlooringTheme, "BomontFlooringTheme");
BomontFlooringThemePrototype = BomontFlooringTheme.prototype;

BomontFlooringThemePrototype.getSpacing = function() {
    return {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopLeftNavMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56
    };
};

BomontFlooringThemePrototype.getPalette = function() {
    return {
        primary1Color: "#ff002d",
        primary2Color: "#dedede",
        accent1Color: "#363636",
        accent2Color: "#2a2a2a",
        textColor: "rgba(0, 0, 0, 0.87)",
        canvasColor: css.colors.white,
        borderColor: "#dedede",
        disabledColor: "rgba(0, 0, 0, 0.262)"
    };
};

BomontFlooringThemePrototype.getStyles = function(palette /*, spacing */ ) {
    var styles = {
        link: {
            color: palette.canvasColor,
            hoverColor: palette.primary1Color,
            focusColor: palette.primary1Color,
            downColor: palette.primary1Color
        },
        boxShadow: "1px 2px 8px 0px " + palette.disabledColor
    };
    return styles;
};

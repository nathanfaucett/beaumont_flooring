var i18n = require("i18n"),
    request = require("request"),
    UserStore = require("../../stores/UserStore");


var cache = {};


module.exports = i18nMiddleware;


function i18nMiddleware(ctx, next) {
    var locale = UserStore.user.locale;

    if (cache[locale] === true) {
        next();
    } else {
        request.get("locale/" + locale + ".json", {
            success: function(response) {
                cache[locale] = true;
                i18n.add(locale, response.data);
                next();
            },
            error: function(response) {
                next(response.data);
            }
        });
    }
}

var cookies = require("@nathanfaucett/cookies"),
    indexOf = require("@nathanfaucett/index_of"),
    emptyFunction = require("@nathanfaucett/empty_function"),
    app = require("../"),
    Store = require("@nathanfaucett/apt").Store;


var LOCALE_KEY = "X-BomontFlooring-User.Locale",

    navigatorLanguage = (
        navigator.language ||
        (navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase)) ||
        "en"
    ),

    defaultLocale;


function UserStore() {
    Store.call(this);
}
Store.extend(UserStore, "UserStore", [
    "CHANGE_LOCALE"
]);


app.on("init", function() {
    defaultLocale = indexOf(app.config.locales, navigatorLanguage) !== -1 ? navigatorLanguage : app.config.locales[0];
    setLocale(defaultLocale);
});


UserStore.user = UserStore.prototype.user = {
    locale: null
};

UserStore.prototype.toJSON = function() {
    return {
        user: UserStore.user
    };
};

UserStore.prototype.fromJSON = function(json) {
    UserStore.user.locale = json.locale || defaultLocale;
};

UserStore.prototype.setLocale = function(value, callback) {
    var changed = setLocale(value);
    (callback || emptyFunction)();
    return changed;
};

function setLocale(value) {
    var last = UserStore.user.locale;

    value = indexOf(app.config.locales, value) === -1 ? app.config.locales[0] : value;

    if (last !== value) {
        UserStore.user.locale = value;
        cookies.set(LOCALE_KEY, value);
        return true;
    } else {
        return false;
    }
}

UserStore.prototype.handler = function onUserPayload(action) {
    switch (action.type) {
        case this.consts.CHANGE_LOCALE:
            if (UserStore.setLocale(action.locale)) {
                UserStore.emit("changeLocale");
            }
            break;
    }
};


module.exports = new UserStore();

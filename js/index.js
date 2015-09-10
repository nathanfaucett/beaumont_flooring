var EventEmitter = require("event_emitter"),
    page = require("page"),
    request = require("request"),
    i18n = require("i18n"),

    dispatcher = require("./dispatcher"),
    router = require("./router"),

    i18nBound, App, RouteStore, UserStore;


var app = new EventEmitter(-1),
    pages = {};


module.exports = app;


i18nBound = require("./utils/i18n");
App = require("./components/App");
RouteStore = require("./stores/RouteStore");
UserStore = require("./stores/UserStore");


app.config = null;
app.Component = App;
app.page = page;
app.i18n = i18nBound;
app.dispatcher = dispatcher;
app.router = router;


app.init = function(config) {
    var dispatcher = app.dispatcher,
        page = app.page;

    app.config = config;

    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = false;

    page.on("request", function onRequest(ctx) {
        dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_CHANGE,
            ctx: ctx
        });
    });

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.flatMode(config.flatLocaleMode);
    i18n.throwMissingError(config.throwMissingTranslationError);
    page.html5Mode(config.html5Mode);

    app.emit("init");

    page.init();
};

app.registerPage = function(name, render) {
    pages[name] = render;
};

app.getPage = function(name) {
    return pages[name];
};

require("./views");
require("./routes");

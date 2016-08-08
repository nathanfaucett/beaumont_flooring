var apt = require("@nathanfaucett/apt"),
    page = require("@nathanfaucett/page/src/server"),
    cookies = require("@nathanfaucett/cookies"),
    request = require("@nathanfaucett/request"),
    i18n = require("@nathanfaucett/i18n"),
    extend = require("@nathanfaucett/extend"),
    objectMap = require("@nathanfaucett/object-map"),
    virtModal = require("@nathanfaucett/virt-modal"),

    router = require("./router"),

    i18nBound, RouteStore, UserStore;


var Application = apt.Application,
    app, BomontApplicationPrototype;


function BomontApplication() {

    Application.call(this);

    this.router = router;

    this.config = null;
    this.Component = null;
    this.page = page;
    this.i18n = null;

    this.pages = {};
    this.modals = {};
}
Application.extend(BomontApplication, "Bomont.Application");
BomontApplicationPrototype = BomontApplication.prototype;


app = module.exports = new BomontApplication();


app.Component = require("./components/App");
i18nBound = require("./utils/i18n");
RouteStore = require("./stores/RouteStore");
UserStore = require("./stores/UserStore");


BomontApplicationPrototype.init = function(config) {
    var _this = this,
        dispatcher = this.dispatcher;

    this.i18n = i18nBound;
    this.router = router;

    this.config = config;

    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = true;

    this.registerStore(require("./stores/ResidentialGalleryStore"));
    this.registerStore(require("./stores/RouteStore"));
    this.registerStore(require("./stores/TestimonialStore"));
    this.registerStore(require("./stores/UserStore"));
    this.registerStore(virtModal.ModalStore);


    page.on("request", function onRequest(ctx) {
        dispatcher.dispatch({
            type: RouteStore.consts.CHANGE,
            ctx: ctx
        });
    });

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.throwMissingError(config.throwMissingTranslationError);

    dispatcher.on("dispatch", function onDispatch() {
        cookies.set("Bomont.state", _this.toJSON());
    });
    this.fromJSON(cookies.get("Bomont.state"));

    if (config.env !== "production") {
        global.reset = function() {
            cookies.remove("Bomont.state");
            location.reload();
        };
    }

    this.emit("init");
};

BomontApplicationPrototype.registerPage = function(name, render) {
    this.pages[name] = render;
};

BomontApplicationPrototype.registerModal = function(name, render, onClose) {
    this.modals[name] = {
        name: name,
        render: render,
        onClose: onClose
    };
};

BomontApplicationPrototype.getModals = function(ctx) {
    return objectMap(this.modals, function eachModal(m) {
        var result = extend({}, m),
            modalRender = m.render,
            modalOnClose = m.onClose;

        result.render = function(modal) {
            return modalRender(modal, ctx);
        };

        result.onClose = function(modal) {
            return modalOnClose(modal, ctx);
        };

        return result;
    });
};

BomontApplicationPrototype.getPage = function(name) {
    return this.pages[name];
};

require("./views");
require("./routes");

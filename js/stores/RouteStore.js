var Store = require("@nathanfaucett/apt").Store,
    app = require("../");


var _route = {
        context: {},
        state: null
    };


function RouteStore() {
    Store.call(this);
}
Store.extend(RouteStore, "RouteStore", [
    "CHANGE",
    "UPDATE"
]);

function update(ctx, state) {
    var context = _route.context;

    context.fullUrl = ctx.fullUrl;
    context.pathname = ctx.pathname;
    context.query = ctx.query;
    context.params = ctx.params;

    _route.state = state;
}

function handleContext(ctx) {
    app.router.handler(ctx, function(error) {
        if (error) {
            throw error;
        }
    });
}

RouteStore.prototype.getState = function() {
    return _route.state;
};

RouteStore.prototype.getContext = function() {
    return _route.context;
};

RouteStore.prototype.toJSON = function() {
    return _route;
};

RouteStore.prototype.fromJSON = function(json) {
    _route = json;
};

RouteStore.prototype.handler = function onRoutePayload(action) {
    var consts = this.consts;

    if (action.type === consts.CHANGE) {
        handleContext(action.ctx);
    } else if (action.type === consts.UPDATE) {
        update(action.ctx, action.state);
        this.emitChange();
    }
};


module.exports = new RouteStore();

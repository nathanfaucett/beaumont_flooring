var has = require("has"),
    constantize = require("constantize"),
    Store = require("./Store");


var EVENT_CHANGE = "change";


module.exports = FormStore;


function FormStore(name, initial) {
    var _form = initial,
        _this = this,
        CONST_CHANGE = constantize(name).replace("_STORE", "") + "_CHANGE";

    Store.call(this);

    function update(key, value) {
        if (has(_form, key) && _form[key] !== value) {
            _form[key] = value;
            return true;
        } else {
            return false;
        }
    }

    this.CONST_CHANGE = CONST_CHANGE;

    this.get = function(name) {
        return _form[name];
    };

    this.clear = function() {
        var form = _form,
            key;

        for (key in form) {
            if (has(form, key)) {
                form[key] = "";
            }
        }
    };

    this.toJSON = function() {
        return _form;
    };

    this.fromJSON = function(json) {
        _form = json;
    };

    this.register(function(payload) {
        var action = payload.action;

        if (action.actionType === CONST_CHANGE) {
            if (update(action.name, action.value)) {
                _this.emit(EVENT_CHANGE, action.name, action.value);
            }
        }
    });
}
Store.extend(FormStore);

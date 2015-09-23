var values = require("values"),
    Store = require("./Store"),
    app = require("../index");


var ResidentialGallaryStore = module.exports = new Store(),

    _items = {
        1: {
            id: 1,
            main: "",
            images: []
        }
    };


ResidentialGallaryStore.all = function(callback) {
    callback(undefined, values(_items));
};

ResidentialGallaryStore.get = function(id, callback) {
    callback(undefined, _items[id]);
};

ResidentialGallaryStore.toJSON = function() {
    return _items;
};

ResidentialGallaryStore.fromJSON = function(json) {
    _items = json;
};

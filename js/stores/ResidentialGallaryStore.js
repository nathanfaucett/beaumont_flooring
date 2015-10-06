var values = require("values"),
    Store = require("./Store");


var ResidentialGallaryStore = module.exports = new Store(),

    _items = {
        1: {
            id: 1,
            src: "img/gallary/hotel/thumbnail_1.jpg",
            images: [
                "img/gallary/hotel/guest.jpg",
                "img/gallary/hotel/Guest complete.jpg",
                "img/gallary/hotel/living complete.jpg",
                "img/gallary/hotel/thumbnail_2.jpg"
            ]
        },
        2: {
            id: 2,
            src: "img/gallary/house/thumbnail_1.jpg",
            images: [
                "img/gallary/house/Living room before.jpg",
                "img/gallary/house/master before.jpg",
                "img/gallary/house/master complete.jpg",
            ]
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

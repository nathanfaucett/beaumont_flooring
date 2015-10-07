var values = require("values"),
    Store = require("./Store");


var ResidentialGalleryStore = module.exports = new Store(),

    _items = {
        1: {
            id: 1,
            src: "img/gallery/hotel/thumbnail_1.jpg",
            images: [
                "img/gallery/hotel/guest.jpg",
                "img/gallery/hotel/Guest complete.jpg",
                "img/gallery/hotel/living complete.jpg",
                "img/gallery/hotel/thumbnail_2.jpg"
            ]
        },
        2: {
            id: 2,
            src: "img/gallery/house/thumbnail_1.jpg",
            images: [
                "img/gallery/house/Living room before.jpg",
                "img/gallery/house/master before.jpg",
                "img/gallery/house/master complete.jpg"
            ]
        }
    };


ResidentialGalleryStore.all = function(callback) {
    callback(undefined, values(_items));
};

ResidentialGalleryStore.get = function(id, callback) {
    callback(undefined, _items[id]);
};

ResidentialGalleryStore.toJSON = function() {
    return _items;
};

ResidentialGalleryStore.fromJSON = function(json) {
    _items = json;
};

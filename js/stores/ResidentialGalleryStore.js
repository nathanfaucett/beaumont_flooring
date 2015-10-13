var values = require("values"),
    Store = require("./Store");


var ResidentialGalleryStore = module.exports = new Store(),

    _items = {
        1: {
            id: 1,
            thumbnail: "img/gallery/Guest complete.jpg",
            image: "img/gallery/GuestRoom.jpg"
        },
        2: {
            id: 2,
            thumbnail: "img/gallery/living complete.jpg",
            image: "img/gallery/livingroom.jpg"
        },
        3: {
            id: 3,
            thumbnail: "img/gallery/master complete.jpg",
            image: "img/gallery/masterbed.jpg"
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

var values = require("@nathanfaucett/values"),
    Store = require("@nathanfaucett/apt").Store;


var _items = {
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


function ResidentialGalleryStore() {
    Store.call(this);
}
Store.extend(ResidentialGalleryStore, "ResidentialGalleryStore", []);


ResidentialGalleryStore.prototype.all = function(callback) {
    callback(undefined, values(_items));
};

ResidentialGalleryStore.prototype.get = function(id, callback) {
    callback(undefined, _items[id]);
};

ResidentialGalleryStore.prototype.toJSON = function() {
    return _items;
};

ResidentialGalleryStore.prototype.fromJSON = function(json) {
    _items = json;
};

ResidentialGalleryStore.prototype.handler = function() {};


module.exports = new ResidentialGalleryStore();

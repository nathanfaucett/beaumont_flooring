var values = require("values"),
    Store = require("./Store");


var ResidentialGallaryStore = module.exports = new Store(),

    _items = {
        1: {
            id: 1,
            src: "img/gallary/Hotel/DoubletreeKeyWest1.1_LG.jpg",
            images: [
                "img/gallary/Hotel/DoubletreeKeyWest1.2_LG.jpg"
            ]
        },
        2: {
            id: 2,
            src: "img/gallary/ConventionCenter/Broward_LG_convention.jpg",
            images: []
        },
        3: {
            id: 3,
            src: "img/gallary/CountryClub/huntersrun_lg_Country.jpg",
            images: [
                "img/gallary/CountryClub/JupiterHills_lg_Country.jpg"
            ]
        },
        4: {
            id: 4,
            src: "img/gallary/Hospitality/Hospitality1.1_lg.jpg",
            images: [
                "img/gallary/Hospitality/Hospitality1.2_lg.jpg",
                "img/gallary/Hospitality/Hospitality1.3_lg.jpg"
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

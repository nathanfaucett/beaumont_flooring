var values = require("@nathanfaucett/values"),
    Store = require("@nathanfaucett/apt").Store;


var _testimonials = {
        1: {
            id: 1,
            text: (
                "I just wanted to let you know how much we love our carpet!  It was the easiest part of our remodel by far. " +
                "The installers arrived on time, and got right to work. No waiting around for the morning water cooler talk here! " +
                "Both Scott and Bobby worked diligently to pull up our existing carpet, cutting it so my trash collectors would take " +
                "it for disposal. 150 yards of pad & carpet were removed and reinstalled in 1-1/2 days!!! Including moving all heavy " +
                "the furniture out and back into place (3 br, living room, dining room, family room)." +
                "<br/><br/>" +
                "I would highly recommend Bomont Flooring to anyone who wants spectacular, fast service with fabulous friendly installers." +
                "Now, my shutter installers on the other hand, well that's another story."
            ),
            author: "PK Stransky",
            location: "Fort Myers, Florida"
        },
        2: {
            id: 2,
            text: (
                "Working with Bomont Flooring has been the BEST experience!  Their team is knowledgeable about products and helped us " +
                "find a flooring solution for us that meet all of our needs.  The service is impeccable; they arrived on time each visit and " +
                "completed the work in a timely manner.  On top of that they are always professional."
            ),
            author: "Amy Wilkie",
            location: "Analyst, Customer Experience"
        }
    };


function TestimonialStore() {
    Store.call(this);
}
Store.extend(TestimonialStore, "TestimonialStore", []);


TestimonialStore.prototype.all = function(callback) {
    callback(undefined, values(_testimonials));
};

TestimonialStore.prototype.get = function(id, callback) {
    callback(undefined, _testimonials[id]);
};

TestimonialStore.prototype.toJSON = function() {
    return _testimonials;
};

TestimonialStore.prototype.fromJSON = function(json) {
    _testimonials = json;
};

TestimonialStore.prototype.handler = function() {};


module.exports = new TestimonialStore();

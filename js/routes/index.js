var app = require("../index");


app.router.use(
    require("./middleware/i18n")
);

require("./about_us");
require("./contact_us");
require("./home");
require("./services");
require("./not_found");

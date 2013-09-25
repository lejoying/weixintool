/**
 * Date: 2013.04.15
 * The url route mapping of the restful API web request.
 */


var requestHandlers = require("./requestHandlers");


var routemap = {
    "get":{
        "/api2/account/verification/:operation":requestHandlers.verification,
        "/api2/order/:operation":requestHandlers.orderManage
    },
    "post":{
    },
    "put":{
    },
    "del":{
    }
};

module.exports = routemap;
/**
 * Date: 2013.04.15
 * The url route mapping of the restful API web request.
 */
var requestHandlers = require("./requestHandlers");
var routemap = {
    "get": {
        "/api2/account/:operation": requestHandlers.accountManage,
        "/api2/weixin/:operation": requestHandlers.weixinManage,
        "/api2/user/:operation": requestHandlers.userManage,
        "/api2/message/:operation": requestHandlers.messageManage,
        "/api2/app/:operation": requestHandlers.applicationManage
    },
    "post": {
        "/api2/account/:operation": requestHandlers.accountManage,
        "/api2/weixin/:operation": requestHandlers.weixinManage,
        "/api2/message/:operation": requestHandlers.messageManage,
        "/api2/user/:operation": requestHandlers.userManage,
        "/api2/app/:operation": requestHandlers.applicationManage
    },
    "put": {
    },
    "del": {
    }
};

module.exports = routemap;
/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};

var globaldata = root.globaldata;

var bind = require('./handlers/bind');

requestHandlers.bind = function (request, response, pathObject, data) {
    if (data == null) {
        response.write(JSON.stringify({a: 1, b: 2}));
    }
    else {
        bind.message(data, response);
    }
};




var message = require('./handlers/message');

requestHandlers.message = function (request, response, pathObject, data) {
    if (data == null) {
        response.write(JSON.stringify({a: 1, b: 2}));
    }
    else {
        message.message(data, response);
    }
};

//var weixinuser = require('./handlers/weixinuser');
//requestHandlers.weixinuser = function (request, response, pathObject, postData, getParam) {
//    if (data == null) {
//        response.write(JSON.stringify({a: 1, b: 2}));
//    }
//    else {
//        weixinuser.weixinuser(data, response);
//    }
//};


requestHandlers.test = function (request, response, pathObject, data) {
    response.write(JSON.stringify({a: 1, b: 2}));
};

module.exports = requestHandlers;
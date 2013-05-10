/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};

var globaldata = root.globaldata;

var bind = require('./handlers/bind');

requestHandlers.bind = function (request, response, pathObject, getParam) {
    if (getParam == null) {
        response.write(JSON.stringify({a: 1, b: 2}));
    }
    else {
        var echostr = getParam["echostr"];
        bind.message(echostr, response);
    }
};

requestHandlers.test = function (request, response, pathObject, getParam) {
    response.write(JSON.stringify({a: 1, b: 2}));
};

module.exports = requestHandlers;
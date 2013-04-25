/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};

var globaldata = root.globaldata;

var demo1 = require('./handlers/demo1');
requestHandlers.demo1 = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "get") {
        demo1.get(response);
    } else if (operation == "reset") {
        var i = getParam["i"];
        demo1.reset(i, response);
    }
};

//var demo2 = require('./handlers/demo2');
//requestHandlers.demo2 = function (request, response, pathObject, getParam) {
//    var operation = pathObject["operation"];
//    if (operation == "get") {
//        demo2.get(response);
//    } else if (operation == "reset") {
//        var i = getParam["i"];
//        demo2.reset(i, response);
//    }
//};


var demo3 = require('./handlers/demo3');
requestHandlers.demo3 = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "get") {
        demo3.get(response);
    } else if (operation == "reset") {
        var i = getParam["i"];
        demo3.reset(i, response);
    }
};


var accountManage = require('./handlers/accountManage');
requestHandlers.accountManage = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "get") {
        accountManage.get(response);
    } else if (operation == "auth") {
        accountManage.auth(response);
    }
};


module.exports = requestHandlers;
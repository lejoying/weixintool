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
    }
    else if (operation == "reset") {
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
requestHandlers.demo3 = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "update") {
        demo3.update(data, response);
    }
};


var accountManage = require('./handlers/accountManage');
requestHandlers.accountManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        var invite = data.invite;
        if (invite != "lejoying") {
            response.write(JSON.stringify({
                "提示信息": "注册账号失败!",
                "reason": "邀请码不正确。"
            }));
            response.end();
        }
        else {
            accountManage.add(data, response);
        }
    }
    else if (operation == "exist") {
        accountManage.exist(data, response);
    }
    else if (operation == "auth") {
        accountManage.auth(data, response);
    }
};

//var weixinManage = require('./weixinuer/weixinManage');
//requestHandlers.weixinManage = function (request, response, pathObject, data) {
//    var operation = pathObject["operation"];
//    if (operation == "add") {
//        weixinManage.add(data, response);
//    }else if (operation == "delete") {
//        weixinManage.delet(data, response);
//    }else if (operation == "modify") {
//        weixinManage.modify(data, response);
//    }
//};


module.exports = requestHandlers;
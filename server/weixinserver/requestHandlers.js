/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};
var globaldata = root.globaldata;


var accountManage = require('./handlers/accountManage');
requestHandlers.accountManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        var invite = data.invite;
        if (invite != "lejoying") {
            response.write(JSON.stringify({
                "提示信息": "注册账号失败",
                "reason": "邀请码不正确"
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
    else if (operation == "modify") {
        accountManage.modify(data, response);
    }
};

var weixinManage = require('./handlers/weixinManage');
requestHandlers.weixinManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        weixinManage.add(data, response);
    } else if (operation == "delete") {
        weixinManage.delete(data, response);
    } else if (operation == "modify") {
        weixinManage.modify(data, response);
    } else if (operation == "getall") {
        weixinManage.getall(data, response);
    }
};

var messageManage = require('./handlers/messageManage');
requestHandlers.messageManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        messageManage.add(data, response);
    } else if (operation == "leave") {
        messageManage.leave(data, response);
    } else if (operation == "adds") {
        messageManage.adds(data, response);
    }
};

var applyManage = require('./handlers/applyManage');
requestHandlers.applyManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        applyManage.add(data, response);
    } else if (operation == "addtest") {
        applyManage.addtest(data, response);
    }
};

module.exports = requestHandlers;
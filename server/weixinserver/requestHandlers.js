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
        accountManage.add(data, response);
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
    else if (operation == "modifyaccount") {
        accountManage.modifyaccount(data, response);
    }
    else if (operation == "getnowpageaccount") {
        accountManage.getnowpageaccount(data, response);
    }
    else if (operation == "getbyid") {
        accountManage.getbyid(data, response);
    }
    else if (operation == "getallcount") {
        accountManage.getallcount(data, response);
    }
    else if (operation == "delete") {
        accountManage.delete(data, response);
    }
};

var weixinManage = require('./handlers/weixinManage');
requestHandlers.weixinManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "bindingtoken") {
        weixinManage.bindingtoken(data, response);
    }
    else if (operation == "bindapp") {
        weixinManage.bindapp(data, response);
    }
    else if (operation == "unbindapp") {
        weixinManage.unbindapp(data, response);
    }
    else if (operation == "getall") {
        weixinManage.getall(data, response);
    }
    else if (operation == "getbyid") {
        weixinManage.getbyid(data, response);
    }
    else if (operation == "modify") {
        weixinManage.modify(data, response);
    }
    else if (operation == "delete") {
        weixinManage.delete(data, response);
    }
    else if (operation == "getnewusercount") {
        weixinManage.getnewusercount(data, response);
    }
    else if (operation == "getnowpageweixin") {
        weixinManage.getnowpageweixin(data, response);
    }
    else if (operation == "getbindcount") {
        weixinManage.getbindcount(data, response);
    }
};


var userManage = require('./handlers/userManage');
requestHandlers.userManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "getall") {
        userManage.getall(data, response);
    }
    else if (operation == "modify") {
        userManage.modify(data, response);
    }
    else if (operation == "delete") {
        userManage.delete(data, response);
    }
    else if (operation == "getbyid") {
        userManage.getbyid(data, response);
    }
    else if (operation == "getnowpageuser") {
        userManage.getnowpageuser(data, response);
    }
};

var applicationManage = require('./handlers/applicationManage');
requestHandlers.applicationManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        applicationManage.add(data, response);
    }
    else if (operation == "modify") {
        applicationManage.modify(data, response);
    }
    else if (operation == "getall") {
        applicationManage.getall(data, response);
    }
    else if (operation == "getbyid") {
        applicationManage.getbyid(data, response);
    }
    else if (operation == "delete") {
        applicationManage.delete(data, response);
    }
    else if (operation == "modifystatus") {
        applicationManage.modifystatus(data, response);
    }
    else if (operation == "addmyapp") {
        applicationManage.addmyapp(data, response);
    }
    else if (operation == "getallmyapp") {
        applicationManage.getallmyapp(data, response);
    }
    else if (operation == "modifymyapp") {
        applicationManage.modifymyapp(data, response);
    }
    else if (operation == "getappscount") {
        applicationManage.getappscount(data, response);
    }
    else if (operation == "getmyapp") {
        applicationManage.getmyapp(data, response);
    }
    else if (operation == "getprivateapp") {
        applicationManage.getprivateapp(data, response);
    }
    else if (operation == "getappcount") {
        applicationManage.getappcount(data, response);
    }
    else if (operation == "getuserappcount") {
        applicationManage.getuserappcount(data, response);
    }
};

module.exports = requestHandlers;
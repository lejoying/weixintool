/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var weixinManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);


/***************************************
 *     URL：/api2/weixin/bindingtoken
 ***************************************/
weixinManage.bindingtoken = function (data, response) {
    response.asynchronous = 1;
    var weixin = {
        weixinOpenID: "",
        weixinName: data.weixinName,
        token: "",
        status: "binding"
    };

    var account = {
        "uid": data.uid
    };

    var timestamp = new Date().getTime();
    var random = Math.random();
    var token = (timestamp * random).toString().substring(1, 11);
    weixin.token = token;


    createWeixinNode();

    function createWeixinNode() {
        var query = [
            'START account=node({uid})' ,
            'CREATE (weixin:Weixin{weixin})',
            'CREATE UNIQUE account-[r:HAS_WEIXIN]->weixin',
            'RETURN  weixin, account, r'
        ].join('\n');

        var params = {
            uid: parseInt(account.uid),
            weixin: weixin
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            else {
                var accountNode = results.pop().account;
                response.write(JSON.stringify({
                    "提示信息": "微信公众账号正在绑定",
                    "token": weixin.token
                }));
                response.end();
            }

        });
    }

}


/***************************************
 *     URL：/api2/weixin/bindapp
 ***************************************/
weixinManage.bindapp = function (data, response) {
    response.asynchronous = 1;

    var weixin = {
        weixinOpenID: data.weixinopenid
    };

    var appid = data.appid;

    bindAppNodeWihtWeixinNode();

    function bindAppNodeWihtWeixinNode() {
        var query = [
            'MATCH app:App, weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinOpenID} AND app.appid! =' + appid,
            'CREATE UNIQUE app-[:BIND]->weixin',
            'RETURN weixin, app'
        ].join('\n');

        var params = {
            appid: parseInt(appid),
            weixinOpenID: weixin.weixinOpenID
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            else if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "微信公众账号添加应用失败",
                    "失败原因": "数据不正常"
                }));
                response.end();
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": "微信公众账号添加应用成功"
                }));
                response.end();
            }

        });
    }
}

/***************************************
 *     URL：/api2/weixin/unbindapp
 ***************************************/
weixinManage.unbindapp = function (data, response) {
    response.asynchronous = 1;

    var weixin = {
        weixinOpenID: data.weixinopenid
    };

    var appid = data.appid;

    unbindAppNodeWihtWeixinNode();

    function unbindAppNodeWihtWeixinNode() {
        var query = [
            'MATCH app:App-[r:BIND]->weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinOpenID} AND app.appid! =' + appid,
            'DELETE r'
        ].join('\n');

        var params = {
            appid: parseInt(appid),
            weixinOpenID: weixin.weixinOpenID
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "微信公众账号添加应用失败",
                    "失败原因": "数据不正常"
                }));
                response.end();
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": "微信公众账号移除应用成功"
                }));
                response.end();
            }

        });
    }
}

/***************************************
 *     URL：/api2/weixin/gatall
 ***************************************/
weixinManage.getall = function (data, response) {
    response.asynchronous = 1;

    var account = {
        "uid": data.uid
    };

    getallWeixinNode();

    function getallWeixinNode() {
        var query = [
            'START account=node({uid})' ,
            'MATCH account-[:HAS_WEIXIN]->weixin:Weixin<-[:BIND]-app:App',
            'WHERE weixin.status! ={status1} OR weixin.status! ={status2}',
            'RETURN weixin, app'
        ].join('\n');

        var params = {
            uid: parseInt(account.uid),
            status1: "bind_server",
            status2: "bind_message"
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获取所有绑定微信公众账号失败",
                    "失败原因 ": "没有已绑定微信公众账号"
                }));
                response.end();
            }
            else {
                var weixins = {};
                for (var index in results) {
                    var weixinNode = results[index].weixin;
                    if (weixins[weixinNode.data.weixinOpenID] == null) {
                        weixins[weixinNode.data.weixinOpenID] = weixinNode.data;
                        weixins[weixinNode.data.weixinOpenID].apps = [];
                    }
                    var appNode = results[index].app;
                    weixins[weixinNode.data.weixinOpenID].apps.push(appNode.data);
                }
                response.write(JSON.stringify({
                    "提示信息": "获取所有绑定微信公众账号成功",
                    "weixins": weixins
                }));
                response.end();
            }

        });
    }
}

module.exports = weixinManage;
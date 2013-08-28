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
    deleteBindingWeixinNode(createWeixinNode);

    function deleteBindingWeixinNode(next) {
        var query = [
            'START account=node({uid}), account1=node({uid})' ,
            'MATCH account1:Account-[r1:HAS_WEIXIN]->duplicatedWeixin:Weixin<-[r2]-app:App',
            'WHERE duplicatedWeixin.status={status1}',
            'DELETE duplicatedWeixin, r1, r2'
        ].join('\n');

        var params = {
            uid: parseInt(account.uid),
            weixin: weixin,
            status1: "binding",
            status2: "bind_server"
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            else {
                next();
            }
        });
    }

//    createWeixinNode();
    function createWeixinNode() {
        var query = [
            'START account=node({uid})' ,
            'MATCH  app:App' ,
            'WHERE  app.appid! = 125',
            'CREATE UNIQUE account-[r:HAS_WEIXIN{switch:"false"}]->weixin:Weixin{weixin}<-[r:BIND]-app',
            'RETURN  weixin, account, r'
        ].join('\n');

        var params = {
            uid: parseInt(account.uid),
            weixin: weixin,
            status1: "binding",
            status2: "bind_server"
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
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
                return;
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
    /*var base = require("./../../bindserver/tools/base64");
     console.log(base.encode(data.jscode));*/
    var account = {
        "uid": data.uid
    };
    getallWeixinNode();

    function getallWeixinNode() {
        var query = [
            'START account=node({uid})' ,
            'MATCH account-[r:HAS_WEIXIN]->weixin:Weixin<-[:BIND]-app:App',
            'WHERE weixin.status! ={status1} OR weixin.status! ={status2}',
            'RETURN weixin, app, r'
        ].join('\n');

        var params = {
            uid: parseInt(account.uid),
            status1: "bind_server",
            status2: "bind_message"
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获取所有绑定微信公众账号失败",
                    "失败原因": "没有已绑定微信公众账号"
                }));
                response.end();
            }
            else {
                var weixins = {};
                for (var index in results) {
                    var weixinNode = results[index].weixin;
                    if (weixins[weixinNode.data.weixinOpenID] == null) {
                        weixinNode.data.rela = results[index].r.data.switch;
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
/***************************************
 *     URL：/api2/weixin/modify
 ***************************************/
weixinManage.modify = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var userStr = data.weixin;
    var weixin = JSON.parse(userStr);

    getByIdUserNode();

    function getByIdUserNode() {
        var query = [
            'MATCH weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinid}',
            'RETURN  weixin'
        ].join('\n');

        var params = {
            weixinid: weixinid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改绑定微信信息失败",
                    "失败原因 ": "绑定微信信息不存在"
                }));
                response.end();
            } else {
                var weixinNode = results.pop().weixin;
                weixinNode.data = weixin;
                weixinNode.save();
                response.write(JSON.stringify({
                    "提示信息": "修改绑定微信信息成功",
                    "weixin": weixin
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/weixin/modifyrelapro
 ***************************************/
weixinManage.modifyrelapro = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var uid = data.uid;
    var onoff = data.switch;
    modifyRelaProNode();

    function modifyRelaProNode() {
        var query = [
            'MATCH account:Account-[r:HAS_WEIXIN]->weixin:Weixin',
            'WHERE account.uid! ={uid} AND weixin.weixinOpenID! ={weixinid}',
            'RETURN  r'
        ].join('\n');

        var params = {
            uid: parseInt(uid),
            weixinid: weixinid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改绑定微信开关失败",
                    "失败原因 ": "数据不正常"
                }));
                response.end();
            } else {
                var rNode = results.pop().r;
                rNode.data.switch = onoff;
                rNode.save();
                response.write(JSON.stringify({
                    "提示信息": "修改绑定微信开关成功",
                    "r": rNode.data
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/weixin/getbyid
 ***************************************/
weixinManage.getbyid = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    getByIdWeixinNode();

    function getByIdWeixinNode() {
        var query = [
            'MATCH weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinid}',
            'RETURN  weixin'
        ].join('\n');

        var params = {
            weixinid: weixinid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获取微信信息失败",
                    "失败原因 ": "微信信息不存在"
                }));
                response.end();
            } else {
                var weixin = results.pop().weixin.data;
                response.write(JSON.stringify({
                    "提示信息": "获取微信信息成功",
                    "weixin": weixin
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/weixin/newusercount
 ***************************************/
weixinManage.newusercount = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var time = data.time;
    newUserCountNode();

    function newUserCountNode() {
        var query = [
            'MATCH weixin:Weixin<-[r]-user:User' ,
            'WHERE weixin.weixinOpenID! ={weixinid} AND user.time! ={time}',
            'RETURN  count(user)'
        ].join('\n');

        var params = {
            weixinid: weixinid,
            time: time
        };

        db.query(query, params, function (error, results) {
            if (error) {
                response.write(JSON.stringify({
                    "提示信息": "获取今日新增会员数量失败",
                    "失败原因 ": "数据格式不正确"
                }));
                response.end();
            }else{
                var count = results.pop()["count(user)"];
                response.write(JSON.stringify({
                    "提示信息": "获取今日新增会员数量成功",
                    "count": count
                }));
                response.end();
            }
        });
    }
}
module.exports = weixinManage;
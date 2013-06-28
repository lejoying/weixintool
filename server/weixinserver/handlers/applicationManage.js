/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.05.20
 * Request:
 *  http://127.0.0.1:8062/api2/message/weixinMessage/add
 * Response:
 *  "{}"
 */

var applicationManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/app/add
 ***************************************/

applicationManage.add = function (data, response) {
    response.asynchronous = 1;

    var appstr = data.app;
    var app = JSON.parse(appstr);
    var script = data.script;

    if (checkScript() == false) {
        response.write(JSON.stringify({
            "提示信息": "新建应用失败",
            "失败原因": "脚本形式不正确"
        }));
        response.end();
        return;
    }

    function checkScript() {  //todo check the healthy of the script
        return true;
    }

    app.script = script;
    app.status = "";
    app.data = "";

    var account = {
        "uid": data.uid
    };

    createAppNode();
    function createAppNode() {
        var query = [
            'START account=node({uid})' ,
            'CREATE UNIQUE account-[r:OWN_APP]->app:App{app}',
            'SET app.appid=ID(app)',
            'RETURN  app'
        ].join('\n');

        var params = {
            app: app,
            uid: parseInt(account.uid)
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            } else {
                var appNode = results.pop().app;
                response.write(JSON.stringify({
                    "提示信息": "新建应用成功",
                    "app": appNode.data // too large to transport.
                }));
                response.end();
            }
        });
    }
}


/***************************************
 *     URL：/api2/app/delete
 ***************************************/

applicationManage.delete = function (data, response) {
    response.asynchronous = 1;

    var appid = data.appid;

    deleteAppNode();
    function deleteAppNode() {
        var query = [
            'MATCH other-[r]-app:App',
            'WHERE app.appid! =' + appid,
            'DELETE  app, r'
        ].join('\n');

        var params = {
//            appid: parseInt(appid)
            appid: 39
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "删除应用失败",
                    "失败原因": "应用不存在"
                }));
                response.end();
            } else {
                response.write(JSON.stringify({
                    "提示信息": "删除应用成功"
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/app/modify
 ***************************************/
// todo complete this API as form of "/api2/app/add"
applicationManage.modify = function (data, response) {
    response.asynchronous = 1;

    var appid = data.appid;
    var appStr = data.app;
    var app = JSON.parse(appStr);
    var script = data.script;


    if (checkScript() == false) {
        response.write(JSON.stringify({
            "提示信息": "修改应用失败",
            "失败原因": "脚本形式不正确"
        }));
        response.end();
        return;
    }

    function checkScript() {  //todo check the healthy of the script
        return true;
    }

    modifyAppNode();

    function modifyAppNode() {
        var query = [
            'MATCH app:App',
            'WHERE app.appid! =' + appid,
            'RETURN  app'
        ].join('\n');

        var params = {
//            appid: parseInt(appid)
            appid: 36
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改应用失败",
                    "失败原因 ": "应用不存在"
                }));
                response.end();
            } else {
                var appNode = results.pop().app;
                for (var index in app) {
                    appNode.data[index] = app[index];
                }

                appNode.save(function (err, node) {
                });
                response.write(JSON.stringify({
                    "提示信息": "修改应用成功",
                    "app": app
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/app/getall
 ***************************************/
applicationManage.getall = function (data, response) {
    response.asynchronous = 1;
    var account = {
        "uid": data.uid
    };
    var filter = data.filter;
    var weixin =
    {
        weixinOpenID: data.weixinOpenID
    };

    getallAppNode();

    function getallAppNode() {
        var query;
        var failReason;
        if (filter == "ALL") {
            query = [
                'MATCH app:App' ,
                'RETURN  app'
            ].join('\n');
            failReason = "应用列表为空";
        } else if (filter == "OWN") {
            query = [
                'MATCH account:Account-[:OWN_APP]->app:App' ,
                'WHERE account.uid! ={uid}',
                'RETURN  app'
            ].join('\n');
            failReason = "指定账号不存在";
        } else if (filter == "BIND") {
            query = [
                'MATCH app:App-[:BIND]->weixin:Weixin' ,
                'WHERE weixin.weixinOpenID! ={weixinOpenID}',
                'RETURN  app'
            ].join('\n');
            failReason = "指定微信公众账号不存在";
        }

        var params = {
            weixinOpenID: weixin.weixinOpenID,
            uid: parseInt(account.uid)
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获得应用列表失败",
                    "失败原因 ": failReason
                }));
                response.end();
            } else {
                var apps = [];
                for (var index in results) {
                    var appNode = results[index].app;
                    apps.push(appNode.data);
                }
                response.write(JSON.stringify({
                    "提示信息": "获得应用列表成功",
                    "apps": apps
                }));
                response.end();
            }
        });

    }
}

module.exports = applicationManage;
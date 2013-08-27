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
    var apps = [];
    var count = 0;
    var index = 0;
    function getallAppNode() {
        var query;
        var failReason;
        if (filter == "ALL") {
            query = [
                'MATCH app:App' ,
                'WHERE app.type! ="public"',
                'RETURN  app',
                'ORDER BY app.appid ASC'
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
                count = results.length;
                for (var index in results) {
                    var appNode = results[index].app.data;
                    judgeHaveRela(appNode.appid, next, appNode);

                }

            }
        });
        function next(appNode){
            apps.push(appNode);
            index++;
            if(count == index){
                response.write(JSON.stringify({
                    "提示信息": "获得应用列表成功",
                    "apps": apps
                }));
                response.end();
            }
        }
    }
    function judgeHaveRela(appid, next, appNode){
        query = [
            'MATCH app:App-[:BIND]->weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinOpenID} AND app.appid! ={appid}',
            'RETURN  app'
        ].join('\n');

        var params = {
            weixinOpenID: weixin.weixinOpenID,
            appid: appid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "获得应用列表失败",
                    "失败原因 ": "应用列表为空"
                }));
                response.end();
            }
            if (results.length == 0) {
                next(appNode);
            } else {
                appNode.rela = true;
                next(appNode);
            }
        });
    }
}
/***************************************
 *     URL：/api2/app/myappadd
 ***************************************/
applicationManage.myappadd = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var myappStr = data.myapp;
    var myapps = JSON.parse(myappStr);
    modifyMyAppNode();

    function modifyMyAppNode() {
        var query = [
            'MATCH weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE weixin.weixinOpenID! ={weixinid} AND app.appid! =125',
            'RETURN  weixin, app, r'
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
                    "提示信息": "保存个性化设置失败",
                    "失败原因 ": "保存数据出现异常"
                }));
                response.end();
            } else {
                var rNode = results.pop().r;
                rNode.data.mydata = myappStr;
                rNode.save();
                response.write(JSON.stringify({
                    "提示信息": "保存个性化设置成功",
                    "r": rNode.data.mydata
                }));
                response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/app/myappadd
 ***************************************/
applicationManage.myappgetall = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    modifyMyAppNode();

    function modifyMyAppNode() {
        var query = [
            'MATCH weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE weixin.weixinOpenID! ={weixinid} AND app.appid! =125',
            'RETURN  r'
        ].join('\n');
/*        var query = [
            'MATCH weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE weixin.weixinOpenID! ={weixinid} AND app.appid! =125',
            'RETURN  r'
        ].join('\n');*/

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
                    "提示信息": "获取个性化设置失败",
                    "失败原因 ": "保存数据出现异常"
                }));
                response.end();
            } else {
                var rNode = results.pop().r;
                response.write(JSON.stringify({
                    "提示信息": "获取个性化设置成功",
                    "r": JSON.parse(rNode.data.mydata),
                    "count":JSON.parse(rNode.data.mydata).length
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/app/myappmodify
 ***************************************/
applicationManage.myappmodify = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var appid = data.appid;
    var rStr = data.r;
    var rData = JSON.parse(rStr);
    getByIdAppNode();

    function getByIdAppNode() {
        var query = [
            'MATCH weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE weixin.weixinOpenID! ={weixinid} AND app.appid! ={appid}',
            'RETURN  weixin, r, app'
        ].join('\n');

        var params = {
            weixinid: weixinid,
            appid: parseInt(appid)
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获取应用信息失败",
                    "失败原因 ": "应用信息不存在"
                }));
                response.end();
            } else {
                var rNode = results.pop().r;
                rNode.data = rData;
                rNode.save();
                response.write(JSON.stringify({
                    "提示信息": "获取应用信息成功",
                    "r": rNode.data
                }));
                response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/app/getbyid
 ***************************************/
applicationManage.getbyid = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var appid = data.appid;
    getByIdAppNode();

    function getByIdAppNode() {
        var query = [
            'MATCH weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE weixin.weixinOpenID! ={weixinid} AND app.appid! ={appid}',
            'RETURN  weixin, r, app'
        ].join('\n');

        var params = {
            weixinid: weixinid,
            appid: parseInt(appid)
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获取应用信息失败",
                    "失败原因 ": "应用信息不存在"
                }));
                response.end();
            } else {
                var r = results.pop().r.data;
                response.write(JSON.stringify({
                    "提示信息": "获取应用信息成功",
                    "r": r
                }));
                response.end();
            }
        });
    }
}
module.exports = applicationManage;
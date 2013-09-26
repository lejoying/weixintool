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
 *     URL：/api2/app/getbyid
 ***************************************/
applicationManage.getbyid= function (data, response) {
    response.asynchronous = 1;
    var appid = data.appid;
    getByIdNode();

    function getByIdNode() {
        var query = [
            'MATCH app:App' ,
            'WHERE app.appid! ={appid}',
            'RETURN  app'
        ].join('\n');

        var params = {
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
                var app = results.pop().app.data;
                response.write(JSON.stringify({
                    "提示信息": "获取应用信息成功",
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
    var total = 0;
    var account = {
        "uid": data.uid
    };
    var filter = data.filter;
    var type = data.type;
    var mold = data.mold;
    var status = data.status;
    var stat = data.start;
    var end = data.end;
    var weixin =
    {
        weixinOpenID: data.weixinOpenID
    };
    getallAppCountNode();
    var apps = [];
    var count = 0;
    var index = 0;
    function getallAppNode() {
        var query;
        var failReason;
        if(mold == "management"){
            query = [
                'MATCH app:App' ,
                'WHERE app.type! ="public" OR app.type! ="industry"',
                'RETURN  app',
                'ORDER BY app.appid ASC',
                'SKIP {stat}',
                'LIMIT {end}'
            ].join('\n');
            failReason = "应用列表为空";
        }else{
            if (filter == "ALL") {
                query = [
                    'MATCH app:App' ,
                    'WHERE app.type! ={type} AND app.status! ={status}',
                    'RETURN  app',
                    'ORDER BY app.appid ASC',
                    'SKIP {stat}',
                    'LIMIT {end}'
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
                    'WHERE weixin.weixinOpenID! ={weixinOpenID} AND app.status! ={status}',
                    'RETURN  app.appid,app.name,app.type'
                ].join('\n');
                failReason = "指定微信公众账号不存在";
            }
        }

        var params = {
            weixinOpenID: weixin.weixinOpenID,
            uid: parseInt(account.uid),
            type: type,
            status: status,
            stat: parseInt(stat),
            end: parseInt(end)
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
                var cindex = 0;
                for (var index in results) {
                     if(filter == "BIND"){
                         var app = {};
                         app.appid = results[index]["app.appid"];
                         app.name = results[index]["app.name"];
                         app.type = results[index]["app.type"];
                         next(app);
                     }else{
                         var appNode = results[index].app.data;
                         if(mold == "management"){
                             apps.push(appNode);
                             cindex++;
                             if(cindex == results.length){
                                 response.write(JSON.stringify({
                                     "提示信息": "获得应用列表成功",
                                     "apps": apps,
                                     "count": total
                                 }));
                                 response.end();
                             }
                         }else{
                             judgeHaveRela(appNode.appid, next, appNode);
                         }
                     }
                }
            }
        });
        function next(appNode){
            apps.push(appNode);
            index++;
            if(count == index){
                response.write(JSON.stringify({
                    "提示信息": "获得应用列表成功",
                    "apps": apps,
                    "count": total
                }));
                response.end();
            }
        }
    }
    function getallAppCountNode() {
        if(weixin.weixinOpenID == "" || weixin.weixinOpenID == undefined || filter == "BIND"){
            if(mold != "management"){
                getallAppNode();
                return;
            }
        }
        var query;
        if(mold == "management"){
            query = [
            'MATCH app:App' ,
            'WHERE app.type! ="public" OR app.type! ="industry"',
            'RETURN  count(app)'
            ].join('\n');
        }else{
            query = [
                'MATCH app:App' ,
                'WHERE app.type! ={type}',
                'RETURN  count(app)'
            ].join('\n');
        }

        var params = {
            type: type
        };
        db.query(query, params, function (error, results) {
            if (error) {
                response.write(JSON.stringify({
                    "提示信息": "获得所有应用数量失败",
                    "失败原因 ": "微信公众账号不存在"
                }));
                response.end();
            } else {
                total = results.pop()["count(app)"];
                getallAppNode();
            }
        });
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
 *     URL：/api2/app/addmyapp
 ***************************************/
applicationManage.addmyapp = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var myappStr = data.myapp;
    var myapps = JSON.parse(myappStr);
    addMyAppNode();

    function addMyAppNode() {
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
 *     URL：/api2/app/getallmyapp
 ***************************************/
applicationManage.getallmyapp = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    getAllMyAppNode();

    function getAllMyAppNode() {
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
                if(rNode.data.mydata == undefined || rNode.data.mydata.trim() == ""){
                    response.write(JSON.stringify({
                        "提示信息": "获取个性化设置成功"
                    }));
                    response.end();
                }else{
                    response.write(JSON.stringify({
                        "提示信息": "获取个性化设置成功",
                        "r": JSON.parse(rNode.data.mydata),
                        "count":JSON.parse(rNode.data.mydata).length
                    }));
                    response.end();
                }
            }
        });
    }
}

/***************************************
 *     URL：/api2/app/modifymyapp
 ***************************************/
applicationManage.modifymyapp = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var appid = data.appid;
    var rStr = data.r;
    var rData = JSON.parse(rStr);
    modifyMyAppNode();

    function modifyMyAppNode() {
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
 *     URL：/api2/app/getmyapp
 ***************************************/
applicationManage.getmyapp= function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var appid = data.appid;
    getMyAppNode();

    function getMyAppNode() {
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
                var pop = results.pop();
                var r = pop.r.data;
                r.app = pop.app.data;
                response.write(JSON.stringify({
                    "提示信息": "获取应用信息成功",
                    "r": r
            }));
            response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/app/getappscount
 ***************************************/
applicationManage.getappscount = function (data, response) {
    response.asynchronous = 1;
    var type = data.type;
    getAppsCountNode();

    function getAppsCountNode() {
        var query = [
            'MATCH app:App' ,
            'WHERE app.type! ={type}',
            'RETURN  count(app)'
        ].join('\n');

        var params = {
            type: type
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "获取应用数量失败",
                    "失败原因 ": "数据格式不正常"
                }));
                response.end();
            }else {
                var count = results.pop()["count(app)"];
                response.write(JSON.stringify({
                    "提示信息": "获取应用数量成功",
                    "count": count
                }));
                response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/app/modifystatus
 ***************************************/
applicationManage.modifystatus= function (data, response) {
    response.asynchronous = 1;
    var appid = data.appid;
    var status = data.status;
    modifyStatusAppNode();

    function modifyStatusAppNode() {
        var query = [
            'MATCH app:App' ,
            'WHERE app.appid! ={appid}',
            'RETURN  app'
        ].join('\n');

        var params = {
            appid: parseInt(appid)
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改应用信息失败",
                    "失败原因 ": "应用信息不存在"
                }));
                response.end();
            } else {
                var appNode = results.pop().app;
                appNode.data.status = status;
                appNode.save();
                response.write(JSON.stringify({
                    "提示信息": "修改应用信息成功",
                    "app": appNode.data
                }));
                response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/app/getprivateapp
 ***************************************/
applicationManage.getprivateapp = function (data, response) {
    response.asynchronous = 1;
    var count = 0;
    var start = data.start;
    var end = data.end;
    getPrivateAppCountNode();
    function getPrivateAppNode() {
        var query = [
            'MATCH account:Account-->weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE app.type! ="private" AND r.power! =true',
            'RETURN  account, weixin, r, app',
            'SKIP {stat}',
            'LIMIT {total}'
        ].join('\n');

        var params = {
            stat: parseInt(start),
            total: parseInt(end)
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获得用户个性化设置失败",
                    "失败原因 ": "个性化设置不存在"
                }));
                response.end();
            } else {
                var rs = [];
                for (var index in results) {
                    var rNode = results[index].r;
                    rNode.data.weixin = results[index].weixin.data;
                    rNode.data.app = results[index].app.data;
                    rNode.data.account = results[index].account.data;
                    rs.push(rNode.data);
                }
                response.write(JSON.stringify({
                    "提示信息": "获得用户个性化设置成功",
                    "rs": rs,
                    "count": count
                }));
                response.end();
            }
        });

    }
    function getPrivateAppCountNode() {
        var query = [
            'MATCH weixin:Weixin<-[r:BIND]-app:App' ,
            'WHERE app.type! ="private" AND r.power! =true',
            'RETURN  count(r)'
        ].join('\n');

        var params = {};
        db.query(query, params, function (error, results) {
            if (error) {
                response.write(JSON.stringify({
                    "提示信息": "获得用户个性化设置数量失败",
                    "失败原因 ": "个性化应用不存在"
                }));
                response.end();
            } else {
                count = results.pop()["count(r)"];
                getPrivateAppNode();
            }
        });
    }
}
/***************************************
 *     URL：/api2/weixin/getappcount
 ***************************************/
applicationManage.getappcount = function (data, response) {
    response.asynchronous = 1;
    var total = 0;
    getAllAppCountNode();
    function getAppCountNode() {
        var query = [
            'MATCH app:App' ,
            'WHERE app.status! ="true"',
            'RETURN  count(app)'
        ].join('\n');
        var params = {};
        db.query(query, params, function (error, results) {
            if (error) {
                response.write(JSON.stringify({
                    "提示信息": "获取微乎应用数量失败",
                    "失败原因 ": "数据异常"
                }));
                response.end();
            }else{
                var count = results.pop()["count(app)"];
                response.write(JSON.stringify({
                    "提示信息": "获取微乎应用数量成功",
                    "oncount": count,
                    "offcount":total-count
                }));
                response.end();
            }
        });
    }
    function getAllAppCountNode() {
        var query = [
            'MATCH app:App' ,
            'RETURN  count(app)'
        ].join('\n');
        var params = {};
        db.query(query, params, function (error, results) {
            if (error) {
                response.write(JSON.stringify({
                    "提示信息": "获取所有微乎应用数量失败",
                    "失败原因 ": "数据异常"
                }));
                response.end();
            }else{
               total = results.pop()["count(app)"];
                getAppCountNode();
            }
        });
    }
}
/***************************************
 *     URL：/api2/weixin/getuserappcount
 ***************************************/
applicationManage.getuserappcount = function (data, response) {
    response.asynchronous = 1;
    getUserAppCountNode();
    function getUserAppCountNode() {
        var query = [
            'MATCH weixin:Weixin<-[r]-app:App' ,
            'WHERE app.type! ="private" AND r.power! =true',
            'RETURN  count(r)'
        ].join('\n');
        var params = {};
        db.query(query, params, function (error, results) {
            if (error) {
                response.write(JSON.stringify({
                    "提示信息": "获取个性化应用开启数量失败",
                    "失败原因 ": "数据异常"
                }));
                response.end();
            }else{
                var count = results.pop()["count(r)"];
                response.write(JSON.stringify({
                    "提示信息": "获取个性化应用开启数量成功",
                    "count": count
                }));
                response.end();
            }
        });
    }
}
module.exports = applicationManage;
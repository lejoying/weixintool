/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var userManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);


/***************************************
 *     URL：/api2/user/getall
 ***************************************/
userManage.getall = function (data, response) {
    response.asynchronous = 1;
    var count = 0;
    var weixin =
    {
        weixinOpenID: data.weixinopenid
    };
    var start = data.start;   //todo take it effect
    var end = data.end;
    getallUserCountNode();
    function getallUserNode() {
        var query = [
            'MATCH user:User-[:FOCUS]->weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinOpenID}',
            'RETURN  user',
            'SKIP {stat}',
            'LIMIT {total}'
        ].join('\n');

        var params = {
            weixinOpenID: weixin.weixinOpenID,
            stat: parseInt(start),
            total: parseInt(end)
        };
        if(weixin.weixinOpenID == null){
            response.write(JSON.stringify({
                "提示信息": "获得所有关注用户失败",
                "失败原因 ": "微信公众账号不存在"
            }));
            response.end();
        }
        else{
            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                    return;
                }
                if (results.length == 0) {
                    response.write(JSON.stringify({
                        "提示信息": "获得所有关注用户失败",
                        "失败原因 ": "微信公众账号不存在"
                    }));
                    response.end();
                } else {
                    var users = [];
                    for (var index in results) {
                        var userNode = results[index].user;
                        users.push(userNode.data);
                    }
                    response.write(JSON.stringify({
                        "提示信息": "获得所有关注用户成功",
                        "users": users,
                        "count": count
                    }));
                    response.end();
                }
            });
        }

    }
    function getallUserCountNode() {
        var query = [
            'MATCH user:User-[:FOCUS]->weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinOpenID}',
            'RETURN  count(user)'
        ].join('\n');

        var params = {
            weixinOpenID: weixin.weixinOpenID
        };
            db.query(query, params, function (error, results) {
                if (error) {
                    response.write(JSON.stringify({
                        "提示信息": "获得所有关注用户数量失败",
                        "失败原因 ": "微信公众账号不存在"
                    }));
                    response.end();
                } else {
                    count = results.pop()["count(user)"];
                    getallUserNode();
                }
            });
    }
}
/***************************************
 *     URL：/api2/user/getnowpageuser
 ***************************************/
userManage.getnowpageuser = function (data, response) {
    response.asynchronous = 1;
    var count = 0;
    var start = data.start;   //todo take it effect
    var end = data.end;
    getNowPageUserCountNode();
    function getNowPageUserNode() {
        var query = [
            'MATCH user:User-[:FOCUS]->weixin:Weixin' ,
            'RETURN  user, weixin',
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
                    "提示信息": "获得分页关注用户失败",
                    "失败原因 ": "微信公众账号不存在"
                }));
                response.end();
            } else {
                var users = [];
                for (var index in results) {
                    var userNode = results[index].user.data;
                    userNode.weixin = results[index].weixin.data;
                    users.push(userNode);
                }
                response.write(JSON.stringify({
                    "提示信息": "获得分页关注用户成功",
                    "users": users,
                    "count": count
                }));
                response.end();
            }
        });
    }
    function getNowPageUserCountNode() {
        var query = [
            'MATCH user:User-[:FOCUS]->weixin:Weixin' ,
            'RETURN  count(user)'
        ].join('\n');

        var params = {};
        db.query(query, params, function (error, results) {
            if (error) {
                console.log(error);
                response.write(JSON.stringify({
                    "提示信息": "获得所有关注用户数量失败",
                    "失败原因 ": "数据格式不正确"
                }));
                response.end();
            } else {
                count = results.pop()["count(user)"];
                getNowPageUserNode();
            }
        });
    }
}


/***************************************
 *     URL：/api2/user/modify
 ***************************************/
userManage.modify = function (data, response) {
    response.asynchronous = 1;
    var userid = data.userid;
    var userStr = data.user;
    var user = JSON.parse(userStr);

    modifyUserNode();

    function modifyUserNode() {
        var query = [
            'MATCH user:User' ,
            'WHERE user.id! ={userid}',
            'RETURN  user'
        ].join('\n');

        var params = {
            userid: userid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改关注用户信息失败",
                    "失败原因 ": "用户信息不存在"
                }));
                response.end();
            } else {
                var userNode = results.pop().user;
                userNode.data = user;
                userNode.save();
                response.write(JSON.stringify({
                    "提示信息": "修改关注用户信息成功",
                    "user": user
                }));
                response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/user/getbyid
 ***************************************/
userManage.getbyid = function (data, response) {
    response.asynchronous = 1;
    var userid = data.userid;
    getByIdUserNode();

    function getByIdUserNode() {
        var query = [
            'MATCH user:User' ,
            'WHERE user.id! ={userid}',
            'RETURN  user'
        ].join('\n');

        var params = {
            userid: userid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获取用户信息失败",
                    "失败原因 ": "用户信息不存在"
                }));
                response.end();
            } else {
                var user = results.pop().user.data;
                response.write(JSON.stringify({
                    "提示信息": "获取用户信息成功",
                    "user": user
                }));
                response.end();
            }
        });
    }
}
/***************************************
 *     URL：/api2/user/delete
 ***************************************/
userManage.delete = function (data, response) {
    response.asynchronous = 1;
    var userid = data.userid;
    deleteUserNode();

    function deleteUserNode() {
        var query = [
            'MATCH other-[r]-user:User' ,
            'WHERE user.id! ={userid}',
            'DELETE  r, user'
        ].join('\n');

        var params = {
            userid: userid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "删除用户信息失败",
                    "失败原因 ": "用户信息不存在"
                }));
                response.end();
            } else {
                response.write(JSON.stringify({
                    "提示信息": "删除用户信息成功"
                }));
                response.end();
            }
        });
    }
}
module.exports = userManage;